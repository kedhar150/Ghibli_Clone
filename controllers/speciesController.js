const Species = require("../models/Species");

const createSpecies = async (req, res) => {
    try {
        const species = await Species.create(req.body);

        res.status(201).json({
            success: true,
            message: "Species created successfully",
            data: species
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


const getAllSpecies = async (req, res) => {
    try {
        const {
            name,
            classification,
            page = 1,
            limit = 5
        } = req.query;

        const filter = {};

        if (name) {
            filter.name = {
                $regex: name,
                $options: "i"
            };
        }

        if (classification) {
            filter.classification = {
                $regex: classification,
                $options: "i"
            };
        }

        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        const skip = (pageNumber - 1) * limitNumber;

        const species = await Species.find(filter)
            .skip(skip)
            .limit(limitNumber);

        const totalSpecies = await Species.countDocuments(filter);

        res.status(200).json({
            success: true,
            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(totalSpecies / limitNumber),
                totalSpecies: totalSpecies,
                limit: limitNumber
            },
            count: species.length,
            data: species
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const getSpeciesById = async (req, res) => {
    try {
        const species = await Species.findById(req.params.id);

        if (!species) {
            return res.status(404).json({
                success: false,
                message: "Species not found"
            });
        }

        res.status(200).json({
            success: true,
            data: species
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const updateSpecies = async (req, res) => {
    try {
        const species = await Species.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!species) {
            return res.status(404).json({
                success: false,
                message: "Species not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Species updated successfully",
            data: species
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


const deleteSpecies = async (req, res) => {
    try {
        const species = await Species.findByIdAndDelete(req.params.id);

        if (!species) {
            return res.status(404).json({
                success: false,
                message: "Species not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Species deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createSpecies,
    getAllSpecies,
    getSpeciesById,
    updateSpecies,
    deleteSpecies
};