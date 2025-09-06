// Supabase Configuration
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Supabase Configuration with actual credentials
const SUPABASE_URL = "https://rmpolneicjqblcwnqypj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtcG9sbmVpY2pxYmxjd25xeXBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNDAxMDgsImV4cCI6MjA3MjcxNjEwOH0.Y7I8ye5XNTNz6Y2Ksp_jbZFirKB0seu84ZOoEwICocM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});