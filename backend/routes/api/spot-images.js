const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Spot_Image } = require('../../db/models');

const router = express.Router();

// Check if the user owns the spot
const userAuth = async (req, res, next) => {
    const { spotImage, user } = req;
    spot = await spotImage.getSpot();
    console.table(req.spotImage);
    if (spot.ownerId !== user.id) {
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403,
        });
    }
    next();
};

// Make sure the spot image exists
const validSpot = async (req, res, next) => {
    try {
        req.spotImage = await Spot_Image.findByPk(req.params.spotImageId, {
            rejectOnEmpty: true,
        });
    } catch (e) {
        res.status(404);
        return res.json({
            message: "Spot Image couldn't be found",
            statusCode: 404,
        });
    }
    next();
};

router.delete(
    '/:spotImageId',
    requireAuth,
    validSpot,
    userAuth,
    async (req, res) => {
        const { spotImage } = req;
        spotImage.destroy();
        return res.json({
            message: 'Successfully deleted',
            statusCode: 200,
        });
    }
);

module.exports = router;
