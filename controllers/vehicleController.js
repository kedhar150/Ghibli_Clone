const Vehicle = require("../models/Vehicle");


// CREATE VEHICLE
const createVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.create(req.body);

        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: vehicle
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// GET ALL VEHICLES + SEARCH + FILTER + PAGINATION
const getAllVehicles = async (req, res) => {
    try {
        const {
            name,
            vehicleClass,
            minLength,
            maxLength,
            page = 1,
            limit = 5
        } = req.query;

        const filter = {};


        // SEARCH BY NAME
        if (name) {
            filter.name = {
                $regex: name,
                $options: "i"
            };
        }


        // FILTER BY VEHICLE CLASS
        if (vehicleClass) {
            filter.vehicleClass = {
                $regex: vehicleClass,
                $options: "i"
            };
        }


        // FILTER BY LENGTH
        if (minLength || maxLength) {
            filter.length = {};

            if (minLength) {
                filter.length.$gte = Number(minLength);
            }

            if (maxLength) {
                filter.length.$lte = Number(maxLength);
            }
        }


        // PAGINATION
        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        const skip = (pageNumber - 1) * limitNumber;


        const vehicles = await Vehicle.find(filter)
            .skip(skip)
            .limit(limitNumber);


        const totalVehicles = await Vehicle.countDocuments(filter);


        res.status(200).json({
            success: true,

            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(totalVehicles / limitNumber),
                totalVehicles: totalVehicles,
                limit: limitNumber
            },

            count: vehicles.length,

            data: vehicles
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET ONE VEHICLE
const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
        }

        res.status(200).json({
            success: true,
            data: vehicle
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// UPDATE VEHICLE
const updateVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
            data: vehicle
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// DELETE VEHICLE
const deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
};