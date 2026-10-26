import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.DATABASE_URL);

const db_name = client.db(process.env.DB_NAME);

let db;

export async function connectToMongoDB() {
  try {
    await client.connect();
    db=client.db(db_name)
    console.log(`Connected to MongoDB database: ${process.env.DB_NAME}`);
    
    
    return db;
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err}`);
  }
}


export const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized! Call connectDB first.');
  }
  return db;
};





// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
}