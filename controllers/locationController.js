const Location = require("../models/Location");


// CREATE LOCATION
const createLocation = async (req, res) => {
    try {
        const location = await Location.create(req.body);

        res.status(201).json({
            success: true,
            message: "Location created successfully",
            data: location
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// GET ALL LOCATIONS + SEARCH + FILTER + PAGINATION
const getAllLocations = async (req, res) => {
    try {
        const {
            name,
            climate,
            terrain,
            minSurfaceWater,
            maxSurfaceWater,
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


        // FILTER BY CLIMATE
        if (climate) {
            filter.climate = {
                $regex: climate,
                $options: "i"
            };
        }


        // FILTER BY TERRAIN
        if (terrain) {
            filter.terrain = {
                $regex: terrain,
                $options: "i"
            };
        }


        // FILTER BY SURFACE WATER
        if (minSurfaceWater || maxSurfaceWater) {
            filter.surfaceWater = {};

            if (minSurfaceWater) {
                filter.surfaceWater.$gte = Number(minSurfaceWater);
            }

            if (maxSurfaceWater) {
                filter.surfaceWater.$lte = Number(maxSurfaceWater);
            }
        }


        // PAGINATION
        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        const skip = (pageNumber - 1) * limitNumber;


        const locations = await Location.find(filter)
            .skip(skip)
            .limit(limitNumber);


        const totalLocations = await Location.countDocuments(filter);


        res.status(200).json({
            success: true,

            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(totalLocations / limitNumber),
                totalLocations: totalLocations,
                limit: limitNumber
            },

            count: locations.length,

            data: locations
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET ONE LOCATION
const getLocationById = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);

        if (!location) {
            return res.status(404).json({
                success: false,
                message: "Location not found"
            });
        }

        res.status(200).json({
            success: true,
            data: location
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// UPDATE LOCATION
const updateLocation = async (req, res) => {
    try {
        const location = await Location.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!location) {
            return res.status(404).json({
                success: false,
                message: "Location not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Location updated successfully",
            data: location
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// DELETE LOCATION
const deleteLocation = async (req, res) => {
    try {
        const location = await Location.findByIdAndDelete(req.params.id);

        if (!location) {
            return res.status(404).json({
                success: false,
                message: "Location not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Location deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createLocation,
    getAllLocations,
    getLocationById,
    updateLocation,
    deleteLocation
};