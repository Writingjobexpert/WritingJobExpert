import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  DollarSign, 
  Users, 
  FileText, 
  HelpCircle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

interface Payment {
  id: string;
  user_id: string;
  amount: number;
  payment_type: string;
  plan_name: string;
  utr_number: string;
  status: string;
  created_at: string;
  profiles: {
    full_name: string;
    email: string;
  };
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
  is_active: boolean;
}

interface AdminSettings {
  pricing_plans: any;
  job_posting_fee: string;
  upi_settings: {
    upi_id: string;
    qr_code_url: string;
  };
}

const Admin = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [settings, setSettings] = useState<AdminSettings>({
    pricing_plans: {},
    job_posting_fee: '59',
    upi_settings: { upi_id: '', qr_code_url: '' }
  });

  useEffect(() => {
    if (user && !loading) {
      checkAdminStatus();
    }
  }, [user, loading]);

  const checkAdminStatus = async () => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('user_id', user?.id)
        .single();

      if (profile?.user_type === 'admin') {
        setIsAdmin(true);
        loadAdminData();
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    } finally {
      setCheckingAdmin(false);
    }
  };

  const loadAdminData = async () => {
    await Promise.all([
      loadPayments(),
      loadFAQs(),
      loadSettings()
    ]);
  };

  const loadPayments = async () => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get user profiles separately
      const userIds = data?.map(p => p.user_id) || [];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, full_name, email')
        .in('user_id', userIds);

      // Combine payments with profiles
      const paymentsWithProfiles = data?.map(payment => ({
        ...payment,
        profiles: profiles?.find(p => p.user_id === payment.user_id) || { full_name: 'Unknown', email: 'Unknown' }
      })) || [];

      setPayments(paymentsWithProfiles);
    } catch (error) {
      console.error('Error loading payments:', error);
    }
  };

  const loadFAQs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error('Error loading FAQs:', error);
    }
  };

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*');

      if (error) throw error;
      
      const settingsObj: any = {};
      data?.forEach((setting) => {
        settingsObj[setting.setting_key] = setting.setting_value;
      });

      setSettings({
        pricing_plans: settingsObj.pricing_plans || {},
        job_posting_fee: settingsObj.job_posting_fee || '59',
        upi_settings: settingsObj.upi_settings || { upi_id: '', qr_code_url: '' }
      });
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const updatePaymentStatus = async (paymentId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('payments')
        .update({ status })
        .eq('id', paymentId);

      if (error) throw error;

      await loadPayments();
      toast({
        title: "Payment Updated",
        description: `Payment status updated to ${status}`,
      });
    } catch (error) {
      console.error('Error updating payment:', error);
      toast({
        title: "Error",
        description: "Failed to update payment status",
        variant: "destructive",
      });
    }
  };

  const updateSettings = async (key: string, value: any) => {
    try {
      const { error } = await supabase
        .from('admin_settings')
        .upsert({ setting_key: key, setting_value: value });

      if (error) throw error;

      toast({
        title: "Settings Updated",
        description: "Settings have been saved successfully",
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    }
  };

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your Writing Job Expert platform</p>
        </div>

        <Tabs defaultValue="payments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="faqs" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              FAQs
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div key={payment.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{payment.profiles?.full_name}</h3>
                          <p className="text-sm text-muted-foreground">{payment.profiles?.email}</p>
                        </div>
                        <Badge 
                          variant={
                            payment.status === 'success' ? 'default' : 
                            payment.status === 'failed' ? 'destructive' : 
                            'secondary'
                          }
                        >
                          {payment.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>Amount: ₹{payment.amount}</div>
                        <div>Type: {payment.payment_type}</div>
                        <div>UTR: {payment.utr_number}</div>
                        <div>Date: {new Date(payment.created_at).toLocaleDateString()}</div>
                      </div>
                      {payment.status === 'processing' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => updatePaymentStatus(payment.id, 'success')}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => updatePaymentStatus(payment.id, 'failed')}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">User management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faqs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>FAQ Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">{faq.question}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{faq.answer}</p>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{faq.category}</Badge>
                        <Badge variant={faq.is_active ? 'default' : 'secondary'}>
                          {faq.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>UPI Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="upi-id">UPI ID</Label>
                    <Input
                      id="upi-id"
                      value={settings.upi_settings.upi_id}
                      onChange={(e) => setSettings({
                        ...settings,
                        upi_settings: { ...settings.upi_settings, upi_id: e.target.value }
                      })}
                      placeholder="your-upi@bank"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qr-code-url">QR Code URL</Label>
                    <Input
                      id="qr-code-url"
                      value={settings.upi_settings.qr_code_url}
                      onChange={(e) => setSettings({
                        ...settings,
                        upi_settings: { ...settings.upi_settings, qr_code_url: e.target.value }
                      })}
                      placeholder="https://example.com/qr-code.png"
                    />
                  </div>
                  <Button onClick={() => updateSettings('upi_settings', settings.upi_settings)}>
                    Save UPI Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Job Posting Fee</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="job-fee">Fee Amount (₹)</Label>
                    <Input
                      id="job-fee"
                      type="number"
                      value={settings.job_posting_fee}
                      onChange={(e) => setSettings({
                        ...settings,
                        job_posting_fee: e.target.value
                      })}
                    />
                  </div>
                  <Button onClick={() => updateSettings('job_posting_fee', settings.job_posting_fee)}>
                    Save Job Posting Fee
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;