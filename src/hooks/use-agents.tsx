
"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { initialAgents, type Agent, type SecurityRating } from '@/lib/data';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, onSnapshot } from 'firebase/firestore';

export { type Agent, type SecurityRating };

interface AgentsContextType {
  agents: Agent[];
  addAgent: (agent: Agent) => Promise<void>;
  updateAgent: (agent: Agent) => Promise<void>;
  loading: boolean;
}

const AgentsContext = createContext<AgentsContextType | undefined>(undefined);

export function AgentsProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const agentsCollectionRef = collection(db, 'agents');
    
    setLoading(true);

    // Using onSnapshot to listen for real-time updates
    const unsubscribe = onSnapshot(agentsCollectionRef, (snapshot) => {
      const userAgents = snapshot.docs.map(doc => doc.data() as Agent);
      setAgents([...initialAgents, ...userAgents]);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching agents from Firestore: ", error);
      setAgents(initialAgents); // Fallback to initial agents on error
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  const addAgent = async (agent: Agent) => {
    try {
      const agentRef = doc(db, 'agents', agent.id);
      await setDoc(agentRef, agent);
    } catch (error) {
      console.error("Error adding agent to Firestore: ", error);
      // Here you might want to show a toast to the user
    }
  };

  const updateAgent = async (updatedAgent: Agent) => {
     try {
      const agentRef = doc(db, 'agents', updatedAgent.id);
      await setDoc(agentRef, updatedAgent, { merge: true });
    } catch (error) {
      console.error("Error updating agent in Firestore: ", error);
      // Here you might want to show a toast to the user
    }
  }
  
  return (
    <AgentsContext.Provider value={{ agents, addAgent, updateAgent, loading }}>
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
