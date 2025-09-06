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
