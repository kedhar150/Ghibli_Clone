const People = require("../models/People");


// CREATE PERSON
const createPerson = async (req, res) => {
    try {
        const person = await People.create(req.body);

        res.status(201).json({
            success: true,
            message: "Person created successfully",
            data: person
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// GET ALL PEOPLE + SEARCH + FILTER + PAGINATION
const getAllPeople = async (req, res) => {
    try {
        const {
            name,
            gender,
            minAge,
            maxAge,
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


        // FILTER BY GENDER
        if (gender) {
            filter.gender = {
                $regex: `^${gender}$`,
                $options: "i"
            };
        }


        // FILTER BY AGE
        if (minAge || maxAge) {
            filter.age = {};

            if (minAge) {
                filter.age.$gte = Number(minAge);
            }

            if (maxAge) {
                filter.age.$lte = Number(maxAge);
            }
        }


        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        const skip = (pageNumber - 1) * limitNumber;


        const people = await People.find(filter)
            .skip(skip)
            .limit(limitNumber);


        const totalPeople = await People.countDocuments(filter);


        res.status(200).json({
            success: true,

            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(totalPeople / limitNumber),
                totalPeople: totalPeople,
                limit: limitNumber
            },

            count: people.length,

            data: people
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET ONE PERSON
const getPersonById = async (req, res) => {
    try {
        const person = await People.findById(req.params.id);

        if (!person) {
            return res.status(404).json({
                success: false,
                message: "Person not found"
            });
        }

        res.status(200).json({
            success: true,
            data: person
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// UPDATE PERSON
const updatePerson = async (req, res) => {
    try {
        const person = await People.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!person) {
            return res.status(404).json({
                success: false,
                message: "Person not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Person updated successfully",
            data: person
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// DELETE PERSON
const deletePerson = async (req, res) => {
    try {
        const person = await People.findByIdAndDelete(req.params.id);

        if (!person) {
            return res.status(404).json({
                success: false,
                message: "Person not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Person deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createPerson,
    getAllPeople,
    getPersonById,
    updatePerson,
    deletePerson
};