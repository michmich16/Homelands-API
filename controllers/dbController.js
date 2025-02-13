import express from 'express';
import sequelize from '../config/sequelizeClient.js';
import { seedFromCsv } from "../utils/seedUtils.js";

import { estatesModel } from "../models/estatesModel.js";
import { citiesModel } from "../models/citiesModel.js";
import { usersModel } from "../models/usersModel.js";
import { staffModel } from "../models/staffModel.js";
import { estate_typesModel } from "../models/estate_typesModel.js";
import { estate_image_relModel } from "../models/estate_image_relModel.js";
import { energy_labelsModel } from "../models/energy_labelsModel.js";
import { imagesModel } from "../models/imagesModel.js";
import { favoritesModel } from "../models/favoritesModel.js";
import { reviewsModel } from "../models/reviewsModel.js";

export const dbController = express.Router()

dbController.get('/sync', async(req, res) => {
    try{
        const result = await sequelize.sync({force:true})
        res.send('Database synchronized successfully')
    } catch(error){
        console.error(`Synchronization error: ${error}`)
    }
})

// Seed database fra CSV filer
dbController.get('/seedfromcsv', async (req, res) => {
    try {
      // Indsæt data fra CSV filer til de respektive modeller
      await seedFromCsv("./city.csv", citiesModel);
      await seedFromCsv("./energy-label.csv", energy_labelsModel);
      await seedFromCsv("./image.csv", imagesModel);
      await seedFromCsv("./estate-type.csv", estate_typesModel);
      await seedFromCsv("./estate.csv", estatesModel);
      await seedFromCsv("./estate-image-rel.csv", estate_image_relModel);
      await seedFromCsv("./staff.csv", staffModel);
      await seedFromCsv("./user.csv", usersModel);
      await seedFromCsv("./review.csv", reviewsModel);
      await seedFromCsv("./favorite.csv", favoritesModel);
  
      // Send succes respons
      res.send({ message: 'Seeding completed' });
    } catch (err) {
      // Fejlhåndtering med respons
      res.status(500).json({ error: err.message });
    }
  });