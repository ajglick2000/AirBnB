'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Spot_Image extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Spot_Image.belongsTo(models.Spot, {
                foreignKey: 'spotId',
            });
        }
    }
    Spot_Image.init(
        {
            spotId: {
                type: DataTypes.INTEGER,
            },
            url: {
                type: DataTypes.STRING,
            },
            preview: {
                type: DataTypes.BOOLEAN,
            },
        },
        {
            sequelize,
            modelName: 'Spot_Image',
            // defaultScope: {
            //     attributes: {
            //         exclude: ['spotId', 'createdAt', 'updatedAt'],
            //     },
            // },
        }
    );
    return Spot_Image;
};
