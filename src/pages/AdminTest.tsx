import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AdminTest = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Admin Test Page</CardTitle>
          <p className="text-center text-muted-foreground">This is a test to verify admin routing works</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-green-600 font-medium">✅ Admin route is working!</p>
            <p className="text-sm text-muted-foreground mt-2">
              If you can see this page, the routing is working correctly.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button asChild className="flex-1">
              <Link to="/admin">Go to Full Admin</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTest;
