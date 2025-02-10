import sequelize from "../config/sequelizeClient.js";
import { Model, DataTypes } from 'sequelize'

export class favoritesModel extends Model { }

favoritesModel.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    estate_id: {
        type: DataTypes.BIGINT,
        allowNull: false,

    }
}, {
    sequelize,
    modelName: 'city',
    underscored: true, // True: city_names || False: cityNames
    freezeTableName: true, // True: city || False: cities
    createdAt: true, // Tilføjer createdAt felt
    updatedAt: true, // Tilføjer updatedAt felt
})