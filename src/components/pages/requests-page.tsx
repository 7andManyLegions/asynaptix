
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function RequestsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Agent Requests</h1>
                <p className="text-muted-foreground mt-2">
                    Request new agents or build agents that the community wants.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Coming Soon!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">The agent request form and bounty board are currently under construction. Check back soon!</p>
                </CardContent>
            </Card>
        </div>
    );
}
