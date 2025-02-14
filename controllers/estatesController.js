import express from 'express';
import { errorResponse, successResponse } from '../utils/mainUtils.js';
import { citiesModel } from '../models/citiesModel.js'
import { estatesModel } from '../models/estatesModel.js'
import { estate_typesModel } from '../models/estate_typesModel.js'
import { energy_labelsModel } from '../models/energy_labelsModel.js'

export const estatesController = express.Router();

// Relations

estatesModel.belongsTo(citiesModel);
citiesModel.hasMany(estatesModel);
estatesModel.belongsTo(estate_typesModel);
estate_typesModel.hasMany(estatesModel);
estatesModel.belongsTo(energy_labelsModel);
energy_labelsModel.hasMany(estatesModel);

/**
 * READ: Fetch all estates from the database
 */
estatesController.get('/estates', async (req, res) => {
    try {
        const list = await estatesModel.findAll();

        // Check if no estates are found
        if (!list || list.length === 0) {
            return errorResponse(res, 'No estates found', 404)
        }

        successResponse(res, list);
    } catch (error) {
        errorResponse(res, `Error fetching estates: ${error.message}`);
    }
});

/**
 * READ: Fetch a single estates by ID
 */
estatesController.get('/estates/:id([0-9]+)', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        let details = await estatesModel.findOne({
            where: { id: id }
        });

        if (!details) return errorResponse(res, `Estate with id #${id} not found`, 404);

        successResponse(res, details); // Use 'details' instead of 'estates'
    } catch (error) {
        console.error(`Error fetching estate:`, error); // Log the error
        errorResponse(res, `Error fetching estate: ${error.message}`);
    }
});

/**
 * CREATE: Add a new user to the database
 */
estatesController.post('/estates', async (req, res) => {
    try {
        let { address, price, payout, gross, net, cost, num_rooms, num_floors, floor_space, ground_space, basement_space, year_construction, year_rebuilt, description, floor_plan, num_clicks, city_id, type_id, energy_label_id } = req.body;
        const result = await estatesModel.create({ address, price, payout, gross, net, cost, num_rooms, num_floors, floor_space, ground_space, basement_space, year_construction, year_rebuilt, description, floor_plan, num_clicks, city_id, type_id, energy_label_id });
        successResponse(res, result, "estates created successfully", 201);
    } catch (error) {
        errorResponse(res, `Error creating estates:`, error);
    }
});

/**
 * UPDATE: Update an existing user
 */
estatesController.put('/estates/:id([0-9]+)', async (req, res) => {
    try {
        const { id } = req.params;
        const { address, price, payout, gross, net, cost, num_rooms, num_floors, floor_space, ground_space, basement_space, year_construction, year_rebuilt, description, floor_plan, num_clicks, city_id, type_id, energy_label_id } = req.body;

        // Validate that all required fields are provided
        if (!address || !price || !payout || !gross || !net || !cost || !num_rooms || !num_floors || !floor_space || !ground_space || !basement_space || !year_construction || !year_rebuilt || !description || !floor_plan || !num_clicks || !city_id || !type_id || !energy_label_id) return errorResponse(res, "All fields are required", 400);

        const [updated] = await estatesModel.update({ address, price, payout, gross, net, cost, num_rooms, num_floors, floor_space, ground_space, basement_space, year_construction, year_rebuilt, description, floor_plan, num_clicks, city_id, type_id, energy_label_id }, { where: { id } });

        if (!updated) return errorResponse(res, `No estates found with ID: ${id}`, 404);

        successResponse(res, { address, price, payout, gross, net, cost, num_rooms, num_floors, floor_space, ground_space, basement_space, year_construction, year_rebuilt, description, floor_plan, num_clicks, city_id, type_id, energy_label_id }, "estates updated successfully");

    } catch (error) {
        errorResponse(res, `Error updating estates: ${error.message}`);
    }
});

/**
 * DELETE: Remove a estates by ID
 */
estatesController.delete('/estates/:id([0-9]+)', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await estatesModel.destroy({ where: { id } });

        if (!deleted) return errorResponse(res, `No estates found with ID: ${id}`, 404);

        successResponse(res, null, "estates deleted successfully");
    } catch (error) {
        errorResponse(res, `Error deleting estates: ${error.message}`);
    }
});