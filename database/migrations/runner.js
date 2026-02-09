/**
 * Migration Runner
 * Usage: node migrations/runner.js [up|down]
 */

import { connect, disconnect } from '../connection.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir } from 'fs/promises';

dotenv.config({ path: join(dirname(fileURLToPath(import.meta.url)), '../../.env') });

const runMigrations = async (direction = 'up') => {
  try {
    // Connect to database
    await connect();
    
    // Get all migration files
    const migrationsDir = dirname(fileURLToPath(import.meta.url));
    const files = await readdir(migrationsDir);
    const migrationFiles = files
      .filter(f => f.endsWith('.js') && f !== 'runner.js')
      .sort();
    
    console.log(`\n🔄 Running migrations (${direction})...\n`);
    
    for (const file of migrationFiles) {
      const migration = await import(join(migrationsDir, file));
      console.log(`📝 ${file}:`);
      
      if (migration[direction]) {
        await migration[direction]();
      } else {
        console.log(`⚠️  No ${direction} function found`);
      }
      
      console.log('');
    }
    
    console.log('✅ All migrations completed\n');
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  } finally {
    await disconnect();
  }
};

// Get direction from command line
const direction = process.argv[2] || 'up';

if (!['up', 'down'].includes(direction)) {
  console.error('Usage: node runner.js [up|down]');
  process.exit(1);
}

runMigrations(direction);
