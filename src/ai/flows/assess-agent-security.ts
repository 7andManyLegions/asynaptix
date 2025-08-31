'use server';

/**
 * @fileOverview An AI agent that assesses the security of other agents.
 *
 * - assessAgentSecurity - A function that analyzes an agent's code and description for security vulnerabilities.
 * - AssessAgentSecurityInput - The input type for the assessAgentSecurity function.
 * - AssessAgentSecurityOutput - The return type for the assessAgentSecurity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessAgentSecurityInputSchema = z.object({
  agentDescription: z.string().describe("The agent's description."),
  agentCode: z.string().describe("The agent's code or logic."),
});
export type AssessAgentSecurityInput = z.infer<typeof AssessAgentSecurityInputSchema>;

const SecurityFindingSchema = z.object({
  finding: z.string().describe('A description of the potential security vulnerability.'),
  recommendation: z.string().describe('A recommendation on how to mitigate the vulnerability.'),
});

const AssessAgentSecurityOutputSchema = z.object({
  overallRating: z.enum(['secure', 'caution', 'insecure']).describe('The overall security rating for the agent.'),
  summary: z.string().describe('A summary of the security assessment.'),
  findings: z.array(SecurityFindingSchema).describe('A list of potential security vulnerabilities found.'),
});
export type AssessAgentSecurityOutput = z.infer<typeof AssessAgentSecurityOutputSchema>;

export async function assessAgentSecurity(
  input: AssessAgentSecurityInput
): Promise<AssessAgentSecurityOutput> {
  return assessAgentSecurityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessAgentSecurityPrompt',
  input: {schema: AssessAgentSecurityInputSchema},
  output: {schema: AssessAgentSecurityOutputSchema},
  prompt: `You are an expert AI Agent Security Auditor. Your task is to analyze the provided agent description and code to identify potential security vulnerabilities.

Your assessment should be strict but fair. Consider the following potential issues:
- Prompt Injection: Can the agent be manipulated by malicious user inputs to perform unintended actions?
- Data Privacy: Does the agent handle sensitive user data? If so, are there safeguards?
- Unsecured Tool Usage: Does the agent use tools that could access external systems (APIs, databases, file systems)? Is the access properly controlled?
- Error Handling: Does poor error handling expose sensitive system information?
- Unrestricted Capabilities: Can the agent perform dangerous or destructive actions?
- Complexity: Is the agent's logic overly complex, making it hard to audit for security flaws?

Based on your analysis, provide an overall security rating ('secure', 'caution', 'insecure'), a summary of your findings, and a list of specific vulnerabilities and recommendations for fixing them. If no issues are found, state that clearly in the summary and findings.

Agent Description:
{{{agentDescription}}}

Agent Code/Logic:
{{{agentCode}}}
`,
});

const assessAgentSecurityFlow = ai.defineFlow(
  {
    name: 'assessAgentSecurityFlow',
    inputSchema: AssessAgentSecurityInputSchema,
    outputSchema: AssessAgentSecurityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
