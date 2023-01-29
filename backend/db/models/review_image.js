'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Review_Image extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Review_Image.belongsTo(models.Review, {
                foreignKey: 'reviewId',
            });
        }
    }
    Review_Image.init(
        {
            reviewId: {
                type: DataTypes.INTEGER,
            },
            url: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: 'Review_Image',
            // defaultScope: {
            //     attributes: {
            //         exclude: ['reviewId', 'createdAt', 'updatedAt'],
            //     },
            // },
        }
    );
    return Review_Image;
};
