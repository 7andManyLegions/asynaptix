import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Agent } from '@/lib/data';
import { SecurityBadge } from './security-badge';
import { ArrowRight, UploadCloud, ShieldCheck, ShieldAlert, Shield } from 'lucide-react';
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
import { assessAgentSecurity, type AssessAgentSecurityOutput } from '@/ai/flows/assess-agent-security';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { useAgents } from '@/hooks/use-agents';

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [publishType, setPublishType] = useState<'free' | 'paid'>('free');
  const [price, setPrice] = useState<string>('');
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [isAssessingSecurity, setIsAssessingSecurity] = useState(false);
  const [securityAssessment, setSecurityAssessment] = useState<AssessAgentSecurityOutput | null>(null);
  const { toast } = useToast();
  const { updateAgent } = useAgents();

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

  const handleRunSecurityScan = async () => {
    setIsAssessingSecurity(true);
    setSecurityAssessment(null);
    try {
        const result = await assessAgentSecurity({
            agentDescription: agent.description,
            // In a real app, we'd pass the actual agent code here.
            // For now, the description is a good proxy.
            agentCode: `Name: ${agent.name}\nDescription: ${agent.description}`
        });
        setSecurityAssessment(result);
    } catch (error) {
        console.error("Error assessing security:", error);
        toast({
            variant: "destructive",
            title: "Security Scan Failed",
            description: "Could not run the security assessment at this time."
        });
    } finally {
        setIsAssessingSecurity(false);
    }
  };

  const handlePublish = () => {
    let newRating = agent.securityRating;
    if (securityAssessment) {
      if(securityAssessment.overallRating === 'secure') newRating = 'scanned';
      if(securityAssessment.overallRating === 'caution') newRating = 'scanned';
      if(securityAssessment.overallRating === 'insecure') newRating = 'none';
    }

    const updatedAgent = {
        ...agent,
        price: publishType,
        // In a real app, this price would be stored as a number.
        // For the UI, we'll just reflect the choice.
        ...(publishType === 'paid' && { price: 'paid' }),
        securityRating: newRating
    }
    
    updateAgent(updatedAgent);
    
    toast({
      title: "Agent Published!",
      description: `${agent.name} has been published to the marketplace.`,
    });
    setIsPublishDialogOpen(false);
    setSecurityAssessment(null);
  }

  const getAssessmentIcon = () => {
    if (!securityAssessment) return null;
    switch (securityAssessment.overallRating) {
        case 'secure':
            return <ShieldCheck className="h-5 w-5 text-green-500" />;
        case 'caution':
            return <Shield className="h-5 w-5 text-yellow-500" />;
        case 'insecure':
            return <ShieldAlert className="h-5 w-5 text-red-500" />;
        default:
            return null;
    }
  };

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
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                        <DialogTitle>Publish {agent.name}</DialogTitle>
                        <DialogDescription>
                            Make your agent available in the marketplace. First, run a security scan, then choose a pricing model.
                        </DialogDescription>
                        </DialogHeader>
                        
                        <div className="py-4 space-y-6">
                            <Card>
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-lg">Step 1: Security Assessment</CardTitle>
                                    <CardDescription>Run an automated security scan to identify potential vulnerabilities.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {!securityAssessment && (
                                        <Button onClick={handleRunSecurityScan} disabled={isAssessingSecurity}>
                                            {isAssessingSecurity ? <Loader2 className="animate-spin mr-2"/> : <Shield className="mr-2 h-4 w-4"/>}
                                            {isAssessingSecurity ? 'Scanning...' : 'Run Security Scan'}
                                        </Button>
                                    )}

                                    {isAssessingSecurity && <p className="text-sm text-muted-foreground">Assessing agent security, please wait...</p>}
                                    
                                    {securityAssessment && (
                                        <div className="space-y-4 animate-in fade-in-50">
                                            <Alert>
                                                {getAssessmentIcon()}
                                                <AlertTitle>Scan Complete: {securityAssessment.overallRating.charAt(0).toUpperCase() + securityAssessment.overallRating.slice(1)}</AlertTitle>
                                                <AlertDescription>{securityAssessment.summary}</AlertDescription>
                                            </Alert>
                                            {securityAssessment.findings.length > 0 && (
                                                <div>
                                                    <h4 className="font-semibold mb-2">Findings:</h4>
                                                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                                        {securityAssessment.findings.map((finding, index) => (
                                                            <li key={index}>
                                                                <strong>{finding.finding}</strong> - <span className="text-xs">{finding.recommendation}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            <Button variant="outline" size="sm" onClick={handleRunSecurityScan} disabled={isAssessingSecurity}>
                                                {isAssessingSecurity ? <Loader2 className="animate-spin mr-2"/> : null}
                                                Re-scan
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {securityAssessment && (
                                <Card className="animate-in fade-in-50">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-lg">Step 2: Set Price</CardTitle>
                                        <CardDescription>Choose whether to offer the agent for free or set a price.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
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
                                    </CardContent>
                                </Card>
                            )}

                        </div>

                        <DialogFooter>
                        <Button variant="outline" onClick={() => { setIsPublishDialogOpen(false); setSecurityAssessment(null); }}>Cancel</Button>
                        <Button onClick={handlePublish} disabled={!securityAssessment}>
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
