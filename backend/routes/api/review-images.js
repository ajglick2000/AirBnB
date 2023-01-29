const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Review_Image } = require('../../db/models');

const router = express.Router();

// Check if the user owns the review
const userAuth = async (req, res, next) => {
    const { reviewImage, user } = req;
    review = await reviewImage.getReview();
    if (review.userId !== user.id) {
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403,
        });
    }
    next();
};

// Make sure the review exists
const validReview = async (req, res, next) => {
    try {
        req.reviewImage = await Review_Image.findByPk(
            req.params.reviewImageId,
            {
                rejectOnEmpty: true,
            }
        );
    } catch (e) {
        res.status(404);
        return res.json({
            message: "Review Image couldn't be found",
            statusCode: 404,
        });
    }
    next();
};

router.delete(
    '/:reviewImageId',
    requireAuth,
    validReview,
    userAuth,
    async (req, res) => {
        const { reviewImage } = req;
        reviewImage.destroy();
        return res.json({
            message: 'Successfully deleted',
            statusCode: 200,
        });
    }
);

module.exports = router;
