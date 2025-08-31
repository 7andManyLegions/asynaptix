
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAgents, type Agent } from '@/hooks/use-agents.tsx';
import { Link2, Wand2, Loader2, ArrowRight, Code, Info, Copy, Bot, Package } from 'lucide-react';
import { agentLinkingAssistance } from '@/ai/flows/agent-linking-assistance';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

type AssistanceResult = {
  suggestedConnectionPoints: string;
  dataFlowValidation: string;
  generatedCode: string;
} | null;

export default function AgentLinkingPage() {
  const [agent1Id, setAgent1Id] = useState<string | undefined>(undefined);
  const [agent2Id, setAgent2Id] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [setResult] = useState<AssistanceResult>(null);
  const { toast } = useToast();
  const router = useRouter();
  const { agents, addAgent } = useAgents();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentDescription, setNewAgentDescription] = useState('');
  const [isPackaging, setIsPackaging] = useState(false);
  const [result, setLinkingResult] = useState<AssistanceResult>(null);

  useEffect(() => {
    const savedState = sessionStorage.getItem('agentLinkingState');
    if (savedState) {
      try {
        const { agent1Id, agent2Id, result } = JSON.parse(savedState);
        setAgent1Id(agent1Id);
        setAgent2Id(agent2Id);
        setLinkingResult(result);
      } catch (e) {
          console.error("Could not parse agent linking state", e);
          sessionStorage.removeItem('agentLinkingState');
      }
    }
  }, []);

  useEffect(() => {
    // Prevent saving if both agents are not selected.
    // This avoids clearing state on reload when nothing is selected.
    if(agent1Id || agent2Id || result) {
      const stateToSave = { agent1Id, agent2Id, result };
      sessionStorage.setItem('agentLinkingState', JSON.stringify(stateToSave));
    }
  }, [agent1Id, agent2Id, result]);

  const handleSuggestLink = async () => {
    if (!agent1Id || !agent2Id) {
      toast({
        variant: 'destructive',
        title: 'Selection Incomplete',
        description: 'Please select both agents to get a suggestion.',
      });
      return;
    }

    if (agent1Id === agent2Id) {
        toast({
            variant: 'destructive',
            title: 'Invalid Selection',
            description: 'Please select two different agents.',
        });
        return;
    }

    setIsLoading(true);
    setLinkingResult(null);

    const agent1 = agents.find(a => a.id === agent1Id);
    const agent2 = agents.find(a => a.id === agent2Id);

    if (!agent1 || !agent2) {
        toast({
            variant: 'destructive',
            title: 'Agent not found',
            description: 'Could not find the selected agents.',
        });
        setIsLoading(false);
        return;
    }

    try {
      const response = await agentLinkingAssistance({
        agent1Description: `Name: ${agent1.name}, Description: ${agent1.description}`,
        agent2Description: `Name: ${agent2.name}, Description: ${agent2.description}`,
      });
      setLinkingResult(response);
      setNewAgentName(`${agent1.name} + ${agent2.name}`);
      setNewAgentDescription(`An agent that combines the functionality of "${agent1.name}" and "${agent2.name}".`);
    } catch (error) {
      console.error('Error getting linking assistance:', error);
      toast({
        variant: 'destructive',
        title: 'AI Assistance Error',
        description: 'Failed to get a suggestion. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (result?.generatedCode) {
      navigator.clipboard.writeText(result.generatedCode);
      toast({
        title: 'Code Copied',
        description: 'The generated linking code has been copied to your clipboard.',
      });
    }
  };

  const handleAutoCreateAgent = async () => {
    if (!newAgentName) {
      toast({
        variant: 'destructive',
        title: 'Agent Name Required',
        description: 'Please provide a name for your new agent.',
      });
      return;
    }
    setIsPackaging(true);
    const newAgent = {
      id: newAgentName.toLowerCase().replace(/\s+/g, '-'),
      name: newAgentName,
      description: newAgentDescription,
      price: "free" as const,
      securityRating: "none" as const,
      imageUrl: 'https://picsum.photos/600/400',
      imageHint: 'abstract nodes',
      isUserCreated: true,
    };
    await addAgent(newAgent);
    setIsPackaging(false);
    toast({
        title: "Agent Packaged!",
        description: `Your new agent "${newAgentName}" has been created and is ready to be used.`,
    });
    setIsDialogOpen(false);
    router.push('/my-agents');
  };
  
  const agent1 = agents.find(a => a.id === agent1Id);
  const agent2 = agents.find(a => a.id === agent2Id);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Agent Linking Assistant</h1>
        <p className="text-muted-foreground mt-2">
          Select two agents to get AI-powered suggestions on how to connect them.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Agents</CardTitle>
          <CardDescription>Choose the two agents you want to link together.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <Select onValueChange={(value) => setAgent1Id(value === "" ? undefined : value)} value={agent1Id}>
              <SelectTrigger>
                <SelectValue placeholder="Select Agent 1" />
              </SelectTrigger>
              <SelectContent>
                {agents.map(agent => (
                  <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

             <Select onValueChange={(value) => setAgent2Id(value === "" ? undefined : value)} value={agent2Id}>
              <SelectTrigger>
                <SelectValue placeholder="Select Agent 2" />
              </SelectTrigger>
              <SelectContent>
                {agents.map(agent => (
                  <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-center pt-4">
            <Button onClick={handleSuggestLink} disabled={isLoading || !agent1Id || !agent2Id}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Suggest Linking
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
            <Alert>
                <Link2 className="h-4 w-4" />
                <AlertTitle>AI Linking Suggestions</AlertTitle>
                <AlertDescription>
                    Here are the AI-powered recommendations for connecting your selected agents.
                </AlertDescription>
            </Alert>
          <Card>
            <CardHeader>
              <CardTitle>Suggested Connection Points</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>{result.suggestedConnectionPoints}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Data Flow Validation</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>{result.dataFlowValidation}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex justify-between items-center flex-row">
              <CardTitle>Generated Linking Code</CardTitle>
              <Button variant="ghost" size="icon" onClick={handleCopyCode}>
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy code</span>
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code className="font-mono text-sm">{result.generatedCode}</code>
              </pre>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex-row items-center gap-4 space-y-0">
                <Info className="h-6 w-6 text-primary"/>
                <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>
                    You have two options to create your new, combined agent.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Card className="flex-1 p-4">
                        <h4 className="font-semibold mb-2">Option 1: Auto Create</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                           Let us create and package the agent for you with one click.
                        </p>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="w-full"><Bot className="mr-2 h-4 w-4"/> Auto Create Agent</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>Create New Linked Agent</DialogTitle>
                                <DialogDescription>
                                    Confirm the details for your new agent. You can adjust the underlying models for each of the original agents.
                                </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="new-agent-name">Agent Name</Label>
                                        <Input id="new-agent-name" value={newAgentName} onChange={(e) => setNewAgentName(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-agent-desc">Description</Label>
                                        <Input id="new-agent-desc" value={newAgentDescription} onChange={(e) => setNewAgentDescription(e.target.value)} />
                                    </div>
                                    <Card>
                                        <CardHeader className="p-4">
                                            <CardTitle className="text-base">{agent1?.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-0">
                                            <Label>Model</Label>
                                             <Select defaultValue="gemini-2.5-flash">
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
                                                    <SelectItem value="openai">OpenAI GPT-4</SelectItem>
                                                    <SelectItem value="local">Local Llama3</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </CardContent>
                                    </Card>
                                     <Card>
                                        <CardHeader className="p-4">
                                            <CardTitle className="text-base">{agent2?.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-0">
                                            <Label>Model</Label>
                                             <Select defaultValue="gemini-2.5-flash">
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
                                                    <SelectItem value="openai">OpenAI GPT-4</SelectItem>
                                                    <SelectItem value="local">Local Llama3</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </CardContent>
                                    </Card>
                                </div>
                                <DialogFooter>
                                <Button onClick={handleAutoCreateAgent} disabled={isPackaging}>
                                  {isPackaging ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Package className="mr-2 h-4 w-4"/>}
                                  {isPackaging ? 'Packaging...' : 'Create and Package'}
                                </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </Card>
                    <Card className="flex-1 p-4">
                         <h4 className="font-semibold mb-2">Option 2: Manual Setup</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                           Copy the code and use it in the Agent Builder for more control.
                        </p>
                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/build">
                                <ArrowRight className="mr-2 h-4 w-4"/>
                                Go to Agent Builder
                            </Link>
                        </Button>
                    </Card>
                </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

    