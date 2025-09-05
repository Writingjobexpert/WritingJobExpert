import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Filter, MapPin, Star, MessageCircle, BookOpen } from 'lucide-react';

const Writers = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const writers = [
    {
      id: 1,
      name: 'Priya Sharma',
      avatar: '/placeholder.svg',
      specialization: 'Content Marketing Specialist',
      location: 'Mumbai',
      rating: 4.9,
      reviewCount: 127,
      hourlyRate: '₹800-1200',
      summary: 'Experienced content writer specializing in SaaS, FinTech, and B2B marketing. 5+ years creating compelling blog posts, white papers, and marketing copy that drives engagement.',
      skills: ['Content Marketing', 'SEO Writing', 'SaaS', 'B2B', 'Technical Writing'],
      completedJobs: 156,
      responseTime: '2 hours'
    },
    {
      id: 2,
      name: 'Rahul Gupta',
      avatar: '/placeholder.svg',
      specialization: 'Technical Writer',
      location: 'Bangalore',
      rating: 4.8,
      reviewCount: 89,
      hourlyRate: '₹1000-1500',
      summary: 'Senior technical writer with expertise in API documentation, user guides, and developer content. Worked with startups and Fortune 500 companies.',
      skills: ['API Documentation', 'User Guides', 'Developer Content', 'Software Documentation'],
      completedJobs: 98,
      responseTime: '1 hour'
    },
    {
      id: 3,
      name: 'Ananya Patel',
      avatar: '/placeholder.svg',
      specialization: 'Copywriter & Brand Strategist',
      location: 'Remote',
      rating: 5.0,
      reviewCount: 203,
      hourlyRate: '₹1200-1800',
      summary: 'Award-winning copywriter focused on conversion optimization and brand storytelling. Helped 50+ brands increase their conversion rates through compelling copy.',
      skills: ['Copywriting', 'Brand Strategy', 'Email Marketing', 'Landing Pages', 'Conversion'],
      completedJobs: 289,
      responseTime: '30 minutes'
    },
    {
      id: 4,
      name: 'Vikram Singh',
      avatar: '/placeholder.svg',
      specialization: 'SEO Content Writer',
      location: 'Delhi',
      rating: 4.7,
      reviewCount: 156,
      hourlyRate: '₹600-1000',
      summary: 'SEO specialist and content writer with proven track record of ranking content on first page of Google. Data-driven approach to content creation.',
      skills: ['SEO Writing', 'Keyword Research', 'Blog Writing', 'Content Strategy', 'Analytics'],
      completedJobs: 234,
      responseTime: '3 hours'
    },
    {
      id: 5,
      name: 'Sneha Reddy',
      avatar: '/placeholder.svg',
      specialization: 'Social Media Writer',
      location: 'Hyderabad',
      rating: 4.9,
      reviewCount: 91,
      hourlyRate: '₹500-800',
      summary: 'Creative social media content creator with expertise in Instagram, LinkedIn, and Twitter. Managed social media for 30+ brands across various industries.',
      skills: ['Social Media', 'Instagram Marketing', 'LinkedIn Content', 'Brand Voice', 'Content Calendar'],
      completedJobs: 167,
      responseTime: '1 hour'
    },
    {
      id: 6,
      name: 'Amit Kumar',
      avatar: '/placeholder.svg',
      specialization: 'Grant Writer',
      location: 'Pune',
      rating: 4.8,
      reviewCount: 45,
      hourlyRate: '₹1500-2000',
      summary: 'Specialized grant writer with 8 years experience in non-profit sector. Successfully secured over ₹2 crores in funding for various organizations.',
      skills: ['Grant Writing', 'Proposal Writing', 'Non-Profit', 'Research', 'Project Management'],
      completedJobs: 67,
      responseTime: '4 hours'
    }
  ];

  const specializations = [
    'Content Marketing',
    'Technical Writing',
    'Copywriting',
    'SEO Writing',
    'Social Media Writing',
    'Grant Writing',
    'Creative Writing',
    'Academic Writing'
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="gradient-hero py-16">
        <div className="container">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Writers for Hire
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with talented writers who can bring your content vision to life. 
              Browse profiles, compare skills, and find the perfect match for your project.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search by skills, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white shadow-soft"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span className="font-semibold">Filters</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Specializations */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Specializations</span>
                  </h3>
                  <div className="space-y-2">
                    {specializations.map((spec) => (
                      <div key={spec} className="flex items-center space-x-2">
                        <Checkbox id={spec} />
                        <label htmlFor={spec} className="text-sm cursor-pointer">
                          {spec}
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
                    <div className="text-2xl font-bold text-primary">{writers.length}</div>
                    <div className="text-sm text-muted-foreground">Writers Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">4.8/5</div>
                    <div className="text-sm text-muted-foreground">Average Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Writer Listings */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  {writers.length} Writers Found
                </h2>
                <p className="text-muted-foreground">
                  Showing results for professional writers
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4 mr-2" />
                  Top Rated
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {writers.map((writer) => (
                <Card key={writer.id} className="card-hover shadow-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Writer Info */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={writer.avatar} alt={writer.name} />
                            <AvatarFallback>{writer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-xl font-semibold">{writer.name}</h3>
                                <p className="text-primary font-medium">{writer.specialization}</p>
                                <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{writer.location}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span>{writer.rating}</span>
                                    <span>({writer.reviewCount} reviews)</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <div className="text-lg font-semibold text-success">{writer.hourlyRate}/hr</div>
                                <div className="text-sm text-muted-foreground">{writer.completedJobs} jobs completed</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground">{writer.summary}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {writer.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            Responds in {writer.responseTime}
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                            <Button size="sm">
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Writers
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Writers;