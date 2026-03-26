import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Job from './models/JobModel.js';
import User from './models/UserModel.js';
import { hashPassword } from './utils/passwordUtils.js';

const testUsers = [
  {
    name: 'Admin',
    email: 'admin@jobify.com',
    password: 'admin123',
    lastName: 'User',
    location: 'New York',
    role: 'admin',
  },
  {
    name: 'John',
    email: 'john@jobify.com',
    password: 'test1234',
    lastName: 'Smith',
    location: 'London',
    role: 'user',
  },
  {
    name: 'Jane',
    email: 'jane@jobify.com',
    password: 'test1234',
    lastName: 'Doe',
    location: 'San Francisco',
    role: 'user',
  },
  {
    name: 'Bob',
    email: 'bob@jobify.com',
    password: 'test1234',
    lastName: 'Johnson',
    location: 'Chicago',
    role: 'user',
  },
  {
    name: 'Sara',
    email: 'sara@jobify.com',
    password: 'test1234',
    lastName: 'Williams',
    location: 'Toronto',
    role: 'user',
  },
];

try {
  await mongoose.connect(process.env.MONGO_URL);

  // Clear existing jobs and test users
  await Job.deleteMany({});
  for (const u of testUsers) {
    await User.deleteOne({ email: u.email });
  }

  // Create test users with hashed passwords
  const createdUsers = [];
  for (const u of testUsers) {
    const hashedPassword = await hashPassword(u.password);
    const user = await User.create({ ...u, password: hashedPassword });
    createdUsers.push(user);
    console.log(`✅ Created user: ${u.name} (${u.email})`);
  }

  // Load mock data and distribute 20 jobs per user
  const jsonJobs = JSON.parse(
    await readFile(new URL('./mockData.json', import.meta.url))
  );

  const allJobs = [];
  const jobsPerUser = 20;

  createdUsers.forEach((user, index) => {
    const userJobs = jsonJobs
      .slice(index * jobsPerUser, (index + 1) * jobsPerUser)
      .map((job) => ({ ...job, createdBy: user._id }));
    allJobs.push(...userJobs);
  });

  await Job.create(allJobs);
  console.log(`\n✅ Created ${allJobs.length} jobs (${jobsPerUser} per user)`);
  console.log('\n--- Test Credentials ---');
  testUsers.forEach((u) => {
    console.log(`${u.role.toUpperCase().padEnd(6)} | ${u.email} | ${u.password}`);
  });

  process.exit(0);
} catch (error) {
  console.log('❌ Error:', error);
  process.exit(1);
}
