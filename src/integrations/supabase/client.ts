// Lovable.dev Supabase Configuration
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Lovable.dev Supabase configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://your-lovable-project.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "your-lovable-anon-key";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});