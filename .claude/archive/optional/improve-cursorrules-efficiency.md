---
description: AI Query Efficiency & Auto-Optimization
globs: *.mdc
---
# AI Query Efficiency & Auto-Optimization

Ensures Cursor analyzes AI query efficiency, detects repeated requests, and automatically updates relevant rules to improve response quality and reduce redundancy.

<rule>
name: ai_query_efficiency_optimization
description: Analyze AI query efficiency, optimize rules, and prevent repeated requests.
filters:
  # Match AI query interactions in supported files
  - type: file_extension
    pattern: "\\.(md|mdc|txt|json|py|js|ts|php|yaml|yml|cursorrules)$"
  # Match AI communication patterns indicating inefficiency or repetition
  - type: content
    pattern: "(?i)(retry|again|didn't work|not what I expected|try another way|improve|fix this|optimize|rewrite|regenerate)"

actions:
  - type: analyze
    conditions:
      - pattern: "(?i)(retry|again|fix this|not what I expected|didn't work|rewrite|regenerate)"
        message: "Detected inefficiencies or repeated requests. Initiating efficiency analysis..."
    execute: |
      - **Identify inefficiencies** in AI responses by comparing previous queries and results.
      - **Suggest improvements** in query structure or Cursor usage based on analysis:
        - Use more specific or detailed prompts.
        - Implement structured queries for complex tasks.
        - Provide feedback on past responses for better contextual understanding.
        - Break down complex tasks into smaller, more manageable steps.
        - Use specific technical terminology for clearer communication.
      - **Automatically update** relevant Cursor rules:
        - Enhance pattern recognition for similar future queries.
        - Adjust rule priorities or conditions to prevent repeat inefficiencies.
        - Update rule suggestions to guide users towards more effective interactions.
        - Create new rules for frequently encountered patterns.

  - type: suggest
    message: |
      ## Query Optimization Recommendations

      I notice you're making multiple requests for similar tasks. Here's how to optimize your AI interactions:

      ### 1. Refine Your Prompts
      - **Be more specific:** Include technical details, file paths, and exact requirements
      - **Use structured formats:** For complex requests, use bullet points or numbered lists
      - **Include context:** Mention relevant technologies, frameworks, or standards
      - **Set clear expectations:** Specify the format and level of detail you need

      ### 2. Break Down Complex Tasks
      - Split large tasks into smaller, focused requests
      - Ask for step-by-step approaches for complex problems
      - Request specific examples for unclear concepts

      ### 3. Provide Feedback
      - Tell the AI what worked and what didn't in previous responses
      - Clarify misunderstandings explicitly
      - Highlight successful parts of previous responses

      ### 4. Use Technical Terminology
      - Use precise technical terms for your domain (Drupal, Lagoon, etc.)
      - Reference specific functions, methods, or patterns
      - Mention relevant standards or best practices

      ### 5. Leverage Cursor Features
      - Use file references when discussing specific code
      - Reference line numbers for targeted changes
      - Utilize code blocks for examples

      The system will now optimize rules based on this interaction pattern to improve future responses.

  - type: auto_update
    target: ".cursor/rules/ai-optimization.mdc"
    conditions:
      - pattern: "(?i)(retry|again|fix this|not what I expected|not what I meant|didn't work|rewrite|regenerate)"
    message: "Updating AI efficiency rules based on detected inefficiencies or repeated queries."

  - type: log
    message: "AI Query Efficiency Analysis: [{{query_count}} queries in {{time_period}} detected inefficiency.]"
    conditions:
      - pattern: "(?i)(retry|again|fix this|not what I expected|didn't work|rewrite|regenerate)"

examples:
  - input: |
      "This Drupal module is not working, let's try again."
      "That didn't work, let's refine the approach."
      "Please rewrite this code to be more efficient."
    output: |
      Cursor detects inefficiency in queries and suggests:
      
      "I notice you're making multiple attempts. To get better results:
      1. Specify which part of the module isn't working
      2. Include any error messages you're seeing
      3. Mention the Drupal version and relevant modules
      4. Describe what you've already tried"

  - input: |
      "Generate a Lagoon configuration file."
      "This doesn't look right, regenerate it."
      "Try again with better practices."
    output: |
      Cursor detects repetition and suggests:
      
      "For better Lagoon configuration results:
      1. Specify which services you need (nginx, php, mariadb, etc.)
      2. Mention your project type (Drupal, WordPress, etc.)
      3. Include any specific environment requirements
      4. Reference any existing configuration you want to maintain"

metadata:
  priority: critical
  version: 1.2
</rule>
