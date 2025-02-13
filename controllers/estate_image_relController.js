import express from 'express'
import { estate_image_relModel } from '../models/estate_image_relModel.js'

export const estate_image_relController = express.Router()

//READ all estate_image_rel
estate_image_relController.get('/estate_image_rel', async (req, res) => {
    try {
        const data = await estate_image_relModel.findAll({
            attributes: ['id', 'estate_id', 'image_id', 'is_main']
        })
        if (!data || data.length === 0) {
            return res.json({ message: 'No data found' })
        }
        res.json(data)
    } catch (error) {
        console.error(`Could not get estate_image_rel: ${error}`)
    }
})

//READ estate_image_rel detail
estate_image_relController.get('/estate_image_rel/:id([0-9]*)', async (req, res) => {
    try {
        const { id } = req.params
        const data = await estate_image_relModel.findOne({
            where: {
                id: id
            }
        })

        if (!data) {
            return res.json({ message: `Could not find estate_image_rel on id #${id}` })
        }

        return res.json(data);

    } catch (error) {
        console.error(`Could not get estate_image_rel details: ${error}`)
    }
})

//CREATE
estate_image_relController.post('/estate_image_rel', async (req, res) => {
    const { estate_id, image_id, is_main } = req.body;

    if (!estate_id || !image_id || !is_main) {
        return res.json({ message: 'Missing required data' })
    }

    try {
        const result = await estate_image_relModel.create({
         estate_id, image_id, is_main
        })

        res.status(201).json(result)
    } catch (error) {
        return res.json({ message: `Could not create estate_image_rel: ${error.message}` })
    }
})


//UPDATE
estate_image_relController.put('/estate_image_rel', async (req, res) => {
    const { estate_id, image_id, is_main} = req.body;

    if (!estate_id || !image_id || !is_main) {
        return res.json({ message: 'Missing required data' })
    }

    try {
        const result = await estate_image_relModel.update({
         estate_id, image_id, is_main
        },
            { where: { id } }
        )
        if (result) {
            res.json({ message: `Updated estate_image_rel id#${id}` })
        }
    } catch (error) {
        return res.json({ message: `Could not update estate_image_rel: ${error.message}` })
    }
})

//DELETE
estate_image_relController.delete('/estate_image_rel/:id([0-9]*)', async (req, res) => {
    const { id } = req.params
    if(id) {
        try {
            await estate_image_relModel.destroy({
                where: { id }
            })
            res.send({
                message: `Record #${id} deleted`
            })
        } catch (error) {
            res.send(`Error! Could not delete estate_image_rel: ${error}`)
        }
    } else {
        res.send({
            message: 'Id not valid'
        })
    }
    
    
})