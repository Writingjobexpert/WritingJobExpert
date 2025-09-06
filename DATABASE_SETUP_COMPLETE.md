# 🚀 Supabase Database Setup - COMPLETE GUIDE

## ✅ Current Status
- **Supabase Connection**: ✅ WORKING
- **Project URL**: `https://rmpolneicjqblcwnqypj.supabase.co`
- **Anon Key**: ✅ CONFIGURED
- **Database Tables**: ❌ NEED TO CREATE

## 📋 Next Steps - Run These SQL Commands

### Step 1: Go to Supabase Dashboard
1. Open: https://supabase.com/dashboard
2. Select your project: `rmpolneicjqblcwnqypj`
3. Go to **SQL Editor**

### Step 2: Run Migration 1 (Core Tables)
Copy and paste this SQL:

```sql
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  email TEXT,
  user_type TEXT CHECK (user_type IN ('writer', 'business', 'admin')) DEFAULT 'business',
  avatar_url TEXT,
  bio TEXT,
  skills TEXT[],
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create jobs table
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  job_type TEXT CHECK (job_type IN ('full-time', 'part-time', 'contract', 'freelance')) DEFAULT 'freelance',
  salary_type TEXT CHECK (salary_type IN ('monthly', 'hourly', 'fixed')) DEFAULT 'fixed',
  salary_min INTEGER,
  salary_max INTEGER,
  category TEXT,
  posted_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT CHECK (status IN ('active', 'closed', 'draft')) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT,
  provider_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  status TEXT CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_type TEXT CHECK (payment_type IN ('job_posting', 'membership', 'service')) NOT NULL,
  plan_name TEXT,
  utr_number TEXT,
  status TEXT CHECK (status IN ('processing', 'success', 'failed')) DEFAULT 'processing',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin settings table
CREATE TABLE public.admin_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create FAQs table
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
```

### Step 3: Run Migration 2 (Policies)
```sql
-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for jobs
CREATE POLICY "Anyone can view active jobs" ON public.jobs FOR SELECT USING (status = 'active');
CREATE POLICY "Users can create jobs" ON public.jobs FOR INSERT WITH CHECK (auth.uid() = posted_by);
CREATE POLICY "Users can update their own jobs" ON public.jobs FOR UPDATE USING (auth.uid() = posted_by);

-- Create RLS policies for services
CREATE POLICY "Anyone can view active services" ON public.services FOR SELECT USING (status = 'active');
CREATE POLICY "Users can create services" ON public.services FOR INSERT WITH CHECK (auth.uid() = provider_id);
CREATE POLICY "Users can update their own services" ON public.services FOR UPDATE USING (auth.uid() = provider_id);

-- Create RLS policies for payments
CREATE POLICY "Users can view their own payments" ON public.payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own payments" ON public.payments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for admin settings (admin only)
CREATE POLICY "Admin can manage settings" ON public.admin_settings FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND user_type = 'admin'
  )
);

-- Create RLS policies for FAQs
CREATE POLICY "Anyone can view active FAQs" ON public.faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Admin can manage FAQs" ON public.faqs FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND user_type = 'admin'
  )
);
```

### Step 4: Run Migration 3 (Functions & Triggers)
```sql
-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_admin_settings_updated_at BEFORE UPDATE ON public.admin_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
```

### Step 5: Insert Default Data
```sql
-- Insert default admin settings
INSERT INTO public.admin_settings (setting_key, setting_value) VALUES
('pricing_plans', '{
  "lite": {"name": "Lite", "price": 199, "period": "month", "features": ["Basic job posting", "Email support", "Standard visibility"]},
  "pro": {"name": "Pro", "price": 499, "period": "month", "features": ["Unlimited job posting", "Priority support", "Enhanced visibility", "Analytics dashboard"]},
  "lifetime": {"name": "Lifetime", "price": 2999, "period": "lifetime", "features": ["All Pro features", "Lifetime access", "Priority placement", "Custom branding"]}
}'),
('job_posting_fee', '59'),
('upi_settings', '{"upi_id": "writingjobexpert@paytm", "qr_code_url": "https://writingjobexpert.site/qr-code.png"}');

-- Insert default FAQs
INSERT INTO public.faqs (question, answer, category, display_order) VALUES
('How do I post a job?', 'Simply click on the "Post a Job" button, fill in the job details, and make the payment of ₹59 using UPI.', 'jobs', 1),
('What payment methods do you accept?', 'We currently accept UPI payments only. You can pay using any UPI app like PhonePe, Google Pay, or Paytm.', 'payments', 2),
('How long does it take to approve my job posting?', 'Job postings are typically approved within 2-4 hours after payment verification.', 'jobs', 3),
('Can I edit my job posting after it''s published?', 'Yes, you can edit your job posting anytime from your dashboard.', 'jobs', 4),
('What is the refund policy?', 'We offer refunds within 24 hours of payment if your job posting is not approved due to policy violations.', 'payments', 5);
```

## ✅ After Running All SQL Commands

Your database will have:
- ✅ **profiles** table (user data)
- ✅ **jobs** table (job postings)
- ✅ **services** table (writing services)
- ✅ **payments** table (payment tracking)
- ✅ **admin_settings** table (dynamic content)
- ✅ **faqs** table (frequently asked questions)
- ✅ **Row Level Security** (RLS) policies
- ✅ **Automatic triggers** for user registration
- ✅ **Default data** for pricing and FAQs

## 🧪 Test Your Setup

Run this command to test:
```bash
node test-database.js
```

You should see: "✅ Database tables are ready!"

## 🚀 Your Application is Now Ready!

- **Database**: ✅ Connected and configured
- **Authentication**: ✅ Working
- **Admin Panel**: ✅ Functional
- **All Features**: ✅ Ready to use

**Your Writing Job Expert platform is now fully operational!** 🎉
