#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Find the .claude directory by traversing up from current directory
function findClaudeDir() {
    let currentDir = __dirname;

    // Already in .claude/hooks, go up to .claude
    if (currentDir.endsWith('.claude/hooks')) {
        return path.dirname(currentDir);
    }

    // Look for .claude directory
    while (currentDir !== path.dirname(currentDir)) {
        const claudeDir = path.join(currentDir, '.claude');
        if (fs.existsSync(claudeDir)) {
            return claudeDir;
        }
        currentDir = path.dirname(currentDir);
    }

    throw new Error('Could not find .claude directory');
}

try {
    const claudeDir = findClaudeDir();
    const completionFilePath = path.join(claudeDir, 'hooks', 'completion-validation.md');

    if (fs.existsSync(completionFilePath)) {
        const content = fs.readFileSync(completionFilePath, 'utf8');
        console.log(content);
    } else {
        console.error(`Warning: ${completionFilePath} not found`);
    }
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
}