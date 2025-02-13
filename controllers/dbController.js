import express from 'express';
import sequelize from '../config/sequelizeClient.js';

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
      await seedFromCsv('brands.csv', brandModel);
      await seedFromCsv('categories.csv', categoryModel);
      await seedFromCsv('cars.csv', carModel);
  
      // Send succes respons
      res.send({ message: 'Seeding completed' });
    } catch (err) {
      // Fejlhåndtering med respons
      res.status(500).json({ error: err.message });
    }
  });