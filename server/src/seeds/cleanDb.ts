import mongoose from 'mongoose';

export const cleanDB = async () => {
  try {
    if (mongoose.connection.db) {
      const collections = await mongoose.connection.db.collections();
      
      for (let collection of collections) {
        await collection.deleteMany({});
      }
      console.log('Database cleaned');
    }
  } catch (err) {
    console.error('Error cleaning database:', err);
    process.exit(1);
  }
};

