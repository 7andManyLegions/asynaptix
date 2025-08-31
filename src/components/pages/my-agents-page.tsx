"use client";

import { useMemo } from 'react';
import { useAgents } from '@/hooks/use-agents.tsx';
import { AgentCard } from '@/components/common/agent-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function MyAgentsPage() {
  const { agents } = useAgents();

  const userAgents = useMemo(() => {
    return agents.filter(agent => agent.isUserCreated);
  }, [agents]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">My Agents</h1>
          <p className="text-muted-foreground mt-2">Agents you have created or linked.</p>
        </div>
         <Button asChild>
            <Link href="/build">
                <Plus className="mr-2 h-4 w-4" />
                Create New Agent
            </Link>
        </Button>
      </div>
      
      {userAgents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {userAgents.map(agent => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold">No Agents Yet</h2>
          <p className="text-muted-foreground mt-2 mb-4">You haven't created any agents. Get started by building one!</p>
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
