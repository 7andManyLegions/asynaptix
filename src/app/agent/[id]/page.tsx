
"use client";
import AgentDetailPage from "@/components/pages/agent-detail-page";
import { useParams } from 'next/navigation';

export default function Agent() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  if (!id) {
    // Handle the case where id is not available, maybe show a loading state or an error
    return <div>Loading...</div>;
  }

  return <AgentDetailPage agentId={id} />;
}
