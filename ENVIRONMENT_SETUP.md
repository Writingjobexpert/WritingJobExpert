# Environment Setup Guide

## 📋 Required Environment Files

You need to create the following environment files with your actual Supabase credentials:

### 1. `.env` (Development)
```bash
# Copy env.example to .env
cp env.example .env
```

### 2. `.env.local` (Local Development)
```bash
# Copy env.local.example to .env.local
cp env.local.example .env.local
```

### 3. `.env.production` (Production)
```bash
# Copy env.production.example to .env.production
cp env.production.example .env.production
```

## 🔧 Supabase Setup

### Step 1: Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up/Login to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `writing-job-expert`
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your users (Asia Pacific for India)
6. Click "Create new project"

### Step 2: Get Your Credentials
1. Go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (starts with `https://`)
   - **anon/public key** (starts with `eyJ`)

### Step 3: Update Environment Files
Replace the placeholder values in your `.env` files:

```env
# .env
VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

## 🗄️ Database Setup

### Step 1: Run Migrations
The project includes migration files in `supabase/migrations/`. Run them in order:

1. `20250905180248_5259542b-a1fe-4e53-8f59-73522cd6dbb0.sql`
2. `20250905180313_7d4083e1-6853-4bef-8ed9-a78bc8be4ea2.sql`
3. `20250905180313_7d4083e1-6853-4bef-8ed9-a78bc8be4ea2.sql`

### Step 2: Enable Row Level Security (RLS)
1. Go to **Authentication** → **Policies**
2. Enable RLS for all tables
3. Create policies for user access

## 🚀 Deployment

### Vercel
1. Add environment variables in Vercel dashboard
2. Use values from `.env.production`

### Netlify
1. Add environment variables in Netlify dashboard
2. Use values from `.env.production`

## 🔒 Security Notes

- **Never commit** `.env`, `.env.local`, or `.env.production` files
- **Use different credentials** for development and production
- **Rotate keys** regularly
- **Monitor usage** in Supabase dashboard

## 📞 Support

If you need help with Supabase setup:
- **Documentation**: [https://supabase.com/docs](https://supabase.com/docs)
- **Community**: [https://github.com/supabase/supabase/discussions](https://github.com/supabase/supabase/discussions)
- **Support**: [https://supabase.com/support](https://supabase.com/support)
