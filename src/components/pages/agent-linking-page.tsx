"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { agents } from '@/lib/data';
import { Link2, Wand2, Loader2, ArrowRight, Code } from 'lucide-react';
import { agentLinkingAssistance } from '@/ai/flows/agent-linking-assistance';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type AssistanceResult = {
  suggestedConnectionPoints: string;
  dataFlowValidation: string;
  generatedCode: string;
} | null;

export default function AgentLinkingPage() {
  const [agent1Id, setAgent1Id] = useState<string | null>(null);
  const [agent2Id, setAgent2Id] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AssistanceResult>(null);
  const { toast } = useToast();

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
    setResult(null);

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
      setResult(response);
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
            <Select onValueChange={setAgent1Id}>
              <SelectTrigger>
                <SelectValue placeholder="Select Agent 1" />
              </SelectTrigger>
              <SelectContent>
                {agents.map(agent => (
                  <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

             <Select onValueChange={setAgent2Id}>
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
            <CardHeader>
              <CardTitle>Generated Linking Code</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code className="font-mono text-sm">{result.generatedCode}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
