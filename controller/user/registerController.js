// external import
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// internal import
const User = require('../../model/userSchema')


async function addUser(req, res, next) {
    let newUser
    const passwordHashed = await bcrypt.hash(req.body.password, 10)

    console.log("requested_file", req.files)
    console.log("requested_object", req)

    // const jwt_secret_key = process.env.JWT_SECRET_KEY
    // const user_data = {
    //     userId: 
    // }


    if (req.files && req.files.length > 0) {
        newUser = new User({
            ...req.body,
            picture: req.files[0].filename,
            password: passwordHashed
        })
    } else {
        newUser = new User({
            ...req.body,
            password: passwordHashed
        })
    }

    // save user or send error
    try {
        const user = newUser.save()
        res.status(200).json({
            message: 'User saved successfully'
        })
        
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    msg: "unknown error",
                }
            }
        })
    }
}

module.exports = addUser