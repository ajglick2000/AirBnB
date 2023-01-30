'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}

const { Review, User, Spot } = require('../models');

const reviewImages = [
    {
        username: 'AndreaTraveler',
        images: [
            {
                spotName: 'spot 2',
                image: {
                    url: "url for andrea's spot 2 review image",
                },
            },
            {
                spotName: 'spot 3',
                image: {
                    url: "url for andrea's spot 3 review image",
                },
            },
            {
                spotName: 'spot 4',
                image: {
                    url: "url for andrea's spot 4 review image",
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
        for (let { username, images } of reviewImages) {
            const user = await User.findOne({ where: { username } });
            for (let { spotName, image } of images) {
                const spot = await Spot.findOne({
                    where: {
                        name: spotName,
                    },
                });
                const review = await Review.findOne({
                    where: {
                        spotId: spot.id,
                        userId: user.id,
                    },
                });

                // console.log(console.table(review));

                const newImage = await review.createReview_Image(image);
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
        return queryInterface.bulkDelete(options, {}, {});
    },
};
