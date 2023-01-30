'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}

const { User, Spot } = require('../models');

const userBookings = [
    {
        username: 'AndreaTraveler',
        bookings: [
            {
                spot: 'spot 2',
                dates: {
                    startDate: '2025-04-01',
                    endDate: '2025-05-01',
                },
            },
            {
                spot: 'spot 3',
                dates: {
                    startDate: '2026-07-03',
                    endDate: '2026-07-10',
                },
            },
            {
                spot: 'spot 4',
                dates: {
                    startDate: '2024-06-12',
                    endDate: '2024-06-22',
                },
            },
        ],
    },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        for (let { username, bookings } of userBookings) {
            const user = await User.findOne({ where: { username } });
            for (let { spot, dates } of bookings) {
                const spotBooking = await Spot.findOne({
                    where: { name: spot },
                });

                await user.addSpot_Booking(spotBooking, {
                    through: dates,
                });
            }
        }
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        options.tableName = 'Bookings';
        return queryInterface.bulkDelete(options, {}, {});
    },
};
