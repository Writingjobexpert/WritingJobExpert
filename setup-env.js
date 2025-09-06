#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up environment files...\n');

// Create .env from example
if (!fs.existsSync('.env')) {
  fs.copyFileSync('env.example', '.env');
  console.log('✅ Created .env file');
} else {
  console.log('⚠️  .env file already exists');
}

// Create .env.local from example
if (!fs.existsSync('.env.local')) {
  fs.copyFileSync('env.local.example', '.env.local');
  console.log('✅ Created .env.local file');
} else {
  console.log('⚠️  .env.local file already exists');
}

// Create .env.production from example
if (!fs.existsSync('.env.production')) {
  fs.copyFileSync('env.production.example', '.env.production');
  console.log('✅ Created .env.production file');
} else {
  console.log('⚠️  .env.production file already exists');
}

console.log('\n📝 Next steps:');
console.log('1. Update .env files with your actual Supabase credentials');
console.log('2. Read ENVIRONMENT_SETUP.md for detailed instructions');
console.log('3. Run: npm run dev');
console.log('\n🔗 Supabase setup: https://supabase.com');
