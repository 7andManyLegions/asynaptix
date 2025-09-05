"use client";

import { useState, useMemo } from 'react';
import { tools, type Tool } from '@/lib/data';
import { ToolCard } from '@/components/common/tool-card';
import { Input } from '@/components/ui/input';
import { Search, Plus, Wand2, Loader2, Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import { Switch } from '../ui/switch';
import { useToast } from '@/hooks/use-toast';
import { suggestToolCode } from '@/ai/flows/tool-code-suggestion';


export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [toolName, setToolName] = useState('');
  const [toolDescription, setToolDescription] = useState('');
  const [toolCategory, setToolCategory] = useState('');
  const [toolCode, setToolCode] = useState('');
  const [useAi, setUseAi] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleCreateTool = () => {
    // In a real application, you would save the new tool to a database.
    // Here, we just show a toast notification.
    toast({
        title: "Tool Created!",
        description: `Your new tool "${toolName}" has been created.`,
    });

    // Reset form
    setToolName('');
    setToolDescription('');
    setToolCategory('');
    setToolCode('');
    setUseAi(false);
    setAiPrompt('');
    setShowCreateForm(false);
  }

  const handleGenerateCode = async () => {
    if (!aiPrompt) {
        toast({
            variant: "destructive",
            title: "Prompt is required",
            description: "Please describe the tool you want to create.",
        });
        return;
    }
    setIsGenerating(true);
    try {
        const result = await suggestToolCode({
            toolDescription: aiPrompt,
        });
        setToolCode(result.codeSnippet);
        if(!toolName) setToolName(result.suggestedName);
        if(!toolDescription) setToolDescription(result.suggestedDescription);
        toast({
            title: "Code Generated",
            description: "The AI-generated code has been added to the editor.",
        });
    } catch (error) {
        console.error("Error generating tool code:", error);
        toast({
            variant: "destructive",
            title: "AI Generation Error",
            description: "Failed to generate code. Please try again.",
        });
    } finally {
        setIsGenerating(false);
    }
  }


  const { plugins, communityTools } = useMemo(() => {
    const allItems = tools.filter(tool =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return {
        plugins: allItems.filter(item => item.type === 'plugin'),
        communityTools: allItems.filter(item => item.type === 'tool')
    }
  }, [searchTerm]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Marketplace</h1>
          <p className="text-muted-foreground mt-2">Enhance your agents with powerful Tools and framework Plugins.</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
            <Plus className="mr-2 h-4 w-4" />
            {showCreateForm ? "Cancel" : "Create Tool"}
        </Button>
      </div>

       {showCreateForm && (
        <Card className="animate-in fade-in-50">
          <CardHeader>
            <CardTitle>Create a New Tool</CardTitle>
            <CardDescription>Define your custom tool. Use the AI assistant to generate the code or write it yourself.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="tool-name">Tool Name</Label>
                    <Input id="tool-name" placeholder="e.g., Weather API" value={toolName} onChange={e => setToolName(e.target.value)} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="tool-category">Category</Label>
                    <Select onValueChange={setToolCategory} value={toolCategory}>
                        <SelectTrigger id="tool-category">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Community">Community</SelectItem>
                            <SelectItem value="Premium">Premium</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="tool-description">Description</Label>
                <Textarea id="tool-description" placeholder="Describe what your tool does..." value={toolDescription} onChange={e => setToolDescription(e.target.value)} />
            </div>

            <div className="space-y-4">
                 <div className="flex items-center space-x-2">
                    <Switch id="use-ai" checked={useAi} onCheckedChange={setUseAi} />
                    <Label htmlFor="use-ai">Create with AI</Label>
                </div>

                {useAi ? (
                    <div className="space-y-2">
                        <Label htmlFor="ai-prompt">Tool Description</Label>
                        <Textarea id="ai-prompt" placeholder="Describe the tool you want to create. For example: 'A tool that fetches the current weather for a given city.'" value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} />
                         <Button onClick={handleGenerateCode} disabled={isGenerating}>
                            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                            Generate Code
                        </Button>
                    </div>
                ) : null}

                <div className="space-y-2">
                    <Label htmlFor="tool-code">Tool Code</Label>
                    <Textarea 
                        id="tool-code" 
                        placeholder="Enter the code for your tool here..." 
                        value={toolCode} 
                        onChange={e => setToolCode(e.target.value)}
                        className="min-h-[200px] font-mono"
                        disabled={useAi && isGenerating}
                    />
                </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleCreateTool}><Save className="mr-2 h-4 w-4"/> Create & Publish Tool</Button>
          </CardFooter>
        </Card>
      )}


      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search for tools & plugins..."
          className="pl-10 max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-8">
        <div>
            <h2 className="text-2xl font-semibold font-headline tracking-tight mb-4">Framework Plugins</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {plugins.length > 0 ? (
                plugins.map(tool => (
                    <ToolCard key={tool.id} tool={tool} />
                ))
                ) : (
                <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No plugins found matching your search.</p>
                </div>
                )}
            </div>
        </div>

        <div>
            <h2 className="text-2xl font-semibold font-headline tracking-tight mb-4">Community Tools</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {communityTools.length > 0 ? (
                communityTools.map(tool => (
                    <ToolCard key={tool.id} tool={tool} />
                ))
                ) : (
                <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No tools found matching your search.</p>
                </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
