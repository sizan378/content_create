// external imports
const express = require('express');
const router = express.Router();

// internal imports
const tokenValidate = require('../../utils/tokenValidate')
const picture_validator = require('../../middleware/user/profile_pic_validate')
const {RegisterValidator, userRegisterHandler} = require('../../middleware/user/userRegisterValidator')
const addUser = require('../../controller/user/registerController')
const {userLogin, passwordChange} = require("../../controller/user/loginController")
const allUsersList = require('../../controller/user/allUserList')


// user login and register routes
router.post("/register", picture_validator, RegisterValidator, userRegisterHandler, addUser)
router.post("/login", userLogin)

router.use(tokenValidate)
router.get('/', allUsersList)
router.put('/:id', passwordChange)

module.exports = router;