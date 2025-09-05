import type { LucideIcon } from "lucide-react";
import { Calculator, Search, Cloud, Database, BarChart, FileText, Bot, CaseUpper } from "lucide-react";

export type SecurityRating = "trusted" | "verified" | "scanned" | "none";

export interface Agent {
  id: string;
  name: string;
  description: string;
  securityRating: SecurityRating;
  price: "free" | "paid";
  imageUrl: string;
  imageHint: string;
  isUserCreated?: boolean;
  framework?: 'LangChain' | 'LlamaIndex' | 'Custom' | 'AutoGen' | 'CrewAI';
  rating: number;
  ratingCount: number;
}

export interface Tool {
  id: string;
  name:string;
  description: string;
  icon: LucideIcon;
  category: "Baseline" | "Community" | "Premium";
  type: "tool" | "plugin";
  isOfficial?: boolean;
}

export const initialAgents: Agent[] = [
  {
    id: "data-analyst",
    name: "Data Analyst Agent",
    description: "An agent that can analyze data from various sources and generate reports.",
    securityRating: "trusted",
    price: "paid",
    imageUrl: "https://picsum.photos/600/400",
    imageHint: "data chart",
    framework: "Custom",
    rating: 4.5,
    ratingCount: 120,
  },
  {
    id: "social-media-manager",
    name: "Social Media Manager",
    description: "Automates social media posts, tracks engagement, and generates content ideas.",
    securityRating: "verified",
    price: "free",
    imageUrl: "https://picsum.photos/600/400",
    imageHint: "social media",
    framework: "Custom",
    rating: 4.2,
    ratingCount: 88,
  },
  {
    id: "code-generator",
    name: "Code Generator Agent",
    description: "Generates boilerplate code in multiple languages based on your specifications.",
    securityRating: "scanned",
    price: "free",
    imageUrl: "https://picsum.photos/600/400",
    imageHint: "code screen",
    framework: "LangChain",
    rating: 3.8,
    ratingCount: 250,
  },
  {
    id: "research-assistant",
    name: "Research Assistant",
    description: "Gathers and summarizes information from the web on any given topic.",
    securityRating: "trusted",
    price: "paid",
    imageUrl: "https://picsum.photos/600/400",
    imageHint: "books library",
    framework: "Custom",
    rating: 4.9,
    ratingCount: 450,
  },
  {
    id: "personal-finance-bot",
    name: "Personal Finance Bot",
    description: "Tracks your expenses, creates budgets, and provides financial advice.",
    securityRating: "none",
    price: "free",
    imageUrl: "https://picsum.photos/600/400",
    imageHint: "money wallet",
    rating: 3.2,
    ratingCount: 50,
  },
  {
    id: "travel-planner",
    name: "AI Travel Planner",
    description: "Finds the best flights and accommodations for your next trip.",
    securityRating: "verified",
    price: "free",
    imageUrl: "https://picsum.photos/600/400",
    imageHint: "travel map",
    framework: "LlamaIndex",
    rating: 4.0,
    ratingCount: 95,
  },
];

export const tools: Tool[] = [
    {
    id: "g-suite-plugin",
    name: "G-Suite Plugin",
    description: "A plugin that provides a suite of tools for interacting with Google Workspace (Docs, Sheets, etc.).",
    icon: Bot,
    category: "Community",
    type: "plugin",
    isOfficial: true,
  },
  {
    id: "calculator",
    name: "Calculator",
    description: "A baseline tool for performing mathematical calculations.",
    icon: Calculator,
    category: "Baseline",
    type: "tool"
  },
  {
    id: "web-search",
    name: "Web Search",
    description: "Enables agents to search the web for information.",
    icon: Search,
    category: "Baseline",
    type: "tool"
  },
  {
    id: "api-connector",
    name: "API Connector",
    description: "Connect to any third-party API to fetch or send data.",
    icon: Cloud,
    category: "Community",
    type: "tool"
  },
  {
    id: "database-reader",
    name: "Database Reader",
    description: "Allows agents to read data from connected SQL databases.",
    icon: Database,
    category: "Community",
    type: "tool"
  },
  {
    id: "data-visualizer",
    name: "Data Visualizer",
    description: "Generate charts and graphs from datasets.",
    icon: BarChart,
    category: "Premium",
    type: "tool"
  },
  {
    id: "document-parser",
    name: "Document Parser",
    description: "Extract text and data from PDF and DOCX files.",
    icon: FileText,
    category: "Community",
    type: "tool"
  }
];
