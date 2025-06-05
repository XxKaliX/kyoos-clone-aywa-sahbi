
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Send, MessageCircle, Minimize2, Maximize2 } from 'lucide-react';

const UserSupportChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const { user } = useAuth();
  const { t, language } = useLanguage();

  useEffect(() => {
    if (user) {
      const savedMessages = localStorage.getItem('supportMessages');
      if (savedMessages) {
        const allMessages = JSON.parse(savedMessages);
        const userMessages = allMessages.filter((msg: ChatMessage) => 
          msg.conversationId === user.id || msg.userId === user.id
        );
        setMessages(userMessages);
      }
    }
  }, [user]);

  const saveMessages = (updatedMessages: ChatMessage[]) => {
    const allMessages = JSON.parse(localStorage.getItem('supportMessages') || '[]');
    
    // Remove old messages for this user
    const otherMessages = allMessages.filter((msg: ChatMessage) => 
      msg.conversationId !== user?.id && msg.userId !== user?.id
    );
    
    // Add updated messages
    const newAllMessages = [...otherMessages, ...updatedMessages];
    localStorage.setItem('supportMessages', JSON.stringify(newAllMessages));
    setMessages(updatedMessages);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      message: newMessage,
      timestamp: new Date().toISOString(),
      isAdmin: false,
      conversationId: user.id
    };

    saveMessages([...messages, message]);
    setNewMessage('');
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
                    className={`flex ${message.isAdmin ? 'justify-start' : 'justify-end'}`}
                  >
                    <div 
                      className={`max-w-xs p-2 rounded-lg text-sm ${
                        message.isAdmin 
                          ? 'bg-gray-700 text-white' 
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      <div className="text-xs opacity-70 mb-1">
                        {message.userName} - {new Date(message.timestamp).toLocaleString(language)}
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
                />
                <Button onClick={handleSendMessage} size="sm">
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
