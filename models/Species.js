const mongoose = require("mongoose");

const speciesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        classification: {
            type: String,
            required: true
        },
        eyeColors: {
            type: String
        },
        hairColors: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Species", speciesSchema);