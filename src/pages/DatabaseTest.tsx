import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Loader2, Database, Users, CreditCard, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DatabaseStatus {
  connected: boolean;
  error?: string;
  tables?: string[];
  data?: any;
}

const DatabaseTest = () => {
  const [status, setStatus] = useState<DatabaseStatus>({ connected: false });
  const [loading, setLoading] = useState(false);

  const testDatabaseConnection = async () => {
    setLoading(true);
    try {
      // Database connection is disabled
      setStatus({ 
        connected: false, 
        error: 'Database connection has been disabled. No database operations available.' 
      });
    } catch (err) {
      setStatus({ 
        connected: false, 
        error: 'Database connection disabled' 
      });
    } finally {
      setLoading(false);
    }
  };

  const testSpecificTable = async (tableName: string) => {
    try {
      const { data, error } = await supabase.from(tableName as any).select('*').limit(5);
      if (error) {
        console.error(`Error testing ${tableName}:`, error);
        return { success: false, error: error.message };
      }
      return { success: true, data: data?.length || 0 };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
    }
  };

  useEffect(() => {
    testDatabaseConnection();
  }, []);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Database Connection Test</h1>
          <p className="text-muted-foreground">
            Testing Supabase database connection and table accessibility
          </p>
        </div>

        <div className="grid gap-6">
          {/* Connection Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Connection Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : status.connected ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span className="font-medium">
                    {loading ? 'Testing...' : status.connected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                <Button onClick={testDatabaseConnection} disabled={loading}>
                  {loading ? 'Testing...' : 'Test Again'}
                </Button>
              </div>
              
              {status.error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-700 text-sm">
                    <strong>Error:</strong> {status.error}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Database Info */}
          {status.connected && (
            <Card>
              <CardHeader>
                <CardTitle>Database Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Database Status:</h4>
                    <p className="text-sm text-muted-foreground font-mono">
                      Database connection disabled
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Configuration Status:</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="border-red-200 text-red-800">
                        Database Disconnected
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Available Tables:</h4>
                    <div className="flex flex-wrap gap-2">
                      {status.tables?.map((table) => (
                        <Badge key={table} variant="secondary">
                          {table}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {status.data && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {status.data.workingTables.length}
                        </div>
                        <div className="text-sm text-green-700">Working Tables</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {status.data.totalTables}
                        </div>
                        <div className="text-sm text-blue-700">Total Tables</div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Table Tests */}
          {status.connected && (
            <Card>
              <CardHeader>
                <CardTitle>Table Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <Users className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="font-medium">Profiles</div>
                        <div className="text-sm text-muted-foreground">User profiles</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <FileText className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-medium">Jobs</div>
                        <div className="text-sm text-muted-foreground">Job listings</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <CreditCard className="h-5 w-5 text-purple-500" />
                      <div>
                        <div className="font-medium">Payments</div>
                        <div className="text-sm text-muted-foreground">Payment records</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>• If connected: Your database is working properly</p>
                <p>• If disconnected: Check your Supabase project settings</p>
                <p>• Make sure your Supabase project is active and not paused</p>
                <p>• Verify the API keys are correct in the client configuration</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DatabaseTest;
