// external imports
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

// internal imports
const { notFoundHandler, errorHandler } = require('./middleware/default_error/error_handler')
const userRegister = require('./router/users/userRegister')
const userContact = require('./router/contact/userContact')
const userBlog = require('./router/blog/userBlog')
const dbConnect = require("./database/database")


const app = express();
dotenv.config();

dbConnect()

port = process.env.PORT

// request params
app.use(express.json());

// set static folder
app.use(express.static(path.join(__dirname, 'public')))


// route setup
app.use("/api/v1/user", userRegister)
app.use("/api/v1/contact", userContact)
app.use("/api/v1/blog", userBlog)

// 404 not found setup
// app.use(notFoundHandler);


// error handler
app.use(errorHandler);



app.listen(port, () =>{
    console.log(`listening on ${port}`);
})