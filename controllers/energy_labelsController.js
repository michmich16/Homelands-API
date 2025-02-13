import express from 'express'
import { energy_labelsModel } from '../models/energy_labelsModel.js'

export const energy_labelsController = express.Router()

//READ all energy_labels
energy_labelsController.get('/energy_labels', async (req, res) => {
    try {
        const data = await energy_labelsModel.findAll({
            attributes: ['id', 'name']
        })
        if (!data || data.length === 0) {
            return res.json({ message: 'No data found' })
        }
        res.json(data)
    } catch (error) {
        console.error(`Could not get energy_labels: ${error}`)
    }
})

//READ energy_labels detail
energy_labelsController.get('/energy_labels/:id([0-9]*)', async (req, res) => {
    try {
        const { id } = req.params
        const data = await energy_labelsModel.findOne({
            where: {
                id: id
            }
        })

        if (!data) {
            return res.json({ message: `Could not find energy_labels on id #${id}` })
        }

        return res.json(data);

    } catch (error) {
        console.error(`Could not get energy_labels details: ${error}`)
    }
})

//CREATE
energy_labelsController.post('/energy_labels', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.json({ message: 'Missing required data' })
    }

    try {
        const result = await energy_labelsModel.create({
            name, id
        })

        res.status(201).json(result)
    } catch (error) {
        return res.json({ message: `Could not create energy_labels: ${error.message}` })
    }
})


//UPDATE
energy_labelsController.put('/energy_labels', async (req, res) => {
    const { name } = req.body;

    if ( !name) {
        return res.json({ message: 'Missing required data' })
    }

    try {
        const result = await energy_labelsModel.update({name},
            { where: { id } }
        )
        if (result) {
            res.json({ message: `Updated energy_labels id#${id}` })
        }
    } catch (error) {
        return res.json({ message: `Could not update energy_labels: ${error.message}` })
    }
})

//DELETE
energy_labelsController.delete('/energy_labels/:id([0-9]*)', async (req, res) => {
    const { id } = req.params
    if(id) {
        try {
            await energy_labelsModel.destroy({
                where: { id }
            })
            res.send({
                message: `Record #${id} deleted`
            })
        } catch (error) {
            res.send(`Error! Could not delete energy_labels: ${error}`)
        }
    } else {
        res.send({
            message: 'Id not valid'
        })
    }
    
    
})