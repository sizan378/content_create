// external imports
const { body, validationResult} = require("express-validator")
const createError = require('http-errors')
const path = require("path")
const fs = require("fs")

// internal imports
const User = require("../../model/userSchema")


const RegisterValidator = [
    body("name")
        .isLength({min:1})
        .isLowercase()
        .withMessage("Name can't be empty")
        .isAlpha("en-US", {ignore: " -"})
        .withMessage("Name must be anything other than alphabet")
        .trim(),

    body("email")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .custom(async(value) => {
            console.log("email", value);
            try {
                const user = await User.findOne({email: value});
                console.log("user", user);
                if (user) {
                    throw createError("Email is already in use")
                }
            } catch (err) {
                throw createError(err.message)
            }
        }),

    body("phoneNumber")
        .isMobilePhone("bn-BD", {
            strictMode: true,
        })
        .withMessage("Mobile phone number must be valid bangladeshi number")
        .custom(async(value) => {
            console.log("phone_number", value)
            try {
                const user = await User.findOne({phoneNumber: value});
                if (user) {
                    throw createError("Phone number already exists")
                }
            } catch (err) {
                throw createError(err.message)
            }
        }),

    body("password")
]

const userRegisterHandler = function (req, res, next) {
    const errors = validationResult(req)
    const mappedError = errors.mapped();
    
    if (Object.keys(mappedError).length === 0) {
        next();
    } else {
        if (req.files.length > 0){
            const filename = req.files[0].filename;
            fs.unlink(
                path.join(__dirname, `../../public/profile_pic/picture/${filename}`),
                (err) => {
                    if (err) console.log(err);
                }
            )
        }
        res.status(500).json({errors: mappedError});
    }
}


module.exports = { RegisterValidator, userRegisterHandler }