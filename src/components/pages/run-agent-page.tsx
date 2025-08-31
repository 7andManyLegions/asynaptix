
"use client";

import { useState } from 'react';
import { useAgents } from '@/hooks/use-agents';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Send, Bot, User } from 'lucide-react';
import Link from 'next/link';

interface RunAgentPageProps {
  agentId: string;
}

type Message = {
    sender: 'user' | 'agent';
    text: string;
}

export default function RunAgentPage({ agentId }: RunAgentPageProps) {
  const { agents } = useAgents();
  const agent = agents.find(a => a.id === agentId);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!agent) {
    return notFound();
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate agent response
    setTimeout(() => {
        const agentResponse: Message = {
            sender: 'agent',
            text: `This is a simulated response for the "${agent.name}". In a real environment, the agent's logic would process your input: "${input}"`
        };
        setMessages(prev => [...prev, agentResponse]);
        setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
       <div>
            <Button variant="outline" asChild>
                <Link href={`/agent/${agentId}`}>
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Back to Agent Details
                </Link>
            </Button>
        </div>
      <Card className="flex flex-col h-[75vh]">
        <CardHeader>
          <CardTitle>Running: {agent.name}</CardTitle>
          <CardDescription>This is a simulated environment to interact with your agent.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col gap-4 overflow-hidden">
          <div className="flex-grow overflow-y-auto pr-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'agent' && (
                    <Avatar className="h-9 w-9 border">
                        <AvatarImage src={agent.imageUrl} alt={agent.name} />
                        <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                )}
                 <div className={`rounded-lg px-4 py-2 max-w-[70%] ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                   <p className="text-sm">{msg.text}</p>
                 </div>
                 {msg.sender === 'user' && (
                    <Avatar className="h-9 w-9 border">
                        <AvatarFallback><User/></AvatarFallback>
                    </Avatar>
                 )}
              </div>
            ))}
            {isLoading && (
                 <div className="flex items-start gap-3">
                    <Avatar className="h-9 w-9 border">
                        <AvatarImage src={agent.imageUrl} alt={agent.name} />
                        <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                     <div className="rounded-lg px-4 py-2 bg-muted">
                        <div className="flex items-center gap-2">
                           <span className="h-2 w-2 bg-foreground rounded-full animate-pulse delay-0"></span>
                           <span className="h-2 w-2 bg-foreground rounded-full animate-pulse delay-150"></span>
                           <span className="h-2 w-2 bg-foreground rounded-full animate-pulse delay-300"></span>
                        </div>
                     </div>
                 </div>
            )}
          </div>
          <form onSubmit={handleSendMessage} className="flex gap-2 border-t pt-4">
            <Input 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Send a message to the agent..." 
                disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="mr-2 h-4 w-4" />
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
