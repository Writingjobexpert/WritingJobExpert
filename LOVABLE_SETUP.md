# Lovable.dev Setup Guide

## Database Connection Setup

This project has been configured to work with Lovable.dev's Supabase integration.

### 1. Environment Variables

Create a `.env` file in the root directory with your Lovable.dev credentials:

```env
# Lovable.dev Environment Variables
VITE_SUPABASE_URL=https://your-lovable-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-lovable-anon-key

# Lovable.dev Project Configuration
VITE_LOVABLE_PROJECT_ID=your-project-id
VITE_LOVABLE_API_URL=https://api.lovable.dev
```

### 2. Getting Your Lovable.dev Credentials

1. **Go to your Lovable.dev project dashboard**
2. **Navigate to Settings > Database**
3. **Copy your Supabase URL and Anon Key**
4. **Paste them into your .env file**

### 3. Database Schema

The project expects the following tables in your Supabase database:

- `profiles` - User profiles
- `jobs` - Job listings
- `services` - Writing services
- `payments` - Payment records
- `admin_settings` - Admin configuration
- `faqs` - Frequently asked questions

### 4. Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 5. Testing Database Connection

Visit `/database-test` to verify your database connection is working.

### 6. Admin Access

- **Admin Panel**: `/admin`
- **Password**: `admin123`

## Migration from Old Database

If you're migrating from the old database:

1. **Export data** from your old Supabase project
2. **Import data** into your new Lovable.dev Supabase project
3. **Update environment variables** with new credentials
4. **Test all functionality** using the database test page

## Troubleshooting

- **Database not connecting**: Check your environment variables
- **Tables missing**: Run the migration scripts in `supabase/migrations/`
- **Admin not working**: Verify admin user exists in profiles table
