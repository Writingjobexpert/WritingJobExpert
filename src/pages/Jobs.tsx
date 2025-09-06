import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JobCard } from '@/components/ui/job-card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    salaryTypes: [],
    locations: []
  });

  const jobs = [
    {
      title: 'Senior Content Writer',
      company: 'TechCorp Solutions',
      location: 'Remote',
      type: 'Full-time' as const,
      salary: '₹45,000 - ₹65,000/month',
      description: 'We are looking for an experienced content writer to create engaging blog posts, articles, and marketing content for our SaaS platform. The ideal candidate should have strong SEO knowledge and experience in technical writing.',
      tags: ['SaaS', 'Blog Writing', 'SEO', 'Technical Writing'],
      postedTime: '2 days ago'
    },
    {
      title: 'Freelance Copywriter',
      company: 'Digital Marketing Agency',
      location: 'Mumbai',
      type: 'Freelance' as const,
      salary: '₹800 - ₹1,200/article',
      description: 'Create compelling copy for email campaigns, landing pages, and social media content for various client projects. Must have proven experience in conversion copywriting.',
      tags: ['Copywriting', 'Email Marketing', 'Social Media', 'Conversion'],
      postedTime: '1 week ago'
    },
    {
      title: 'Technical Writer',
      company: 'FinTech Startup',
      location: 'Bangalore',
      type: 'Contract' as const,
      salary: '₹55,000 - ₹75,000/month',
      description: 'Document APIs, create user guides, and write technical documentation for our financial services platform. Experience with developer tools and API documentation required.',
      tags: ['API Documentation', 'Technical Writing', 'FinTech', 'User Guides'],
      postedTime: '3 days ago'
    },
    {
      title: 'Content Marketing Specialist',
      company: 'E-commerce Startup',
      location: 'Delhi',
      type: 'Part-time' as const,
      salary: '₹25,000 - ₹35,000/month',
      description: 'Develop content strategies, write product descriptions, and create marketing materials for our online marketplace. Strong understanding of e-commerce and consumer behavior needed.',
      tags: ['Content Strategy', 'E-commerce', 'Product Writing', 'Marketing'],
      postedTime: '5 days ago'
    },
    {
      title: 'Grant Writer',
      company: 'Non-Profit Organization',
      location: 'Pune',
      type: 'Contract' as const,
      salary: '₹40,000 - ₹60,000/month',
      description: 'Research and write grant proposals for educational and social programs. Experience with grant writing and knowledge of funding sources required.',
      tags: ['Grant Writing', 'Non-Profit', 'Research', 'Proposals'],
      postedTime: '1 week ago'
    },
    {
      title: 'Social Media Writer',
      company: 'Lifestyle Brand',
      location: 'Remote',
      type: 'Freelance' as const,
      salary: '₹500 - ₹800/post',
      description: 'Create engaging social media content, captions, and stories for Instagram, Facebook, and Twitter. Must understand brand voice and social media trends.',
      tags: ['Social Media', 'Brand Writing', 'Instagram', 'Content Creation'],
      postedTime: '4 days ago'
    }
  ];

  const categories = [
    'Content Writing',
    'Copywriting', 
    'Technical Writing',
    'Social Media Writing',
    'SEO Writing',
    'Grant Writing',
    'Creative Writing',
    'Academic Writing'
  ];

  const salaryTypes = [
    'Hourly',
    'Monthly', 
    'Per Project',
    'Annual'
  ];

  const locations = [
    'Remote',
    'Mumbai',
    'Bangalore',
    'Delhi',
    'Pune',
    'Hyderabad',
    'Chennai',
    'Kolkata'
  ];

  const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Freelance'];
  const [selectedJobType, setSelectedJobType] = useState('All');

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="gradient-hero py-16">
        <div className="container">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Open Writing Jobs
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover amazing writing opportunities from companies around the world. 
              Find your perfect match today.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for jobs, companies, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white shadow-soft"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8">
                Search
              </Button>
            </div>
          </div>

          {/* Job Type Filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {jobTypes.map((type) => (
              <Button
                key={type}
                variant={selectedJobType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedJobType(type)}
                className="transition-smooth"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center space-x-2">
                    <Briefcase className="h-4 w-4" />
                    <span>Categories</span>
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={category} />
                        <label htmlFor={category} className="text-sm cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Salary Type */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Salary Type</span>
                  </h3>
                  <div className="space-y-2">
                    {salaryTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={type} />
                        <label htmlFor={type} className="text-sm cursor-pointer">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Location</span>
                  </h3>
                  <div className="space-y-2">
                    {locations.map((location) => (
                      <div key={location} className="flex items-center space-x-2">
                        <Checkbox id={location} />
                        <label htmlFor={location} className="text-sm cursor-pointer">
                          {location}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{jobs.length}</div>
                    <div className="text-sm text-muted-foreground">Jobs Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">1lakh+</div>
                    <div className="text-sm text-muted-foreground">Total Earnings</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  {jobs.length} Jobs Found
                </h2>
                <p className="text-muted-foreground">
                  Showing results for writing positions
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-2" />
                  Latest
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {jobs.map((job, index) => (
                <JobCard key={index} {...job} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;