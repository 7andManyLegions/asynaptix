
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Bot, Link2, Puzzle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    icon: Bot,
    title: 'Build Autonomous Agents',
    description: 'Use our AI-powered Agent Builder to create sophisticated agents from scratch or with the help of frameworks like LangChain.',
    link: '/build',
    linkText: 'Start Building',
  },
  {
    icon: Link2,
    title: 'Link Agents for Complex Tasks',
    description: 'Combine the capabilities of multiple agents to create powerful, multi-step workflows with our intuitive Linking Assistant.',
    link: '/link-agents',
    linkText: 'Link Agents',
  },
  {
    icon: Puzzle,
    title: 'Discover Tools & Plugins',
    description: 'Enhance your agents by integrating pre-built tools for web search, data analysis, API connections, and more.',
    link: '/marketplace',
    linkText: 'Browse Marketplace',
  },
]

export default function HomePage() {
  return (
    <div className="space-y-12 md:space-y-20">
      {/* Hero Section */}
      <section className="text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-headline">
            The Platform for Autonomous AI
          </h1>
          <p className="mt-4 md:mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Asynaptix provides the tools to build, link, and deploy sophisticated AI agents that can reason, plan, and execute complex tasks.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/build">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/discover">
                Discover Agents
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="flex flex-col text-center items-center p-6 transform transition-all hover:scale-105 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="mb-2 text-xl font-semibold">{feature.title}</CardTitle>
              <CardDescription className="flex-grow">{feature.description}</CardDescription>
              <Button variant="ghost" className="mt-4" asChild>
                <Link href={feature.link}>
                  {feature.linkText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">A New Paradigm for AI</h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">Go beyond simple chatbots. Build systems that work for you.</p>
        </div>
        <div className="grid md:grid-cols-2 items-center gap-12">
            <div>
                <Image 
                    src="https://picsum.photos/1200/800"
                    alt="Agent linking diagram"
                    width={1200}
                    height={800}
                    className="rounded-xl shadow-2xl"
                    data-ai-hint="flowchart diagram"
                />
            </div>
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0 mt-1">
                        <span className="text-xl font-bold text-primary">1</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Define a Goal</h3>
                        <p className="text-muted-foreground">Describe the task you want to accomplish in natural language. The AI orchestrator breaks it down into steps.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0 mt-1">
                        <span className="text-xl font-bold text-primary">2</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Assemble the Team</h3>
                        <p className="text-muted-foreground">The system automatically selects and links the best agents and tools from the marketplace for each step of the plan.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0 mt-1">
                        <span className="text-xl font-bold text-primary">3</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Execute & Learn</h3>
                        <p className="text-muted-foreground">The agentic workflow runs, adapting to new information and refining its approach until the goal is achieved.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
