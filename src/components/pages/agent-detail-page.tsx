
"use client";

import { useAgents } from '@/hooks/use-agents';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SecurityBadge } from '../common/security-badge';
import { ArrowLeft, Edit, Share2 } from 'lucide-react';
import Link from 'next/link';

interface AgentDetailPageProps {
  agentId: string;
}

export default function AgentDetailPage({ agentId }: AgentDetailPageProps) {
  const { agents } = useAgents();
  const agent = agents.find(a => a.id === agentId);

  if (!agent) {
    // In a real app, you might fetch data here or show a not found page.
    // For this prototype, we'll rely on the agent being in the context.
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <div>
            <Button variant="outline" asChild>
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Back to Discover
                </Link>
            </Button>
        </div>
      <Card className="overflow-hidden">
        <div className="relative h-64 w-full">
            <Image
                src={agent.imageUrl}
                alt={agent.name}
                fill
                className="object-cover"
                data-ai-hint={agent.imageHint}
            />
        </div>
        <CardHeader className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
                <CardTitle className="text-3xl font-headline">{agent.name}</CardTitle>
                <CardDescription className="mt-2 text-base">{agent.description}</CardDescription>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
                <SecurityBadge rating={agent.securityRating} showText={true} />
                <Badge variant={agent.price === 'free' ? 'secondary' : 'default'} className="text-lg py-1 px-4">
                    {agent.price === 'free' ? 'Free' : 'Paid'}
                </Badge>
            </div>
        </CardHeader>
        <CardContent>
            <div className="flex gap-2 mt-4">
                <Button>
                    Use Agent
                </Button>
                 <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4"/>
                    Share
                </Button>
                {agent.isUserCreated && (
                    <Button variant="ghost" asChild>
                        <Link href="/build">
                            <Edit className="mr-2 h-4 w-4"/>
                            Edit
                        </Link>
                    </Button>
                )}
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Agent Details</CardTitle>
            <CardDescription>Additional information and usage statistics.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Publisher</span>
                <span className="font-medium">{agent.isUserCreated ? "You" : "Community"}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Version</span>
                <span className="font-medium">1.0.0</span>
            </div>
             <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Total Runs</span>
                <span className="font-medium">1,234</span>
            </div>
            <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-medium">2 days ago</span>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

