import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PenTool, Briefcase, ArrowRight, Users, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const writerBenefits = [
    'Access to thousands of writing opportunities',
    'Secure payments with escrow protection',
    'Build your professional portfolio',
    'Connect with top companies globally',
    'Flexible work schedules',
    'Skill development resources'
  ];

  const businessBenefits = [
    'Access to vetted professional writers',
    'Post jobs and receive proposals',
    'Manage projects efficiently',
    'Secure payment system',
    'Quality assurance guarantee',
    '24/7 customer support'
  ];

  const stats = [
    { icon: Users, number: '10,000+', label: 'Active Writers' },
    { icon: Briefcase, number: '5,000+', label: 'Jobs Completed' },
    { icon: Star, number: '4.9/5', label: 'Average Rating' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="gradient-hero py-16">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Join Writing Job Expert
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose your path and start your journey in the world's largest writing marketplace
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-lg">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup Cards */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Writer Card */}
            <Card className="relative overflow-hidden card-hover shadow-hover group">
              <div className="absolute inset-0 gradient-primary opacity-5 group-hover:opacity-10 transition-opacity"></div>
              <CardHeader className="relative text-center space-y-4 pb-6">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <PenTool className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">For Writers</CardTitle>
                  <p className="text-muted-foreground">
                    Showcase your skills and find amazing writing opportunities
                  </p>
                </div>
              </CardHeader>
              
              <CardContent className="relative space-y-6">
                <div className="space-y-3">
                  {writerBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-success/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                      </div>
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-border">
                  <Button 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold group-hover:shadow-hover transition-all"
                    asChild
                  >
                    <Link to="/pricing">
                      Become a Member
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Join 10,000+ successful writers
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Business Card */}
            <Card className="relative overflow-hidden card-hover shadow-hover group">
              <div className="absolute inset-0 gradient-primary opacity-5 group-hover:opacity-10 transition-opacity"></div>
              <CardHeader className="relative text-center space-y-4 pb-6">
                <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Briefcase className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">For Business</CardTitle>
                  <p className="text-muted-foreground">
                    Find talented writers and grow your content strategy
                  </p>
                </div>
              </CardHeader>
              
              <CardContent className="relative space-y-6">
                <div className="space-y-3">
                  {businessBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-success/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                      </div>
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-border">
                  <Button 
                    size="lg" 
                    className="w-full bg-accent hover:bg-accent/90 text-white font-semibold group-hover:shadow-hover transition-all"
                    asChild
                  >
                    <Link to="/pricing">
                      Start Hiring Today
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Trusted by 5,000+ companies
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Writing Job Expert?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide the tools and platform you need to succeed, whether you're writing or hiring writers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center shadow-card">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <PenTool className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Quality First</h3>
                <p className="text-sm text-muted-foreground">
                  All writers are vetted and verified to ensure high-quality work for every project.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 mx-auto bg-success/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <h3 className="font-semibold">Secure Payments</h3>
                <p className="text-sm text-muted-foreground">
                  Protected transactions with escrow system ensuring everyone gets paid fairly.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">
                  Round-the-clock customer support to help you at every step of your journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground">
              Join thousands of writers and businesses already succeeding on our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/pricing">View Pricing Plans</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/login">Already have an account?</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;