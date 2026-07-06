const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        climate: {
            type: String,
            required: true
        },

        terrain: {
            type: String,
            required: true
        },

        surfaceWater: {
            type: Number,
            min: 0,
            max: 100
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Location", locationSchema);