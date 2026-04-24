import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from './models/UserModel.js';
import { hashPassword } from './utils/passwordUtils.js';

try {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) throw new Error('MONGO_URL is not defined');
  await mongoose.connect(mongoUrl);

  const adminEmail = 'admin@jobify.com';
  const newPassword = 'admin123';

  const adminUser = await User.findOne({ email: adminEmail });

  if (!adminUser) {
    console.log(`Admin user with email ${adminEmail} not found!`);
    process.exit(1);
  }

  const hashedPassword = await hashPassword(newPassword);

  adminUser.password = hashedPassword;
  await adminUser.save();

  console.log(`✅ Password successfully changed for ${adminEmail}`);
  console.log(`New password: ${newPassword}`);

  process.exit(0);
} catch (error) {
  console.log('❌ Error:', error);
  process.exit(1);
}
