/**
 * Example Seeder - Sample Items
 * Run: npm run seed
 */

import Item from '../models/Item.js';

export const seed = async () => {
  console.log('Seeding sample items...');
  
  const sampleItems = [
    {
      name: 'Sample Item 1',
      description: 'This is a sample item for testing',
      status: 'active',
      tags: ['sample', 'test'],
      priority: 8,
    },
    {
      name: 'Sample Item 2',
      description: 'Another sample item',
      status: 'active',
      tags: ['sample', 'demo'],
      priority: 5,
    },
    {
      name: 'Inactive Item',
      description: 'This item is inactive',
      status: 'inactive',
      tags: ['test'],
      priority: 3,
    },
    {
      name: 'Pending Item',
      description: 'This item is pending',
      status: 'pending',
      tags: ['sample', 'pending'],
      priority: 7,
    },
  ];
  
  try {
    // Clear existing items (optional - remove in production)
    await Item.deleteMany({});
    console.log('🧹 Cleared existing items');
    
    // Insert sample items
    const result = await Item.insertMany(sampleItems);
    console.log(`✅ Inserted ${result.length} sample items`);
    
    return { success: true, count: result.length };
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
};

export default seed;
