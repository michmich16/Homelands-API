import express from 'express';
import {estate_typesModel} from '../models/estate_typesModel.js';
import { errorResponse, successResponse } from '../utils/mainUtils.js';

export const estate_typesController = express.Router();

/**
 * READ: Fetch all estate_types from the database
 */
estate_typesController.get('/estate_types', async (req, res) => {
    try {
        const list = await estate_typesModel.findAll();

        // Check if no estate_types are found
        if (!list || list.length === 0) {
            return errorResponse(res, 'No estate_types found', 404)
        }

        successResponse(res, list);
    } catch (error) {
        errorResponse(res, `Error fetching estate_types: ${error.message}`);
    }
});

/**
 * READ: Fetch a single estate_types by ID
 */
estate_typesController.get('/estate_types/:id([0-9]+)', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        let details = await estate_typesModel.findOne({
            where: { id: id }
        });

        if (!details) return errorResponse(res, "estate_types not found", 404);

        successResponse(res, estate_types);
    } catch (error) {
        errorResponse(res, `Error fetching estate_types: ${error.message}`);
    }
});

/**
 * CREATE: Add a new user to the database
 */
estate_typesController.post('/estate_types', async (req, res) => {
    try {
        let { name } = req.body;
        const result = await estate_typesModel.create({ name });
        successResponse(res, result, "estate_types created successfully", 201);
    } catch (error) {
        errorResponse(res, `Error creating estate_types:`, error);
    }
});

/**
 * UPDATE: Update an existing user
 */
estate_typesController.put('/estate_types/:id([0-9]+)', async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Validate that all required fields are provided
        if (!name) return errorResponse(res, "All fields are required", 400);

        const [updated] = await estate_typesModel.update({ name }, { where: { id } });

        if (!updated) return errorResponse(res, `No estate_types found with ID: ${id}`, 404);

        successResponse(res, { name }, "estate_types updated successfully");

    } catch (error) {
        errorResponse(res, `Error updating estate_types: ${error.message}`);
    }
});

/**
 * DELETE: Remove a estate_types by ID
 */
estate_typesController.delete('/estate_types/:id([0-9]+)', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await estate_typesModel.destroy({ where: { id } });

        if (!deleted) return errorResponse(res, `No estate_types found with ID: ${id}`, 404);

        successResponse(res, null, "estate_types deleted successfully");
    } catch (error) {
        errorResponse(res, `Error deleting estate_types: ${error.message}`);
    }
});