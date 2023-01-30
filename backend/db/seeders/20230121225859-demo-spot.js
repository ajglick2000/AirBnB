'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}

const { User, Spot } = require('../models');

const userSpots = [
    {
        username: 'Demo-lition',
        spots: [
            {
                address: '3382 Black Oak Hollow Road',
                city: 'San Jose',
                state: 'California',
                country: 'USA',
                lat: 37.413063,
                lng: -121.9198,
                name: 'spot 1',
                description: 'the first spot owned by demo-lition',
                price: 151,
            },
            {
                address: '1183 Ray Court',
                city: 'Fayetteville',
                state: 'North Carolina',
                country: 'USA',
                lat: 34.960247,
                lng: -78.72316,
                name: 'spot 2',
                description: 'the second spot owned by demo-lition',
                price: 190,
            },
        ],
    },
    {
        username: 'FakeUser1',
        spots: [
            {
                address: '1728 Calvin Street',
                city: 'Baltimore',
                state: 'Maryland',
                country: 'USA',
                lat: 39.376858,
                lng: -76.54847,
                name: 'spot 3',
                description: 'the first spot owned by FakeUser1',
                price: 378,
            },
            {
                address: '591 Harrison Street',
                city: 'San Francisco',
                state: 'California',
                country: 'USA',
                lat: 37.763165,
                lng: -122.381203,
                name: 'spot 4',
                description: 'the second spot owned by FakeUser1',
                price: 122,
            },
        ],
    },
    {
        username: 'FakeUser2',
        spots: [
            {
                address: '2492 Southside Lane',
                city: 'Bell',
                state: 'California',
                country: 'USA',
                lat: 33.90556,
                lng: -118.088074,
                name: 'spot 5',
                description: 'the first spot owned by FakeUser2',
                price: 864,
            },
            {
                address: '789 Jacobs Street',
                city: 'Pittsburgh',
                state: 'Pennsylvania',
                country: 'USA',
                lat: 40.553513,
                lng: -79.897865,
                name: 'spot 6',
                description: 'the second spot owned by FakeUser2',
                price: 525,
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
        for (let { username, spots } of userSpots) {
            const user = await User.findOne({ where: { username } });
            for (let j = 0; j < spots.length; j++) {
                const spot = spots[j];

                await user.createSpot(spot);
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
        for (let i = 0; i < userSpots.length; i++) {
            const { spots } = userSpots[i];
            for (let j = 0; j < spots.length; j++) {
                await Spot.destroy({ where: spots[j] });
            }
        }

        return queryInterface.bulkDelete(options, {}, {});
    },
};
