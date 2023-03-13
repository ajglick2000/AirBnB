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
                url: 'https://res.cloudinary.com/dl8rfazs9/image/upload/v1678229697/AirBnB/spot1/99bd44d1-abca-4b1c-b5da-eb05eaac9193_pfnubn.jpg',
                preview: true,
            },
            {
                url: 'https://res.cloudinary.com/dl8rfazs9/image/upload/v1678229903/AirBnB/spot1/b5f7057b-32d4-4d15-a7bf-5e95b647a8d2_hrrguk.jpg',
                preview: false,
            },
            {
                url: 'https://res.cloudinary.com/dl8rfazs9/image/upload/v1678229924/AirBnB/spot1/2ef5defc-c684-42f0-8001-4d2fea7165d1_y0gz3n.jpg',
                preview: false,
            },
        ],
    },
    {
        spotName: 'spot 2',
        images: [
            {
                url: 'https://res.cloudinary.com/dl8rfazs9/image/upload/v1678230220/AirBnB/spot2/82c577ee-3422-4fda-ae09-6716d76e8bef_c3nqmi.jpg',
                preview: true,
            },
            {
                url: 'https://res.cloudinary.com/dl8rfazs9/image/upload/v1678230229/AirBnB/spot2/f4d57c4d_original_qp3g9j.jpg',
                preview: false,
            },
            {
                url: 'https://res.cloudinary.com/dl8rfazs9/image/upload/v1678230235/AirBnB/spot2/c5d534fc_original_ompcww.jpg',
                preview: false,
            },
        ],
    },
    {
        spotName: 'spot 3',
        images: [
            {
                url: 'https://res.cloudinary.com/dl8rfazs9/image/upload/v1678230552/AirBnB/spot3/74a26c69-847c-4006-8d82-baee115fda1c_lg0wzv.jpg',
                preview: true,
            },
            {
                url: 'https://res.cloudinary.com/dl8rfazs9/image/upload/v1678230562/AirBnB/spot3/8238f306-076f-4500-9a38-035d93ec84f0_fb16yx.jpg',
                preview: false,
            },
            {
                url: 'https://res.cloudinary.com/dl8rfazs9/image/upload/v1678230569/AirBnB/spot3/f6a777ed-8a0d-4fe5-b61a-c39e9e6809a1_txvqxf.jpg',
                preview: false,
            },
        ],
    },
    {
        spotName: 'spot 4',
        images: [
            {
                url: 'https://res.cloudinary.com/dl8rfazs9/image/upload/v1678230703/AirBnB/spot4/65de82db-e347-461e-a66b-5d15f16afbe3_tk79q2.jpg',
                preview: true,
            },
            {
                url: 'https://res.cloudinary.com/dl8rfazs9/image/upload/v1678230709/AirBnB/spot4/51c797bc-b5ae-485a-a85e-e034151f3b10_oozezi.jpg',
                preview: false,
            },
            {
                url: 'https://res.cloudinary.com/dl8rfazs9/image/upload/v1678230717/AirBnB/spot4/cecc6c27-905c-46e9-b6e8-e46837201c95_cqmkyf.jpg',
                preview: false,
            },
        ],
    },
    {
        spotName: 'spot 5',
        images: [
            {
                url: 'https://res.cloudinary.com/dl8rfazs9/image/upload/v1678230776/AirBnB/spot5/e83d2716-aa22-4f2e-ba3f-9d5d74ed0ae6_pg22ib.jpg',
                preview: true,
            },
            {
                url: 'https://res.cloudinary.com/dl8rfazs9/image/upload/v1678230781/AirBnB/spot5/df093d0e-689f-41cf-9a3c-ec99ac06288c_cpz3ol.jpg',
                preview: false,
            },
            {
                url: 'https://res.cloudinary.com/dl8rfazs9/image/upload/v1678230789/AirBnB/spot5/fe58013a-8251-495e-a49d-6151f5e4581f_mwyrkh.jpg',
                preview: false,
            },
        ],
    },
    {
        spotName: 'spot 6',
        images: [
            {
                url: 'https://res.cloudinary.com/dl8rfazs9/image/upload/v1678230832/AirBnB/spot6/4e8c9284-f6d5-4b17-ad14-42c52d0fcdaa_xuqlug.jpg',
                preview: true,
            },
            {
                url: 'https://res.cloudinary.com/dl8rfazs9/image/upload/v1678230836/AirBnB/spot6/6b6f3832-a666-460a-8a80-cf10444bc062_hok1en.jpg',
                preview: false,
            },
            {
                url: 'https://res.cloudinary.com/dl8rfazs9/image/upload/v1678230843/AirBnB/spot6/d98f68d4-6c57-4fbb-8cb0-2a96106b132e_snjhc3.jpg',
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
