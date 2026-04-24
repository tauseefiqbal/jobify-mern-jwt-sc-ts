import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Job from './models/JobModel.js';
import User from './models/UserModel.js';
import { hashPassword } from './utils/passwordUtils.js';

interface TestUser {
  name: string;
  email: string;
  password: string;
  lastName: string;
  location: string;
  role: 'admin' | 'user';
}

const testUsers: TestUser[] = [
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
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) throw new Error('MONGO_URL is not defined');
  await mongoose.connect(mongoUrl);

  await Job.deleteMany({});
  for (const u of testUsers) {
    await User.deleteOne({ email: u.email });
  }

  const createdUsers: Array<{ _id: mongoose.Types.ObjectId }> = [];
  for (const u of testUsers) {
    const hashedPassword = await hashPassword(u.password);
    const user = await User.create({ ...u, password: hashedPassword });
    createdUsers.push(user as unknown as { _id: mongoose.Types.ObjectId });
    console.log(`✅ Created user: ${u.name} (${u.email})`);
  }

  const jsonJobs = JSON.parse(
    await readFile(new URL('./mockData.json', import.meta.url), 'utf-8')
  ) as Array<Record<string, unknown>>;

  const allJobs: Array<Record<string, unknown>> = [];
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
