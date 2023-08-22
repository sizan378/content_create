// internal imports
const User = require('../../model/userSchema')

async function allUsersList(req, res, next) {
    try {
        const userList = await User.find()
        res.status(200).json(userList)

    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

module.exports = allUsersList