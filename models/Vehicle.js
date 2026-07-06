const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        vehicleClass: {
            type: String,
            required: true
        },

        length: {
            type: Number,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);