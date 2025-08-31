import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Agent } from '@/lib/data';
import { SecurityBadge } from './security-badge';
import { ArrowRight, UploadCloud } from 'lucide-react';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from '../ui/input';
import { useToast } from '@/hooks/use-toast';
import { suggestAgentPrice } from '@/ai/flows/suggest-agent-price';
import { Loader2 } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [publishType, setPublishType] = useState<'free' | 'paid'>('free');
  const [price, setPrice] = useState<string>('');
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const { toast } = useToast();

  const handleGetPriceSuggestion = async () => {
    setIsLoadingPrice(true);
    try {
      const result = await suggestAgentPrice({ agentDescription: agent.description });
      setPrice(result.suggestedPrice.toString());
      toast({
        title: "Price Suggested",
        description: result.justification,
      })
    } catch (error) {
      console.error("Error suggesting price:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not suggest a price at this time."
      });
    } finally {
      setIsLoadingPrice(false);
    }
  }

  const handlePublish = () => {
    // Here you would update the agent's state in your backend
    toast({
      title: "Agent Published!",
      description: `${agent.name} has been published as a ${publishType} agent.`,
    });
    setIsPublishDialogOpen(false);
  }

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
            <Image
                src={agent.imageUrl}
                alt={agent.name}
                fill
                className="object-cover"
                data-ai-hint={agent.imageHint}
            />
            <div className="absolute top-2 right-2">
                <SecurityBadge rating={agent.securityRating} />
            </div>
            {agent.isUserCreated && (
                 <Dialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="absolute bottom-2 right-2" size="sm" variant="secondary">
                            <UploadCloud className="mr-2 h-4 w-4"/>
                            Publish
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Publish {agent.name}</DialogTitle>
                        <DialogDescription>
                            Make your agent available in the marketplace. Choose whether to offer it for free or set a price.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-6">
                            <RadioGroup defaultValue="free" onValueChange={(value: 'free' | 'paid') => setPublishType(value)}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="free" id="r1" />
                                    <Label htmlFor="r1">Free</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="paid" id="r2" />
                                    <Label htmlFor="r2">Paid</Label>
                                </div>
                            </RadioGroup>

                            {publishType === 'paid' && (
                                <div className="space-y-2 animate-in fade-in-50">
                                    <Label htmlFor="price">Set a Monthly Price (USD)</Label>
                                    <div className="flex gap-2">
                                        <Input id="price" type="number" placeholder="e.g., 9.99" value={price} onChange={e => setPrice(e.target.value)} />
                                        <Button variant="outline" onClick={handleGetPriceSuggestion} disabled={isLoadingPrice}>
                                            {isLoadingPrice ? <Loader2 className="animate-spin" /> : 'Suggest'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPublishDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handlePublish}>
                            <UploadCloud className="mr-2 h-4 w-4"/>
                            Publish Agent
                        </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="mb-2 text-lg font-headline">{agent.name}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3">{agent.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Badge variant={agent.price === 'free' ? 'secondary' : 'outline'}>{agent.price === 'free' ? 'Free' : 'Paid'}</Badge>
        <Button variant="ghost" size="sm">
          View
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}