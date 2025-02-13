import sequelize from "../config/sequelizeClient.js";
import { Model, DataTypes } from 'sequelize'

export class estate_image_relModel extends Model { }

estate_image_relModel.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    estate_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    image: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    is_main: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'estate_image_rel',
    underscored: true, // True: city_names || False: cityNames
    freezeTableName: true, // True: city || False: cities
    createdAt: true, // Tilføjer createdAt felt
    updatedAt: true, // Tilføjer updatedAt felt
})