const express = require("express");

const router = express.Router();

const {
    createLocation,
    getAllLocations,
    getLocationById,
    updateLocation,
    deleteLocation
} = require("../controllers/locationController");

const protect = require("../middleware/authMiddleware");


router.get("/", getAllLocations);

router.get("/:id", getLocationById);

router.post("/", protect, createLocation);

router.put("/:id", protect, updateLocation);

router.delete("/:id", protect, deleteLocation);


module.exports = router;