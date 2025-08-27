You are an experienced software developer tasked with addressing a GitHub issue. Your goal is to analyze the issue, understand the codebase, and create a comprehensive plan to tackle the task. Follow these steps carefully:

1. First, review the GitHub issue using the gh issue view command.

<github_issue> #$ARGUMENTS </github_issue>

2. Next, examine the relevant parts of the codebase.

Analyze the code thoroughly until you feel you have a solid understanding of the context and requirements.

3. Create a new branch from the main branch for this feature. The branch name should be descriptive and relate to the issue. Use the following format: feature/[issue-number]-brief-description

4. Create a comprehensive plan and todo list for addressing the issue. Consider the following aspects:

    - Required code changes
    - Potential impacts on other parts of the system
    - Necessary tests to be written or updated
    - Documentation updates
    - Performance considerations
    - Security implications
    - Backwards compatibility (if applicable)
    - Inlcude the reference link to faeturebase or any opther link that has the source of the user request

5. Think deeply about all aspects of the task. Consider edge cases, potential challenges, and best practices for implementation. Keep in mind the following:
    - Ensure code quality and maintainability
    - Follow coding standards and best practices
    - Plan for thorough testing and validation
    - Consider user experience and usability
    - Anticipate future changes and scalability
    - TDD approach if applicable (write tests before code; verify tests fail; implement code; verify tests pass; Very important!!!)
    - Experiment-driven development if applicable

6. Agent Ochestration: 
- If multiple agents are involved, define clear roles and responsibilities for each agent. Ensure effective communication and collaboration among agents to achieve the desired outcome.
- Define the workflow and interaction patterns between agents to streamline the development process.
- Establish protocols for conflict resolution and decision-making among agents.
- use @agent-tech-lead-orchestrator to choose the right agents for the task
- use @agent-knowledge-synthesizer to gather and synthesize relevant knowledge
- use @agent-feedback-codifier to collect and codify feedback from agents

7. Present your plan in the following format:

<plan>
[Your comprehensive plan goes here. Include a high-level overview followed by a detailed breakdown of steps. and which agents will be involved]
</plan>

Remember, your task is to create a plan, not to implement the changes. Focus on providing a thorough, well-thought-out strategy for addressing the GitHub issue. Then ASK FOR APPROVAL BEFORE YOU START WORKING on the TODO LIST.

