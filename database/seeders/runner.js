/**
 * Seeder Runner
 * Usage: node seeders/runner.js
 */

import { connect, disconnect } from '../connection.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir } from 'fs/promises';

dotenv.config({ path: join(dirname(fileURLToPath(import.meta.url)), '../../.env') });

const runSeeders = async () => {
  try {
    // Connect to database
    await connect();
    
    // Get all seeder files
    const seedersDir = dirname(fileURLToPath(import.meta.url));
    const files = await readdir(seedersDir);
    const seederFiles = files
      .filter(f => f.endsWith('.js') && f !== 'runner.js')
      .sort();
    
    console.log('\n🌱 Running seeders...\n');
    
    for (const file of seederFiles) {
      const seeder = await import(join(seedersDir, file));
      console.log(`📝 ${file}:`);
      
      if (seeder.seed || seeder.default) {
        const seedFunction = seeder.seed || seeder.default;
        await seedFunction();
      } else {
        console.log('⚠️  No seed function found');
      }
      
      console.log('');
    }
    
    console.log('✅ All seeders completed\n');
  } catch (error) {
    console.error('❌ Seeder error:', error);
    process.exit(1);
  } finally {
    await disconnect();
  }
};

runSeeders();
