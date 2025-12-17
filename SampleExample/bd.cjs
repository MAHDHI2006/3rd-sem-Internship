require('dotenv').config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('Missing MONGODB_URI in environment. Please set it in a .env file');
}

const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("✅ MongoDB Atlas Connected");
    } catch (error) {
        console.error("❌ Connection Failed", error);
    }
}

module.exports = connectDB;
