# Testing and Validation Rules

## Code Quality Requirements

**ALWAYS run lint and typecheck commands after code changes**
- Check for `npm run lint`, `npm run typecheck`, `ruff`, etc. in package.json or project docs
- If commands are not found, ask user for the correct commands
- Suggest adding commands to CLAUDE.md for future reference

## Testing Framework Discovery

**NEVER assume specific test framework or test script**
- Check README for testing instructions
- Search codebase to determine testing approach
- Look for test configuration files (jest.config.js, phpunit.xml, etc.)

## Post-Change Verification Checklist

1. Run applicable linters and type checkers
2. Execute relevant test suites
3. Verify site functionality with `ddev launch`
4. Check for console errors and warnings
5. Validate component rendering and accessibility

## Error Handling

- Address all linting errors before completion
- Fix type errors and warnings
- Ensure tests pass before marking tasks complete
- Document any unresolved issues for user review