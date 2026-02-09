/**
 * User Seeder - Sample Users
 * Run: npm run seed
 */

import User from '../models/User.js';

export const seed = async () => {
  console.log('Seeding sample users...');
  
  const sampleUsers = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
      status: 'active',
      department: 'Engineering',
      phone: '+1 (555) 123-4567',
      lastActive: new Date(),
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'moderator',
      status: 'active',
      department: 'Marketing',
      phone: '+1 (555) 234-5678',
      lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      role: 'user',
      status: 'active',
      department: 'Sales',
      phone: '+1 (555) 345-6789',
      lastActive: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      name: 'Alice Williams',
      email: 'alice.williams@example.com',
      role: 'user',
      status: 'inactive',
      department: 'HR',
      phone: '+1 (555) 456-7890',
      lastActive: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    },
    {
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      role: 'user',
      status: 'pending',
      department: 'Finance',
      phone: '+1 (555) 567-8901',
      lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      name: 'Diana Prince',
      email: 'diana.prince@example.com',
      role: 'moderator',
      status: 'active',
      department: 'Operations',
      phone: '+1 (555) 678-9012',
      lastActive: new Date(),
    },
    {
      name: 'Ethan Hunt',
      email: 'ethan.hunt@example.com',
      role: 'user',
      status: 'active',
      department: 'Engineering',
      phone: '+1 (555) 789-0123',
      lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      name: 'Fiona Green',
      email: 'fiona.green@example.com',
      role: 'user',
      status: 'active',
      department: 'Design',
      phone: '+1 (555) 890-1234',
      lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
  ];
  
  try {
    // Clear existing users (optional - remove in production)
    await User.deleteMany({});
    console.log('🧹 Cleared existing users');
    
    // Insert sample users
    const result = await User.insertMany(sampleUsers);
    console.log(`✅ Inserted ${result.length} sample users`);
    
    return { success: true, count: result.length };
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
};

export default seed;