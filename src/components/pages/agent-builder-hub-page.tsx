
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Bot, Library, Wand2 } from 'lucide-react';
import { Badge } from '../ui/badge';

const creationOptions = [
    {
        title: "Create with AI Assistant",
        description: "Describe the agent you want to build in plain English. Our AI will generate the configuration and code to get you started.",
        icon: Wand2,
        link: "/build/new",
        linkText: "Start with AI",
        isPremium: true,
    },
    {
        title: "Use a Framework",
        description: "Build your agent using a pre-configured template for popular frameworks like LangChain, LlamaIndex, and more.",
        icon: Library,
        link: "#",
        linkText: "Select Framework",
        isDisabled: true,
    },
     {
        title: "Start from Scratch",
        description: "For expert users. Build an agent with full control over every component, logic, and integration from the ground up.",
        icon: Bot,
        link: "#",
        linkText: "Coming in V2",
        isDisabled: true,
    }
];

export default function AgentBuilderHubPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight font-headline">Agent Builder</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Choose how you want to create your next-generation AI agent.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {creationOptions.map((option, index) => (
                    <Card key={index} className={`flex flex-col transform transition-all hover:scale-[1.02] hover:shadow-xl ${option.isDisabled ? 'bg-muted/50' : ''}`}>
                        <CardHeader className="flex-row items-start gap-4 space-y-0">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                                <option.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    {option.title}
                                    {option.isPremium && <Badge>Premium</Badge>}
                                </CardTitle>
                                <CardDescription className="mt-1">{option.description}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow" />
                        <CardContent>
                             <Button asChild disabled={option.isDisabled}>
                                <Link href={option.link}>
                                    {option.linkText}
                                    {!option.isDisabled && <ArrowRight className="ml-2 h-4 w-4" />}
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
