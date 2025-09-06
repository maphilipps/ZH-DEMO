You are an AI assistant tasked with improving and updating coding rules based on patterns observed in a codebase AND implementing compound engineering learning practices. Your goal is to analyze the provided code, update the rules document, AND capture compound learning insights for exponential improvement.

You will be provided with two inputs:

<codebase>
{{CODEBASE}}
</codebase>

This contains the current state of the project's codebase. Analyze this carefully to identify patterns, common practices, and potential areas for improvement.

<claude_md>
{{CLAUDE_MD}}
</claude_md>

This is the current set of rules and best practices for the project. You will be updating this document based on your analysis of the codebase.

Follow these steps to analyze the code and update the rules:

1. Carefully review the codebase, paying attention to:
  - Repeated code patterns
  - Common error handling techniques
  - Use of libraries and tools
  - Test coverage and patterns
  - Security and performance practices
  - ADR (Architecture Decision Record) patterns, especially in the .adr folder

2. Compare the observed patterns with the existing rules in Claude.md.

3. Identify areas where new rules should be added or existing rules should be modified based on the following criteria:
  - New technology or pattern used in 3 or more files
  - Common bugs that could be prevented by a rule
  - Repeated feedback in code reviews
  - Emerging security or performance patterns
  - ADR patterns that should be derived from templates in the .adr folder

4. For each new or modified rule:
  - Ensure it is actionable and specific
  - Provide examples from the actual codebase
  - Include up-to-date references if applicable
  - Cross-reference related rules

5. If any existing rules are no longer applicable:
  - Mark them as deprecated
  - Provide migration paths for old patterns if necessary

6. Update any documentation references or links between related rules.

7. For ADRs, if you notice any patterns:
  - Suggest deriving ADRs from templates in the .adr folder
  - Provide guidance on when and how to create new ADRs

After your analysis, provide your updates to the Claude.md file in the following format:

<rule_updates>
[Provide your updates here. Include new rules, modified rules, and any rules that should be deprecated. Use markdown formatting for clarity.]
</rule_updates>

<justification>
[Explain your reasoning for each update, referencing specific patterns or issues observed in the codebase.]
</justification>

Here's an example of how your output might look:

<rule_updates>
## New Rule: Standardized Prisma Queries

When using Prisma for database queries, follow these guidelines:

1. Use consistent select fields for common entity types:

```typescript
const user = await prisma.user.findUnique({
  where: { id },
  select: {
    id: true,
    email: true,
    name: true,
    role: true
  }
});
```

2. Implement pagination for list queries:

```typescript
const users = await prisma.user.findMany({
  skip: (page - 1) * pageSize,
  take: pageSize,
  orderBy: { createdAt: 'desc' }
});
```

3. Use appropriate error handling:

```typescript
try {
  const user = await prisma.user.create({ data });
} catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle known Prisma errors
  } else {
    // Handle other errors
  }
}
```

## Modified Rule: Error Handling

Update the existing error handling section to include:

- Use custom error classes for domain-specific errors
- Implement a centralized error logging mechanism
- Ensure all async functions are properly wrapped in try/catch blocks

## Deprecated Rule: Manual SQL Queries

The use of manual SQL queries is now deprecated. Use Prisma's query builder or raw query methods instead.

## New Rule: ADR Creation and Management

When creating new Architecture Decision Records (ADRs):

1. Use the templates provided in the .adr folder as a starting point.
2. Follow the established naming convention: NNNN-title-with-dashes.md
3. Include the following sections in each ADR:
  - Title
  - Status (Proposed, Accepted, Rejected, Deprecated, Superseded)
  - Context
  - Decision
  - Consequences

Example:

```markdown
# 0001-use-postgresql-as-primary-database

## Status
Accepted

## Context
We need a reliable, scalable database solution for our application.

## Decision
We will use PostgreSQL as our primary database.

## Consequences
- Pros: Strong ACID compliance, rich feature set, good performance
- Cons: May require more setup and maintenance compared to some NoSQL options
```
</rule_updates>

<justification>
The new rule for standardized Prisma queries was added because I observed inconsistent usage of Prisma across multiple files in the codebase. Standardizing these patterns will improve code readability and maintainability.

The error handling rule was modified to reflect the new error handling practices I saw implemented in recent additions to the codebase. This update ensures that all developers follow the same robust error handling procedures.

The manual SQL queries rule was deprecated because the codebase has fully migrated to using Prisma, and no instances of manual SQL queries were found in the recent code.

The new rule for ADR creation and management was added based on the observation of inconsistent ADR formats in the codebase. By standardizing the ADR process and utilizing templates from the .adr folder, we can ensure better documentation of architectural decisions and make it easier for team members to understand and reference these decisions in the future.
</justification>

## Compound Engineering Learning Integration

After completing rule analysis, perform compound learning capture:

8. **Capture Raw Learning**: Add entry to `memory-bank/raw_reflection_log.md` with:
   - Date and task reference
   - Specific learnings and patterns discovered
   - Difficulties faced and how resolved
   - Successful approaches and their effectiveness
   - Improvements identified for consolidation

9. **Pattern Recognition**: Identify patterns that represent:
   - Proactive vs reactive solutions (Every.to article insight)
   - Context evolution opportunities 
   - Agent orchestration improvements
   - Compound improvement potential

10. **Quality Gate Evolution**: Note how this learning could improve:
    - Future ADR compliance checking
    - Pattern recognition accuracy
    - Agent selection algorithms
    - Context evolution intelligence

Remember, your final output should include three sections:

<rule_updates>
[Provide your rule updates here as described above]
</rule_updates>

<justification>
[Explain your reasoning for rule updates as described above]
</justification>

<compound_learning>
[Add raw learning entry for memory-bank and identify compound improvement opportunities]
</compound_learning>

This implements the Every.to principle that "every action creates systems that make future actions faster, safer, and more intelligent."