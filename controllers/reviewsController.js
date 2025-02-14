import express from 'express';
import {reviewsModel} from '../models/reviewsModel.js';
import { errorResponse, successResponse } from '../utils/mainUtils.js';

export const reviewsController = express.Router();

/**
 * READ: Fetch all reviews from the database
 */
reviewsController.get('/reviews', async (req, res) => {
    try {
        const list = await reviewsModel.findAll();

        // Check if no users are found
        if (!list || list.length === 0) {
            return errorResponse(res, 'No reviews found', 404)
        }

        successResponse(res, list);
    } catch (error) {
        errorResponse(res, `Error fetching reviews: ${error.message}`);
    }
});

/**
 * READ: Fetch a single reviews by ID
 */
reviewsController.get('/reviews/:id([0-9]+)', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        let details = await reviewsModel.findOne({
            where: { id: id }
        });

        if (!details) return errorResponse(res, "reviews not found", 404);

        successResponse(res, reviews);
    } catch (error) {
        errorResponse(res, `Error fetching reviews: ${error.message}`);
    }
});

/**
 * CREATE: Add a new user to the database
 */
reviewsController.post('/reviews', async (req, res) => {
    try {
        let { subject, comment, num_star, date, estate_id, user_id, is_active } = req.body;
        const result = await reviewsModel.create({ subject, comment, num_star, date, estate_id, user_id, is_active  });
        successResponse(res, result, "reviews created successfully", 201);
    } catch (error) {
        errorResponse(res, `Error creating reviews:`, error);
    }
});

/**
 * UPDATE: Update an existing user
 */
reviewsController.put('/reviews/:id([0-9]+)', async (req, res) => {
    try {
        const { id } = req.params;
        const { subject, comment, num_star, date, estate_id, user_id, is_active  } = req.body;

        // Validate that all required fields are provided
        if (!subject || !comment || !num_star || !date || !estate_id || !user_id || !is_active) return errorResponse(res, "All fields are required", 400);

        const [updated] = await reviewsModel.update({ subject, comment, num_star, date, estate_id, user_id, is_active  }, { where: { id } });

        if (!updated) return errorResponse(res, `No reviews found with ID: ${id}`, 404);

        successResponse(res, { comment, subject, num_star, date, estate_id, user_id, is_active  }, "reviews updated successfully");

    } catch (error) {
        errorResponse(res, `Error updating reviews: ${error.message}`);
    }
});

/**
 * DELETE: Remove a reviews by ID
 */
reviewsController.delete('/reviews/:id([0-9]+)', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await reviewsModel.destroy({ where: { id } });

        if (!deleted) return errorResponse(res, `No reviews found with ID: ${id}`, 404);

        successResponse(res, null, "reviews deleted successfully");
    } catch (error) {
        errorResponse(res, `Error deleting reviews: ${error.message}`);
    }
});