const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const filmRoutes = require("./routes/filmRoutes");
const peopleRoutes = require("./routes/peopleRoutes");
const speciesRoutes = require("./routes/speciesRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const locationRoutes = require("./routes/locationRoutes");
const authRoutes = require("./routes/authRoutes");

const {
    notFound,
    errorHandler
} = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

app.use(express.json());


// API ROUTES

app.use("/api/auth", authRoutes);

app.use("/api/films", filmRoutes);

app.use("/api/people", peopleRoutes);

app.use("/api/species", speciesRoutes);

app.use("/api/vehicles", vehicleRoutes);

app.use("/api/locations", locationRoutes);


// HOME ROUTE

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Studio Ghibli API is running!"
    });
});


// UNKNOWN ROUTE HANDLER

app.use(notFound);


// CENTRAL ERROR HANDLER

app.use(errorHandler);


// PORT

const PORT = process.env.PORT || 5000;


// CONNECT DATABASE AND START SERVER

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error(
            "MongoDB connection failed:",
            error.message
        );

        process.exit(1);
    }
};


startServer();