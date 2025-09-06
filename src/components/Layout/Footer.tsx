import React from 'react';
import { Link } from 'react-router-dom';
import { PenTool, Twitter, Linkedin, Facebook, Instagram, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-foreground text-background mt-20">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <PenTool className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-lg font-poppins">Writing Job Expert</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                The all-in-one writing marketplace connecting talented writers with businesses worldwide.
              </p>
              <div className="flex space-x-3">
                <Button variant="ghost" size="sm" className="p-2 hover:bg-muted/10">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2 hover:bg-muted/10">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2 hover:bg-muted/10">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2 hover:bg-muted/10">
                  <Instagram className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* For Writers */}
            <div>
              <h3 className="font-semibold mb-4">For Writers</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/jobs" className="hover:text-primary transition-colors">Browse Jobs</Link></li>
                <li><Link to="/writers/profile" className="hover:text-primary transition-colors">Create Profile</Link></li>
                <li><Link to="/services/create" className="hover:text-primary transition-colors">Offer Services</Link></li>
                <li><Link to="/writers/resources" className="hover:text-primary transition-colors">Writer Resources</Link></li>
                <li><Link to="/writers/success-stories" className="hover:text-primary transition-colors">Success Stories</Link></li>
              </ul>
            </div>

            {/* For Businesses */}
            <div>
              <h3 className="font-semibold mb-4">For Businesses</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/writers" className="hover:text-primary transition-colors">Find Writers</Link></li>
                <li><Link to="/services" className="hover:text-primary transition-colors">Browse Services</Link></li>
                <li><Link to="/post-job" className="hover:text-primary transition-colors">Post a Job</Link></li>
                <li><Link to="/business/resources" className="hover:text-primary transition-colors">Business Resources</Link></li>
                <li><Link to="/business/case-studies" className="hover:text-primary transition-colors">Case Studies</Link></li>
              </ul>
            </div>

            {/* Support & Legal */}
            <div>
              <h3 className="font-semibold mb-4">Support & Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://t.me/deepak_wadhwa_official09" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Get Support</a></li>
                <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-muted/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Writing Job Expert. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-2 md:mt-0">
              Made with ❤️ for the writing community
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        className="scroll-to-top"
        size="sm"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
    </>
  );
};