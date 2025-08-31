'use server';

/**
 * @fileOverview An AI assistant for creating agents by suggesting configurations and code snippets.
 *
 * - agentCreationAssistant - A function that helps users create agents.
 * - AgentCreationAssistantInput - The input type for the agentCreationAssistant function.
 * - AgentCreationAssistantOutput - The return type for the agentCreationAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AgentCreationAssistantInputSchema = z.object({
  desiredFunctionality: z
    .string()
    .describe('The desired functionality of the agent.'),
  existingCode: z.string().optional().describe('Existing code to incorporate.'),
  agentType: z.string().optional().describe('The type of agent to create.'),
});
export type AgentCreationAssistantInput = z.infer<
  typeof AgentCreationAssistantInputSchema
>;

const AgentCreationAssistantOutputSchema = z.object({
  suggestedConfiguration: z
    .string()
    .describe('Suggested configuration for the agent.'),
  codeSnippet: z.string().describe('A code snippet for the agent.'),
  explanation: z.string().describe('Explanation of the code snippet.'),
});
export type AgentCreationAssistantOutput = z.infer<
  typeof AgentCreationAssistantOutputSchema
>;

export async function agentCreationAssistant(
  input: AgentCreationAssistantInput
): Promise<AgentCreationAssistantOutput> {
  return agentCreationAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'agentCreationAssistantPrompt',
  input: {schema: AgentCreationAssistantInputSchema},
  output: {schema: AgentCreationAssistantOutputSchema},
  prompt: `You are an AI assistant that helps users create agents.

  Based on the user's desired functionality, suggest a configuration and a code snippet for the agent.
  If existing code is provided, incorporate it into the generated code snippet.
  Explain the code snippet.

  Desired Functionality: {{{desiredFunctionality}}}
  Existing Code: {{{existingCode}}}
  Agent Type: {{{agentType}}}

  Configuration:
  {{suggestedConfiguration}}

  Code Snippet:
  {{codeSnippet}}

  Explanation:
  {{explanation}}`,
});

const agentCreationAssistantFlow = ai.defineFlow(
  {
    name: 'agentCreationAssistantFlow',
    inputSchema: AgentCreationAssistantInputSchema,
    outputSchema: AgentCreationAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
