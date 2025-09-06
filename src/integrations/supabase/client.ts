// Supabase Configuration - No Database Connection
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Disabled database connection
const SUPABASE_URL = "https://disabled.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "disabled-key";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});