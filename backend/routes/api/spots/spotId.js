const express = require('express');
const sequelize = require('sequelize');

const { requireAuth } = require('../../../utils/auth');
const {
    User,
    Spot,
    Review,
    Review_Image,
    Spot_Image,
    Booking,
} = require('../../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../../utils/validation');

const router = express.Router({ mergeParams: true });

// Check if the user owns the spot
const userAuth = (req, res, next) => {
    const { spot, user } = req;
    if (spot.ownerId !== user.id) {
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403,
        });
    }
    next();
};

// Make sure the spot exists
const validSpot = async (req, res, next) => {
    try {
        req.spot = await Spot.findByPk(req.params.spotId, {
            rejectOnEmpty: true,
        });
    } catch (e) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        });
    }
    next();
};

// Get all Reviews by a Spot's id
router.get('/reviews', validSpot, async (req, res) => {
    const { spot } = req;
    const reviews = await spot.getReviews({
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
            },
            {
                model: Review_Image,
                attributes: ['id', 'url'],
            },
        ],
    });
    return res.json({
        Reviews: reviews,
    });
});

// Get details of a Spot from an id
router.get('/', async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId, {
        attributes: {
            include: [
                [
                    sequelize.fn(
                        'COUNT',
                        sequelize.col('User_Review.Review.id')
                    ),
                    'numReviews',
                ],
                [
                    sequelize.fn(
                        'ROUND',
                        sequelize.fn(
                            'AVG',
                            sequelize.col('User_Review.Review.stars')
                        ),
                        1
                    ),
                    'avgStarRating',
                ],
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
                attributes: ['id', 'url', 'preview'],
                separate: true,
                required: false,
                includeIgnoreAttributes: false,
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
                as: 'Owner',
                includeIgnoreAttributes: false,
            },
        ],

        includeIgnoreAttributes: false,
        group: ['Spot.id', 'Spot_Images.url'],
    });
    if (spot.id) {
        return res.json(spot);
    } else {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        });
    }
});

// Edit a Spot
router.put('/', requireAuth, validSpot, userAuth, async (req, res) => {
    const { spot } = req;
    await spot.update({
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        lat: req.body.lat,
        lng: req.body.lng,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        updatedAt: sequelize.literal('CURRENT_TIMESTAMP'),
    });
    await spot.save();
    return res.json(spot);
});

// Delete a Spot
router.delete('/', requireAuth, validSpot, userAuth, async (req, res) => {
    const deletedSpot = await Spot.findByPk(req.params.spotId);
    deletedSpot.destroy();
    return res.json({
        message: 'Successfully deleted',
        statusCode: 200,
    });
});

// Add an Image to a Spot based on the Spot's id
router.post('/images', requireAuth, validSpot, userAuth, async (req, res) => {
    const { spot } = req;
    const newSpotImage = await spot.createSpot_Image({
        url: req.body.url,
        preview: req.body.preview,
    });
    return res.json(newSpotImage);
});

// Create a Review for a Spot based on the Spot's id
router.post('/reviews', requireAuth, validSpot, async (req, res) => {
    const { spot, user } = req;
    if (await spot.hasUser_Review(user)) {
        res.status(403);
        return res.json({
            message: 'User already has a review for this spot',
            statusCode: 403,
        });
    }
    const reviewData = {
        review: req.body.review,
        stars: req.body.stars,
    };
    const newReview = await spot.addUser_Review(user, {
        through: reviewData,
    });
    res.json(newReview[0]);
});

// Create a Booking from a Spot based on the Spot's id
router.post('/bookings', requireAuth, validSpot, async (req, res) => {
    const { spot, user } = req;
    const dates = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    };
    const newBooking = await user.addSpot_Booking(spot, { through: dates });
    res.json(newBooking[0]);
});

// Get all Bookings for a Spot based on the Spot's id
router.get('/bookings', requireAuth, validSpot, async (req, res) => {
    const { spot, user } = req;
    const scope = spot.ownerId === user.id ? 'owner' : 'notOwner';
    const allBookings = await spot.getBookings({
        scope: scope,
    });
    res.json({ Bookings: allBookings });
});

module.exports = router;
