import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Tool } from '@/lib/data';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ToolCardProps {
  tool: Tool;
  onAdd?: (tool: Tool) => void;
}

export function ToolCard({ tool, onAdd }: ToolCardProps) {
    const { toast } = useToast();

    const handleAddClick = () => {
        if (onAdd) {
            onAdd(tool);
        } else {
             toast({
                title: "Tool Added",
                description: `${tool.name} has been added to your agent.`,
            });
        }
    }

  return (
    <Card className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
      <CardHeader className="flex-row items-start gap-4 space-y-0 pb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <tool.icon className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-base font-semibold font-headline">{tool.name}</CardTitle>
          <Badge variant="outline" className="mt-1">{tool.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{tool.description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline" onClick={handleAddClick}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add to Agent
        </Button>
      </CardFooter>
    </Card>
  );
}
