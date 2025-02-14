import express from 'express';
import { citiesModel } from '../models/citiesModel.js';
import { errorResponse, successResponse } from '../utils/mainUtils.js';

export const citiesController = express.Router();

/**
 * READ: Fetch all cities from the database
 */
citiesController.get('/cities', async (req, res) => {
    try {
        const list = await citiesModel.findAll();

        // Check if no users are found
        if (!list || list.length === 0) {
            return errorResponse(res, 'No cities found', 404)
        }

        successResponse(res, list);
    } catch (error) {
        errorResponse(res, `Error fetching cities: ${error.message}`);
    }
});

/**
 * READ: Fetch a single cities by ID
 */
citiesController.get('/cities/:id([0-9]+)', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        let details = await citiesModel.findOne({
            where: { id: id }
        });

        if (!details) return errorResponse(res, `City with id #${id} not found`, 404);

        successResponse(res, details); // Use 'details' instead of 'estates'
    } catch (error) {
        console.error(`Error fetching city:`, error); // Log the error
        errorResponse(res, `Error fetching city: ${error.message}`);
    }
});

/**
 * CREATE: Add a new user to the database
 */
citiesController.post('/cities', async (req, res) => {
    try {
        let { zipcode, name } = req.body;
        const result = await citiesModel.create({ zipcode, name });
        successResponse(res, result, "cities created successfully", 201);
    } catch (error) {
        errorResponse(res, `Error creating cities:`, error);
    }
});

/**
 * UPDATE: Update an existing user
 */
citiesController.put('/cities/:id([0-9]+)', async (req, res) => {
    try {
        const { id } = req.params;
        const { zipcode, name } = req.body;

        // Validate that all required fields are provided
        if (!zipcode || !name) return errorResponse(res, "All fields are required", 400);

        const [updated] = await citiesModel.update({ zipcode, name }, { where: { id } });

        if (!updated) return errorResponse(res, `No cities found with ID: ${id}`, 404);

        successResponse(res, { id, zipcode, name }, "cities updated successfully");

    } catch (error) {
        errorResponse(res, `Error updating cities: ${error.message}`);
    }
});

/**
 * DELETE: Remove a cities by ID
 */
citiesController.delete('/cities/:id([0-9]+)', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await citiesModel.destroy({ where: { id } });

        if (!deleted) return errorResponse(res, `No cities found with ID: ${id}`, 404);

        successResponse(res, null, "cities deleted successfully");
    } catch (error) {
        errorResponse(res, `Error deleting cities: ${error.message}`);
    }
});