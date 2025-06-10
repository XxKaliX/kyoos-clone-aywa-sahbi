
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Send, MessageCircle, Minimize2, Maximize2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  message: string;
  created_at: string;
  is_admin: boolean;
  user_id: string;
}

interface Ticket {
  id: string;
  title: string;
  status: string;
}

const UserSupportChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      initializeTicket();
    }
  }, [user]);

  const initializeTicket = async () => {
    if (!user) return;

    try {
      // Check for existing open ticket
      const { data: existingTickets, error } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'open')
        .limit(1);

      if (error) throw error;

      if (existingTickets && existingTickets.length > 0) {
        setCurrentTicket(existingTickets[0]);
        await loadMessages(existingTickets[0].id);
      } else {
        // Create new ticket
        const { data: newTicket, error: createError } = await supabase
          .from('support_tickets')
          .insert({
            user_id: user.id,
            title: `دعم فني - ${user.name}`,
            status: 'open',
            priority: 'medium'
          })
          .select()
          .single();

        if (createError) throw createError;
        setCurrentTicket(newTicket);
      }
    } catch (error) {
      console.error('Error initializing ticket:', error);
      toast({
        title: "خطأ",
        description: "فشل في تهيئة محادثة الدعم",
        variant: "destructive",
      });
    }
  };

  const loadMessages = async (ticketId: string) => {
    try {
      const { data, error } = await supabase
        .from('support_messages')
        .select('*')
        .eq('ticket_id', ticketId)
        .order('created_at', { ascending: true });

      if (error) throw error;
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
    if (!newMessage.trim() || !user || !currentTicket) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('support_messages')
        .insert({
          ticket_id: currentTicket.id,
          user_id: user.id,
          message: newMessage,
          is_admin: false
        });

      if (error) throw error;

      setNewMessage('');
      await loadMessages(currentTicket.id);
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

  if (!user) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={`bg-slate-800 border-slate-700 transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-80 h-96'
      }`}>
        <CardHeader className="cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
          <CardTitle className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              {t('support_chat_title')}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-400">{t('online_support')}</span>
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </div>
          </CardTitle>
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="p-0 h-80 flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {messages.length === 0 && (
                  <div className="text-center text-gray-400 text-sm">
                    {t('chat_with_support')}
                  </div>
                )}
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.is_admin ? 'justify-start' : 'justify-end'}`}
                  >
                    <div 
                      className={`max-w-xs p-2 rounded-lg text-sm ${
                        message.is_admin 
                          ? 'bg-gray-700 text-white' 
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      <div className="text-xs opacity-70 mb-1">
                        {message.is_admin ? 'الدعم الفني' : user.name} - {new Date(message.created_at).toLocaleString(language)}
                      </div>
                      <div>{message.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-3 border-t border-slate-700">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('type_message')}
                  className="flex-1 text-sm"
                  disabled={loading}
                />
                <Button onClick={handleSendMessage} size="sm" disabled={loading}>
                  <Send className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default UserSupportChat;
