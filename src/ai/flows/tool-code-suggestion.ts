'use server';

/**
 * @fileOverview An AI assistant for creating Genkit tools by suggesting code snippets.
 *
 * - suggestToolCode - A function that helps users create tools.
 * - SuggestToolCodeInput - The input type for the suggestToolCode function.
 * - SuggestToolCodeOutput - The return type for the suggestToolCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestToolCodeInputSchema = z.object({
  toolDescription: z.string().describe('The description of the tool to create.'),
});
export type SuggestToolCodeInput = z.infer<
  typeof SuggestToolCodeInputSchema
>;

const SuggestToolCodeOutputSchema = z.object({
  suggestedName: z.string().describe('A suggested camelCase name for the tool function.'),
  suggestedDescription: z.string().describe('A suggested description for the tool.'),
  codeSnippet: z.string().describe('A code snippet for the Genkit tool.'),
});
export type SuggestToolCodeOutput = z.infer<
  typeof SuggestToolCodeOutputSchema
>;

export async function suggestToolCode(
  input: SuggestToolCodeInput
): Promise<SuggestToolCodeOutput> {
  return suggestToolCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestToolCodePrompt',
  input: {schema: SuggestToolCodeInputSchema},
  output: {schema: SuggestToolCodeOutputSchema},
  prompt: `You are an AI assistant that helps developers create Genkit tools.
Your task is to generate a TypeScript code snippet for a new Genkit tool based on the user's description.

The tool should follow these best practices:
1.  It must be defined using 'ai.defineTool'.
2.  It must include 'name', 'description', 'inputSchema', and 'outputSchema'.
3.  The 'name' should be in camelCase.
4.  The schemas should be defined using Zod.
5.  The implementation of the tool should be an async function.
6.  The code should be a complete, self-contained snippet that can be placed in a file. Include necessary imports like 'z' from 'genkit' and 'ai' from '@/ai/genkit'.
7.  The tool's implementation can be a placeholder (e.g., just returning a static value of the correct output schema type), but the structure must be complete.

Based on the user's description, generate a suggested name for the tool, a description, and the full code snippet.

User's Tool Description: {{{toolDescription}}}
`,
});

const suggestToolCodeFlow = ai.defineFlow(
  {
    name: 'suggestToolCodeFlow',
    inputSchema: SuggestToolCodeInputSchema,
    outputSchema: SuggestToolCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
