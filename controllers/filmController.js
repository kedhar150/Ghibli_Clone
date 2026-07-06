const Film = require("../models/Film");


// CREATE FILM
const createFilm = async (req, res) => {
    try {
        const film = await Film.create(req.body);

        res.status(201).json({
            success: true,
            message: "Film created successfully",
            data: film
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// GET ALL FILMS + SEARCH + FILTER + PAGINATION
const getAllFilms = async (req, res) => {
    try {
        const {
            title,
            director,
            producer,
            releaseYear,
            minRating,
            maxRating,
            page = 1,
            limit = 5
        } = req.query;


        // CREATE EMPTY FILTER OBJECT
        const filter = {};


        // SEARCH BY TITLE
        if (title) {
            filter.title = {
                $regex: title,
                $options: "i"
            };
        }


        // FILTER BY DIRECTOR
        if (director) {
            filter.director = {
                $regex: director,
                $options: "i"
            };
        }


        // FILTER BY PRODUCER
        if (producer) {
            filter.producer = {
                $regex: producer,
                $options: "i"
            };
        }


        // FILTER BY RELEASE YEAR
        if (releaseYear) {
            filter.releaseYear = Number(releaseYear);
        }


        // FILTER BY RATING
        if (minRating || maxRating) {
            filter.rating = {};

            if (minRating) {
                filter.rating.$gte = Number(minRating);
            }

            if (maxRating) {
                filter.rating.$lte = Number(maxRating);
            }
        }


        // PAGINATION VALUES
        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        const skip = (pageNumber - 1) * limitNumber;


        // GET FILMS
        const films = await Film.find(filter)
            .skip(skip)
            .limit(limitNumber);


        // COUNT TOTAL MATCHING FILMS
        const totalFilms = await Film.countDocuments(filter);


        res.status(200).json({
            success: true,

            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(totalFilms / limitNumber),
                totalFilms: totalFilms,
                limit: limitNumber
            },

            count: films.length,

            data: films
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET ONE FILM BY ID
const getFilmById = async (req, res) => {
    try {
        const film = await Film.findById(req.params.id);

        if (!film) {
            return res.status(404).json({
                success: false,
                message: "Film not found"
            });
        }

        res.status(200).json({
            success: true,
            data: film
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// UPDATE FILM
const updateFilm = async (req, res) => {
    try {
        const film = await Film.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!film) {
            return res.status(404).json({
                success: false,
                message: "Film not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Film updated successfully",
            data: film
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// DELETE FILM
const deleteFilm = async (req, res) => {
    try {
        const film = await Film.findByIdAndDelete(req.params.id);

        if (!film) {
            return res.status(404).json({
                success: false,
                message: "Film not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Film deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createFilm,
    getAllFilms,
    getFilmById,
    updateFilm,
    deleteFilm
};