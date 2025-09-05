import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, QrCode, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface PaymentData {
  type: 'job_posting' | 'subscription';
  amount: number;
  planName?: string;
  jobTitle?: string;
}

const Payment = () => {
  const [utrNumber, setUtrNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [upiId, setUpiId] = useState('writingjobexpert@paytm');
  const [qrCodeUrl, setQrCodeUrl] = useState('/placeholder.svg');
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Get payment data from location state
    if (location.state?.paymentData) {
      setPaymentData(location.state.paymentData);
    } else {
      // Redirect if no payment data
      navigate('/pricing');
    }
  }, [location.state, navigate]);

  const handleUtrSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber.trim()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call to submit UTR
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to success page or back to pricing
      navigate('/pricing', { 
        state: { 
          message: 'Payment submitted successfully! We will verify your payment and activate your account within 24 hours.' 
        }
      });
    } catch (error) {
      console.error('Error submitting UTR:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Payment Details...</h1>
          <p className="text-muted-foreground">Please wait while we prepare your payment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" asChild>
            <Link to="/pricing">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Pricing
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Complete Your Payment</h1>
          <p className="text-muted-foreground mt-2">
            Follow the steps below to complete your payment securely
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    {paymentData.type === 'job_posting' ? 'Job Posting Fee' : paymentData.planName}
                  </span>
                  <span className="text-lg font-bold text-success">₹{paymentData.amount}</span>
                </div>
                
                {paymentData.type === 'job_posting' && paymentData.jobTitle && (
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">Job Title:</p>
                    <p className="font-medium">{paymentData.jobTitle}</p>
                  </div>
                )}

                <div className="pt-2 border-t">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Secure UPI Payment</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Instant Verification</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>24/7 Support</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* UTR Submission Form */}
            <Card>
              <CardHeader>
                <CardTitle>Step 2: Submit UTR Number</CardTitle>
                <p className="text-sm text-muted-foreground">
                  After making the payment, enter your UTR (Unique Transaction Reference) number below
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUtrSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="utr">UTR Number</Label>
                    <Input
                      id="utr"
                      placeholder="Enter your UTR number"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      You can find this in your bank statement or UPI app
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting || !utrNumber.trim()}
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Payment'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* UPI Payment Instructions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Step 1: Make UPI Payment</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Scan the QR code or use the UPI ID to make payment
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* QR Code */}
                <div className="text-center">
                  <div className="inline-block p-4 bg-white rounded-lg shadow-card">
                    <QrCode className="h-32 w-32 mx-auto text-muted-foreground" />
                    <p className="text-xs text-muted-foreground mt-2">
                      Scan with any UPI app
                    </p>
                  </div>
                </div>

                {/* UPI ID */}
                <div className="space-y-2">
                  <Label>UPI ID</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={upiId}
                      readOnly
                      className="font-mono"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigator.clipboard.writeText(upiId)}
                    >
                      Copy
                    </Button>
                  </div>
                </div>

                {/* Payment Instructions */}
                <div className="space-y-3">
                  <h4 className="font-medium">Payment Instructions:</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-start space-x-2">
                      <span className="font-bold text-primary">1.</span>
                      <span>Open any UPI app (PhonePe, Google Pay, Paytm, etc.)</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="font-bold text-primary">2.</span>
                      <span>Scan the QR code or enter the UPI ID manually</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="font-bold text-primary">3.</span>
                      <span>Enter the exact amount: <strong>₹{paymentData.amount}</strong></span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="font-bold text-primary">4.</span>
                      <span>Complete the payment and note down the UTR number</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="font-bold text-primary">5.</span>
                      <span>Submit the UTR number in the form on the left</span>
                    </div>
                  </div>
                </div>

                {/* Important Note */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-amber-700">Important:</p>
                      <p className="text-amber-600">
                        Please ensure the payment amount matches exactly. 
                        Your account will be activated within 24 hours after verification.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <h4 className="font-medium">Need Help?</h4>
                  <p className="text-sm text-muted-foreground">
                    Contact our support team if you have any issues
                  </p>
                  <Button variant="outline" size="sm">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
