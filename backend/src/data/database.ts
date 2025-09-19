import { MongoClient, Db } from "mongodb";  // Manages connection to MongoDB

const url = process.env.MONGODB_URL || "mongodb://localhost:27017";  // Connection URL
const dbName = "blogapp";  // Database name
const client = new MongoClient(url);  // Allows connection with MongoDB
let db: Db;  // Variable for database connection

// FUNCTION: Connect to MongoDB
export const connectToDatabase = async (): Promise<void> => {
    try {
        // Connect client to server
        await client.connect();
        console.log("Successfully connected to MongoDB server.")

        // Set the database to use
        db = client.db(dbName);
    } catch (error) {
        console.error("Could not connect to MongoDB:", error);
        process.exit(1);
    }
};

// FUNCTION: Get database instance
export const getDatabase = (): Db => {
    if (!db) {
        throw new Error("Database not initialized. Call connectToDatabase first.");
    }

    return db;
}

// FUNCTION: Close database connection
export const closeDatabase = async (): Promise<void> => {
    await client.close();
}