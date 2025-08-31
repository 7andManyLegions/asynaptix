"use client";

import { useState, useMemo } from 'react';
import { agents, type SecurityRating } from '@/lib/data';
import { AgentCard } from '@/components/common/agent-card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, ShieldAlert, Shield, Verified, BadgePercent } from 'lucide-react';

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
    return agents.filter(agent => {
      const securityMatch = securityRatings.size === 0 || securityRatings.has(agent.securityRating);
      const priceMatch = prices.size === 0 || prices.has(agent.price);
      return securityMatch && priceMatch;
    });
  }, [securityRatings, prices]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      <aside className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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
          </CardContent>
        </Card>
      </aside>

      <main className="lg:col-span-3">
        <h1 className="text-3xl font-bold tracking-tight mb-6 font-headline">Discover Agents</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
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
    </div>
  );
}
