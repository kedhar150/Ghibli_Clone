const express = require("express");

const router = express.Router();

const {
    createPerson,
    getAllPeople,
    getPersonById,
    updatePerson,
    deletePerson
} = require("../controllers/peopleController");

const protect = require("../middleware/authMiddleware");


router.get("/", getAllPeople);

router.get("/:id", getPersonById);

router.post("/", protect, createPerson);

router.put("/:id", protect, updatePerson);

router.delete("/:id", protect, deletePerson);


module.exports = router;