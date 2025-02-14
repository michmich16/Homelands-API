import sequelize from "../config/sequelizeClient.js";
import { Model, DataTypes } from 'sequelize'

export class reviewsModel extends Model { }

reviewsModel.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    num_stars:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    estate_id:{
        type: DataTypes.BIGINT,
        allowNull:false,
    },
    user_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    is_active:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'review',
    underscored: true, // True: city_names || False: cityNames
    freezeTableName: true, // True: city || False: cities
    createdAt: true, // Tilføjer createdAt felt
    updatedAt: true, // Tilføjer updatedAt felt
})