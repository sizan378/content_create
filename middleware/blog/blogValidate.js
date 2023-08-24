// external imports
const { body, validationResult } = require("express-validator")

const blogValidation = [
    body("title")
        .toLowerCase()
        .isLength({min:1})
        .withMessage("Title should not be empty")
        .trim(),

    body("body")
        .isLength({min:1})
        .withMessage("author should not be empty")
        .trim(),
]


const userBlog = function (req, res, next) {
    const error = validationResult(req)
    const mappedError = error.mapped();

    if (Object.keys(mappedError).length === 0) {
        next()
    } else {
        res.status(500).json(mappedError)
    }
}


module.exports = { blogValidation, userBlog }