import { supabase } from '../lib/supabase';

export async function testSupabaseConnection() {
  try {
    // Test connection by getting the current session
    // This doesn't require any tables to exist
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Supabase connection test failed:', error);
      return { success: false, error };
    }
    
    console.log('✅ Supabase connection successful!');
    console.log('Connected to:', supabase.supabaseUrl);
    return { success: true, message: 'Supabase is connected and ready to use' };
  } catch (err) {
    console.error('Supabase connection error:', err);
    return { success: false, error: err };
  }
}

// Alternative test that queries a specific table
export async function testTableQuery(tableName) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
    
    if (error) {
      console.error(`Error querying ${tableName}:`, error);
      return { success: false, error };
    }
    
    console.log(`✅ Successfully queried ${tableName}`);
    return { success: true, data };
  } catch (err) {
    console.error(`Error querying ${tableName}:`, err);
    return { success: false, error: err };
  }
}
