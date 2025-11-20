# Supabase Integration Guide

## ✅ Status
Supabase is successfully connected to your application! The client is configured and ready to use.

## 🧪 Testing Your Connection

To verify your Supabase connection is working, you can run the test utility from your browser console:

```javascript
// Import and run the connection test
import { testSupabaseConnection } from './utils/testSupabase';
const result = await testSupabaseConnection();
console.log(result);
```

Or test a specific table once you've created it:

```javascript
import { testTableQuery } from './utils/testSupabase';
const result = await testTableQuery('your_table_name');
console.log(result);
```

These utilities are available for development and testing purposes. The connection test doesn't require any tables to exist, making it safe to run immediately after setup.

## 📁 Configuration Files

### 1. Supabase Client (`src/lib/supabase.js`)
This is your main Supabase client that you'll import throughout your application:

```javascript
import { supabase } from './lib/supabase';
```

### 2. Environment Variables
Your Supabase credentials are securely stored in Replit Secrets:
- `SUPABASE_URL` - Your project's API URL
- `SUPABASE_KEY` - Your project's anon/public key

These are automatically injected into your app through Vite's `define` configuration.

## 🚀 Usage Examples

### Basic Query
```javascript
import { supabase } from './lib/supabase';

const { data, error } = await supabase
  .from('your_table')
  .select('*');

if (error) {
  console.error('Error:', error);
} else {
  console.log('Data:', data);
}
```

### Insert Data
```javascript
const { data, error } = await supabase
  .from('bookings')
  .insert([
    { car_id: 1, user_email: 'user@example.com', start_date: '2024-01-01' }
  ]);
```

### Update Data
```javascript
const { data, error } = await supabase
  .from('bookings')
  .update({ status: 'confirmed' })
  .eq('id', bookingId);
```

### Delete Data
```javascript
const { error } = await supabase
  .from('bookings')
  .delete()
  .eq('id', bookingId);
```

### Filters
```javascript
// Equal to
.eq('category', 'Luxury')

// Greater than
.gt('price', 100)

// Less than
.lt('price', 200)

// Like (pattern matching)
.like('name', '%Tesla%')

// In array
.in('category', ['Luxury', 'Sports'])

// Order by
.order('price', { ascending: true })

// Limit
.limit(10)
```

## 📊 Setting Up Your Database

To use Supabase with your car rental app, you'll need to create tables. Here's an example schema:

### 1. Cars Table (if you want to store cars in Supabase)
```sql
create table cars (
  id bigint primary key generated always as identity,
  name text not null,
  category text not null,
  price numeric not null,
  image text,
  seats integer,
  transmission text,
  features jsonb,
  description text,
  created_at timestamptz default now()
);
```

### 2. Bookings Table
```sql
create table bookings (
  id bigint primary key generated always as identity,
  car_id bigint references cars(id),
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  pickup_date date not null,
  return_date date not null,
  pickup_location text not null,
  status text default 'pending',
  created_at timestamptz default now()
);
```

### 3. Profiles Table (for user data)
```sql
create table profiles (
  id uuid primary key references auth.users(id),
  email text,
  full_name text,
  phone text,
  created_at timestamptz default now()
);
```

## 🔧 Integration with Your App

### Example: Save Bookings to Supabase

Update `src/components/BookingForm.jsx`:

```javascript
import { supabase } from '../lib/supabase';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Save to Supabase
  const { data, error } = await supabase
    .from('bookings')
    .insert([
      {
        car_id: car.id,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        pickup_date: formData.pickupDate,
        return_date: formData.returnDate,
        pickup_location: formData.location
      }
    ]);
  
  if (error) {
    console.error('Error saving booking:', error);
    alert('Failed to save booking. Please try again.');
  } else {
    setSubmitted(true);
    console.log('Booking saved:', data);
  }
};
```

### Example: Load Cars from Supabase

Update `src/components/CarList.jsx`:

```javascript
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

function CarList({ onSelectCar }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadCars();
  }, []);
  
  async function loadCars() {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error loading cars:', error);
    } else {
      setCars(data);
    }
    setLoading(false);
  }
  
  if (loading) return <div>Loading cars...</div>;
  
  // Rest of your component...
}
```

## 🔐 Authentication (Optional)

If you want to add user authentication:

```javascript
import { supabase } from './lib/supabase';

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure-password'
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'secure-password'
});

// Sign out
await supabase.auth.signOut();

// Get current user
const { data: { user } } = await supabase.auth.getUser();
```

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Database Functions](https://supabase.com/docs/guides/database/functions)
- [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)
- [Storage](https://supabase.com/docs/guides/storage)

## 🐛 Troubleshooting

### Table Not Found Error
If you see "Could not find the table...", create the table in your Supabase dashboard:
1. Go to your Supabase project
2. Click on "Table Editor" in the sidebar
3. Create your table with the appropriate columns

### Create the `tasks` table (for the Tasks page)
If you're seeing the error from the Tasks page ("Could not find the table 'public.tasks' in the schema cache"), you can create the table quickly by running the SQL included in this repository.

Steps
1. Open your Supabase project in the web dashboard.
2. Open the SQL Editor (left sidebar -> SQL Editor).
3. Copy the contents of `sql/create_tasks_table.sql` from this repository and paste it into the SQL editor, or upload/run that file.
4. Execute the query. You should see a success message and the new table under the Table Editor.

Notes
- The SQL in `sql/create_tasks_table.sql` creates a `public.tasks` table and (for development only) enables simple RLS policies that allow the anon role to SELECT/INSERT/UPDATE. Remove or harden these policies for production.
- Make sure your app's `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY` point to the same Supabase project where you ran the SQL.
- After running the SQL, restart your dev server and refresh the app. Adding tasks from the UI should now persist and show up in the list.

### Connection Issues
If you're having connection issues:
1. Verify your `SUPABASE_URL` and `SUPABASE_KEY` in Replit Secrets
2. Check that the values match your Supabase project settings
3. Ensure your Supabase project is active (not paused)

### CORS Errors
The anon/public key should work from any domain. If you need to restrict access, configure it in your Supabase project settings under Authentication > URL Configuration.
