import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { JobCard } from '@/components/ui/job-card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Star, TrendingUp, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-bg.jpg';
import writersAvatars from '@/assets/writers-avatars.jpg';

const Home = () => {
  const trustedCompanies = ['HubSpot', 'Salesforce', 'Mailchimp', 'Shopify', 'WordPress', 'Medium'];
  
  const featuredJobs = [
    {
      title: 'Senior Content Writer',
      company: 'TechCorp Solutions',
      location: 'Remote',
      type: 'Full-time' as const,
      salary: '₹45,000 - ₹65,000/month',
      description: 'We are looking for an experienced content writer to create engaging blog posts, articles, and marketing content for our SaaS platform.',
      tags: ['SaaS', 'Blog Writing', 'SEO', 'Technical Writing'],
      postedTime: '2 days ago'
    },
    {
      title: 'Freelance Copywriter',
      company: 'Digital Marketing Agency',
      location: 'Mumbai',
      type: 'Freelance' as const,
      salary: '₹800 - ₹1,200/article',
      description: 'Create compelling copy for email campaigns, landing pages, and social media content for various client projects.',
      tags: ['Copywriting', 'Email Marketing', 'Social Media', 'Conversion'],
      postedTime: '1 week ago'
    },
    {
      title: 'Technical Writer',
      company: 'FinTech Startup',
      location: 'Bangalore',
      type: 'Contract' as const,
      salary: '₹55,000 - ₹75,000/month',
      description: 'Document APIs, create user guides, and write technical documentation for our financial services platform.',
      tags: ['API Documentation', 'Technical Writing', 'FinTech', 'User Guides'],
      postedTime: '3 days ago'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Writers', icon: Users },
    { number: '5,000+', label: 'Jobs Posted', icon: TrendingUp },
    { number: '4.9/5', label: 'Average Rating', icon: Star },
    { number: '98%', label: 'Job Success Rate', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/5"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  The All-In-One{' '}
                  <span className="text-primary">Writing</span>{' '}
                  Marketplace
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Connect with top writing talent or find your next opportunity. 
                  Join thousands of writers and businesses building success together.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold px-8" asChild>
                  <Link to="/signup">
                    Become a Member
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="px-8" asChild>
                  <Link to="/jobs">Browse Jobs</Link>
                </Button>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>✓ Free to join</span>
                <span>✓ No hidden fees</span>
                <span>✓ Secure payments</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative w-full h-80 lg:h-96 animate-float">
                <img 
                  src={writersAvatars} 
                  alt="Professional Writers"
                  className="w-full h-full object-cover rounded-2xl shadow-hover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
              </div>
              
              {/* Floating Stats Cards */}
              <Card className="absolute -left-4 top-8 shadow-hover bg-white/95 backdrop-blur">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary">₹2.5M+</div>
                  <div className="text-sm text-muted-foreground">Paid to writers</div>
                </CardContent>
              </Card>
              
              <Card className="absolute -right-4 bottom-8 shadow-hover bg-white/95 backdrop-blur">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-success">99%</div>
                  <div className="text-sm text-muted-foreground">Client satisfaction</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Trusted by Leading Companies
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {trustedCompanies.map((company, index) => (
              <div key={index} className="text-2xl font-bold text-muted-foreground">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Latest Writing Jobs</h2>
              <p className="text-muted-foreground mt-2">
                Discover opportunities that match your skills
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/jobs">
                View All Jobs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job, index) => (
              <JobCard key={index} {...job} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Start Your Writing Journey?
            </h2>
            <p className="text-lg opacity-90">
              Join thousands of successful writers and businesses. 
              Create your account today and start connecting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8" asChild>
                <Link to="/signup">Get Started Today</Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/pricing">View Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;