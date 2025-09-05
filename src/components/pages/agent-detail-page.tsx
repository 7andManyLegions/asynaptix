
"use client";

import { useAgents } from '@/hooks/use-agents';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SecurityBadge } from '../common/security-badge';
import { ArrowLeft, Edit, Share2, Play, ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import React from 'react';
import { cn } from '@/lib/utils';

interface AgentDetailPageProps {
  agentId: string;
}

export default function AgentDetailPage({ agentId }: AgentDetailPageProps) {
  const { agents } = useAgents();
  const agent = agents.find(a => a.id === agentId);
  const { toast } = useToast();
  const [userRating, setUserRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);

  if (!agent) {
    // In a real app, you might fetch data here or show a not found page.
    // For this prototype, we'll rely on the agent being in the context.
    return notFound();
  }
  
  const handlePurchase = () => {
    // This is a simulation of a purchase flow.
    // In a real app, this would trigger a Stripe checkout modal.
    toast({
        title: "Purchase Successful (Simulated)",
        description: `You now have access to ${agent.name}.`,
    });
    // Here you would typically update user's entitlements.
  }

  const handleRateAgent = () => {
    if (userRating === 0) {
        toast({
            variant: 'destructive',
            title: "No rating selected",
            description: "Please select a star rating before submitting.",
        })
        return;
    }
    // In a real app, you'd send this rating to your backend.
    // Here we just show a toast.
    toast({
        title: "Rating Submitted",
        description: `You rated ${agent.name} ${userRating} out of 5 stars. Thank you!`,
    })
  }

  const isPaidAgent = agent.price === 'paid';

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-8">
          <div>
              <Button variant="outline" asChild>
                  <Link href="/discover">
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
                  <div className="flex items-center gap-2 mt-4">
                      <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={cn("h-5 w-5", agent.rating >= star ? "text-yellow-500 fill-yellow-400" : "text-gray-300")} />
                          ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{agent.rating.toFixed(1)} ({agent.ratingCount} ratings)</p>
                  </div>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                  <SecurityBadge rating={agent.securityRating} showText={true} />
                  <Badge variant={!isPaidAgent ? 'secondary' : 'default'} className="text-lg py-1 px-4">
                      {isPaidAgent ? 'Paid' : 'Free'}
                  </Badge>
              </div>
          </CardHeader>
          <CardContent>
              <div className="flex gap-2 mt-4">
                  {isPaidAgent ? (
                      <Button onClick={handlePurchase}>
                          <ShoppingCart className="mr-2 h-4 w-4"/>
                          Purchase Agent
                      </Button>
                  ) : (
                      <Button asChild>
                          <Link href={`/agent/${agent.id}/run`}>
                              <Play className="mr-2 h-4 w-4"/>
                              Use Agent
                          </Link>
                      </Button>
                  )}
                   <Button variant="outline">
                      <Share2 className="mr-2 h-4 w-4"/>
                      Share
                  </Button>
                  {agent.isUserCreated && (
                      <Button variant="ghost" asChild>
                          <Link href="/build/new">
                              <Edit className="mr-2 h-4 w-4"/>
                              Edit
                          </Link>
                      </Button>
                  )}
              </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
            <Card>
            <CardHeader>
                <CardTitle>Agent Details</CardTitle>
                <CardDescription>Additional information and usage statistics.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
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

            <Card>
                <CardHeader>
                    <CardTitle>Rate this Agent</CardTitle>
                    <CardDescription>Share your experience to help others.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <div className="flex items-center" onMouseLeave={() => setHoverRating(0)}>
                         {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={cn("h-8 w-8 cursor-pointer transition-colors", (hoverRating || userRating) >= star ? "text-yellow-500 fill-yellow-400" : "text-gray-300")}
                                onMouseEnter={() => setHoverRating(star)}
                                onClick={() => setUserRating(star)}
                                />
                          ))}
                    </div>
                    <Button className="w-full" onClick={handleRateAgent}>Submit Rating</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
