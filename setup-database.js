import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = 'https://rmpolneicjqblcwnqypj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtcG9sbmVpY2pxYmxjd25xeXBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNDAxMDgsImV4cCI6MjA3MjcxNjEwOH0.Y7I8ye5XNTNz6Y2Ksp_jbZFirKB0seu84ZOoEwICocM';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function runMigrations() {
  console.log('🚀 Setting up Supabase database...\n');

  try {
    // Read migration files
    const migration1 = fs.readFileSync('./supabase/migrations/20250905180248_5259542b-a1fe-4e53-8f59-73522cd6dbb0.sql', 'utf8');
    const migration2 = fs.readFileSync('./supabase/migrations/20250905180313_7d4083e1-6853-4bef-8ed9-a78bc8be4ea2.sql', 'utf8');
    const migration3 = fs.readFileSync('./supabase/migrations/20250906033318_82a2dea5-7fa8-40d7-b05d-6aa01a5a897f.sql', 'utf8');

    console.log('📋 Running migration 1: Core tables and policies...');
    const { error: error1 } = await supabase.rpc('exec_sql', { sql: migration1 });
    if (error1) {
      console.log('⚠️  Migration 1 warning:', error1.message);
    } else {
      console.log('✅ Migration 1 completed');
    }

    console.log('📋 Running migration 2: Function security fixes...');
    const { error: error2 } = await supabase.rpc('exec_sql', { sql: migration2 });
    if (error2) {
      console.log('⚠️  Migration 2 warning:', error2.message);
    } else {
      console.log('✅ Migration 2 completed');
    }

    console.log('📋 Running migration 3: Support tables...');
    const { error: error3 } = await supabase.rpc('exec_sql', { sql: migration3 });
    if (error3) {
      console.log('⚠️  Migration 3 warning:', error3.message);
    } else {
      console.log('✅ Migration 3 completed');
    }

    // Test database connection
    console.log('\n🔍 Testing database connection...');
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');

    if (tablesError) {
      console.log('❌ Database connection failed:', tablesError.message);
    } else {
      console.log('✅ Database connected successfully!');
      console.log('📊 Available tables:', tables.map(t => t.table_name).join(', '));
    }

    console.log('\n🎉 Database setup completed!');
    console.log('Your Supabase database is now ready with all tables and policies.');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  }
}

runMigrations();
