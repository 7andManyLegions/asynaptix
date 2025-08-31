'use server';

/**
 * @fileOverview An AI assistant for suggesting a price for an agent.
 *
 * - suggestAgentPrice - A function that helps users price their agents.
 * - SuggestAgentPriceInput - The input type for the suggestAgentPrice function.
 * - SuggestAgentPriceOutput - The return type for the suggestAgentPrice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAgentPriceInputSchema = z.object({
  agentDescription: z.string().describe('A detailed description of the agent, including its purpose, functionalities, and target use cases.'),
});
export type SuggestAgentPriceInput = z.infer<typeof SuggestAgentPriceInputSchema>;

const SuggestAgentPriceOutputSchema = z.object({
  suggestedPrice: z.number().describe('A suggested monthly price in USD for the agent. This should be a number, for example: 9.99.'),
  justification: z.string().describe('A brief justification for the suggested price, explaining the reasoning based on complexity, value, and similar agents.'),
});
export type SuggestAgentPriceOutput = z.infer<typeof SuggestAgentPriceOutputSchema>;

export async function suggestAgentPrice(input: SuggestAgentPriceInput): Promise<SuggestAgentPriceOutput> {
  return suggestAgentPriceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAgentPricePrompt',
  input: {schema: SuggestAgentPriceInputSchema},
  output: {schema: SuggestAgentPriceOutputSchema},
  prompt: `You are an expert in pricing AI agents for a marketplace. Your task is to analyze the agent description and suggest a fair monthly subscription price in USD.

Consider the following factors:
-   Complexity of the agent's functionality.
-   The value it provides to the user (e.g., time-saving, automation, insights).
-   Potential operational costs (e.g., underlying model usage).
-   Pricing of comparable agents in the market.

Based on the description below, provide a suggested price and a short justification.

Agent Description: {{{agentDescription}}}
`,
});

const suggestAgentPriceFlow = ai.defineFlow(
  {
    name: 'suggestAgentPriceFlow',
    inputSchema: SuggestAgentPriceInputSchema,
    outputSchema: SuggestAgentPriceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
