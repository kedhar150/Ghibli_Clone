const express = require("express");

const router = express.Router();

const {
    createFilm,
    getAllFilms,
    getFilmById,
    updateFilm,
    deleteFilm
} = require("../controllers/filmController");

const protect = require("../middleware/authMiddleware");


router.get("/", getAllFilms);

router.get("/:id", getFilmById);

router.post("/", protect, createFilm);

router.put("/:id", protect, updateFilm);

router.delete("/:id", protect, deleteFilm);


module.exports = router;