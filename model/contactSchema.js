const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",

    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
},
{
    timestamps: true,
}
)

const userContact = mongoose.model("UserContact", contactSchema)

module.exports = userContact