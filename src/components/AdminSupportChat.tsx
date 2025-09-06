import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Send, Clock, AlertCircle, CheckCircle, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface SupportTicket {
  id: string;
  subject: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

interface SupportMessage {
  id: string;
  ticket_id: string;
  sender_id: string;
  sender_type: string;
  message: string;
  created_at: string;
}

const AdminSupportChat = () => {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchTickets();
  }, [statusFilter]);

  useEffect(() => {
    if (selectedTicket) {
      fetchMessages(selectedTicket.id);
      setupRealtimeSubscription(selectedTicket.id);
    }
  }, [selectedTicket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchTickets = async () => {
    try {
      let query = supabase
        .from('support_tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;

      setTickets(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch support tickets",
        variant: "destructive",
      });
    }
  };

  const fetchMessages = async (ticketId: string) => {
    try {
      const { data, error } = await supabase
        .from('support_messages')
        .select('*')
        .eq('ticket_id', ticketId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "destructive",
      });
    }
  };

  const setupRealtimeSubscription = (ticketId: string) => {
    const channel = supabase
      .channel('admin-support-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'support_messages',
          filter: `ticket_id=eq.${ticketId}`
        },
        (payload) => {
          const newMessage = payload.new as SupportMessage;
          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async () => {
    if (!selectedTicket || !newMessage.trim()) return;

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('support_messages')
        .insert({
          ticket_id: selectedTicket.id,
          sender_id: user.id,
          sender_type: 'admin',
          message: newMessage
        });

      if (error) throw error;

      setNewMessage('');
      
      // Update ticket status to in_progress if it's currently open
      if (selectedTicket.status === 'open') {
        await updateTicketStatus(selectedTicket.id, 'in_progress');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTicketStatus = async (ticketId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('support_tickets')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', ticketId);

      if (error) throw error;

      // Update local state
      setTickets(prev => prev.map(ticket => 
        ticket.id === ticketId ? { ...ticket, status } : ticket
      ));
      
      if (selectedTicket?.id === ticketId) {
        setSelectedTicket(prev => prev ? { ...prev, status } : null);
      }

      toast({
        title: "Success",
        description: "Ticket status updated",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      open: { color: 'bg-blue-500', icon: Clock },
      in_progress: { color: 'bg-yellow-500', icon: AlertCircle },
      closed: { color: 'bg-green-500', icon: CheckCircle }
    };
    const variant = variants[status as keyof typeof variants] || variants.open;
    const Icon = variant.icon;
    
    return (
      <Badge className={`${variant.color} text-white`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      low: 'bg-gray-500',
      medium: 'bg-yellow-500',
      high: 'bg-red-500'
    };
    return (
      <Badge className={`${colors[priority as keyof typeof colors]} text-white`}>
        {priority}
      </Badge>
    );
  };

  return (
    <div className="h-[600px] flex gap-4">
      {/* Tickets List */}
      <Card className="w-1/3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Support Tickets
          </CardTitle>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tickets</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[500px] overflow-y-auto">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`p-4 border-b cursor-pointer hover:bg-muted/50 ${
                  selectedTicket?.id === ticket.id ? 'bg-muted' : ''
                }`}
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm truncate">{ticket.subject}</h4>
                  {getStatusBadge(ticket.status)}
                </div>
                <div className="flex justify-between items-center">
                  {getPriorityBadge(ticket.priority)}
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(ticket.created_at), 'MMM dd, HH:mm')}
                  </span>
                </div>
              </div>
            ))}
            {tickets.length === 0 && (
              <div className="p-4 text-center text-muted-foreground">
                No tickets found
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1">
        {selectedTicket ? (
          <>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{selectedTicket.subject}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    {getStatusBadge(selectedTicket.status)}
                    {getPriorityBadge(selectedTicket.priority)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={selectedTicket.status} onValueChange={(value) => updateTicketStatus(selectedTicket.id, value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col h-[480px]">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_type === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.sender_type === 'admin'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs opacity-70 flex items-center gap-1">
                          {message.sender_type === 'admin' ? (
                            <>Admin</>
                          ) : (
                            <><User className="w-3 h-3" />User</>
                          )}
                        </span>
                        <span className="text-xs opacity-70">
                          {format(new Date(message.created_at), 'HH:mm')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your response..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button onClick={sendMessage} disabled={loading || !newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Select a ticket to start chatting</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default AdminSupportChat;