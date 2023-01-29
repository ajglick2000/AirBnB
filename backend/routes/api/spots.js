const express = require('express');
const sequelize = require('sequelize');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Spot_Image, Review, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const spotIdRouter = require('./spots/spotId.js');
const router = express.Router();

const validateSpot = [
    // add more vaidations
    check('address').exists({ checkFalsy: true }).withMessage('.'),
    check('city').exists({ checkFalsy: true }).withMessage('.'),
    check('state').exists({ checkFalsy: true }).withMessage('.'),
    check('country').exists({ checkFalsy: true }).withMessage('.'),
    check('lat').exists({ checkFalsy: true }).withMessage('.'),
    check('lng').exists({ checkFalsy: true }).withMessage('.'),
    check('name').exists({ checkFalsy: true }).withMessage('.'),
    check('description').exists({ checkFalsy: true }).withMessage('.'),
    check('price').exists({ checkFalsy: true }).withMessage('.'),
    handleValidationErrors,
];

// Get all Spots
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
        attributes: {
            include: [
                [
                    sequelize.fn(
                        'ROUND',
                        sequelize.fn(
                            'AVG',
                            sequelize.col('User_Review.Review.stars')
                        ),
                        1
                    ),
                    'avgRating',
                ],
                [sequelize.col('url'), 'previewImage'],
            ],
        },
        include: [
            {
                model: User,
                through: {
                    model: Review,
                    attributes: ['stars'],
                },
                as: 'User_Review',
                attributes: [],
                required: false,
                includeIgnoreAttributes: false,
            },
            {
                model: Spot_Image,
                attributes: [],
                where: {
                    preview: true,
                },
                required: false,
                includeIgnoreAttributes: false,
            },
        ],
        includeIgnoreAttributes: false,
        group: ['Spot.id', 'Spot_Images.url'],
    });
    return res.json({
        Spots: allSpots,
    });
});

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const userSpots = await Spot.findAll({
        where: { ownerId: req.user.id },
        attributes: {
            include: [
                [
                    sequelize.fn(
                        'ROUND',
                        sequelize.fn(
                            'AVG',
                            sequelize.col('User_Review.Review.stars')
                        ),
                        1
                    ),
                    'avgRating',
                ],
                [sequelize.col('url'), 'previewImage'],
            ],
        },
        include: [
            {
                model: User,
                through: {
                    model: Review,
                    attributes: ['stars'],
                },
                as: 'User_Review',
                attributes: [],
                required: false,
            },
            {
                model: Spot_Image,
                attributes: [],
                where: {
                    preview: true,
                },
                required: false,
            },
        ],
        group: ['Spot.id'],
    });
    return res.json({
        Spots: userSpots,
    });
});

// Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { user } = req;
    const newSpot = await user.createSpot(req.body);
    res.status(201);
    return res.json(newSpot);
});

router.use('/:spotId', spotIdRouter);

module.exports = router;
