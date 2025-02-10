// import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import  sequelize  from './Config/sequelizeClient.js';


const app = express();

app.get("/", (req, res) => {
  res.send('Hej verden!');
});

app.get('/about', (req, res) => {
  res.send('Dette er about siden...');
});

app.get('/contact', (req, res) => {
  res.send('Dette er kontakt siden...');
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

app.listen(4242, () => {
  console.log("Express server kører....");
});