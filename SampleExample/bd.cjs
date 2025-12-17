require('dotenv').config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

let client;
let connected = false;
if (!uri) {
    console.warn('Missing MONGODB_URI in environment. Database connection will be skipped.');
} else {
    // Create client with short timeouts so failures are reported quickly
    client = new MongoClient(uri, {
        connectTimeoutMS: 5000,
        serverSelectionTimeoutMS: 5000,
    });
}

async function connectDB(options = { retries: 1, retryDelayMs: 2000 }) {
    if (!uri) {
        // No URI provided — do not attempt to connect. This allows the server to run without a DB.
        return;
    }

    const { retries, retryDelayMs } = options;
    let attempt = 0;
    while (attempt <= retries) {
        try {
            await client.connect();
            connected = true;
            console.log("✅ MongoDB Atlas Connected");
            return;
        } catch (error) {
            attempt += 1;
            console.error(`❌ Mongo connect attempt ${attempt} failed:`, error.message || error);
            if (attempt > retries) {
                console.error('❌ All MongoDB connect attempts failed. Continuing without DB.');
                return;
            }
            // wait before retrying
            await new Promise((res) => setTimeout(res, retryDelayMs));
        }
    }
}

function getClient() {
    return client;
}

function getDb(dbName) {
    if (!client || !connected) return null;
    try {
        return client.db(dbName);
    } catch (e) {
        return null;
    }
}

module.exports = {
    connectDB,
    getClient,
    getDb,
};
