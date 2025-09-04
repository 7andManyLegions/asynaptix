
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Bot, Library, Wand2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react';

const creationOptions = [
    {
        id: 'ai',
        title: "Create with AI Assistant",
        description: "Describe the agent you want to build in plain English. Our AI will generate the configuration and code to get you started.",
        icon: Wand2,
        link: "/build/new",
        linkText: "Start with AI",
        isPremium: true,
    },
    {
        id: 'framework',
        title: "Use a Framework",
        description: "Build your agent using a pre-configured template for popular frameworks like LangChain, LlamaIndex, and more.",
        icon: Library,
        linkText: "Select Framework",
    },
     {
        id: 'scratch',
        title: "Start from Scratch",
        description: "For expert users. Build an agent with full control over every component, logic, and integration from the ground up.",
        icon: Bot,
        linkText: "Coming in V2",
        isDisabled: true,
    }
];

const frameworks = [
    {
        id: 'LangChain',
        name: 'LangChain',
        description: 'Best for complex chains and prompt engineering.',
        logo: '🦜️🔗',
        isDisabled: false,
    },
    {
        id: 'autogen',
        name: 'AutoGen',
        description: 'Best for multi-agent conversations.',
        logo: '🤖',
        isDisabled: true,
    },
    {
        id: 'crewai',
        name: 'CrewAI',
        description: 'Best for role-playing, autonomous agent teams.',
        logo: '🧑‍🤝‍🧑',
        isDisabled: true,
    },
     {
        id: 'LlamaIndex',
        name: 'LlamaIndex',
        description: 'Best for data-intensive, RAG-based agents.',
        logo: '🦙',
        isDisabled: true,
    }
]

export default function AgentBuilderHubPage() {
    const router = useRouter();
    const [isFrameworkDialogOpen, setIsFrameworkDialogOpen] = useState(false);

    const handleFrameworkSelect = (frameworkId: string) => {
        const template = `
// Example of a LangChain agent using a simple chain.
// This requires 'langchain' to be installed.

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

// 1. Set up the model and prompt
const model = new ChatOpenAI({});
const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant."],
    ["user", "{input}"],
]);
const outputParser = new StringOutputParser();

// 2. Create the chain
const chain = prompt.connect(model).pipe(outputParser);

// 3. Define the agent's execution logic
async function run(input: { input: string }) {
    console.log("Running LangChain agent with input:", input.input);
    const result = await chain.invoke({
        input: input.input,
    });
    console.log("Result:", result);
    return result;
}

// Example invocation (for testing)
// run({ input: "What is the capital of France?" });
`;
        sessionStorage.setItem('agentTemplate', template);
        sessionStorage.setItem('agentFramework', frameworkId);
        setIsFrameworkDialogOpen(false);
        router.push('/build/new');
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight font-headline">Agent Builder</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Choose how you want to create your next-generation AI agent.
                </p>
            </div>
            
            <Dialog open={isFrameworkDialogOpen} onOpenChange={setIsFrameworkDialogOpen}>
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
                                {option.id === 'framework' ? (
                                     <DialogTrigger asChild>
                                        <Button disabled={option.isDisabled}>
                                            {option.linkText}
                                            {!option.isDisabled && <ArrowRight className="ml-2 h-4 w-4" />}
                                        </Button>
                                    </DialogTrigger>
                                ) : (
                                    <Button asChild disabled={option.isDisabled}>
                                        <Link href={option.link ?? '#'}>
                                            {option.linkText}
                                            {!option.isDisabled && <ArrowRight className="ml-2 h-4 w-4" />}
                                        </Link>
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
                 <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Select a Framework</DialogTitle>
                        <DialogDescription>
                            Choose a framework template to get started quickly.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                        {frameworks.map(fw => (
                            <Card 
                                key={fw.id} 
                                className={`transform transition-all hover:scale-[1.02] hover:shadow-lg ${fw.isDisabled ? 'bg-muted/50 cursor-not-allowed' : 'cursor-pointer'}`}
                                onClick={() => !fw.isDisabled && handleFrameworkSelect(fw.id)}
                                role="button"
                            >
                                <CardHeader className="flex-row items-center gap-4">
                                    <div className="text-3xl">{fw.logo}</div>
                                    <div>
                                        <CardTitle className="text-lg">{fw.name}</CardTitle>
                                        {fw.isDisabled && <Badge variant="secondary" className="mt-1">Coming Soon</Badge>}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{fw.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
