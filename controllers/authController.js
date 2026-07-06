const User = require("../models/User");
const jwt = require("jsonwebtoken");


// GENERATE JWT TOKEN
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
};


// REGISTER USER
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;


        // CHECK REQUIRED FIELDS
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide name, email and password"
            });
        }


        // CHECK IF USER ALREADY EXISTS
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }


        // CREATE USER
        const user = await User.create({
            name,
            email,
            password
        });


        // GENERATE TOKEN
        const token = generateToken(user._id);


        // SEND RESPONSE
        res.status(201).json({
            success: true,
            message: "User registered successfully",

            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                token: token
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// LOGIN USER
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;


        // CHECK REQUIRED FIELDS
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }


        // FIND USER
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }


        // CHECK PASSWORD
        const passwordMatches = await user.comparePassword(password);

        if (!passwordMatches) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }


        // GENERATE TOKEN
        const token = generateToken(user._id);


        // SEND RESPONSE
        res.status(200).json({
            success: true,
            message: "Login successful",

            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                token: token
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    registerUser,
    loginUser
};