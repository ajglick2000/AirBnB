'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}

const { Spot } = require('../models');

const spotImages = [
    {
        spotName: 'spot 1',
        images: [
            {
                url: 'preview image for spot 1',
                preview: true,
            },
            {
                url: 'normal image 1 for spot 1',
                preview: false,
            },
            {
                url: 'normal image 2 for spot 1',
                preview: false,
            },
        ],
    },
    {
        spotName: 'spot 2',
        images: [
            {
                url: 'preview image for spot 2',
                preview: true,
            },
            {
                url: 'normal image 1 for spot 2',
                preview: false,
            },
            {
                url: 'normal image 2 for spot 2',
                preview: false,
            },
        ],
    },
    {
        spotName: 'spot 3',
        images: [
            {
                url: 'preview image for spot 3',
                preview: true,
            },
            {
                url: 'normal image 1 for spot 3',
                preview: false,
            },
            {
                url: 'normal image 2 for spot 3',
                preview: false,
            },
        ],
    },
    {
        spotName: 'spot 4',
        images: [
            {
                url: 'preview image for spot 4',
                preview: true,
            },
            {
                url: 'normal image 1 for spot 4',
                preview: false,
            },
            {
                url: 'normal image 2 for spot 4',
                preview: false,
            },
        ],
    },
    {
        spotName: 'spot 5',
        images: [
            {
                url: 'preview image for spot 5',
                preview: true,
            },
            {
                url: 'normal image 1 for spot 5',
                preview: false,
            },
            {
                url: 'normal image 2 for spot 5',
                preview: false,
            },
        ],
    },
    {
        spotName: 'spot 6',
        images: [
            {
                url: 'preview image for spot 6',
                preview: true,
            },
            {
                url: 'normal image 1 for spot 6',
                preview: false,
            },
            {
                url: 'normal image 2 for spot 6',
                preview: false,
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
        for (let { spotName, images } of spotImages) {
            const spot = await Spot.findOne({ where: { name: spotName } });
            for (let j = 0; j < images.length; j++) {
                const image = images[j];

                await spot.createSpot_Image(image);
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
        options.tableName = 'Spot_Images';
        return queryInterface.bulkDelete(options, {}, {});
    },
};
