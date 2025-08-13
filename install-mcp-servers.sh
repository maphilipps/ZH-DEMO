#!/bin/bash

# Sequential Thinking
claude mcp add sequential-thinking -s user -- npx -y modelcontextprotocol/server-sequential-thinking

# Filesystem
claude mcp add filesystem -s user -- npx -y ~/Sites

# Web Fetching
claude mcp add fetch -s user -- npx -y kazuph/mcp-fetch

# Browser Tools
claude mcp add browser-tools -s user -- npx -y agentdeskai/browser-tools-mcp@1.2.1

claude mcp add server-memory -s user -- npx -y modelcontextprotocol/server-memory

claude mcp add a11y-accessibility -s user -- npx -y a11y-mcp-server

claude mcp add lightning -s user -- npx -y lighthouse-mcp


# Check whats been installed
claude mcp list