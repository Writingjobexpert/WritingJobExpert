# Writing Job Expert

**The All-In-One Writing Marketplace**

A comprehensive two-sided marketplace connecting writers with businesses, built with modern web technologies and designed for production deployment.

## 🚀 Live Demo

**Domain:** [writingjobexpert.site](https://writingjobexpert.site)

## 👨‍💻 Development

**Developed by:** [Sixty4bitFreelancing](https://github.com/sixtyfourbitsquad)

This project was custom-built from scratch to create a professional writing marketplace platform with advanced features and modern UI/UX design.

## ✨ Features

### Frontend
- **Modern Design**: Custom gradient color scheme (84ffc9 + aab2ff + eca0ff)
- **Responsive Layout**: Mobile-first design with Tailwind CSS
- **Dynamic Pages**: Jobs, Writers, Services, Pricing, Admin Panel
- **Payment Integration**: UPI payment gateway with QR code support
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards

### Backend & Admin
- **Admin Dashboard**: Complete content management system
- **Payment Management**: UPI transaction tracking and verification
- **Dynamic Content**: Editable pricing, FAQs, and site content
- **Database Ready**: Supabase integration with migrations

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: Shadcn UI
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel/Netlify ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Writingjobexpert/WritingJobExpert.git
cd WritingJobExpert

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Build for production
npm run build:prod

# Deploy to Vercel
npm run deploy

# Deploy to Netlify
npm run deploy:netlify
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Header, Footer, Navigation
│   └── ui/             # Shadcn UI components
├── pages/              # Main application pages
│   ├── Home.tsx        # Landing page
│   ├── Jobs.tsx        # Job listings
│   ├── Writers.tsx     # Writer profiles
│   ├── Services.tsx    # Service listings
│   ├── Pricing.tsx     # Pricing plans
│   ├── Admin.tsx       # Admin dashboard
│   └── Payment.tsx     # Payment processing
├── integrations/       # Database and API integrations
└── App.tsx            # Main application component
```

## 🎨 Design System

- **Primary Colors**: #ebf4f5, #b5c6e0
- **Gradient**: 84ffc9 → aab2ff → eca0ff
- **Typography**: Poppins, Montserrat
- **Currency**: INR (₹)

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup
1. Create a Supabase project
2. Run the migration files in `supabase/migrations/`
3. Update environment variables

## 📱 Pages Overview

- **Home**: Hero section with CTAs and company logos
- **Jobs**: Job listings with advanced filtering
- **Writers**: Writer profiles with skills and portfolios
- **Services**: Writing services marketplace
- **Pricing**: Subscription plans (Lite, Pro, Lifetime)
- **Admin**: Content and payment management
- **Payment**: UPI payment processing

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run deploy
```

### Netlify
```bash
npm run deploy:netlify
```

### Manual Deployment
1. Build the project: `npm run build:prod`
2. Upload `dist/` folder to your hosting provider
3. Configure custom domain: `writingjobexpert.site`

## 📄 License

This project is proprietary software developed by Sixty4bitFreelancing.

## 🤝 Support

For technical support or customization requests, contact:
- **Developer**: Sixty4bitFreelancing
- **GitHub**: [@sixtyfourbitsquad](https://github.com/sixtyfourbitsquad)

---

**Built with ❤️ by Sixty4bitFreelancing**