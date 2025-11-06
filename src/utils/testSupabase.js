import { supabase } from '../lib/supabase';

export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('profiles').select('*');
    
    if (error) {
      console.error('Supabase error:', error);
      return { success: false, error };
    }
    
    console.log('Supabase connection successful!');
    console.log('Data:', data);
    return { success: true, data };
  } catch (err) {
    console.error('Connection error:', err);
    return { success: false, error: err };
  }
}
