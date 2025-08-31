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
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: "Baseline" | "Community" | "Premium";
}

export const agents: Agent[] = [
  {
    id: "data-analyst",
    name: "Data Analyst Agent",
    description: "An agent that can analyze data from various sources and generate reports.",
    securityRating: "trusted",
    price: "paid",
    imageUrl: "https://picsum.photos/600/400",
    imageHint: "data chart"
  },
  {
    id: "social-media-manager",
    name: "Social Media Manager",
    description: "Automates social media posts, tracks engagement, and generates content ideas.",
    securityRating: "verified",
    price: "free",
    imageUrl: "https://picsum.photos/600/400",
    imageHint: "social media"
  },
  {
    id: "code-generator",
    name: "Code Generator Agent",
    description: "Generates boilerplate code in multiple languages based on your specifications.",
    securityRating: "scanned",
    price: "free",
    imageUrl: "https://picsum.photos/600/400",
    imageHint: "code screen"
  },
  {
    id: "research-assistant",
    name: "Research Assistant",
    description: "Gathers and summarizes information from the web on any given topic.",
    securityRating: "trusted",
    price: "paid",
    imageUrl: "https://picsum.photos/600/400",
    imageHint: "books library"
  },
  {
    id: "personal-finance-bot",
    name: "Personal Finance Bot",
    description: "Tracks your expenses, creates budgets, and provides financial advice.",
    securityRating: "none",
    price: "free",
    imageUrl: "https://picsum.photos/600/400",
    imageHint: "money wallet"
  },
  {
    id: "travel-planner",
    name: "AI Travel Planner",
    description: "Finds the best flights and accommodations for your next trip.",
    securityRating: "verified",
    price: "free",
    imageUrl: "https://picsum.photos/600/400",
    imageHint: "travel map"
  },
];

export const tools: Tool[] = [
  {
    id: "calculator",
    name: "Calculator",
    description: "A baseline tool for performing mathematical calculations.",
    icon: Calculator,
    category: "Baseline",
  },
  {
    id: "web-search",
    name: "Web Search",
    description: "Enables agents to search the web for information.",
    icon: Search,
    category: "Baseline",
  },
  {
    id: "langchain-integrator",
    name: "Langchain Integrator",
    description: "Integrate agents built with Langchain.",
    icon: Bot,
    category: "Community"
  },
  {
    id: "api-connector",
    name: "API Connector",
    description: "Connect to any third-party API to fetch or send data.",
    icon: Cloud,
    category: "Community",
  },
  {
    id: "database-reader",
    name: "Database Reader",
    description: "Allows agents to read data from connected SQL databases.",
    icon: Database,
    category: "Community",
  },
  {
    id: "data-visualizer",
    name: "Data Visualizer",
    description: "Generate charts and graphs from datasets.",
    icon: BarChart,
    category: "Premium",
  },
  {
    id: "document-parser",
    name: "Document Parser",
    description: "Extract text and data from PDF and DOCX files.",
    icon: FileText,
    category: "Community",
  }
];
