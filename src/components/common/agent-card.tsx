import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Agent } from '@/lib/data';
import { SecurityBadge } from './security-badge';
import { ArrowRight } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
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
