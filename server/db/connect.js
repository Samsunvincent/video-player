const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const mongoose = require('mongoose');

async function mongoConnect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connection established");
    } catch (error) {
        console.log("Database connection error:", error);
    }
}

module.exports = mongoConnect;
