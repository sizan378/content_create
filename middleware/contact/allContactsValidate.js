// external imports
const { body, validationResult } = require("express-validator")

// internal imports
const UserContact = require("../../model/contactSchema")

const contactValidation = [
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
            try {
                const user = await UserContact.findOne({email: value});
                console.log("user_email", user)
                if (user) {
                    throw new Error("email is already in use")
                }
            } catch (err) {
                throw new Error(err.message)
            }
        }),

    body("phoneNumber")
        .isMobilePhone("bn-BD", {
            strictMode: true,
        })
        .withMessage("Mobile number must be bangladeshi number")
        .custom(async(value) => {
            try {
                const phoneNumber = await UserContact.findOne({phoneNumber: value});
                if (phoneNumber) {
                    throw new Error("Phone number is already exits");
                }
            } catch (err) {
                throw new Error(err.message)
            }
        })
]

const userContact = function (req, res, next) {
    const error = validationResult(req)
    const mappedError = error.mapped();

    if (Object.keys(mappedError).length === 0) {
        next()
    } else {
        res.status(500).json(mappedError)
    }
}


module.exports = { contactValidation, userContact }


