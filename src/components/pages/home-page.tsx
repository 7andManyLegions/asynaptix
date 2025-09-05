
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Bot, Link2, Puzzle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

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
    <div className="space-y-12 md:space-y-24">
      {/* Hero Section */}
      <section className="text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-headline">
            The Agentic AI Ecosystem
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-muted-foreground">Building the body for the AI mind.</p>
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

      {/* Intro Features Section */}
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

      {/* Section 1: Build & Customize */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 items-center gap-12">
            <div className="space-y-4">
                <Badge variant="outline" className="text-base py-1 px-3">Build & Customize</Badge>
                <h2 className="text-3xl md:text-4xl font-bold font-headline">Your Agent, Your Rules</h2>
                <p className="text-lg text-muted-foreground">
                    Start with an idea and bring it to life in the Agent Builder. Whether you're a seasoned developer or a visionary entrepreneur, our platform adapts to your skill level. Define your agent's logic in plain English or dive deep into code.
                </p>
                 <p className="text-lg text-muted-foreground">
                    Supercharge your creations by integrating custom tools and plugins from our marketplace, or build your own to give your agent a unique edge.
                </p>
                 <Button variant="secondary" asChild>
                    <Link href="/build">
                        Go to the Builder <ArrowRight className="ml-2"/>
                    </Link>
                </Button>
            </div>
             <div>
                <Image 
                    src="https://picsum.photos/1200/800"
                    alt="Agent Builder interface"
                    width={1200}
                    height={800}
                    className="rounded-xl shadow-2xl"
                    data-ai-hint="software development code"
                />
            </div>
        </div>
      </section>

      {/* Section 2: The Power of Linking */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 items-center gap-12">
             <div className="order-last md:order-first">
                <Image 
                    src="https://picsum.photos/1200/800"
                    alt="Diagram showing agents being linked"
                    width={1200}
                    height={800}
                    className="rounded-xl shadow-2xl"
                    data-ai-hint="network flowchart diagram"
                />
            </div>
            <div className="space-y-4">
                <Badge variant="outline" className="text-base py-1 px-3">The Power of Linking</Badge>
                <h2 className="text-3xl md:text-4xl font-bold font-headline">Automate Anything</h2>
                <p className="text-lg text-muted-foreground">
                    At Asynaptix, we believe any task that can be done on a computer can be delegated to an agentic AI system. The key isn't a single, monolithic AI—it's in creating workflows.
                </p>
                <p className="text-lg text-muted-foreground">
                   Our platform's true power lies in linking individual agents. Connect a web-scraping agent to a data-analysis agent, and feed the result into a report-writing agent. By composing specialized agents, you can build autonomous systems capable of handling complexity that a single agent never could.
                </p>
                 <Button variant="secondary" asChild>
                    <Link href="/link-agents">
                        Start Linking Agents <ArrowRight className="ml-2"/>
                    </Link>
                </Button>
            </div>
        </div>
      </section>

      {/* Section 3: Monetize Your Mind */}
       <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 items-center gap-12">
            <div className="space-y-4">
                <Badge variant="outline" className="text-base py-1 px-3">Monetize Your Mind</Badge>
                <h2 className="text-3xl md:text-4xl font-bold font-headline">Create Your Side Hustle</h2>
                <p className="text-lg text-muted-foreground">
                   Don't just build agents—build a business. Our integrated marketplace allows you to publish your creations for others to purchase, turning your intellectual property into an income stream.
                </p>
                 <p className="text-lg text-muted-foreground">
                   See a need in the community request board? Build the solution, publish it, and get rewarded. We handle the secure payment processing with Stripe Connect, so you can focus on what you do best: creating value.
                </p>
                 <Button variant="secondary" asChild>
                    <Link href="/entrepreneurs">
                        View Market Insights <ArrowRight className="ml-2"/>
                    </Link>
                </Button>
            </div>
             <div>
                <Image 
                    src="https://picsum.photos/1200/800"
                    alt="Marketplace analytics"
                    width={1200}
                    height={800}
                    className="rounded-xl shadow-2xl"
                    data-ai-hint="financial graphs charts"
                />
            </div>
        </div>
      </section>

    </div>
  );
}
