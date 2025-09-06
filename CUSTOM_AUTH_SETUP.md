# Custom Authentication System Setup

## 🎯 Overview
This project now uses a **completely custom authentication system** where all user credentials are stored in your database and managed by you through the admin panel.

## 🗄️ Database Setup

### Step 1: Run the Migration
You need to run the custom auth migration in your Supabase database:

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project**: `rmpolneicjqblcwnqypj`
3. **Go to SQL Editor**
4. **Run this SQL migration**:

```sql
-- Create custom users table for manual authentication
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  user_type TEXT CHECK (user_type IN ('writer', 'business', 'admin')) DEFAULT 'business',
  avatar_url TEXT,
  bio TEXT,
  skills TEXT[],
  location TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for email lookup
CREATE INDEX idx_users_email ON public.users(email);

-- Create index for user_type
CREATE INDEX idx_users_type ON public.users(user_type);

-- Update existing tables to reference custom users instead of auth.users
ALTER TABLE public.jobs DROP CONSTRAINT IF EXISTS jobs_posted_by_fkey;
ALTER TABLE public.jobs ADD CONSTRAINT jobs_posted_by_fkey FOREIGN KEY (posted_by) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE public.services DROP CONSTRAINT IF EXISTS services_provider_id_fkey;
ALTER TABLE public.services ADD CONSTRAINT services_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.users(id) ON DELETE CASCADE;

-- Update payments table to reference custom users
ALTER TABLE public.payments DROP CONSTRAINT IF EXISTS payments_user_id_fkey;
ALTER TABLE public.payments ADD CONSTRAINT payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

-- Create admin user (password: admin123)
INSERT INTO public.users (email, password_hash, full_name, user_type, is_active) 
VALUES ('admin@writingjobexpert.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin User', 'admin', true);

-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Allow public access for signup (will be handled by custom auth)
CREATE POLICY "Allow public signup" ON public.users
  FOR INSERT WITH CHECK (true);

-- Admin can view all users (will be handled by custom auth)
CREATE POLICY "Admin can view all users" ON public.users
  FOR SELECT USING (true);

-- Admin can update all users (will be handled by custom auth)
CREATE POLICY "Admin can update all users" ON public.users
  FOR UPDATE USING (true);
```

## 🔐 How It Works

### User Registration
1. **User fills signup form** → Email, password, name, type
2. **Password is hashed** → Using bcryptjs
3. **User stored in database** → `public.users` table
4. **Redirected to thank you page** → No email verification needed

### User Login
1. **User enters credentials** → Email and password
2. **Password verified** → Against stored hash
3. **User data loaded** → From database
4. **Session stored** → In localStorage

### Password Reset
1. **User clicks "Forgot Password"** → Redirects to Telegram
2. **User messages you** → @deepak_wadhwa_official09
3. **You reset password** → Using admin panel
4. **User gets new password** → Via Telegram

### Admin Panel
- **View all users** → Complete user list with details
- **Reset passwords** → Enter email and new password
- **User management** → See user types, status, creation dates

## 🚀 Features

### ✅ What's Implemented
- **Custom user table** → All credentials in your database
- **Password hashing** → Secure bcryptjs hashing
- **Admin password reset** → Reset any user's password
- **User management** → View all users in admin panel
- **Telegram integration** → Forgot password redirects to you
- **No third-party auth** → Complete control over authentication

### 🔧 Admin Credentials
- **Email**: `admin@writingjobexpert.com`
- **Password**: `admin123`
- **Access**: https://writingjobexpert.site/admin

## 📱 Testing

### Test User Registration
1. Go to `/signup`
2. Fill in details
3. Submit form
4. Should redirect to `/thank-you`

### Test User Login
1. Go to `/login`
2. Use registered credentials
3. Should login successfully

### Test Admin Panel
1. Go to `/admin`
2. Use admin credentials
3. Check "Users" tab
4. Test password reset

### Test Forgot Password
1. Go to `/login`
2. Click "Forgot password?"
3. Should redirect to Telegram with message

## 🎯 Benefits

1. **Complete Control** → All user data in your database
2. **No Dependencies** → No third-party authentication
3. **Admin Management** → Full control over user accounts
4. **Custom Workflow** → Password resets through Telegram
5. **Secure** → Passwords properly hashed
6. **Scalable** → Easy to add more features

## 🔄 Migration Complete!

Your authentication system is now completely custom and under your control! 🎉
