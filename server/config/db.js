import mongoose from 'mongoose';
import User from '../models/User.js';

const seedInitialUsers = async () => {
  try {
    const existingUser = await User.findOne({ username: 'officer1' });
    if (existingUser) {
      console.log('✓ Demo users already exist');
      return;
    }

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

    // Create users one by one to trigger pre-save hooks
    const createdUsers = [];
    for (const userData of demoUsers) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
    }
    console.log(`✓ Created ${createdUsers.length} demo users:`);
    createdUsers.forEach((user) => {
      console.log(`  - Username: ${user.username} | Password: ${demoUsers.find(u => u.username === user.username).password} | Role: ${user.role}`);
    });
  } catch (error) {
    console.error('Seeding error:', error.message);
  }
};

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/criminal-db";
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');

    // Seed initial users if database is empty
    await seedInitialUsers();
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};
