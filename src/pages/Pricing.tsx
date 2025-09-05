import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Users, Zap, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: 'Lite',
      price: '₹199',
      period: '/month',
      description: 'Perfect for freelance writers getting started',
      icon: Users,
      popular: false,
      features: [
        'Apply to 10 jobs per month',
        'Basic profile visibility',
        'Standard support',
        'Job alerts via email',
        'Basic portfolio showcase',
        'Mobile app access'
      ],
      buttonText: 'Start with Lite',
      buttonVariant: 'outline' as const
    },
    {
      name: 'Pro', 
      price: '₹499',
      period: '/month',
      description: 'For professional writers ready to grow',
      icon: Star,
      popular: true,
      features: [
        'Unlimited job applications',
        'Priority profile visibility',
        'Priority support',
        'Advanced job matching',
        'Professional portfolio',
        'Analytics dashboard',
        'Custom profile URL',
        'Featured in search results'
      ],
      buttonText: 'Go Pro',
      buttonVariant: 'default' as const
    },
    {
      name: 'Lifetime',
      price: '₹2,999',
      period: 'one-time',
      description: 'Unlimited access forever - best value',
      icon: Crown,
      popular: false,
      features: [
        'Everything in Pro',
        'Lifetime access',
        'No recurring fees',
        'Premium support',
        'Early access to new features',
        'Personal account manager',
        'Custom integrations',
        'White-label solutions'
      ],
      buttonText: 'Get Lifetime',
      buttonVariant: 'default' as const
    }
  ];

  const faqs = [
    {
      question: 'Can I change my plan anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
    },
    {
      question: 'Is there a free trial available?',
      answer: 'We offer a 7-day free trial for the Pro plan. No credit card required to get started.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major UPI payments, net banking, and digital wallets for Indian customers.'
    },
    {
      question: 'Can I get a refund?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans if you\'re not satisfied.'
    },
    {
      question: 'Do you offer discounts for students?',
      answer: 'Yes, we provide a 50% discount for verified students. Contact our support team for more details.'
    },
    {
      question: 'Is the Lifetime plan really lifetime?',
      answer: 'Yes, the Lifetime plan gives you permanent access to all Pro features with no recurring charges.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="gradient-hero py-16">
        <div className="container text-center">
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Choose Your Perfect Plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Unlock your writing potential with plans designed for every stage of your career. 
              Start free, upgrade anytime.
            </p>
          </div>

          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-success" />
            <span>No setup fees</span>
            <span className="mx-2">•</span>
            <CheckCircle className="h-4 w-4 text-success" />
            <span>Cancel anytime</span>
            <span className="mx-2">•</span>
            <CheckCircle className="h-4 w-4 text-success" />
            <span>30-day money-back guarantee</span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name} 
                className={`relative card-hover ${plan.popular ? 'ring-2 ring-primary shadow-hover' : 'shadow-card'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center space-y-4">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <plan.icon className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <p className="text-muted-foreground mt-2">{plan.description}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    {plan.name === 'Lite' && (
                      <p className="text-sm text-muted-foreground">
                        ₹6.60 per day
                      </p>
                    )}
                    {plan.name === 'Pro' && (
                      <p className="text-sm text-muted-foreground">
                        ₹16.60 per day
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    variant={plan.buttonVariant}
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    size="lg"
                    asChild
                  >
                    <Link 
                      to="/payment" 
                      state={{ 
                        paymentData: { 
                          type: 'subscription', 
                          amount: parseInt(plan.price.replace('₹', '').replace(',', '')), 
                          planName: plan.name 
                        } 
                      }}
                    >
                      {plan.buttonText}
                    </Link>
                  </Button>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <Card className="max-w-4xl mx-auto text-center gradient-card">
            <CardContent className="p-12">
              <div className="space-y-6">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                
                <div>
                  <h3 className="text-3xl font-bold mb-4">Need Something Custom?</h3>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    For large teams, enterprises, or custom requirements, 
                    we offer tailored solutions with dedicated support.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="outline">
                    Contact Sales
                  </Button>
                  <Button size="lg" variant="ghost">
                    Schedule Demo
                  </Button>
                </div>
                
                <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                  <span>✓ Volume discounts</span>
                  <span>✓ Custom integrations</span>
                  <span>✓ Dedicated support</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions about our pricing? We've got answers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help.
            </p>
            <Button variant="outline">Contact Support</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;