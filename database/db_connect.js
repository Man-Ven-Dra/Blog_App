const mongoose = require('mongoose');
require("dotenv").config();

const connectDB = () => {
    console.log(process.env.DATABASE_URL)
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Database Connection Successful'))
    .catch((err) => {
        console.log('Database Connection Failed');
        console.log(err);
        process.exit(1);
    })
}

module.exports = connectDB;