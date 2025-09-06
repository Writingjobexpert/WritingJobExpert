import React from 'react';
import { Layout } from '@/components/Layout/Layout';
import SupportChat from '@/components/SupportChat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, HelpCircle, Mail } from 'lucide-react';

const Support = () => {
  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Support Center</h1>
            <p className="text-xl text-muted-foreground">
              Get help when you need it. Our support team is here to assist you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground">
                  Chat with our support team in real-time
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Help Center</h3>
                <p className="text-sm text-muted-foreground">
                  Browse our FAQ and knowledge base
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground">
                  Send us an email for detailed assistance
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Support Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <SupportChat />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Support;