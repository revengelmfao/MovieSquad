import mongoose from 'mongoose';

// Function to clean database collections
const cleanDB = async (modelName: string, collectionName: string) => {
  try {
    // This will clean/drop the specified collection
    await mongoose.connection.db.dropCollection(collectionName);
    console.log(`${modelName} collection cleaned!`);
  } catch (err) {
    // If collection doesn't exist, just return
    if ((err as any).code === 26) {
      console.log(`${modelName} collection doesn't exist, nothing to clean`);
      return;
    }
    throw err;
  }
};

export default cleanDB;

