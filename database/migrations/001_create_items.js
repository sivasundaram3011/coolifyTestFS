/**
 * Example Migration - Create Items Collection
 * Run: npm run migrate
 */

import Item from '../models/Item.js';

export const up = async () => {
  console.log('Running migration: Create items collection indexes');
  
  try {
    // Create indexes
    await Item.createIndexes();
    console.log('✅ Indexes created successfully');
    
    return { success: true };
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
};

export const down = async () => {
  console.log('Rolling back migration: Drop items collection indexes');
  
  try {
    await Item.collection.dropIndexes();
    console.log('✅ Indexes dropped successfully');
    
    return { success: true };
  } catch (error) {
    console.error('❌ Rollback failed:', error);
    throw error;
  }
};

export default { up, down };
