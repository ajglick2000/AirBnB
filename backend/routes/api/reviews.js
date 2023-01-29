const express = require('express');

const { restoreUser, requireAuth } = require('../../utils/auth');
const { Review_Image, Spot, User, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Make sure the review exists
const validReview = async (req, res, next) => {
    try {
        req.review = await Review.findByPk(req.params.reviewId, {
            rejectOnEmpty: true,
        });
    } catch (e) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404,
        });
    }
    next();
};

// Check if the user owns the review
const userAuth = (req, res, next) => {
    const { review, user } = req;
    if (review.userId !== user.id) {
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403,
        });
    }
    next();
};

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const allReviews = await user.getReviews({
        include: [],
    });
    res.json({
        Reviews: allReviews,
    });
});

// Add an Image to a Review based on the Review's id
router.post(
    '/:reviewId/images',
    requireAuth,
    validReview,
    userAuth,
    async (req, res) => {
        const { review } = req;
        const imageData = {
            url: req.body.url,
        };
        const newImage = await review.createReview_Image(imageData);
        return res.json({ id: newImage.id, url: newImage.url });
    }
);

router.put(
    '/:reviewId/',
    requireAuth,
    validReview,
    userAuth,
    async (req, res) => {
        const { review } = req;
        review.update({ review: req.body.review, stars: req.body.stars });
        review.save();
        return res.json(review);
    }
);

router.delete(
    '/:reviewId',
    requireAuth,
    validReview,
    userAuth,
    async (req, res) => {
        const { review } = req;
        review.destroy();
        return res.json({
            message: 'Successfully deleted',
            statusCode: 200,
        });
    }
);

module.exports = router;
