
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { tools, Tool } from '@/lib/data';
import { Checkbox } from '../ui/checkbox';
import { CaseUpper, PlusCircle, Settings, Trash2, Info } from 'lucide-react';
import { Separator } from '../ui/separator';

type CustomTool = {
  id: number;
  name: string;
  description: string;
};

export default function PluginCreationPage() {
  const { toast } = useToast();
  
  const [pluginName, setPluginName] = useState('');
  const [pluginDescription, setPluginDescription] = useState('');

  const [selectedTools, setSelectedTools] = useState<Set<string>>(new Set());
  const [customTools, setCustomTools] = useState<CustomTool[]>([]);
  const [newCustomToolName, setNewCustomToolName] = useState('');
  const [newCustomToolDesc, setNewCustomToolDesc] = useState('');

  const handleToolSelection = (toolId: string) => {
    setSelectedTools(prev => {
      const newSet = new Set(prev);
      if (newSet.has(toolId)) {
        newSet.delete(toolId);
      } else {
        newSet.add(toolId);
      }
      return newSet;
    });
  };

  const handleAddCustomTool = () => {
    if (!newCustomToolName || !newCustomToolDesc) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide a name and description for the custom tool.',
      });
      return;
    }
    setCustomTools([
      ...customTools,
      { id: Date.now(), name: newCustomToolName, description: newCustomToolDesc },
    ]);
    setNewCustomToolName('');
    setNewCustomToolDesc('');
  };

  const handleRemoveCustomTool = (id: number) => {
    setCustomTools(customTools.filter(tool => tool.id !== id));
  };
  
  const handlePublishPlugin = () => {
    if (!pluginName || !pluginDescription) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please provide a name and description for your plugin.",
        });
        return;
    }
    toast({
      title: "Plugin Published!",
      description: `Your new plugin "${pluginName}" has been published to the marketplace.`,
    });
    // Reset state here
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Plugin Builder</h1>
        <p className="text-muted-foreground mt-2">
          Create a new plugin by bundling existing tools and adding your own custom logic.
        </p>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle>Step 1: Plugin Details</CardTitle>
            <CardDescription>Give your plugin a unique name and a clear description.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="plugin-name">Plugin Name</Label>
                <Input id="plugin-name" placeholder="e.g., Google Workspace Plugin" value={pluginName} onChange={e => setPluginName(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="plugin-desc">Description</Label>
                <Textarea id="plugin-desc" placeholder="Describe what this collection of tools achieves..." value={pluginDescription} onChange={e => setPluginDescription(e.target.value)} />
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Step 2: Add Tools</CardTitle>
            <CardDescription>Select existing tools from the marketplace to include in your plugin.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto p-1">
                {tools.filter(t => t.type === 'tool').map(tool => (
                    <div key={tool.id} className="flex items-center space-x-3 p-3 border rounded-md has-[:checked]:border-primary">
                        <Checkbox 
                            id={`tool-${tool.id}`} 
                            onCheckedChange={() => handleToolSelection(tool.id)}
                            checked={selectedTools.has(tool.id)}
                        />
                        <Label htmlFor={`tool-${tool.id}`} className="flex flex-col gap-1 cursor-pointer">
                            <span className="font-semibold">{tool.name}</span>
                            <span className="text-xs text-muted-foreground">{tool.description}</span>
                        </Label>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Step 3: Add Custom Tools</CardTitle>
            <CardDescription>Define new tools that are specific to this plugin.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {customTools.length > 0 && (
                <div className="space-y-2">
                    <h4 className="font-medium">Plugin-Specific Tools</h4>
                    {customTools.map(tool => (
                        <div key={tool.id} className="flex items-center justify-between rounded-lg border p-3">
                            <div>
                                <p className="font-semibold">{tool.name}</p>
                                <p className="text-sm text-muted-foreground">{tool.description}</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveCustomTool(tool.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            <Separator />
            
            <div className="space-y-4 p-4 border-dashed border-2 rounded-lg">
                 <h4 className="font-medium">Define a New Custom Tool</h4>
                 <div className="space-y-2">
                    <Label htmlFor="custom-tool-name">Tool Name</Label>
                    <Input id="custom-tool-name" placeholder="e.g., sendGmail" value={newCustomToolName} onChange={e => setNewCustomToolName(e.target.value)} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="custom-tool-desc">Tool Description</Label>
                    <Input id="custom-tool-desc" placeholder="Briefly describe what this tool does" value={newCustomToolDesc} onChange={e => setNewCustomToolDesc(e.target.value)} />
                </div>
                <Button variant="secondary" onClick={handleAddCustomTool}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Tool to Plugin
                </Button>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Step 4: Configuration (Optional)</CardTitle>
            <CardDescription>Add logic for handling things like API keys that are shared across the tools in this plugin.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-lg">
                <Settings className="h-12 w-12 mx-auto mb-2" />
                <p className="font-semibold">Advanced Configuration Coming Soon</p>
                <p className="text-sm">In the future, you'll be able to add shared authentication logic here.</p>
            </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
          <Button size="lg" onClick={handlePublishPlugin}>
              <CaseUpper className="mr-2 h-4 w-4" />
              Publish Plugin
          </Button>
      </div>
    </div>
  );
}
