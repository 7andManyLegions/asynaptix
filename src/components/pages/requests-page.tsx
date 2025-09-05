
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, PlusCircle } from 'lucide-react';
import { Badge } from '../ui/badge';
import Link from 'next/link';

const requestedAgents = [
    { id: 1, title: "AI Story Writer for Children", description: "An agent that can write short, age-appropriate stories based on a few keywords, like 'dragon', 'castle', 'friendly'. Should have options for different age groups.", upvotes: 128, tags: ['Content Generation', 'Creative'] },
    { id: 2, title: "Meeting Summarizer", description: "Takes a transcript of a meeting and provides a concise summary, action items, and key decisions.", upvotes: 95, tags: ['Productivity', 'Business'] },
    { id: 3, title: "Automated Data Entry from Invoices", description: "Extracts information like invoice number, date, amount, and vendor from PDF invoices and puts it into a CSV file.", upvotes: 72, tags: ['Automation', 'Data Processing'] },
    { id: 4, title: "Personalized Workout Planner", description: "Creates a weekly workout plan based on user goals (e.g., weight loss, muscle gain), available equipment, and time constraints.", upvotes: 61, tags: ['Health', 'Personal'] },
];

export default function RequestsPage() {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Agent Requests</h1>
                <p className="text-muted-foreground mt-2">
                    Request new agents or build agents that the community wants.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Community Request Board</CardTitle>
                            <CardDescription>Browse agent ideas submitted by the community. Upvote ideas you like or build them yourself.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {requestedAgents.map(req => (
                               <Card key={req.id} className="hover:border-primary/50 transition-colors">
                                   <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                                       <div className="flex-grow">
                                           <h3 className="font-semibold text-lg">{req.title}</h3>
                                           <p className="text-muted-foreground text-sm mt-1 mb-2 line-clamp-2">{req.description}</p>
                                           <div className="flex gap-2">
                                                {req.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                           </div>
                                       </div>
                                       <div className="flex sm:flex-col items-center sm:justify-center gap-4 sm:gap-2 shrink-0">
                                            <Button variant="outline" size="sm" className="w-full">
                                                <ThumbsUp className="mr-2 h-4 w-4"/>
                                                {req.upvotes}
                                            </Button>
                                             <Button size="sm" className="w-full" asChild>
                                                <Link href="/build">Build It</Link>
                                            </Button>
                                       </div>
                                   </CardContent>
                               </Card>
                           ))}
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1">
                    <Card>
                         <CardHeader>
                            <CardTitle>Request an Agent</CardTitle>
                            <CardDescription>Have an idea for an agent? Share it with the community!</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="request-title">Title</Label>
                                <Input id="request-title" placeholder="A concise title for your idea"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="request-desc">Description</Label>
                                <Textarea id="request-desc" placeholder="Describe the agent's functionality, who it's for, and what problems it solves." rows={5}/>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="request-tags">Tags (optional)</Label>
                                <Input id="request-tags" placeholder="e.g., Productivity, Business, Fun"/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">
                                <PlusCircle className="mr-2 h-4 w-4"/>
                                Submit Request
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
