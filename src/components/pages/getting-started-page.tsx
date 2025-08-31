
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Wrench, Link2, FolderKanban, KeyRound } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const steps = [
    {
        title: "Step 1: The Agent Builder",
        description: "This is where the magic happens. The Agent Builder is your primary tool for creating new AI agents from scratch. You can define their purpose, personality, and capabilities.",
        icon: Wrench,
        link: "/build",
        linkText: "Go to Builder",
        content: (
            <div className="space-y-4">
                <p>Start by giving your agent a name and a clear description of its function. What problem will it solve? Who is it for?</p>
                <p>In <strong>Simple Mode</strong>, you write a natural language prompt to define the agent's behavior. For example: "You are a friendly assistant that helps users find recipes."</p>
                <p>Switch to <strong>Developer Mode</strong> to unlock advanced features. Here you can write custom orchestration logic, add tools, and fine-tune model parameters for more complex tasks.</p>
                 <Image src="https://picsum.photos/800/400" width={800} height={400} alt="Agent Builder" className="rounded-lg" data-ai-hint="software interface screenshot" />
            </div>
        )
    },
    {
        title: "Step 2: Linking Agents",
        description: "Create powerful workflows by connecting two existing agents. The output of one agent becomes the input for the next, enabling complex, multi-step processes.",
        icon: Link2,
        link: "/link-agents",
        linkText: "Link Agents Now",
        content: (
             <div className="space-y-4">
                <p>Select two agents you'd like to connect from the dropdown menus. Our AI Linking Assistant will analyze their inputs and outputs and suggest the most logical way to connect them.</p>
                <p>The assistant provides a data flow validation and even generates the TypeScript code needed to create the new, combined agent. You can then choose to automatically package this new agent or copy the code into the Agent Builder for further customization.</p>
                <Image src="https://picsum.photos/800/400" width={800} height={400} alt="Agent Linking" className="rounded-lg" data-ai-hint="flowchart diagram" />
            </div>
        )
    },
    {
        title: "Step 3: Managing Your Agents",
        description: "The 'My Agents' page is your personal dashboard for all the agents you've created, linked, or uploaded. From here you can track, manage, and publish them.",
        icon: FolderKanban,
        link: "/my-agents",
        linkText: "View My Agents",
        content: (
            <div className="space-y-4">
                <p>All your custom agents appear here. You can edit them, run them, or publish them to the marketplace.</p>
                <p>You can also <strong>Upload an Agent</strong> you've built externally. Simply provide a name and description, and it will be added to your list, ready to be used or linked within the platform.</p>
                <p>Before publishing, remember to run the <strong>Security Scan</strong> to ensure your agent is safe for others to use.</p>
                 <Image src="https://picsum.photos/800/400" width={800} height={400} alt="My Agents" className="rounded-lg" data-ai-hint="dashboard analytics" />
            </div>
        )
    },
     {
        title: "Step 4: Managing API Keys",
        description: "To use different AI models from providers like Google or OpenAI, you'll need to add your API keys. We provide a secure way to manage them.",
        icon: KeyRound,
        link: "/api-keys",
        linkText: "Manage API Keys",
        content: (
             <div className="space-y-4">
                <p>Navigate to the API Keys page to add, view, and remove your keys. We recommend using a separate key for each service.</p>
                <p>When you're in the Agent Builder and select a model for which you haven't provided a key, you'll be prompted to add one directly, making the process seamless.</p>
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="font-bold text-destructive">Security Note:</p>
                    <p className="text-sm text-destructive/80">For this prototype, keys are stored in your browser's local storage. In a real application, they would be encrypted and securely stored on our servers.</p>
                </div>
            </div>
        )
    }
];

export default function GettingStartedPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight font-headline">Getting Started with Asynaptix</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    A step-by-step guide to building, linking, and deploying your first AI agent.
                </p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>What would you like AI to accomplish for you?</CardTitle>
                    <CardDescription>
                        Welcome to Asynaptix! The unified platform for creating autonomous AI agents. Whether you want to automate a simple task or build a complex, multi-agent system, this guide will walk you through the core features.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                         {steps.map((step, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>
                                    <div className="flex items-center gap-4 text-lg font-semibold">
                                        <step.icon className="h-6 w-6 text-primary" />
                                        {step.title}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4 pl-10">
                                   <p className="text-muted-foreground">{step.description}</p>
                                   {step.content}
                                   <Button asChild className="mt-4">
                                       <Link href={step.link}>
                                           {step.linkText}
                                           <ArrowRight className="ml-2 h-4 w-4" />
                                       </Link>
                                   </Button>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}
