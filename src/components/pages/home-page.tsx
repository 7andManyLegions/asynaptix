
"use client";

import { useState, useMemo } from 'react';
import { useAgents, type SecurityRating } from '@/hooks/use-agents.tsx';
import { AgentCard } from '@/components/common/agent-card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, ShieldAlert, Shield, Verified, BadgePercent, Filter } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const securityFilters: { id: SecurityRating, label: string, icon: React.ElementType }[] = [
  { id: 'trusted', label: 'Trusted Publisher', icon: ShieldCheck },
  { id: 'verified', label: 'Verified Publisher', icon: Verified },
  { id: 'scanned', label: 'Scanned', icon: Shield },
];

const priceFilters = [
    { id: 'free', label: 'Free', icon: BadgePercent },
    { id: 'paid', label: 'Paid', icon: BadgePercent },
];


export default function HomePage() {
  const { agents } = useAgents();
  const [securityRatings, setSecurityRatings] = useState<Set<SecurityRating>>(new Set());
  const [prices, setPrices] = useState<Set<string>>(new Set());

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

  const filteredAgents = useMemo(() => {
    const communityAgents = agents.filter(agent => !agent.isUserCreated);
    return communityAgents.filter(agent => {
      const securityMatch = securityRatings.size === 0 || securityRatings.has(agent.securityRating);
      const priceMatch = prices.size === 0 || prices.has(agent.price);
      return securityMatch && priceMatch;
    });
  }, [securityRatings, prices, agents]);

  const FilterContent = () => (
    <div className="space-y-6">
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
    </div>
  );

  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Discover Agents</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
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
