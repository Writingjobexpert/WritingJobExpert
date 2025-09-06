import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { MessageCircle, Send, Plus, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
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
  user_name?: string;
  user_email?: string;
}

interface SupportMessage {
  id: string;
  ticket_id: string;
  sender_id: string;
  sender_type: string;
  message: string;
  created_at: string;
  sender_name?: string;
}

const SupportChat = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketMessage, setNewTicketMessage] = useState('');
  const [newTicketPriority, setNewTicketPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, [user]);

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
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .order('created_at', { ascending: false });

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
      .channel('support-messages')
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

  const createTicket = async () => {
    if (!user || !newTicketSubject.trim() || !newTicketMessage.trim()) return;

    setLoading(true);
    try {
      // Create ticket
      const { data: ticketData, error: ticketError } = await supabase
        .from('support_tickets')
        .insert({
          user_id: user.id,
          subject: newTicketSubject,
          priority: newTicketPriority,
          status: 'open'
        })
        .select()
        .single();

      if (ticketError) throw ticketError;

      // Create initial message
      const { error: messageError } = await supabase
        .from('support_messages')
        .insert({
          ticket_id: ticketData.id,
          sender_id: user.id,
          sender_type: 'user',
          message: newTicketMessage
        });

      if (messageError) throw messageError;

      toast({
        title: "Success",
        description: "Support ticket created successfully",
      });

      setNewTicketSubject('');
      setNewTicketMessage('');
      setIsDialogOpen(false);
      fetchTickets();
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

  const sendMessage = async () => {
    if (!user || !selectedTicket || !newMessage.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('support_messages')
        .insert({
          ticket_id: selectedTicket.id,
          sender_id: user.id,
          sender_type: 'user',
          message: newMessage
        });

      if (error) throw error;

      setNewMessage('');
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

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p>Please log in to access support chat.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="h-[600px] flex gap-4">
      {/* Tickets List */}
      <Card className="w-1/3">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Support Tickets
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1" />
                New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Support Ticket</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={newTicketSubject}
                    onChange={(e) => setNewTicketSubject(e.target.value)}
                    placeholder="Brief description of your issue"
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newTicketPriority} onValueChange={(value: 'low' | 'medium' | 'high') => setNewTicketPriority(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={newTicketMessage}
                    onChange={(e) => setNewTicketMessage(e.target.value)}
                    placeholder="Describe your issue in detail"
                    rows={4}
                  />
                </div>
                <Button onClick={createTicket} disabled={loading} className="w-full">
                  {loading ? 'Creating...' : 'Create Ticket'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
                    {format(new Date(ticket.created_at), 'MMM dd')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1">
        {selectedTicket ? (
          <>
            <CardHeader>
              <CardTitle className="text-lg">{selectedTicket.subject}</CardTitle>
              <div className="flex gap-2">
                {getStatusBadge(selectedTicket.status)}
                {getPriorityBadge(selectedTicket.priority)}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col h-[480px]">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.sender_type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs opacity-70">
                          {message.sender_name}
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
                  placeholder="Type your message..."
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

export default SupportChat;