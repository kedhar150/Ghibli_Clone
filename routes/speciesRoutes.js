const express = require("express");

const router = express.Router();

const {
    createSpecies,
    getAllSpecies,
    getSpeciesById,
    updateSpecies,
    deleteSpecies
} = require("../controllers/speciesController");

const protect = require("../middleware/authMiddleware");


router.get("/", getAllSpecies);

router.get("/:id", getSpeciesById);

router.post("/", protect, createSpecies);

router.put("/:id", protect, updateSpecies);

router.delete("/:id", protect, deleteSpecies);


module.exports = router;