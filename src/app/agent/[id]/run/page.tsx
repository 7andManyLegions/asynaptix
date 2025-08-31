
"use client";
import RunAgentPage from "@/components/pages/run-agent-page";
import { useParams } from 'next/navigation';

export default function RunAgent() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  if (!id) {
    // Handle the case where id is not available, maybe show a loading state or an error
    return <div>Loading...</div>;
  }

  return <RunAgentPage agentId={id} />;
}
