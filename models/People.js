const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        gender: {
            type: String,
            required: true
        },

        age: {
            type: Number,
            min: 0
        },

        eyeColor: {
            type: String
        },

        hairColor: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("People", peopleSchema);