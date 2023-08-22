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
        { expiresIn: "20m" })
        res.status(200).json({ accessToken })
        
    } else {
        res.status(401).json({
            message: "Invalid email or password"
        })
    }

}


async function passwordChange(req, res, next) {
    try {
        const oldPassword = req.body.oldPassword
        const newPassword = req.body.newPassword
        const user = await User.findOne({_id: req.params.id})
        if (user) {
            const oldPasswordCheck = await bcrypt.compare(oldPassword, user.password)
            if (oldPasswordCheck === true) {
                passwordHashed = await bcrypt.hash(newPassword, 10)
                await User.updateOne({_id: req.params.id}, { password: passwordHashed})
            } else {
                res.status(404).json({
                    message: "Old password is invalid",
                })
            }
            
            res.status(200).json({
                message: "Password changed successfully"
            })
        }
        
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}


module.exports = {userLogin, passwordChange }