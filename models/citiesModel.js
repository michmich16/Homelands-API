import sequelize from "../config/sequelizeClient.js";
import { Model, DataTypes } from 'sequelize'

export class citiesModel extends Model { }

citiesModel.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zipcode: {
        type: DataTypes.INTEGER,
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