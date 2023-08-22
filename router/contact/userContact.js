// external imports
const express  = require('express');
const router = express.Router();

// internal imports
const { contactValidation, userContact } = require('../../middleware/contact/allContactsValidate');
const { allContacts, createContact, updateContact, deleteContact, singleContact } =  require("../../controller/contact/userContact")
const tokenValidate = require('../../utils/tokenValidate')

// all contacts routes
router.use(tokenValidate)
router.route("/").get(allContacts).post(contactValidation, userContact, createContact)
router.route("/:id").put(userContact, updateContact).delete(deleteContact).get(singleContact)


module.exports = router