require('dotenv').config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

let client;
if (!uri) {
    console.warn('Missing MONGODB_URI in environment. Database connection will be skipped.');
} else {
    client = new MongoClient(uri);
}

async function connectDB() {
    if (!uri) {
        // No URI provided — do not attempt to connect. This allows the server to run without a DB.
        return;
    }

    try {
        await client.connect();
        console.log("✅ MongoDB Atlas Connected");
    } catch (error) {
        console.error("❌ Connection Failed", error);
    }
}

module.exports = connectDB;
