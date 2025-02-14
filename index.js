// import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import { dbController } from './controllers/dbController.js'
import sequelize from './config/sequelizeClient.js';
import { authController } from './controllers/authController.js';
import { estatesController } from './controllers/estatesController.js';
import { citiesController } from './controllers/citiesController.js';
import { energy_labelsController } from './controllers/energy_labelsController.js';
import { estate_image_relController } from './controllers/estate_image_relController.js';
import { estate_typesController } from './controllers/estate_typesController.js';
import { favoritesController } from './controllers/favoritesController.js';
import { imagesController } from './controllers/imagesController.js';
import { reviewsController } from './controllers/reviewsController.js';
import { staffController } from './controllers/staffController.js';
import { usersController } from './controllers/usersController.js';


dotenv.config()

const app = express()
const port = process.env.SERVERPORT || 4242
app.use(express.urlencoded({ extended: true }))

// Route til root
app.get('/', (req, res) => {
  console.log('Hej verden')
  res.send('Hello world')
})

app.use(
  dbController,
  authController,
  estatesController,
  citiesController,
  energy_labelsController,
  estate_image_relController,
  estate_typesController,
  favoritesController,
  imagesController,
  reviewsController,
  staffController,
  usersController,
)

app.get('/about', (req, res) => {
  res.send('Dette er about siden...');
});

app.get('/test', async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log('Der er forbindelse til databasen');
    res.send('Der er forbindelse til databasen');
  } catch (error) {
    console.error('Fejl! Kunne ikke forbinde til databasen: ', error);
    res.status(500).send('Fejl! Kunne ikke forbinde til databasen.');
  }
});

// Route til 404
app.get('*', (req, res) => {
  res.send('Could not find file')
})

app.listen(port, () => {
  console.log(`Server runs at http://localhost:${port}`)
})