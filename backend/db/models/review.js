'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Review.hasMany(models.Review_Image, {
                foreignKey: 'reviewId',
                onDelete: 'CASCADE',
                hooks: true,
            });

            //testing stuff
            Review.belongsTo(models.Spot, {
                foreignKey: 'spotId',
            });
            Review.belongsTo(models.User, {
                foreignKey: 'userId',
            });
        }
    }
    Review.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
            },
            spotId: {
                type: DataTypes.INTEGER,
            },
            review: {
                type: DataTypes.STRING,
            },
            stars: {
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: 'Review',
        }
    );
    return Review;
};
