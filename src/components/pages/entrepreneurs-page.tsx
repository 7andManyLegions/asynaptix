
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Link2, ExternalLink, Bot } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const marketDemandData = [
  { term: "PDF Summary", trend: "up", searches: 12500, userRequests: 890 },
  { term: "Customer Service Bot", trend: "up", searches: 11800, userRequests: 850 },
  { term: "Social Media Scheduler", trend: "down", searches: 9800, userRequests: 620 },
  { term: "Data Entry Automation", trend: "up", searches: 9500, userRequests: 710 },
  { term: "Code Review Assistant", trend: "up", searches: 8200, userRequests: 550 },
  { term: "Travel Itinerary Planner", trend: "down", searches: 7600, userRequests: 480 },
];

const topGrossingAgents = [
    { id: "data-analyst", rank: 1, name: "Data Analyst Agent", developer: "Community", monthlyRevenue: 1250, totalRevenue: 15000, imageUrl: "https://picsum.photos/100/100" },
    { id: "research-assistant", rank: 2, name: "Research Assistant", developer: "Community", monthlyRevenue: 980, totalRevenue: 8500, imageUrl: "https://picsum.photos/100/100" },
    { id: "code-generator", rank: 3, name: "Code Generator Agent", developer: "Community", monthlyRevenue: 750, totalRevenue: 5000, imageUrl: "https://picsum.photos/100/100" },
];

const mostLinkedAgents = [
    { id: "web-search-agent", rank: 1, name: "Web Search Agent", links: 128, price: "free", framework: "Custom" },
    { id: "calculator-agent", rank: 2, name: "Calculator Agent", links: 98, price: "free", framework: "LangChain" },
    { id: "document-parser-agent", rank: 3, name: "Document Parser", links: 72, price: "paid", framework: "LlamaIndex" },
];

export default function EntrepreneursPage() {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Entrepreneur Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                    Market insights to help you build valuable and successful agents.
                </p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Market Demand</CardTitle>
                    <CardDescription>Discover what users are searching for and requesting. Build agents that solve real problems.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Search Term / Capability</TableHead>
                            <TableHead>Trend</TableHead>
                            <TableHead className="text-right">Monthly Searches</TableHead>
                            <TableHead className="text-right">User Requests</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {marketDemandData.map((item) => (
                            <TableRow key={item.term}>
                                <TableCell className="font-medium">{item.term}</TableCell>
                                <TableCell>
                                    {item.trend === 'up' 
                                        ? <Badge variant="outline" className="text-green-600 border-green-600/50"><TrendingUp className="mr-1 h-4 w-4"/>Trending Up</Badge> 
                                        : <Badge variant="outline" className="text-red-600 border-red-600/50"><TrendingDown className="mr-1 h-4 w-4"/>Trending Down</Badge>
                                    }
                                </TableCell>
                                <TableCell className="text-right">{item.searches.toLocaleString()}</TableCell>
                                <TableCell className="text-right">{item.userRequests.toLocaleString()}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Highest Grossing Agents</CardTitle>
                        <CardDescription>Top-performing agents by revenue on the platform.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {topGrossingAgents.map((agent) => (
                             <Card key={agent.id} className="hover:bg-muted/50 transition-colors">
                                <CardContent className="p-4 flex items-start gap-4">
                                     <div className="text-2xl font-bold text-muted-foreground w-6 text-center">{agent.rank}</div>
                                     <Image src={agent.imageUrl} alt={agent.name} width={50} height={50} className="rounded-md" data-ai-hint="abstract logo" />
                                    <div className="flex-grow">
                                        <Link href={`/agent/${agent.id}`} className="font-semibold hover:underline flex items-center gap-1">
                                            {agent.name} <ExternalLink className="h-3 w-3" />
                                        </Link>
                                        <p className="text-sm text-muted-foreground">by {agent.developer}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-green-600">${agent.monthlyRevenue.toLocaleString()}</p>
                                        <p className="text-xs text-muted-foreground">/ month</p>
                                    </div>
                                </CardContent>
                             </Card>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Most Linked Agents</CardTitle>
                        <CardDescription>The most popular agents used as building blocks in larger systems.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {mostLinkedAgents.map((agent) => (
                             <Card key={agent.id} className="hover:bg-muted/50 transition-colors">
                                <CardContent className="p-4 flex items-start gap-4">
                                     <div className="text-2xl font-bold text-muted-foreground w-6 text-center">{agent.rank}</div>
                                     <div className="h-12 w-12 flex items-center justify-center bg-primary/10 rounded-md">
                                        <Bot className="h-6 w-6 text-primary" />
                                     </div>
                                    <div className="flex-grow">
                                        <Link href={`/agent/${agent.id}`} className="font-semibold hover:underline flex items-center gap-1">
                                            {agent.name} <ExternalLink className="h-3 w-3" />
                                        </Link>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant={agent.price === 'free' ? 'secondary' : 'default'}>{agent.price === 'free' ? 'Free' : 'Paid'}</Badge>
                                            <Badge variant="outline">{agent.framework}</Badge>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold">{agent.links}</p>
                                        <p className="text-xs text-muted-foreground">links</p>
                                    </div>
                                </CardContent>
                             </Card>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
