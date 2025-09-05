
"use client";

import { useState, useMemo } from 'react';
import { useAgents, type SecurityRating, type Agent } from '@/hooks/use-agents.tsx';
import { AgentCard } from '@/components/common/agent-card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, ShieldAlert, Shield, Verified, BadgePercent, Filter, Cpu, Search, Star } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const securityFilters: { id: SecurityRating, label: string, icon: React.ElementType }[] = [
  { id: 'trusted', label: 'Trusted Publisher', icon: ShieldCheck },
  { id: 'verified', label: 'Verified Publisher', icon: Verified },
  { id: 'scanned', label: 'Scanned', icon: Shield },
];

const priceFilters = [
    { id: 'free', label: 'Free' },
    { id: 'paid', label: 'Paid' },
];

const frameworkFilters: {id: NonNullable<Agent['framework']>, label: string}[] = [
    { id: 'LangChain', label: 'LangChain' },
    { id: 'LlamaIndex', label: 'LlamaIndex' },
    { id: 'AutoGen', label: 'AutoGen' },
    { id: 'CrewAI', label: 'CrewAI' },
    { id: 'Custom', label: 'Custom' },
];

const ratingFilters = [
    { id: "4", label: "4+ Stars" },
    { id: "3", label: "3+ Stars" },
    { id: "2", label: "2+ Stars" },
    { id: "1", label: "1+ Stars" },
]

export default function DiscoverPage() {
  const { agents } = useAgents();
  const [securityRatings, setSecurityRatings] = useState<Set<SecurityRating>>(new Set());
  const [prices, setPrices] = useState<Set<string>>(new Set());
  const [frameworks, setFrameworks] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [minRating, setMinRating] = useState(0);

  const handleSecurityChange = (rating: SecurityRating) => {
    setSecurityRatings(prev => {
      const newSet = new Set(prev);
      if (newSet.has(rating)) {
        newSet.delete(rating);
      } else {
        newSet.add(rating);
      }
      return newSet;
    });
  };

  const handlePriceChange = (price: string) => {
    setPrices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(price)) {
        newSet.delete(price);
      } else {
        newSet.add(price);
      }
      return newSet;
    });
  };
  
  const handleFrameworkChange = (framework: string) => {
    setFrameworks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(framework)) {
        newSet.delete(framework);
      } else {
        newSet.add(framework);
      }
      return newSet;
    });
  };

  const filteredAgents = useMemo(() => {
    const communityAgents = agents.filter(agent => !agent.isUserCreated);
    return communityAgents.filter(agent => {
      const securityMatch = securityRatings.size === 0 || securityRatings.has(agent.securityRating);
      const priceMatch = prices.size === 0 || prices.has(agent.price);
      const frameworkMatch = frameworks.size === 0 || (agent.framework && frameworks.has(agent.framework));
      const ratingMatch = agent.rating >= minRating;
      const searchMatch = searchTerm === '' || 
                          agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          agent.description.toLowerCase().includes(searchTerm.toLowerCase());
      return securityMatch && priceMatch && frameworkMatch && searchMatch && ratingMatch;
    });
  }, [securityRatings, prices, frameworks, searchTerm, agents, minRating]);

  const FilterContent = () => (
    <div className="space-y-8">
       <div>
        <h3 className="mb-4 text-lg font-medium">Minimum Rating</h3>
        <RadioGroup value={minRating.toString()} onValueChange={(val) => setMinRating(parseInt(val))}>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="r-any" />
                <Label htmlFor="r-any">Any</Label>
            </div>
            {ratingFilters.map(filter => (
                <div key={filter.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={filter.id} id={`r-${filter.id}`} />
                    <Label htmlFor={`r-${filter.id}`} className="flex items-center gap-2 cursor-pointer">
                       <Star className="h-4 w-4 text-muted-foreground" />
                       {filter.label}
                    </Label>
                </div>
            ))}
        </RadioGroup>
      </div>
      <div>
        <h3 className="mb-4 text-lg font-medium">Security Rating</h3>
        <div className="space-y-3">
          {securityFilters.map(filter => (
            <div key={filter.id} className="flex items-center space-x-2">
              <Checkbox
                id={`security-${filter.id}`}
                checked={securityRatings.has(filter.id)}
                onCheckedChange={() => handleSecurityChange(filter.id)}
              />
              <Label htmlFor={`security-${filter.id}`} className="flex items-center gap-2 cursor-pointer">
                <filter.icon className="h-4 w-4 text-muted-foreground" />
                {filter.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-lg font-medium">Price</h3>
        <div className="space-y-3">
          {priceFilters.map(filter => (
            <div key={filter.id} className="flex items-center space-x-2">
              <Checkbox
                id={`price-${filter.id}`}
                checked={prices.has(filter.id)}
                onCheckedChange={() => handlePriceChange(filter.id)}
              />
              <Label htmlFor={`price-${filter.id}`} className="cursor-pointer">{filter.label}</Label>
            </div>
          ))}
        </div>
      </div>
       <div>
        <h3 className="mb-4 text-lg font-medium">Framework</h3>
        <div className="space-y-3">
          {frameworkFilters.map(filter => (
            <div key={filter.id} className="flex items-center space-x-2">
              <Checkbox
                id={`framework-${filter.id}`}
                checked={frameworks.has(filter.id)}
                onCheckedChange={() => handleFrameworkChange(filter.id)}
              />
              <Label htmlFor={`framework-${filter.id}`} className="flex items-center gap-2 cursor-pointer">
                <Cpu className="h-4 w-4 text-muted-foreground" />
                {filter.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <main>
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Discover Capabilities</h1>
          <p className="text-muted-foreground mt-1">Browse and search for community-built agents.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
           <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search agents..."
                className="w-full rounded-lg bg-background pl-8 sm:w-[200px] lg:w-[250px]"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="shrink-0">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Refine the list of agents based on your criteria.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAgents.length > 0 ? (
          filteredAgents.map(agent => (
            <AgentCard key={agent.id} agent={agent} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No agents match the current filters.</p>
          </div>
        )}
      </div>
    </main>
  );
}
