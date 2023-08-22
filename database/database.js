const mongoose = require('mongoose');

const databaseConnection = async () =>{
    try {
        dbconnect = await mongoose.connect(process.env.DATABASE_CONNECT_LINK)
        console.log('Database connected',)
    } catch (error) {
        console.log(error)
    }
} 


module.exports = databaseConnection