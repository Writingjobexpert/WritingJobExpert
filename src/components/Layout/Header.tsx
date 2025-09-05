import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PenTool, Menu, X } from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Jobs', href: '/jobs' },
    { label: 'Companies', href: '/jobs?filter=companies' },
    { label: 'Writers', href: '/writers' },
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <PenTool className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl font-poppins">Writing Job Expert</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 ml-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4 ml-auto">
          {/* Post a Job Button with Dynamic Price */}
          <Button variant="default" className="hidden md:flex bg-accent hover:bg-accent/90 text-white font-semibold px-6" asChild>
            <Link 
              to="/payment" 
              state={{ 
                paymentData: { 
                  type: 'job_posting', 
                  amount: 59, 
                  jobTitle: 'New Job Posting' 
                } 
              }}
            >
              Post a Job - ₹59
            </Link>
          </Button>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-sm font-medium py-2 px-3 rounded-md hover:bg-muted transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            <div className="flex flex-col space-y-2 pt-2 border-t border-border">
              <Button variant="default" className="bg-accent hover:bg-accent/90 text-white font-semibold" asChild>
                <Link 
                  to="/payment" 
                  state={{ 
                    paymentData: { 
                      type: 'job_posting', 
                      amount: 59, 
                      jobTitle: 'New Job Posting' 
                    } 
                  }}
                >
                  Post a Job - ₹59
                </Link>
              </Button>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="flex-1" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
                <Button variant="default" size="sm" className="flex-1" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};