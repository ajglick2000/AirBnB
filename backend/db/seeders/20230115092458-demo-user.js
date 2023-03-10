'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}

const users = [
    {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Demo',
        lastName: 'Lition',
        hashedPassword: bcrypt.hashSync('password'),
    },
    {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'Fake',
        lastName: 'User1',
        hashedPassword: bcrypt.hashSync('password2'),
    },
    {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'Fake',
        lastName: 'User2',
        hashedPassword: bcrypt.hashSync('password3'),
    },
    {
        email: 'andreavancouver@canada.com',
        username: 'AndreaTraveler',
        firstName: 'Andrea',
        lastName: 'Vancouver',
        hashedPassword: bcrypt.hashSync('password4'),
    },
];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = 'Users';
        return queryInterface.bulkInsert(options, users, {});
    },

    down: async (queryInterface, Sequelize) => {
        options.tableName = 'Users';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
            options,
            {
                username: {
                    [Op.in]: [
                        'Demo-lition',
                        'FakeUser1',
                        'FakeUser2',
                        'AndreaTraveler',
                    ],
                },
            },
            {}
        );
    },
};
