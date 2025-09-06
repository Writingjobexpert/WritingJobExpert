import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PenTool, Users, Building, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const SignUp = () => {
  const [selectedType, setSelectedType] = useState<'writer' | 'business' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const { signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType) return;
    
    setLoading(true);
    
    const { error } = await signUp(formData.email, formData.password, formData.fullName, selectedType);
    
    if (!error) {
      navigate('/thank-you');
    }
    
    setLoading(false);
  };

  if (selectedType) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                <PenTool className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl font-poppins">Writing Job Expert</span>
            </Link>
            <h1 className="text-2xl font-bold">Create Your Account</h1>
            <p className="text-muted-foreground mt-2">
              {selectedType === 'writer' ? 'Join as a Writer' : 'Join as a Business'}
            </p>
          </div>

          {/* Sign Up Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="h-11 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full h-11" size="lg" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>

                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full h-11" 
                  onClick={() => setSelectedType(null)}
                >
                  Back to Account Type
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link
                  to="/login"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Sign in here
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
              <PenTool className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl font-poppins">Writing Job Expert</span>
          </Link>
          <h1 className="text-3xl font-bold mb-4">Choose Your Account Type</h1>
          <p className="text-muted-foreground text-lg">
            Join thousands of writers and businesses on our platform
          </p>
        </div>

        {/* Account Type Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* For Writers */}
          <Card 
            className="relative overflow-hidden shadow-card hover:shadow-card-hover transition-shadow cursor-pointer"
            onClick={() => setSelectedType('writer')}
          >
            <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl mb-2">For Writers</CardTitle>
              <p className="text-muted-foreground">
                Showcase your skills and find amazing writing opportunities
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-primary rounded-full mr-3"></div>
                  Create a professional profile
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-primary rounded-full mr-3"></div>
                  Browse and apply to jobs
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-primary rounded-full mr-3"></div>
                  Offer your writing services
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-primary rounded-full mr-3"></div>
                  Connect with clients directly
                </li>
              </ul>
              <Button className="w-full h-12 text-base" size="lg" asChild>
                <Link to="/pricing">Become a Member</Link>
              </Button>
            </CardContent>
          </Card>

          {/* For Business */}
          <Card 
            className="relative overflow-hidden shadow-card hover:shadow-card-hover transition-shadow cursor-pointer"
            onClick={() => setSelectedType('business')}
          >
            <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
                <Building className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl mb-2">For Business</CardTitle>
              <p className="text-muted-foreground">
                Find talented writers and grow your content strategy
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-primary rounded-full mr-3"></div>
                  Post unlimited job listings
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-primary rounded-full mr-3"></div>
                  Access to qualified writers
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-primary rounded-full mr-3"></div>
                  Hire for various projects
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-primary rounded-full mr-3"></div>
                  Streamlined hiring process
                </li>
              </ul>
              <Button className="w-full h-12 text-base" size="lg" asChild>
                <Link to="/pricing">Start Hiring Today</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Already have an account */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;