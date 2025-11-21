import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from root directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB for seeding...');

    // Delete existing users to start fresh
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create demo users
    const demoUsers = [
      {
        username: 'officer1',
        password: 'password123',
        fullName: 'Officer John Smith',
        role: 'officer',
      },
      {
        username: 'admin1',
        password: 'admin123',
        fullName: 'Admin Jane Doe',
        role: 'admin',
      },
      {
        username: 'officer2',
        password: 'password456',
        fullName: 'Officer Michael Johnson',
        role: 'officer',
      },
    ];

    // Insert users one by one to trigger pre-save hooks
    const createdUsers = [];
    for (const userData of demoUsers) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
    }
    console.log(`✓ Successfully created ${createdUsers.length} demo users:`);
    createdUsers.forEach((user) => {
      console.log(`  - ${user.username} (${user.fullName}) - Role: ${user.role}`);
    });

    await mongoose.connection.close();
    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
