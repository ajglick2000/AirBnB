'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Spot extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Owner of current spot
            Spot.belongsTo(models.User, {
                foreignKey: 'ownerId',
                as: 'Owner',
            });

            // Bookings made by a user
            Spot.belongsToMany(models.User, {
                through: models.Booking,
                foreignKey: 'spotId',
                as: 'User_Bookings',
            });

            // Spot images
            Spot.hasMany(models.Spot_Image, {
                foreignKey: 'spotId',
                onDelete: 'CASCADE',
                hooks: true,
            });

            // Reviews made by a user
            Spot.belongsToMany(models.User, {
                foreignKey: 'spotId',
                through: models.Review,
                as: 'User_Review',
            });

            //review test stuff
            Spot.hasMany(models.Review, {
                foreignKey: 'spotId',
                onDelete: 'CASCADE',
                hooks: true,
            });

            Spot.hasMany(models.Booking, {
                foreignKey: 'spotId',
                onDelete: 'CASCADE',
                hooks: true,
            });
        }
    }
    Spot.init(
        {
            ownerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            country: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lat: {
                type: DataTypes.DECIMAL,
                allowNull: false,
                validate: {
                    min: -90,
                    max: 90,
                },
            },
            lng: {
                type: DataTypes.DECIMAL,
                allowNull: false,
                validate: {
                    min: -180,
                    max: 180,
                },
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Spot',
        }
    );
    return Spot;
};
