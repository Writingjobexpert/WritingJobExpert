import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Filter, Star, Clock, Heart, Zap } from 'lucide-react';

const Services = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    {
      id: 1,
      title: 'Professional Blog Post Writing',
      provider: 'Priya Sharma',
      providerAvatar: '/placeholder.svg',
      price: '₹1,500',
      originalPrice: '₹2,000',
      rating: 4.9,
      reviewCount: 127,
      deliveryTime: '3 days',
      description: 'I will write engaging, SEO-optimized blog posts that drive traffic and conversions. Each post includes keyword research, compelling headlines, and call-to-actions.',
      tags: ['Blog Writing', 'SEO', 'Content Marketing'],
      featured: true,
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Complete Website Copy Package',
      provider: 'Rahul Gupta',
      providerAvatar: '/placeholder.svg',
      price: '₹5,000',
      originalPrice: null,
      rating: 4.8,
      reviewCount: 89,
      deliveryTime: '7 days',
      description: 'Complete website copywriting including homepage, about page, services, and landing pages. Conversion-focused copy that tells your brand story.',
      tags: ['Website Copy', 'Landing Pages', 'Conversion'],
      featured: false,
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'Social Media Content Calendar',
      provider: 'Ananya Patel',
      providerAvatar: '/placeholder.svg',
      price: '₹3,500',
      originalPrice: '₹4,500',
      rating: 5.0,
      reviewCount: 203,
      deliveryTime: '5 days',
      description: 'Monthly social media calendar with captions, hashtags, and content strategy for Instagram, Facebook, and LinkedIn. Includes visual content suggestions.',
      tags: ['Social Media', 'Content Calendar', 'Instagram'],
      featured: true,
      image: '/placeholder.svg'
    },
    {
      id: 4,
      title: 'Email Marketing Campaign Setup',
      provider: 'Vikram Singh',
      providerAvatar: '/placeholder.svg',
      price: '₹2,500',
      originalPrice: null,
      rating: 4.7,
      reviewCount: 156,
      deliveryTime: '4 days',
      description: 'Complete email marketing campaign including welcome series, newsletter templates, and automated sequences. Includes subject line optimization.',
      tags: ['Email Marketing', 'Automation', 'Templates'],
      featured: false,
      image: '/placeholder.svg'
    },
    {
      id: 5,
      title: 'Product Description Writing',
      provider: 'Sneha Reddy',
      providerAvatar: '/placeholder.svg',
      price: '₹800',
      originalPrice: '₹1,200',
      rating: 4.9,
      reviewCount: 91,
      deliveryTime: '2 days',
      description: 'Compelling product descriptions that convert browsers into buyers. SEO-optimized with benefits-focused copy and emotional triggers.',
      tags: ['Product Copy', 'E-commerce', 'Conversion'],
      featured: false,
      image: '/placeholder.svg'
    },
    {
      id: 6,
      title: 'Technical Documentation Package',
      provider: 'Amit Kumar',
      providerAvatar: '/placeholder.svg',
      price: '₹4,500',
      originalPrice: null,
      rating: 4.8,
      reviewCount: 45,
      deliveryTime: '10 days',
      description: 'Complete technical documentation including API docs, user guides, and developer resources. Clear, concise, and developer-friendly documentation.',
      tags: ['Technical Writing', 'API Docs', 'User Guides'],
      featured: false,
      image: '/placeholder.svg'
    }
  ];

  const categories = [
    'Blog Writing',
    'Website Copy',
    'Social Media',
    'Email Marketing',
    'Product Descriptions',
    'Technical Writing',
    'Press Releases',
    'Grant Writing'
  ];

  const priceRanges = [
    'Under ₹1,000',
    '₹1,000 - ₹3,000',
    '₹3,000 - ₹5,000',
    'Above ₹5,000'
  ];

  const deliveryTimes = [
    '24 hours',
    '3 days',
    '1 week',
    '2 weeks'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="gradient-hero py-16">
        <div className="container">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Writing Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse professional writing services from expert writers. 
              Get high-quality content delivered on time, every time.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for writing services..."
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
                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3">Categories</h3>
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

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <div key={range} className="flex items-center space-x-2">
                        <Checkbox id={range} />
                        <label htmlFor={range} className="text-sm cursor-pointer">
                          {range}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Time */}
                <div>
                  <h3 className="font-semibold mb-3">Delivery Time</h3>
                  <div className="space-y-2">
                    {deliveryTimes.map((time) => (
                      <div key={time} className="flex items-center space-x-2">
                        <Checkbox id={time} />
                        <label htmlFor={time} className="text-sm cursor-pointer">
                          {time}
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
          </div>

          {/* Service Listings */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  {services.length} Services Available
                </h2>
                <p className="text-muted-foreground">
                  Professional writing services from verified providers
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4 mr-2" />
                  Best Selling
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="card-hover shadow-card overflow-hidden">
                  <div className="relative">
                    <div className="h-48 bg-gradient-primary"></div>
                    {service.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-accent text-white">
                          <Zap className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg leading-tight mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {service.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={service.providerAvatar} alt={service.provider} />
                        <AvatarFallback>{service.provider.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{service.provider}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{service.rating}</span>
                        <span className="text-muted-foreground">({service.reviewCount})</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{service.deliveryTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div>
                        {service.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through mr-2">
                            {service.originalPrice}
                          </span>
                        )}
                        <span className="text-lg font-bold text-success">
                          {service.price}
                        </span>
                      </div>
                      
                      <Button size="sm">
                        Order Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;