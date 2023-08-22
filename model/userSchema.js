const mongoose = require('mongoose');


const userRegistrationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        token: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const userRegister = mongoose.model("User", userRegistrationSchema);

module.exports = userRegister;