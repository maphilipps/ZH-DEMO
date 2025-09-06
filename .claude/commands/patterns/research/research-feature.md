# Analyze Feature Architecture

## Introduction

This command performs a comprehensive technical analysis of how a specific feature is implemented in a repository. It systematically examines the codebase to understand algorithms, design patterns, code paths, performance characteristics, and platform-specific implementations, then formats the findings for experiments.md_2.

**Usage Examples:**
- Local repo: `/analyze-feature-architecture ~/projects/my-app "user authentication"`
- Remote repo: `/analyze-feature-architecture https://github.com/facebook/react "hooks"`

## Prerequisites

- Repository path (local: `/path/to/repo` or remote: `https://github.com/user/repo`)
- Feature name to analyze
- Access to the codebase
- Understanding of the programming language used

## Initial Setup

1. **Repository Access**
   - For remote repos: `git clone [Repository URL]`
   - For local repos: `cd [Repository path]` (e.g., `cd ~/projects/my-app`)
   - Verify you're in the repository root with `git status`
   - Identify main programming language and framework

2. **Feature Identification**
   - Search for [FEATURE NAME] references across codebase
   - Identify entry points and main implementation files
   - Create initial file list for detailed analysis

## Main Analysis Tasks

### 1. Core Algorithm Analysis

**Parallel Subtasks:**
- Search for main algorithm implementation files
- Identify data flow and processing steps
- Document major algorithmic steps:
  - Scanning/input acquisition
  - Data structure building
  - Processing and transformations
  - Output/visualization generation

**Thinking Approach:** Apply analytical thinking to trace the logical flow and understand the problem-solving approach

### 2. Design Patterns and Data Structures

**Parallel Subtasks:**
- Identify design patterns (Composite, Observer, Factory, etc.)
- Document data structures used (trees, arrays, hash maps, etc.)
- Analyze why each pattern/structure was chosen
- Find code examples demonstrating each pattern

**Thinking Approach:** Use pattern recognition and architectural analysis

### 3. Critical Code Path Tracing

**Sequential Tasks:**
1. Locate main entry point
2. Trace initialization sequence
3. Follow data acquisition/scanning flow
4. Map processing and transformation steps
5. Document rendering/output generation
6. Create visual flow diagram or detailed textual description

**To-Do List:**
- [ ] Find main() or entry point
- [ ] Document initialization steps
- [ ] Trace data flow through major components
- [ ] Identify key function calls and their purposes
- [ ] Note any async/parallel processing points

### 4. Performance Analysis

**Parallel Subtasks:**
- Analyze time complexity of major operations
- Identify memory usage patterns
- Search for performance optimizations (caching, etc.)
- Look for bottlenecks or performance comments
- Check for multithreading/async implementations

**Thinking Approach:** Apply critical thinking to evaluate efficiency and scalability

### 5. Implementation Evolution

**Sequential Tasks:**
1. Use git history to trace feature development
2. Identify initial implementation
3. Document major refactors or changes
4. Note architectural decisions and their rationales
5. Create timeline of significant changes

**Git Commands:**
```bash
git log --follow -- [main feature files]
git blame [key files]
git log --grep="[FEATURE NAME]"
```

### 6. Engineering Patterns

**Parallel Subtasks:**
- Error handling analysis (try-catch, fail-safes, validation)
- Memory management strategies (allocation, cleanup, pooling)
- Concurrency model (threads, async/await, queues)
- Coding conventions and best practices
- Logging and debugging capabilities

## Platform-Specific Analysis

### OS APIs and Libraries

**Tasks:**
1. Identify all system-level dependencies
2. Document platform-specific APIs used
3. Distinguish portable vs platform-specific code
4. Note any compatibility layers or abstractions

### Platform Optimizations

**Analysis Points:**
- Performance tricks specific to the platform
- Compatibility considerations (OS versions, hardware)
- Security features (sandboxing, permissions)
- File system or network optimizations

## Output Generation

### Format for experiments.md_2

Create the final output following this exact structure:

```markdown
## [PROJECT NAME] Analysis
**Feature:** [FEATURE NAME]  
**Approach:** [One sentence summary of the core approach]

### How It Works
1. [Step 1 of execution flow]
2. [Step 2 of execution flow]
3. [Continue with all major steps]

### Key Technical Decisions
- **[Decision 1]:** [Why they made it]  
- **[Decision 2]:** [Why they made it]  
- **[Continue with all significant decisions]**

### Notable Design Patterns
- **[Pattern 1]:** [Brief description]
  ```language
  // Code example showing the pattern
  ```
- **[Pattern 2]:** [Brief description]
  ```language
  // Code example showing the pattern
  ```

### What to Avoid
- **[Anti-pattern/limitation 1]:** [Description and why to avoid]
- **[Performance trap/edge case]:** [Description and implications]

### macOS Implementation Strategy
[Specific plan for adapting this approach to macOS, including:]
- Required frameworks (Cocoa, CoreGraphics, etc.)
- API mappings from original platform
- Performance considerations
- UI/UX adaptations needed
```

## Verification Checklist

Before finalizing the analysis:

- [ ] All major code paths traced
- [ ] Performance characteristics documented
- [ ] Design patterns identified with examples
- [ ] Platform dependencies clearly listed
- [ ] Evolution history summarized
- [ ] Anti-patterns and limitations noted
- [ ] Implementation strategy provided
- [ ] Output formatted correctly for experiments.md_2

## Notes and Best Practices

- Use grep/search extensively to find all feature references
- Read configuration files for feature flags or settings
- Check test files for additional implementation insights
- Look for documentation or comments explaining design decisions
- Consider creating diagrams for complex flows
- Verify findings by running the code if possible

## Expected Outcome

A comprehensive technical analysis document that provides deep insights into the feature implementation, suitable for understanding the approach and adapting it to other platforms or projects. The analysis should be thorough enough that another developer could understand the feature's architecture and make informed decisions about porting or improving it.

Save to: {{ output }}
