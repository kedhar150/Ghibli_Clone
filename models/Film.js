const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        director: {
            type: String,
            required: true
        },

        producer: {
            type: String,
            required: true
        },

        releaseYear: {
            type: Number,
            required: true
        },

        rating: {
            type: Number,
            min: 0,
            max: 10
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Film", filmSchema);