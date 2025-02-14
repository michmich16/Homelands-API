import sequelize from "../config/sequelizeClient.js";
import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

export class usersModel extends Model { }

usersModel.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Added unique constraint for email
        validate: {
            isEmail: true, // Validate that the value is a valid email
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        // Remember to hash passwords before saving
    },
    refresh_token: {
        type: DataTypes.STRING,
        allowNull: true, // Tokens can initially be null
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Default to active
    },
}, {
    sequelize,
    modelName: 'user',
    underscored: true, // True: snake_case column names
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
    hooks: {
        // Hook to hash password before creating a user
        beforeCreate: async (user) => {
            user.password = await createHash(user.password);
        },
        // Hook to hash password if it is changed before updating a user
        beforeUpdate: async (user) => {
            if (user.changed("password")) {
                user.password = await createHash(user.password);
            }
        },
    },
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Function to hash a string
const createHash = async (string) => {
    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt
        return await bcrypt.hash(string, salt); // Hash the string with the salt
    } catch (error) {
        throw new Error("Error hashing password");
    }
};
