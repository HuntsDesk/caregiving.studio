import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: localStorage
  },
  global: {
    headers: {
      'x-client-info': 'caregiving-studio'
    }
  },
  db: {
    schema: 'public'
  }
});

// Test connection and throw meaningful error if it fails
export async function testSupabaseConnection() {
  try {
    const { error } = await supabase.auth.getSession();
    if (error) throw error;
    
    // Test database connection
    const { error: dbError } = await supabase
      .from('rx_logs')
      .select('count')
      .limit(1)
      .single();
      
    if (dbError && dbError.code !== 'PGRST116') { // Ignore "no rows returned" error
      throw dbError;
    }
  } catch (err) {
    console.error('Supabase connection error:', err);
    throw new Error('Failed to connect to Supabase. Please check your configuration and ensure you are connected to the internet.');
  }
}