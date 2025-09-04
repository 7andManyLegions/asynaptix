
"use client";

import { useMemo, useState } from 'react';
import { useAgents } from '@/hooks/use-agents.tsx';
import { AgentCard } from '@/components/common/agent-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Upload, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from '../ui/skeleton';

export default function MyAgentsPage() {
  const { agents, addAgent, loading } = useAgents();
  const { toast } = useToast();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadAgentName, setUploadAgentName] = useState('');
  const [uploadAgentDescription, setUploadAgentDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const userAgents = useMemo(() => {
    return agents.filter(agent => agent.isUserCreated);
  }, [agents]);

  const handleUploadAgent = async () => {
    if (!uploadAgentName || !uploadAgentDescription) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide both a name and description for your agent.',
      });
      return;
    }
    setIsUploading(true);
    const newAgent = {
      id: uploadAgentName.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
      name: uploadAgentName,
      description: uploadAgentDescription,
      price: "free" as const,
      securityRating: "none" as const,
      imageUrl: 'https://picsum.photos/600/400',
      imageHint: 'custom agent',
      isUserCreated: true,
    };

    await addAgent(newAgent);
    setIsUploading(false);

    toast({
      title: 'Agent Uploaded!',
      description: `Your agent "${uploadAgentName}" has been added to your agents list.`,
    });

    // Reset and close dialog
    setUploadAgentName('');
    setUploadAgentDescription('');
    setIsUploadDialogOpen(false);
  };


  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">My Agents</h1>
          <p className="text-muted-foreground mt-2">Agents you have created, linked, or uploaded.</p>
        </div>
         <div className="flex gap-2">
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Agent
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Custom Agent</DialogTitle>
                  <DialogDescription>
                    Add an agent you have built externally. Provide its details below.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="upload-agent-name">Agent Name</Label>
                        <Input 
                          id="upload-agent-name" 
                          placeholder="My Custom Agent" 
                          value={uploadAgentName}
                          onChange={(e) => setUploadAgentName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="upload-agent-desc">Description</Label>
                        <Textarea 
                          id="upload-agent-desc" 
                          placeholder="Describe what your custom agent does."
                          value={uploadAgentDescription}
                          onChange={(e) => setUploadAgentDescription(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleUploadAgent} disabled={isUploading}>
                    {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Upload className="mr-2 h-4 w-4"/>}
                    {isUploading ? 'Adding...' : 'Add Agent'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button asChild>
                <Link href="/build">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Agent
                </Link>
            </Button>
         </div>
      </div>
      
      {loading ? (
         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            ))}
        </div>
      ) : userAgents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {userAgents.map(agent => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold">No Agents Yet</h2>
          <p className="text-muted-foreground mt-2 mb-4">You haven't created any agents. Get started by building or uploading one!</p>
          <Button asChild>
            <Link href="/build">
                <Plus className="mr-2 h-4 w-4" />
                Create Agent
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
