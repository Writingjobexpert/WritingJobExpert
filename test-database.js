import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rmpolneicjqblcwnqypj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtcG9sbmVpY2pxYmxjd25xeXBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNDAxMDgsImV4cCI6MjA3MjcxNjEwOH0.Y7I8ye5XNTNz6Y2Ksp_jbZFirKB0seu84ZOoEwICocM';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n');

  try {
    // Test basic connection
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.log('❌ Connection failed:', error.message);
      return;
    }

    console.log('✅ Supabase connection successful!');
    console.log('📊 Project URL:', SUPABASE_URL);
    console.log('🔑 Anon key configured');
    
    // Test if we can access the database
    const { data: testData, error: testError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);

    if (testError) {
      console.log('⚠️  Database tables not yet created');
      console.log('📋 You need to run the migrations manually');
    } else {
      console.log('✅ Database tables are ready!');
    }

  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
}

testConnection();
