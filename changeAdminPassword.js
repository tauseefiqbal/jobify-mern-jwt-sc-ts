import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from './models/UserModel.js';
import { hashPassword } from './utils/passwordUtils.js';

try {
  await mongoose.connect(process.env.MONGO_URL);
  
  const adminEmail = 'admin@jobify.com';
  const newPassword = 'admin123';
  
  // Find admin user
  const adminUser = await User.findOne({ email: adminEmail });
  
  if (!adminUser) {
    console.log(`Admin user with email ${adminEmail} not found!`);
    process.exit(1);
  }
  
  // Hash the new password
  const hashedPassword = await hashPassword(newPassword);
  
  // Update the password
  adminUser.password = hashedPassword;
  await adminUser.save();
  
  console.log(`✅ Password successfully changed for ${adminEmail}`);
  console.log(`New password: ${newPassword}`);
  
  process.exit(0);
} catch (error) {
  console.log('❌ Error:', error);
  process.exit(1);
}
