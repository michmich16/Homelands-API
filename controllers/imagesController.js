import express from 'express';
import imagesModel from '../models/imagesModel.js';
import { errorResponse, successResponse } from '../utils/mainUtils.js';

export const imagesController = express.Router();

/**
 * READ: Fetch all images from the database
 */
imagesController.get('/images', async (req, res) => {
    try {
        const list = await imagesModel.findAll();

        // Check if no users are found
        if (!list || list.length === 0) {
            return errorResponse(res, 'No images found', 404)
        }

        successResponse(res, list);
    } catch (error) {
        errorResponse(res, `Error fetching images: ${error.message}`);
    }
});

/**
 * READ: Fetch a single images by ID
 */
imagesController.get('/images/:id([0-9]+)', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        let details = await imagesModel.findOne({
            where: { id: id }
        });

        if (!details) return errorResponse(res, "images not found", 404);

        successResponse(res, images);
    } catch (error) {
        errorResponse(res, `Error fetching images: ${error.message}`);
    }
});

/**
 * CREATE: Add a new user to the database
 */
imagesController.post('/images', async (req, res) => {
    try {
        let { filename, author, description } = req.body;
        const result = await imagesModel.create({ filename, author, description });
        successResponse(res, result, "images created successfully", 201);
    } catch (error) {
        errorResponse(res, `Error creating images:`, error);
    }
});

/**
 * UPDATE: Update an existing user
 */
imagesController.put('/images/:id([0-9]+)', async (req, res) => {
    try {
        const { id } = req.params;
        const { filename, author, description } = req.body;

        // Validate that all required fields are provided
        if (!filename || !author || !description) return errorResponse(res, "All fields are required", 400);

        const [updated] = await imagesModel.update({ filename, author, description }, { where: { id } });

        if (!updated) return errorResponse(res, `No images found with ID: ${id}`, 404);

        successResponse(res, { author, filename, description }, "images updated successfully");

    } catch (error) {
        errorResponse(res, `Error updating images: ${error.message}`);
    }
});

/**
 * DELETE: Remove a images by ID
 */
imagesController.delete('/images/:id([0-9]+)', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await imagesModel.destroy({ where: { id } });

        if (!deleted) return errorResponse(res, `No images found with ID: ${id}`, 404);

        successResponse(res, null, "images deleted successfully");
    } catch (error) {
        errorResponse(res, `Error deleting images: ${error.message}`);
    }
});