'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Booking.belongsTo(models.User, {
                foreignKey: 'userId',
            });
            Booking.belongsTo(models.Spot, {
                foreignKey: 'spotId',
            });

            Booking.addScope('owner', {
                include: {
                    model: models.User,
                    attributes: ['id', 'firstName', 'lastName'],
                },
            });
        }
    }
    Booking.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            spotId: {
                type: DataTypes.INTEGER,
            },
            userId: {
                type: DataTypes.INTEGER,
            },
            startDate: {
                type: DataTypes.DATEONLY,
            },
            endDate: {
                type: DataTypes.DATEONLY,
            },
        },
        {
            sequelize,
            modelName: 'Booking',
            scopes: {
                notOwner: {
                    attributes: {
                        exclude: ['id', 'userId', 'createdAt', 'updatedAt'],
                    },
                },
            },
        }
    );
    return Booking;
};
