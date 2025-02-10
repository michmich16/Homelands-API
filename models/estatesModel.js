import sequelize from "../config/sequelizeClient.js";
import { Model, DataTypes } from 'sequelize'

export class estatesModel extends Model { }

estatesModel.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    address: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    payout:{
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    gross:{
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    net:{
        type: DataTypes.DOUBLE,
        allowNull:false,
    },
    cost:{
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    num_rooms:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    num_floors:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    floor_space:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ground_space:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    base_space:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    year_of_construction:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    year_rebuilt:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    floorplan:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    num_clicks:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    city_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    type_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    energy_label_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
    },

}, {
    sequelize,
    modelName: 'city',
    underscored: true, // True: city_names || False: cityNames
    freezeTableName: true, // True: city || False: cities
    createdAt: true, // Tilføjer createdAt felt
    updatedAt: true, // Tilføjer updatedAt felt
})