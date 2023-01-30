const express = require('express');
const { Op } = require('sequelize');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a first name.'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a last name.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

// Check if the user already exists
const userExists = async (req, res, next) => {
    const { email, username } = req.body;
    const user = await User.scope('currentUser').findOne({
        where: {
            [Op.or]: [{ username: username }, { email: email }],
        },
    });
    console.log(user);
    if (user) {
        const err = Error('User already exists');
        err.title = 'User already exists';
        err.status = 403;
        if (user.email === email) {
            err.errors = ['User with that email already exists'];
        } else if (user.username === username) {
            err.errors = ['User with that username already exists'];
        }
        return next(err);
    }
    next();
};

// Sign up
router.post('/', validateSignup, userExists, async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const user = await User.signup({
        email,
        username,
        password,
        firstName,
        lastName,
    });

    await setTokenCookie(res, user);

    return res.json({
        user: user,
    });
});

module.exports = router;
