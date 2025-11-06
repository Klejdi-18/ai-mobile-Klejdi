import { supabase } from '../lib/supabase';

// Example 1: Query data from a table
export async function getProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*');
  
  if (error) {
    console.error('Error fetching profiles:', error);
    return null;
  }
  return data;
}

// Example 2: Query with filters
export async function getCarsByCategory(category) {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .eq('category', category);
  
  if (error) {
    console.error('Error fetching cars:', error);
    return null;
  }
  return data;
}

// Example 3: Insert data
export async function createBooking(bookingData) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingData])
    .select();
  
  if (error) {
    console.error('Error creating booking:', error);
    return { success: false, error };
  }
  return { success: true, data };
}

// Example 4: Update data
export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select();
  
  if (error) {
    console.error('Error updating profile:', error);
    return null;
  }
  return data;
}

// Example 5: Delete data
export async function deleteBooking(bookingId) {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);
  
  if (error) {
    console.error('Error deleting booking:', error);
    return false;
  }
  return true;
}

// Example 6: Real-time subscription
export function subscribeToBookings(callback) {
  const subscription = supabase
    .channel('bookings')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'bookings' },
      (payload) => {
        console.log('Change received!', payload);
        callback(payload);
      }
    )
    .subscribe();
  
  return subscription;
}

// Example 7: Authentication (if using Supabase Auth)
export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) {
    console.error('Error signing up:', error);
    return { success: false, error };
  }
  return { success: true, user: data.user };
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    console.error('Error signing in:', error);
    return { success: false, error };
  }
  return { success: true, session: data.session };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Error signing out:', error);
    return false;
  }
  return true;
}

// Example 8: Storage (upload files)
export async function uploadFile(bucket, filePath, file) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);
  
  if (error) {
    console.error('Error uploading file:', error);
    return null;
  }
  return data;
}

// Example 9: Storage (get public URL)
export function getPublicUrl(bucket, filePath) {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);
  
  return data.publicUrl;
}
