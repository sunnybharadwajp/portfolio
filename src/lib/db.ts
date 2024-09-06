import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri: string = dotenv.config().parsed?.MONGO_URI as string;

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
	throw new Error('Please add your Mongo URI to .env');
}

if (dotenv.config().parsed?.NODE_ENV === 'development') {
	// In development mode, use a global variable so the client is not recreated on every hot reload
	if (!(global as any)._mongoClientPromise) {
		client = new MongoClient(uri, options);
		(global as any)._mongoClientPromise = client.connect();
	}
	clientPromise = (global as any)._mongoClientPromise;
} else {
	// In production mode, it's best to not use a global variable
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

export default clientPromise;
