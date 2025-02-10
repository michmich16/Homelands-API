import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Giver adgang til variabler fra en .env-fil via process.env
dotenv.config();

const sequelize = new Sequelize(
  // Databasens navn
  process.env.DBNAME,
  // Brugernavn til databasen
  process.env.DBUSER,
  // Adgangskode til databasen
  process.env.DBPASSWD,
  {
    // Database-serverens adresse
    host: process.env.DBHOST,
    // Porten databasen kører på
    port: process.env.DBPORT,
    // Databasetype (MySQL)
    dialect: 'mysql'
  }
);

export default sequelize;