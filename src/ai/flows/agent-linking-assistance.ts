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
});

export type AgentLinkingAssistanceOutput = z.infer<typeof AgentLinkingAssistanceOutputSchema>;

export async function agentLinkingAssistance(input: AgentLinkingAssistanceInput): Promise<AgentLinkingAssistanceOutput> {
  return agentLinkingAssistanceFlow(input);
}

const agentLinkingAssistancePrompt = ai.definePrompt({
  name: 'agentLinkingAssistancePrompt',
  input: {schema: AgentLinkingAssistanceInputSchema},
  output: {schema: AgentLinkingAssistanceOutputSchema},
  prompt: `You are an AI assistant that helps users link two agents together.  Given the descriptions of two agents, you will suggest appropriate connection points and validate the data flow between them.

Agent 1 Description: {{{agent1Description}}}
Agent 2 Description: {{{agent2Description}}}

Consider the purpose, inputs, and outputs of each agent when suggesting connection points.  Also, analyze the data flow between the agents and identify any potential issues. Provide clear, actionable suggestions for how to resolve any issues.

Output your reasoning, suggested connection points and data flow validation in a structured and easy-to-understand format.`,
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
