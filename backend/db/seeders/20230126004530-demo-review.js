'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}

const { Spot, User, Review } = require('../models');

const userReviews = [
    {
        username: 'AndreaTraveler',
        reviews: [
            {
                spotName: 'spot 2',
                spotReview: {
                    review: 'there were rats, but at least they didnt bite me',
                    stars: 2,
                },
            },
            {
                spotName: 'spot 3',
                spotReview: {
                    review: 'had a pretty good time, but the pool was cold',
                    stars: 4,
                },
            },
            {
                spotName: 'spot 4',
                spotReview: {
                    review: 'best vacation ever',
                    stars: 5,
                },
            },
        ],
    },
    {
        username: 'Demo-lition',
        reviews: [
            {
                spotName: 'spot 3',
                spotReview: {
                    review: 'the pool was so cold it froze over, and it was summer',
                    stars: 1,
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
        // for (let { username, reviews } of userReviews) {
        //     const user = await User.findOne({ where: { username } });
        //     for (let { spotName, spotReview } of reviews) {
        //         const spot = await Spot.findOne({
        //             where: { name: spotName },
        //         });
        //         const { review, stars } = spotReview;

        //         await user.createReview({
        //             spotId: spot.id,
        //             review: review,
        //             stars: stars,
        //         });
        //     }
        // }

        // super many to many version
        for (let { username, reviews } of userReviews) {
            const user = await User.findOne({ where: { username } });
            for (let { spotName, spotReview } of reviews) {
                const spot = await Spot.findOne({
                    where: { name: spotName },
                });

                await user.addSpot_Review(spot, {
                    through: spotReview,
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
        options.tableName = 'Reviews';
        return queryInterface.bulkDelete(options, {}, {});
    },
};
