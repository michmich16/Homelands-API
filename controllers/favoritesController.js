import express from 'express'
import { favoritesModel } from '../models/favoritesModel.js'

export const favoritesController = express.Router()

//READ all favorites
favoritesController.get('/favorites', async (req, res) => {
    try {
        const data = await favoritesModel.findAll({
            attributes: ['id', 'name', 'zipcode']
        })
        if (!data || data.length === 0) {
            return res.json({ message: 'No data found' })
        }
        res.json(data)
    } catch (error) {
        console.error(`Could not get brand list: ${error}`)
    }
})

//READ city detail
favoritesController.get('/favorites/:id([0-9]*)', async (req, res) => {
    try {
        const { id } = req.params
        const data = await favoritesModel.findOne({
            where: {
                id: id
            }
        })

        if (!data) {
            return res.json({ message: `Could not find brand on id #${id}` })
        }

        return res.json(data);

    } catch (error) {
        console.error(`Could not get brand details: ${error}`)
    }
})

//CREATE
favoritesController.post('/favorites', async (req, res) => {
    const { name, zipcode } = req.body;

    if (!name || !zipcode) {
        return res.json({ message: 'Missing required data' })
    }

    try {
        const result = await favoritesModel.create({
            name, zipcode
        })

        res.status(201).json(result)
    } catch (error) {
        return res.json({ message: `Could not create city: ${error.message}` })
    }
})


//UPDATE
favoritesController.put('/favorites', async (req, res) => {
    const { name, zipcode, id } = req.body;

    if (!id || !name || !zipcode) {
        return res.json({ message: 'Missing required data' })
    }

    try {
        const result = await favoritesModel.update({
            name, zipcode
        },
            { where: { id } }
        )
        if (result) {
            res.json({ message: `Updated city id#${id}` })
        }
    } catch (error) {
        return res.json({ message: `Could not update city: ${error.message}` })
    }
})

//DELETE
favoritesController.delete('/favorites/:id([0-9]*)', async (req, res) => {
    const { id } = req.params
    if(id) {
        try {
            await favoritesModel.destroy({
                where: { id }
            })
            res.send({
                message: `Record #${id} deleted`
            })
        } catch (error) {
            res.send(`Error! Could not delete city: ${error}`)
        }
    } else {
        res.send({
            message: 'Id not valid'
        })
    }
    
    
})