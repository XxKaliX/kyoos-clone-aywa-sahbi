
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SupportConversation, ChatMessage } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';
import { Send, MessageCircle } from 'lucide-react';

const SupportConversations = () => {
  const [conversations, setConversations] = useState<SupportConversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation);
    }
  }, [selectedConversation]);

  const loadConversations = () => {
    const allMessages = JSON.parse(localStorage.getItem('supportMessages') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Group messages by user
    const conversationMap = new Map<string, SupportConversation>();
    
    allMessages.forEach((message: ChatMessage) => {
      if (!message.isAdmin) {
        const user = users.find((u: any) => u.id === message.userId);
        if (!conversationMap.has(message.userId)) {
          conversationMap.set(message.userId, {
            id: message.userId,
            userId: message.userId,
            userName: message.userName,
            userEmail: user?.email || 'غير معروف',
            status: 'open',
            lastMessage: message.message,
            lastMessageTime: message.timestamp,
            unreadCount: 0
          });
        } else {
          const conv = conversationMap.get(message.userId)!;
          if (new Date(message.timestamp) > new Date(conv.lastMessageTime)) {
            conv.lastMessage = message.message;
            conv.lastMessageTime = message.timestamp;
          }
        }
      }
    });

    setConversations(Array.from(conversationMap.values()).sort((a, b) => 
      new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
    ));
  };

  const loadMessages = (conversationId: string) => {
    const allMessages = JSON.parse(localStorage.getItem('supportMessages') || '[]');
    const conversationMessages = allMessages.filter((msg: ChatMessage) => 
      msg.conversationId === conversationId || msg.userId === conversationId
    );
    setMessages(conversationMessages);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user || !selectedConversation) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      message: newMessage,
      timestamp: new Date().toISOString(),
      isAdmin: true,
      conversationId: selectedConversation
    };

    const allMessages = JSON.parse(localStorage.getItem('supportMessages') || '[]');
    allMessages.push(message);
    localStorage.setItem('supportMessages', JSON.stringify(allMessages));

    setMessages([...messages, message]);
    setNewMessage('');
    loadConversations(); // Refresh conversations list
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
        {/* Conversations List */}
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
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation === conversation.id
                        ? 'bg-blue-600'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="font-medium">{conversation.userName}</div>
                    <div className="text-sm text-gray-400">{conversation.userEmail}</div>
                    <div className="text-xs text-gray-500 mt-1 truncate">
                      {conversation.lastMessage}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(conversation.lastMessageTime).toLocaleString('ar')}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <div className="md:col-span-2">
          <Card className="bg-slate-800 border-slate-700 h-full">
            <CardHeader>
              <CardTitle>
                {selectedConversation 
                  ? conversations.find(c => c.id === selectedConversation)?.userName || 'محادثة'
                  : 'اختر محادثة'
                }
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[500px] flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.isAdmin ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-xs p-3 rounded-lg ${
                          message.isAdmin 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-700 text-white'
                        }`}
                      >
                        <div className="text-xs opacity-70 mb-1">
                          {message.userName} - {new Date(message.timestamp).toLocaleString('ar')}
                        </div>
                        <div>{message.message}</div>
                      </div>
                    </div>
                  ))}
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
                    />
                    <Button onClick={handleSendMessage}>
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
