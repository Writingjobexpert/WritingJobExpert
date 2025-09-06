# Writing Job Expert - Production Setup Guide

## 🌐 Domain: writingjobexpert.site

### 1. Domain Configuration
- **Primary Domain**: https://writingjobexpert.site
- **SSL Certificate**: Required for HTTPS
- **DNS Settings**: Point to hosting provider
- **CDN**: Recommended for performance

### 2. Environment Variables for Production

Create `.env.production` file:
```env
# Production Environment
NODE_ENV=production
VITE_APP_URL=https://writingjobexpert.site
VITE_APP_NAME=Writing Job Expert

# Supabase Production (Replace with your credentials)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key

# Payment Gateway (UPI)
VITE_UPI_ID=writingjobexpert@paytm
VITE_UPI_QR_URL=https://writingjobexpert.site/qr-code.png

# Analytics
VITE_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
```

### 3. Database Setup

1. **Create Supabase Project**:
   - Go to https://supabase.com
   - Create new project
   - Choose region closest to India
   - Get URL and API key

2. **Run Migrations**:
   ```bash
   # Install Supabase CLI
   npm install -g supabase

   # Login to Supabase
   supabase login

   # Link to your project
   supabase link --project-ref your-project-ref

   # Run migrations
   supabase db push
   ```

3. **Set up RLS Policies**:
   - Enable Row Level Security
   - Configure user permissions
   - Set up admin access

### 4. Hosting Options

#### Option A: Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Configure domain
vercel domains add writingjobexpert.site
```

#### Option B: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod

# Configure domain
netlify sites:update --name writingjobexpert
```

#### Option C: Custom Server
- **Requirements**: Node.js server
- **SSL**: Let's Encrypt certificate
- **CDN**: Cloudflare recommended

### 5. Performance Optimization

1. **Image Optimization**:
   - Use WebP format
   - Implement lazy loading
   - Add proper alt tags

2. **Code Splitting**:
   - Lazy load components
   - Optimize bundle size
   - Use dynamic imports

3. **Caching**:
   - Set proper cache headers
   - Use CDN caching
   - Implement service worker

### 6. SEO Configuration

1. **Sitemap**: Generate at `/sitemap.xml`
2. **Robots.txt**: Create at `/robots.txt`
3. **Meta Tags**: Already configured
4. **Schema Markup**: Add structured data

### 7. Security Setup

1. **HTTPS**: Required for production
2. **CORS**: Configure properly
3. **Rate Limiting**: Implement API limits
4. **Input Validation**: Sanitize all inputs

### 8. Monitoring & Analytics

1. **Error Tracking**: Sentry or similar
2. **Performance**: Google PageSpeed Insights
3. **Analytics**: Google Analytics 4
4. **Uptime**: UptimeRobot or similar

### 9. Backup Strategy

1. **Database**: Daily automated backups
2. **Files**: Regular file system backups
3. **Code**: Git repository with tags
4. **Configuration**: Document all settings

### 10. Launch Checklist

- [ ] Domain configured and SSL active
- [ ] Database migrated and tested
- [ ] Payment gateway configured
- [ ] Admin panel accessible
- [ ] All forms working
- [ ] Mobile responsive
- [ ] SEO optimized
- [ ] Analytics tracking
- [ ] Error monitoring
- [ ] Backup system active

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test production build locally
npm run preview

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod
```

## 📞 Support

For deployment issues or questions:
- Check the logs in your hosting provider
- Verify environment variables
- Test database connection
- Check SSL certificate status
