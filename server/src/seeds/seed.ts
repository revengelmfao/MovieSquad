import db from "../config/connection.js";
import cleanDB from "./cleanDb.js";

// Simple function to demonstrate usage of imports
const seedDatabase = async () => {
  try {
    // Example of using the db connection
    const dbStatus = db.readyState === 1 ? 'connected' : 'disconnected';
    console.log(`Database status: ${dbStatus}`);
    
    // Example of using cleanDB 
    // Uncomment and modify when needed:
    // await cleanDB('Question', 'questions');
    
    console.log('Database seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Uncomment to run seed function:
// seedDatabase();

export default seedDatabase;


