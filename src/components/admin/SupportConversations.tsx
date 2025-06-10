
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Send, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  message: string;
  created_at: string;
  is_admin: boolean;
  user_id: string;
  ticket_id: string;
}

interface Conversation {
  id: string;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  lastMessage?: string;
}

const SupportConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation);
    }
  }, [selectedConversation]);

  const loadConversations = async () => {
    try {
      setIsLoadingConversations(true);
      console.log('Loading conversations...');
      
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Conversations error:', error);
        throw error;
      }

      console.log('Loaded conversations:', data);

      const conversationsWithLastMessage = await Promise.all(
        (data || []).map(async (conv) => {
          const { data: lastMessageData } = await supabase
            .from('support_messages')
            .select('message')
            .eq('ticket_id', conv.id)
            .order('created_at', { ascending: false })
            .limit(1);

          return {
            ...conv,
            lastMessage: lastMessageData?.[0]?.message || 'لا توجد رسائل'
          };
        })
      );

      console.log('Conversations with last messages:', conversationsWithLastMessage);
      setConversations(conversationsWithLastMessage);
    } catch (error) {
      console.error('Error loading conversations:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل المحادثات",
        variant: "destructive",
      });
    } finally {
      setIsLoadingConversations(false);
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
    if (!newMessage.trim() || !user || !selectedConversation) return;

    setLoading(true);
    try {
      console.log('Sending message:', newMessage, 'to ticket:', selectedConversation);
      
      const { error } = await supabase
        .from('support_messages')
        .insert({
          ticket_id: selectedConversation,
          user_id: user.id,
          message: newMessage,
          is_admin: true
        });

      if (error) {
        console.error('Send message error:', error);
        throw error;
      }

      setNewMessage('');
      await loadMessages(selectedConversation);
      await loadConversations();
      
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
      <h2 className="text-2xl font-bold">محادثات الدعم الفني</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              المحادثات
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              <div className="space-y-2 p-4">
                {isLoadingConversations ? (
                  <div className="text-center text-gray-400">جاري تحميل المحادثات...</div>
                ) : conversations.length === 0 ? (
                  <div className="text-center text-gray-400">لا توجد محادثات</div>
                ) : (
                  conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedConversation === conversation.id
                          ? 'bg-blue-600'
                          : 'bg-slate-700 hover:bg-slate-600'
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="font-medium">{conversation.title}</div>
                      <div className="text-sm text-gray-400">
                        معرف المستخدم: {conversation.user_id.substring(0, 8)}...
                      </div>
                      <div className="text-xs text-gray-500 mt-1 truncate">
                        {conversation.lastMessage}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(conversation.updated_at).toLocaleString('ar')}
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
                {selectedConversation 
                  ? conversations.find(c => c.id === selectedConversation)?.title || 'محادثة'
                  : 'اختر محادثة'
                }
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[500px] flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.length === 0 && selectedConversation ? (
                    <div className="text-center text-gray-400">لا توجد رسائل في هذه المحادثة</div>
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

              {selectedConversation && (
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

export default SupportConversations;
