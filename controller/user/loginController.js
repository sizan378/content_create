// external import
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// internal import
const User = require('../../model/userSchema')


async function userLogin(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error("email and password required");
    }

    const user = await User.findOne({ email: email})
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user:{
                username: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                id: user.id,
            },
        }, process.env.JWT_SECRET_KEY,
        { expiresIn: "1m" })
        res.status(200).json({ accessToken })
        
    } else {
        res.status(401).json({
            message: "Invalid email or password"
        })
    }

}


module.exports = userLogin