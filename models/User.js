const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        }
    },
    {
        timestamps: true
    }
);


// HASH PASSWORD BEFORE SAVING USER
userSchema.pre("save", async function () {

    // DO NOT HASH AGAIN IF PASSWORD IS NOT CHANGED
    if (!this.isModified("password")) {
        return;
    }

    // HASH PASSWORD
    this.password = await bcrypt.hash(this.password, 10);
});


// CHECK LOGIN PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {

    return await bcrypt.compare(
        enteredPassword,
        this.password
    );
};


module.exports = mongoose.model("User", userSchema);