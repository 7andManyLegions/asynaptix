"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { initialAgents, type Agent, type SecurityRating } from '@/lib/data';

export { type Agent, type SecurityRating };

interface AgentsContextType {
  agents: Agent[];
  addAgent: (agent: Agent) => void;
  updateAgent: (agent: Agent) => void;
}

const AgentsContext = createContext<AgentsContextType | undefined>(undefined);

export function AgentsProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    // Load agents from localStorage on mount
    try {
      const savedAgents = localStorage.getItem('userAgents');
      if (savedAgents) {
        setAgents([...initialAgents, ...JSON.parse(savedAgents)]);
      } else {
        setAgents(initialAgents);
      }
    } catch (error) {
      console.error("Failed to load agents from localStorage", error);
      setAgents(initialAgents);
    }
  }, []);

  const saveUserAgents = (userAgents: Agent[]) => {
     try {
      localStorage.setItem('userAgents', JSON.stringify(userAgents));
    } catch (error) {
      console.error("Failed to save agents to localStorage", error);
    }
  }

  const addAgent = (agent: Agent) => {
    setAgents(prevAgents => {
        const newAgents = [...prevAgents, agent];
        const userAgents = newAgents.filter(a => a.isUserCreated);
        saveUserAgents(userAgents);
        return newAgents;
    });
  };

  const updateAgent = (updatedAgent: Agent) => {
    setAgents(prevAgents => {
        const newAgents = prevAgents.map(a => a.id === updatedAgent.id ? updatedAgent : a);
        const userAgents = newAgents.filter(a => a.isUserCreated);
        saveUserAgents(userAgents);
        return newAgents;
    });
  }
  
  return (
    <AgentsContext.Provider value={{ agents, addAgent, updateAgent }}>
      {children}
    </AgentsContext.Provider>
  );
}

export function useAgents() {
  const context = useContext(AgentsContext);
  if (context === undefined) {
    throw new Error('useAgents must be used within an AgentsProvider');
  }
  return context;
}
