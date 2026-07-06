const express = require("express");

const router = express.Router();

const {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
} = require("../controllers/vehicleController");

const protect = require("../middleware/authMiddleware");


router.get("/", getAllVehicles);

router.get("/:id", getVehicleById);

router.post("/", protect, createVehicle);

router.put("/:id", protect, updateVehicle);

router.delete("/:id", protect, deleteVehicle);


module.exports = router;