import { MongoClient } from 'mongodb';

const CONNECTION_STRING = `mongodb+srv://${
      process.env.mongodb.username}:${
      process.env.mongodb.password}@${
      process.env.mongodb.clustername}.${
      process.env.mongodb.domain}/${
      process.env.mongodb.database}?retryWrites=true&w=majority`;

const connectDatabase = async () => {
  try {
    const DB_CLIENT = new MongoClient(CONNECTION_STRING,{ useNewUrlParser: true, useUnifiedTopology: true });
    return await DB_CLIENT.connect();
  } catch (error) {
      console.log(error);
      throw error;
  }
}

export async function insertDocument(collection, document) {
  let client;
  try {
    client = await connectDatabase();
    const result = await client.db(process.env.mongodb_database).collection(collection).insertOne(document);
    return result;
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
}

export async function getAllDocuments(collection, sort, filter = {}) {
  let client;
  try {
    client = await connectDatabase();
    const documents =  await client.db(process.env.mongodb_database).collection(collection).find(filter).sort(sort).toArray();
    return documents;
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
}