const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const SUPABASE_URL = "https://rmpolneicjqblcwnqypj.supabase.co";
const SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtcG9sbmVpY2pxYmxjd25xeXBqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzE0MDEwOCwiZXhwIjoyMDcyNzE2MTA4fQ.YourServiceKeyHere"; // You'll need to provide the service key

// Create Supabase client with service key for admin operations
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function setupCustomAuth() {
  try {
    console.log('🚀 Setting up custom authentication system...');
    
    // Read the migration file
    const migrationPath = path.join(__dirname, 'supabase', 'migrations', '20250106000000_custom_auth_system.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('📄 Running migration...');
    
    // Execute the migration
    const { data, error } = await supabase.rpc('exec_sql', { sql: migrationSQL });
    
    if (error) {
      console.error('❌ Migration failed:', error);
      return;
    }
    
    console.log('✅ Migration completed successfully!');
    console.log('🎉 Custom authentication system is ready!');
    console.log('');
    console.log('📋 Next steps:');
    console.log('1. Test user registration and login');
    console.log('2. Check admin panel for user management');
    console.log('3. Test password reset functionality');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

// Run the setup
setupCustomAuth();
