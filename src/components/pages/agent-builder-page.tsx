
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { tools, type Tool } from '@/lib/data';
import { useAgents } from '@/hooks/use-agents.tsx';
import { ToolCard } from '../common/tool-card';
import { Badge } from '../ui/badge';
import { X, Wand2, Package, Save, KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { agentCreationAssistant } from '@/ai/flows/agent-creation-assistant';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ApiKey = {
  service: string;
  key: string;
  lastFour: string;
};

const SUPPORTED_SERVICES = [
    { id: 'google-ai', name: 'Google AI', models: ['gemini-2.5-flash'] },
    { id: 'openai', name: 'OpenAI', models: ['openai-gpt-4'] },
    { id: 'deepseek', name: 'DeepSeek', models: ['deepseek-coder'] },
    { id: 'local', name: 'Local Llama3', models: ['local-llama3'], noKey: true },
];

export default function AgentBuilderPage() {
  const [agentName, setAgentName] = useState('');
  const [agentDescription, setAgentDescription] = useState('');
  const [agentLogic, setAgentLogic] = useState('');
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { addAgent } = useAgents();
  const router = useRouter();

  const [selectedModel, setSelectedModel] = useState('');
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isKeyDialogOpen, setIsKeyDialogOpen] = useState(false);
  const [newApiKey, setNewApiKey] = useState('');
  const [serviceForNewKey, setServiceForNewKey] = useState<{id: string, name: string} | null>(null);

  useEffect(() => {
    // Load keys from localStorage on mount
    try {
      const savedKeys = localStorage.getItem('apiKeys');
      if (savedKeys) {
        setApiKeys(JSON.parse(savedKeys));
      }
    } catch (error) {
      console.error("Failed to load API keys from localStorage", error);
    }
  }, []);

  const saveApiKeys = (keys: ApiKey[]) => {
    try {
      localStorage.setItem('apiKeys', JSON.stringify(keys));
      setApiKeys(keys);
    } catch (error) {
      console.error("Failed to save API keys to localStorage", error);
    }
  };
  
  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    const service = SUPPORTED_SERVICES.find(s => s.models.includes(modelId));

    if (service && !service.noKey) {
        const keyExists = apiKeys.some(k => k.service === service.id);
        if (!keyExists) {
            setServiceForNewKey({id: service.id, name: service.name});
            setIsKeyDialogOpen(true);
        }
    }
  }

  const handleSaveNewKey = () => {
    if (!serviceForNewKey || !newApiKey) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please provide an API key."
        });
        return;
    }

    const lastFour = newApiKey.slice(-4);
    const newKeyEntry: ApiKey = { service: serviceForNewKey.id, key: newApiKey, lastFour };
    
    const existingKeys = apiKeys.filter(k => k.service !== serviceForNewKey.id);
    const updatedKeys = [...existingKeys, newKeyEntry];
    
    saveApiKeys(updatedKeys);

    toast({
        title: "API Key Saved",
        description: `Your key for ${serviceForNewKey.name} has been saved.`
    });

    // Close dialog and clear inputs
    setIsKeyDialogOpen(false);
    setNewApiKey('');
    setServiceForNewKey(null);
  }

  const handleAddTool = (tool: Tool) => {
    if (!selectedTools.find(t => t.id === tool.id)) {
      setSelectedTools([...selectedTools, tool]);
      toast({
        title: "Tool Added",
        description: `${tool.name} has been added to your agent.`,
      })
    } else {
        toast({
            variant: "destructive",
            title: "Tool Already Added",
            description: `${tool.name} is already part of your agent.`,
        })
    }
  };

  const handleRemoveTool = (toolId: string) => {
    setSelectedTools(selectedTools.filter(t => t.id !== toolId));
  };

  const handleGetSuggestion = async () => {
    if (!agentDescription) {
      toast({
        variant: 'destructive',
        title: 'Description needed',
        description: 'Please provide a description of your agent to get an AI suggestion.',
      });
      return;
    }
    setIsGenerating(true);
    try {
      const result = await agentCreationAssistant({
        desiredFunctionality: agentDescription,
        existingCode: agentLogic,
      });
      setAgentLogic(result.codeSnippet);
      toast({
        title: 'AI Suggestion Applied',
        description: 'The AI-generated code has been added to the logic editor.',
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Suggestion',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveDraft = () => {
    if (!agentName) {
      toast({
        variant: 'destructive',
        title: 'Agent Name Required',
        description: 'Please provide a name for your agent before saving.',
      });
      return;
    }
    toast({
      title: 'Draft Saved!',
      description: `Your agent "${agentName}" has been saved as a draft.`,
    });
  };

  const handlePackageAgent = () => {
    if (!agentName) {
      toast({
        variant: 'destructive',
        title: 'Agent Name Required',
        description: 'Please provide a name for your agent before packaging.',
      });
      return;
    }

    const newAgent = {
      id: agentName.toLowerCase().replace(/\s+/g, '-'),
      name: agentName,
      description: agentDescription,
      price: "free" as const,
      securityRating: "none" as const,
      imageUrl: 'https://picsum.photos/600/400',
      imageHint: 'abstract technology',
      isUserCreated: true,
    };
    addAgent(newAgent);

    toast({
      title: 'Agent Packaged!',
      description: `The agent "${agentName}" has been packaged successfully.`,
    });

    router.push('/my-agents');
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Agent Configuration</CardTitle>
            <CardDescription>Define the core properties and logic of your agent.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agent-name">Agent Name</Label>
              <Input id="agent-name" placeholder="e.g., Customer Support Bot" value={agentName} onChange={e => setAgentName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agent-description">Description</Label>
              <Textarea id="agent-description" placeholder="Describe what your agent does..." value={agentDescription} onChange={e => setAgentDescription(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Model</Label>
              <Select onValueChange={handleModelChange} value={selectedModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
                  <SelectItem value="openai-gpt-4">OpenAI GPT-4</SelectItem>
                  <SelectItem value="deepseek-coder">DeepSeek Coder</SelectItem>
                  <SelectItem value="local-llama3">Local Llama3</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="agent-logic">Agent Logic / Orchestration</Label>
                <Button variant="ghost" size="sm" onClick={handleGetSuggestion} disabled={isGenerating}>
                  <Wand2 className="mr-2 h-4 w-4" />
                  {isGenerating ? 'Generating...' : 'AI Assist'}
                </Button>
              </div>
              <Textarea
                id="agent-logic"
                placeholder="Enter agent logic, or use AI Assist to generate it."
                className="min-h-[250px] font-mono text-sm"
                value={agentLogic}
                onChange={e => setAgentLogic(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
             <Button variant="secondary" onClick={handleSaveDraft}><Save className="mr-2 h-4 w-4"/> Save Draft</Button>
             <Button onClick={handlePackageAgent}><Package className="mr-2 h-4 w-4"/> Package Agent</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="lg:col-span-1 space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Selected Tools</CardTitle>
                <CardDescription>Tools your agent can utilize.</CardDescription>
            </CardHeader>
            <CardContent>
                {selectedTools.length > 0 ? (
                    <div className="space-y-2">
                        {selectedTools.map(tool => (
                            <div key={tool.id} className="flex items-center justify-between rounded-md border p-2">
                                <span className="text-sm font-medium">{tool.name}</span>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveTool(tool.id)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No tools added yet.</p>
                )}
            </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Available Tools</CardTitle>
            <CardDescription>Click to add tools to your agent.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
            {tools.map(tool => (
              <div key={tool.id} className="transform transition-transform duration-200 hover:scale-[1.02]">
                <div 
                    className="cursor-pointer" 
                    onClick={() => handleAddTool(tool)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleAddTool(tool)}
                >
                    <Card className="p-3 shadow-sm hover:shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                                <tool.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm">{tool.name}</h4>
                                <p className="text-xs text-muted-foreground">{tool.description}</p>
                            </div>
                        </div>
                    </Card>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

       <Dialog open={isKeyDialogOpen} onOpenChange={setIsKeyDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>API Key Required for {serviceForNewKey?.name}</DialogTitle>
                    <DialogDescription>
                        You have not configured an API key for {serviceForNewKey?.name}. Please add one to continue.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-2 py-4">
                    <Label htmlFor="new-api-key">API Key for {serviceForNewKey?.name}</Label>
                    <Input
                        id="new-api-key"
                        type="password"
                        value={newApiKey}
                        onChange={(e) => setNewApiKey(e.target.value)}
                        placeholder={`Enter your ${serviceForNewKey?.name} API key`}
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsKeyDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSaveNewKey}><Save className="mr-2 h-4 w-4"/> Save Key</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}

