/**
 * Migration - Create Users Collection
 * Run: npm run migrate
 */

import User from '../models/User.js';

export const up = async () => {
  console.log('Running migration: Create users collection indexes');
  
  try {
    // Create indexes
    await User.createIndexes();
    console.log('✅ User indexes created successfully');
    
    return { success: true };
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
};

export const down = async () => {
  console.log('Rolling back migration: Drop users collection indexes');
  
  try {
    await User.collection.dropIndexes();
    console.log('✅ User indexes dropped successfully');
    
    return { success: true };
  } catch (error) {
    console.error('❌ Rollback failed:', error);
    throw error;
  }
};

export default { up, down };