'use server';

/**
 * @fileOverview AI-powered tool and plugin suggestion for agent development.
 *
 * This file defines a Genkit flow that leverages AI to suggest relevant tools and plugins for a given agent
 * based on its intended use. This flow helps users discover and integrate useful functionalities into their agents
 * more efficiently.
 *
 * @module src/ai/flows/tool-plugin-suggestion
 *
 * @exports {
 *   suggestToolsAndPlugins,
 *   ToolPluginSuggestionInput,
 *   ToolPluginSuggestionOutput,
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Input schema for the tool and plugin suggestion flow.
 */
const ToolPluginSuggestionInputSchema = z.object({
  agentDescription: z
    .string()
    .describe(
      'A detailed description of the agent, including its purpose, functionalities, and target use cases.'
    ),
});

/**
 * Represents the input for the tool and plugin suggestion flow.
 */
export type ToolPluginSuggestionInput = z.infer<
  typeof ToolPluginSuggestionInputSchema
>;

/**
 * Output schema for the tool and plugin suggestion flow.
 */
const ToolPluginSuggestionOutputSchema = z.object({
  suggestedToolsAndPlugins: z
    .array(z.string())
    .describe(
      'A list of relevant tools and plugins that can enhance the agent capabilities, based on the agent description.'
    ),
});

/**
 * Represents the output of the tool and plugin suggestion flow.
 */
export type ToolPluginSuggestionOutput = z.infer<
  typeof ToolPluginSuggestionOutputSchema
>;

/**
 * Suggests relevant tools and plugins for an agent based on its description.
 * @param input - The input containing the agent description.
 * @returns A promise resolving to the suggested tools and plugins.
 */
export async function suggestToolsAndPlugins(
  input: ToolPluginSuggestionInput
): Promise<ToolPluginSuggestionOutput> {
  return toolPluginSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'toolPluginSuggestionPrompt',
  input: {schema: ToolPluginSuggestionInputSchema},
  output: {schema: ToolPluginSuggestionOutputSchema},
  prompt: `You are an AI assistant designed to suggest relevant tools and plugins for AI agents.
  Based on the description of the agent provided, identify and suggest a list of tools and plugins that would be most useful for the agent to achieve its objectives.
  Return the suggested tools and plugins as a list of strings.

  Agent Description: {{{agentDescription}}}

  Suggested Tools and Plugins:`,
});

/**
 * Genkit flow for suggesting tools and plugins for an agent.
 */
const toolPluginSuggestionFlow = ai.defineFlow(
  {
    name: 'toolPluginSuggestionFlow',
    inputSchema: ToolPluginSuggestionInputSchema,
    outputSchema: ToolPluginSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
