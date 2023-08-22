// external imports
const express = require('express');
const router = express.Router();
const picture_validator = require('../../middleware/user/profile_pic_validate')
const {RegisterValidator, userRegisterHandler} = require('../../middleware/user/userRegisterValidator')
const addUser = require('../../controller/user/registerController')
const userLogin = require("../../controller/user/loginController")



// user login and register routes
router.get('/', (req, res) => {
    res.json({
        response: "response from login register router",
    })
})
router.post("/register", picture_validator, RegisterValidator, userRegisterHandler, addUser)

router.post("/login", userLogin)

module.exports = router;