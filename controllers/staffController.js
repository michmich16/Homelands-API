import express from 'express';
import staffModel from '../models/staffModel.js';
import { errorResponse, successResponse } from '../utils/mainUtils.js';

export const staffController = express.Router();

/**
 * READ: Fetch all staff from the database
 */
staffController.get('/staff', async (req, res) => {
    try {
        const list = await staffModel.findAll();

        // Check if no users are found
        if (!list || list.length === 0) {
            return errorResponse(res, 'No staff found', 404)
        }

        successResponse(res, list);
    } catch (error) {
        errorResponse(res, `Error fetching staff: ${error.message}`);
    }
});

/**
 * READ: Fetch a single staff by ID
 */
staffController.get('/staff/:id([0-9]+)', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        let details = await staffModel.findOne({
            where: { id: id }
        });

        if (!details) return errorResponse(res, "staff not found", 404);

        successResponse(res, staff);
    } catch (error) {
        errorResponse(res, `Error fetching staff: ${error.message}`);
    }
});

/**
 * CREATE: Add a new user to the database
 */
staffController.post('/staff', async (req, res) => {
    try {
        let { firstname, lastname, position, image, phone, email } = req.body;
        const result = await staffModel.create({ firstname, lastname, position, image, phone, email  });
        successResponse(res, result, "staff created successfully", 201);
    } catch (error) {
        errorResponse(res, `Error creating staff:`, error);
    }
});

/**
 * UPDATE: Update an existing user
 */
staffController.put('/staff/:id([0-9]+)', async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, position, image, phone, email  } = req.body;

        // Validate that all required fields are provided
        if (!firstname || !lastname || !position || !image || !phone || !email) return errorResponse(res, "All fields are required", 400);

        const [updated] = await staffModel.update({ firstname, lastname, position, image, phone, email  }, { where: { id } });

        if (!updated) return errorResponse(res, `No staff found with ID: ${id}`, 404);

        successResponse(res, { firstname, lastname, position, image, phone, email  }, "staff updated successfully");

    } catch (error) {
        errorResponse(res, `Error updating staff: ${error.message}`);
    }
});

/**
 * DELETE: Remove a staff by ID
 */
staffController.delete('/staff/:id([0-9]+)', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await staffModel.destroy({ where: { id } });

        if (!deleted) return errorResponse(res, `No staff found with ID: ${id}`, 404);

        successResponse(res, null, "staff deleted successfully");
    } catch (error) {
        errorResponse(res, `Error deleting staff: ${error.message}`);
    }
});