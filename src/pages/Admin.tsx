import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Settings, 
  CreditCard, 
  Users, 
  FileText, 
  QrCode, 
  CheckCircle, 
  Clock, 
  XCircle,
  Edit,
  Save,
  Upload,
  Eye,
  EyeOff,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminSupportChat from '@/components/AdminSupportChat';

interface Transaction {
  id: string;
  userName: string;
  amount: number;
  type: 'job_posting' | 'subscription';
  planName?: string;
  utrNumber: string;
  status: 'processing' | 'success' | 'failed';
  date: string;
  email: string;
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('payments');
  const [upiId, setUpiId] = useState('writingjobexpert@paytm');
  const [qrCodeFile, setQrCodeFile] = useState<File | null>(null);
  const [jobPostingPrice, setJobPostingPrice] = useState(59);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([
    {
      id: '1',
      name: 'Lite',
      price: 199,
      period: '/month',
      description: 'Perfect for freelance writers getting started',
      features: [
        'Apply to 10 jobs per month',
        'Basic profile visibility',
        'Standard support',
        'Job alerts via email',
        'Basic portfolio showcase',
        'Mobile app access'
      ],
      popular: false
    },
    {
      id: '2',
      name: 'Pro',
      price: 499,
      period: '/month',
      description: 'For professional writers ready to grow',
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
      popular: true
    },
    {
      id: '3',
      name: 'Lifetime',
      price: 2999,
      period: 'one-time',
      description: 'Unlimited access forever - best value',
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
      popular: false
    }
  ]);
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: '1',
      question: 'Can I change my plan anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
    },
    {
      id: '2',
      question: 'Is there a free trial available?',
      answer: 'We offer a 7-day free trial for the Pro plan. No credit card required to get started.'
    },
    {
      id: '3',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major UPI payments, net banking, and digital wallets for Indian customers.'
    },
    {
      id: '4',
      question: 'Can I get a refund?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans if you\'re not satisfied.'
    },
    {
      id: '5',
      question: 'Do you offer discounts for students?',
      answer: 'Yes, we provide a 50% discount for verified students. Contact our support team for more details.'
    },
    {
      id: '6',
      question: 'Is the Lifetime plan really lifetime?',
      answer: 'Yes, the Lifetime plan gives you permanent access to all Pro features with no recurring charges.'
    }
  ]);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      userName: 'Priya Sharma',
      amount: 499,
      type: 'subscription',
      planName: 'Pro',
      utrNumber: 'UPI123456789',
      status: 'processing',
      date: '2024-01-15',
      email: 'priya@example.com'
    },
    {
      id: '2',
      userName: 'Rahul Gupta',
      amount: 59,
      type: 'job_posting',
      utrNumber: 'UPI987654321',
      status: 'success',
      date: '2024-01-14',
      email: 'rahul@example.com'
    },
    {
      id: '3',
      userName: 'Ananya Patel',
      amount: 2999,
      type: 'subscription',
      planName: 'Lifetime',
      utrNumber: 'UPI456789123',
      status: 'success',
      date: '2024-01-13',
      email: 'ananya@example.com'
    },
    {
      id: '4',
      userName: 'Vikram Singh',
      amount: 199,
      type: 'subscription',
      planName: 'Lite',
      utrNumber: 'UPI789123456',
      status: 'failed',
      date: '2024-01-12',
      email: 'vikram@example.com'
    }
  ]);
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [editingFaq, setEditingFaq] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in production, use proper authentication
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const updateTransactionStatus = (id: string, status: 'processing' | 'success' | 'failed') => {
    setTransactions(prev => 
      prev.map(transaction => 
        transaction.id === id ? { ...transaction, status } : transaction
      )
    );
  };

  const updatePricingPlan = (id: string, field: keyof PricingPlan, value: any) => {
    setPricingPlans(prev =>
      prev.map(plan =>
        plan.id === id ? { ...plan, [field]: value } : plan
      )
    );
  };

  const updateFaq = (id: string, field: keyof FAQ, value: string) => {
    setFaqs(prev =>
      prev.map(faq =>
        faq.id === id ? { ...faq, [field]: value } : faq
      )
    );
  };

  const addNewFaq = () => {
    const newFaq: FAQ = {
      id: Date.now().toString(),
      question: 'New Question',
      answer: 'New Answer'
    };
    setFaqs(prev => [...prev, newFaq]);
    setEditingFaq(newFaq.id);
  };

  const deleteFaq = (id: string) => {
    setFaqs(prev => prev.filter(faq => faq.id !== id));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-success text-white"><CheckCircle className="h-3 w-3 mr-1" />Success</Badge>;
      case 'processing':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Processing</Badge>;
      case 'failed':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
            <p className="text-center text-muted-foreground">Enter admin password to access the dashboard</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Button variant="ghost" onClick={() => navigate('/')}>
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your Writing Job Expert platform</p>
          </div>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
            Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Payments Management */}
          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>UTR Number</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{transaction.userName}</div>
                              <div className="text-sm text-muted-foreground">{transaction.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {transaction.type === 'job_posting' ? 'Job Posting' : 'Subscription'}
                              </div>
                              {transaction.planName && (
                                <div className="text-sm text-muted-foreground">{transaction.planName}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">₹{transaction.amount}</TableCell>
                          <TableCell className="font-mono text-sm">{transaction.utrNumber}</TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateTransactionStatus(transaction.id, 'success')}
                                disabled={transaction.status === 'success'}
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateTransactionStatus(transaction.id, 'failed')}
                                disabled={transaction.status === 'failed'}
                              >
                                <XCircle className="h-3 w-3 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Management */}
          <TabsContent value="pricing" className="space-y-6">
            <div className="grid gap-6">
              {/* Job Posting Price */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Posting Price</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="space-y-2">
                      <Label htmlFor="jobPrice">Price (₹)</Label>
                      <Input
                        id="jobPrice"
                        type="number"
                        value={jobPostingPrice}
                        onChange={(e) => setJobPostingPrice(Number(e.target.value))}
                        className="w-32"
                      />
                    </div>
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Update Price
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Plans */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Subscription Plans</h3>
                </div>
                {pricingPlans.map((plan) => (
                  <Card key={plan.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                          <span>{plan.name}</span>
                          {plan.popular && <Badge>Popular</Badge>}
                        </CardTitle>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingPlan(editingPlan === plan.id ? null : plan.id)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          {editingPlan === plan.id ? 'Cancel' : 'Edit'}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Price (₹)</Label>
                          <Input
                            value={plan.price}
                            onChange={(e) => updatePricingPlan(plan.id, 'price', Number(e.target.value))}
                            disabled={editingPlan !== plan.id}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Period</Label>
                          <Input
                            value={plan.period}
                            onChange={(e) => updatePricingPlan(plan.id, 'period', e.target.value)}
                            disabled={editingPlan !== plan.id}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={plan.description}
                          onChange={(e) => updatePricingPlan(plan.id, 'description', e.target.value)}
                          disabled={editingPlan !== plan.id}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Features (one per line)</Label>
                        <Textarea
                          value={plan.features.join('\n')}
                          onChange={(e) => updatePricingPlan(plan.id, 'features', e.target.value.split('\n'))}
                          disabled={editingPlan !== plan.id}
                          rows={6}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`popular-${plan.id}`}
                          checked={plan.popular}
                          onChange={(e) => updatePricingPlan(plan.id, 'popular', e.target.checked)}
                          disabled={editingPlan !== plan.id}
                        />
                        <Label htmlFor={`popular-${plan.id}`}>Mark as Popular</Label>
                      </div>
                      {editingPlan === plan.id && (
                        <Button>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* FAQ Management */}
          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>FAQ Management</CardTitle>
                  <Button onClick={addNewFaq}>
                    <FileText className="h-4 w-4 mr-2" />
                    Add FAQ
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq) => (
                  <Card key={faq.id}>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Question</Label>
                          <Input
                            value={faq.question}
                            onChange={(e) => updateFaq(faq.id, 'question', e.target.value)}
                            disabled={editingFaq !== faq.id}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Answer</Label>
                          <Textarea
                            value={faq.answer}
                            onChange={(e) => updateFaq(faq.id, 'answer', e.target.value)}
                            disabled={editingFaq !== faq.id}
                            rows={3}
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingFaq(editingFaq === faq.id ? null : faq.id)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            {editingFaq === faq.id ? 'Cancel' : 'Edit'}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteFaq(faq.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Chat */}
          <TabsContent value="support" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Support Chat Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AdminSupportChat />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>UPI Payment Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="your-upi-id@paytm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>QR Code Image</Label>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setQrCodeFile(e.target.files?.[0] || null)}
                      />
                      <Button size="sm" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload QR Code
                      </Button>
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;