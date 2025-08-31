'use server';

/**
 * @fileOverview This file defines a Genkit flow for assisting users in linking agents together.
 *
 * It provides suggestions for connection points and validates data flow to facilitate the creation of complex agent networks.
 *
 * - `agentLinkingAssistance` - A function that takes descriptions of two agents and suggests how they can be linked.
 * - `AgentLinkingAssistanceInput` - The input type for the `agentLinkingAssistance` function.
 * - `AgentLinkingAssistanceOutput` - The return type for the `agentLinkingAssistance` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AgentLinkingAssistanceInputSchema = z.object({
  agent1Description: z
    .string()
    .describe('A detailed description of the first agent, including its purpose, inputs, and outputs.'),
  agent2Description: z
    .string()
    .describe('A detailed description of the second agent, including its purpose, inputs, and outputs.'),
});

export type AgentLinkingAssistanceInput = z.infer<typeof AgentLinkingAssistanceInputSchema>;

const AgentLinkingAssistanceOutputSchema = z.object({
  suggestedConnectionPoints: z
    .string()
    .describe('Suggestions for how the two agents can be connected, including specific inputs and outputs that can be linked.'),
  dataFlowValidation: z
    .string()
    .describe('An analysis of the data flow between the agents, including potential issues and how to resolve them.'),
    generatedCode: z.string().describe('The generated code that links the two agents.'),
});

export type AgentLinkingAssistanceOutput = z.infer<typeof AgentLinkingAssistanceOutputSchema>;

export async function agentLinkingAssistance(input: AgentLinkingAssistanceInput): Promise<AgentLinkingAssistanceOutput> {
  return agentLinkingAssistanceFlow(input);
}

const agentLinkingAssistancePrompt = ai.definePrompt({
  name: 'agentLinkingAssistancePrompt',
  input: {schema: AgentLinkingAssistanceInputSchema},
  output: {schema: AgentLinkingAssistanceOutputSchema},
  prompt: `You are an Agent Linking Agent. Your job is to analyze two agents and determine how to link them so that they can work together.
  You will be given the descriptions, inputs, and outputs of two agents.
  Your task is to:
  1.  Determine the most logical way to connect them. Does Agent 1's output feed into Agent 2's input, or vice-versa?
  2.  Provide a clear explanation of the connection points.
  3.  Validate the data flow and highlight any potential mismatches or issues.
  4.  Generate a code snippet (e.g., in TypeScript or Python) that demonstrates the orchestration, showing how to call the first agent, process its output, and pass it to the second agent.

Agent 1: {{{agent1Description}}}
Agent 2: {{{agent2Description}}}`,
});

const agentLinkingAssistanceFlow = ai.defineFlow(
  {
    name: 'agentLinkingAssistanceFlow',
    inputSchema: AgentLinkingAssistanceInputSchema,
    outputSchema: AgentLinkingAssistanceOutputSchema,
  },
  async input => {
    const {output} = await agentLinkingAssistancePrompt(input);
    return output!;
  }
);
