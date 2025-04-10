
import connectDB from '../config/connection.js';
import { User } from '../models/index.js';

const checkUsers = async () => {
  try {
    await connectDB();
    
    console.log('Checking for users in database...');
    const users = await User.find();
    
    if (users.length === 0) {
      console.log('No users found in database. Run your seed script.');
    } else {
      console.log(`Found ${users.length} users:`);
      users.forEach(user => {
        console.log(`- ${user.username} (${user.email})`);
      });
    }
    
    process.exit(0);
  } catch (err) {
    console.error('Error checking users:', err);
    process.exit(1);
  }
};

checkUsers();
