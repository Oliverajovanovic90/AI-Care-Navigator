import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';
import { api } from '@/services/api';
import type { ChatMessage } from '@/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { TypingIndicator } from '@/components/LoadingSpinner';
import { cn } from '@/lib/utils';

const suggestedQuestions = [
  "Why was this authorization denied?",
  "Summarize this member's care gaps",
  "What are recommended next actions?",
  "Explain the policy reference",
];

export default function AIAssistant() {
  const location = useLocation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Context from navigation (member/authorization)
  const context = location.state as { 
    memberId?: string; 
    authorizationId?: string;
    initialQuery?: string;
  } | null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle initial query from navigation
  useEffect(() => {
    if (context?.initialQuery && messages.length === 0) {
      handleSendMessage(context.initialQuery);
    }
  }, [context]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await api.queryAI({
        query: content,
        context: {
          memberId: context?.memberId,
          authorizationId: context?.authorizationId,
        },
      });

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            AI Care Assistant
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Ask questions about authorizations, care gaps, and member care.
          </p>
        </div>
        {messages.length > 0 && (
          <Button variant="outline" size="sm" onClick={handleClearChat}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear Chat
          </Button>
        )}
      </div>

      {/* Context Banner */}
      {context?.memberId && (
        <div className="mb-4 rounded-lg bg-accent/50 border border-accent px-4 py-2 text-sm">
          <span className="text-accent-foreground">
            Context: Member {context.memberId}
            {context.authorizationId && ` • Authorization ${context.authorizationId}`}
          </span>
        </div>
      )}

      {/* Chat Messages */}
      <Card className="flex-1 overflow-hidden flex flex-col">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <div className="rounded-full bg-accent p-4 mb-4">
                <Bot className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                How can I help you today?
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mb-6">
                I can help explain authorization decisions, summarize care gaps, 
                and provide recommendations for member care.
              </p>
              
              {/* Suggested Questions */}
              <div className="grid gap-2 sm:grid-cols-2 w-full max-w-lg">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSendMessage(question)}
                    className="text-left px-4 py-3 rounded-lg border border-border bg-card hover:bg-accent hover:border-accent transition-colors text-sm"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-3 animate-fade-in',
                    message.role === 'user' ? 'flex-row-reverse' : ''
                  )}
                >
                  <div className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0',
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent text-accent-foreground'
                  )}>
                    {message.role === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={cn(
                      'max-w-[80%] rounded-2xl px-4 py-3',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-accent text-accent-foreground rounded-bl-md'
                    )}
                  >
                    <div className="text-sm whitespace-pre-wrap prose prose-sm max-w-none dark:prose-invert">
                      {message.content.split('\n').map((line, i) => {
                        // Handle bold text
                        const parts = line.split(/(\*\*[^*]+\*\*)/g);
                        return (
                          <p key={i} className={i > 0 ? 'mt-2' : ''}>
                            {parts.map((part, j) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={j}>{part.slice(2, -2)}</strong>;
                              }
                              return part;
                            })}
                          </p>
                        );
                      })}
                    </div>
                    <p className={cn(
                      'text-xs mt-2 opacity-70',
                      message.role === 'user' ? 'text-right' : ''
                    )}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground flex-shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-accent rounded-2xl rounded-bl-md">
                    <TypingIndicator />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </>
          )}
        </CardContent>

        {/* Input Area */}
        <div className="border-t border-border p-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about authorizations, care gaps, or member care..."
              className="min-h-[48px] max-h-32 resize-none"
              rows={1}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="h-12 w-12 flex-shrink-0"
              disabled={isLoading || !inputValue.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
