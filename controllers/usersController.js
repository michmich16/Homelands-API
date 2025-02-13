import express from 'express';
import usersModel from '../models/usersModel.js';
import { errorResponse, successResponse } from '../utils/mainUtils.js';

export const usersController = express.Router();

/**
 * READ: Fetch all users from the database
 */
usersController.get('/users', async (req, res) => {
    try {
        const list = await usersModel.findAll();

        // Check if no users are found
        if (!list || list.length === 0) {
            return errorResponse(res, 'No users found', 404)
        }

        successResponse(res, list);
    } catch (error) {
        errorResponse(res, `Error fetching users: ${error.message}`);
    }
});

/**
 * READ: Fetch a single users by ID
 */
usersController.get('/users/:id([0-9]+)', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        let details = await usersModel.findOne({
            where: { id: id }
        });

        if (!details) return errorResponse(res, "users not found", 404);

        successResponse(res, users);
    } catch (error) {
        errorResponse(res, `Error fetching users: ${error.message}`);
    }
});

/**
 * CREATE: Add a new user to the database
 */
usersController.post('/users', async (req, res) => {
    try {
        let { firstname, lastname, email, password, refresh_token, is_active } = req.body;
        const result = await usersModel.create({ firstname, lastname, email, password, refresh_token, is_active  });
        successResponse(res, result, "users created successfully", 201);
    } catch (error) {
        errorResponse(res, `Error creating users:`, error);
    }
});

/**
 * UPDATE: Update an existing user
 */
usersController.put('/users/:id([0-9]+)', async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, email, password, refresh_token, is_active  } = req.body;

        // Validate that all required fields are provided
        if (!firstname || !lastname || !email || !password || !refresh_token || !is_active) return errorResponse(res, "All fields are required", 400);

        const [updated] = await usersModel.update({ firstname, lastname, email, password, refresh_token, is_active  }, { where: { id } });

        if (!updated) return errorResponse(res, `No users found with ID: ${id}`, 404);

        successResponse(res, { firstname, lastname, email, password, refresh_token, is_active  }, "users updated successfully");

    } catch (error) {
        errorResponse(res, `Error updating users: ${error.message}`);
    }
});

/**
 * DELETE: Remove a users by ID
 */
usersController.delete('/users/:id([0-9]+)', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await usersModel.destroy({ where: { id } });

        if (!deleted) return errorResponse(res, `No users found with ID: ${id}`, 404);

        successResponse(res, null, "users deleted successfully");
    } catch (error) {
        errorResponse(res, `Error deleting users: ${error.message}`);
    }
});