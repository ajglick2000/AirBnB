const express = require('express');

const { restoreUser, requireAuth } = require('../../utils/auth');
const { Booking, Spot, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Make sure the booking exists
const validBooking = async (req, res, next) => {
    try {
        req.booking = await Booking.findByPk(req.params.bookingId, {
            rejectOnEmpty: true,
        });
    } catch (e) {
        res.status(404);
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404,
        });
    }
    next();
};

// Check if the user owns the booking
const userAuth = (req, res, next) => {
    const { booking, user } = req;
    if (booking.userId !== user.id) {
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403,
        });
    }
    next();
};

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const allBookings = await user.getBookings({
        include: {
            model: Spot,
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        },
        scope: 'owner',
    });
    res.json({
        Bookings: allBookings,
    });
});

// Edit a Booking
router.put(
    '/:bookingId',
    requireAuth,
    validBooking,
    userAuth,
    async (req, res) => {
        const { booking } = req;
        booking.update({
            startDate: req.body.startDate,
            endDate: req.body.endDate,
        });
        booking.save();
        return res.json(booking);
    }
);

// Delete a Booking
router.delete('/:bookingId', requireAuth, validBooking, async (req, res) => {
    const { booking, user } = req;
    const spot = await Spot.findByPk(booking.spotId);
    if (!(booking.userId === user.id || spot.ownerId === user.id)) {
        return res.status(403).json({
            message: 'Forbidden',
            statusCode: 403,
        });
    }
    booking.destroy();
    return res.json({
        message: 'Successfully deleted',
        statusCode: 200,
    });
});

module.exports = router;
