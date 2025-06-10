
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  message: string;
  created_at: string;
  is_admin: boolean;
  user_id: string;
  ticket_id: string;
}

interface Ticket {
  id: string;
  title: string;
  status: string;
  created_at: string;
  user_id: string;
}

const SupportChat = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoadingTickets, setIsLoadingTickets] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadTickets();
  }, []);

  useEffect(() => {
    if (selectedTicket) {
      loadMessages(selectedTicket);
    }
  }, [selectedTicket]);

  const loadTickets = async () => {
    try {
      setIsLoadingTickets(true);
      console.log('Loading tickets...');
      
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Tickets error:', error);
        throw error;
      }
      
      console.log('Loaded tickets:', data);
      setTickets(data || []);
    } catch (error) {
      console.error('Error loading tickets:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل التذاكر",
        variant: "destructive",
      });
    } finally {
      setIsLoadingTickets(false);
    }
  };

  const loadMessages = async (ticketId: string) => {
    try {
      console.log('Loading messages for ticket:', ticketId);
      
      const { data, error } = await supabase
        .from('support_messages')
        .select('*')
        .eq('ticket_id', ticketId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Messages error:', error);
        throw error;
      }
      
      console.log('Loaded messages:', data);
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل الرسائل",
        variant: "destructive",
      });
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user || !selectedTicket) return;

    setLoading(true);
    try {
      console.log('Sending message:', newMessage, 'to ticket:', selectedTicket);
      
      const { error } = await supabase
        .from('support_messages')
        .insert({
          ticket_id: selectedTicket,
          user_id: user.id,
          message: newMessage,
          is_admin: true
        });

      if (error) {
        console.error('Send message error:', error);
        throw error;
      }

      setNewMessage('');
      await loadMessages(selectedTicket);
      await loadTickets();
      
      toast({
        title: "تم إرسال الرسالة",
        description: "تم إرسال الرسالة بنجاح"
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "خطأ",
        description: "فشل في إرسال الرسالة",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">الدعم الفني</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>التذاكر</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              <div className="space-y-2 p-4">
                {isLoadingTickets ? (
                  <div className="text-center text-gray-400">جاري تحميل التذاكر...</div>
                ) : tickets.length === 0 ? (
                  <div className="text-center text-gray-400">لا توجد تذاكر</div>
                ) : (
                  tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedTicket === ticket.id
                          ? 'bg-blue-600'
                          : 'bg-slate-700 hover:bg-slate-600'
                      }`}
                      onClick={() => setSelectedTicket(ticket.id)}
                    >
                      <div className="font-medium">{ticket.title}</div>
                      <div className="text-sm text-gray-400">
                        معرف المستخدم: {ticket.user_id.substring(0, 8)}...
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(ticket.created_at).toLocaleString('ar')}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded mt-1 inline-block ${
                        ticket.status === 'open' ? 'bg-green-600' : 
                        ticket.status === 'in_progress' ? 'bg-yellow-600' : 'bg-red-600'
                      }`}>
                        {ticket.status === 'open' ? 'مفتوح' : 
                         ticket.status === 'in_progress' ? 'قيد المعالجة' : 'مغلق'}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Card className="bg-slate-800 border-slate-700 h-full">
            <CardHeader>
              <CardTitle>
                {selectedTicket 
                  ? tickets.find(t => t.id === selectedTicket)?.title || 'محادثة'
                  : 'اختر تذكرة'
                }
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[500px] flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.length === 0 && selectedTicket ? (
                    <div className="text-center text-gray-400">لا توجد رسائل في هذه التذكرة</div>
                  ) : (
                    messages.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex ${message.is_admin ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-xs p-3 rounded-lg ${
                            message.is_admin 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-700 text-white'
                          }`}
                        >
                          <div className="text-xs opacity-70 mb-1">
                            {message.is_admin ? 'الدعم الفني' : 'المستخدم'} - {new Date(message.created_at).toLocaleString('ar')}
                          </div>
                          <div>{message.message}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>

              {selectedTicket && (
                <div className="p-4 border-t border-slate-700">
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="اكتب رسالتك..."
                      className="flex-1"
                      disabled={loading}
                    />
                    <Button onClick={handleSendMessage} disabled={loading || !newMessage.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupportChat;
