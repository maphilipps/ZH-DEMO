#!/bin/bash
# MCP Installation Script for GPZH Project
# This script installs and configures all necessary MCP servers for the GPZH multi-municipality portal project

echo "🚀 Installing GPZH MCP Stack for Multi-Municipality Testing..."

# Check if Claude CLI is available
if ! command -v claude &> /dev/null; then
    echo "❌ Claude CLI not found. Please install Claude Desktop first."
    exit 1
fi

# Core MCPs for GPZH Development
echo "📦 Installing Core MCPs..."

# 1. Atlassian MCP for Jira integration
echo "  - Installing Atlassian MCP..."
claude mcp add atlassian-jira -- npx -y @modelcontextprotocol/server-atlassian

# 2. GitHub MCP for repository management
echo "  - Installing GitHub MCP..."
claude mcp add github -- npx -y @modelcontextprotocol/server-github

# 3. Playwright MCP for multi-site testing
echo "  - Installing Playwright MCP..."
claude mcp add playwright -- npx -y @modelcontextprotocol/server-playwright

# 4. Browser Tools MCP for live auditing
echo "  - Installing Browser Tools MCP..."
claude mcp add browser-tools -- npx -y @modelcontextprotocol/server-browser-tools

# 5. Puppeteer MCP for demo automation
echo "  - Installing Puppeteer MCP..."
claude mcp add puppeteer -- npx -y @modelcontextprotocol/server-puppeteer

# 6. Sequential Thinking MCP for workflow orchestration
echo "  - Installing Sequential Thinking MCP..."
claude mcp add sequential-thinking -- npx -y @modelcontextprotocol/server-sequential-thinking

# 7. Server Memory MCP for knowledge management
echo "  - Installing Server Memory MCP..."
claude mcp add memory -- npx -y @modelcontextprotocol/server-memory

# Install Node.js testing dependencies
echo "📋 Installing Node.js Testing Dependencies..."
npm install -g @playwright/test @axe-core/playwright

# Install project-specific dependencies
echo "📦 Installing Project Dependencies..."
if [ -f package.json ]; then
    npm install
fi

# Install theme dependencies
if [ -f web/themes/custom/adesso_cms_theme/package.json ]; then
    cd web/themes/custom/adesso_cms_theme
    npm install
    cd ../../..
fi

echo ""
echo "✅ GPZH MCP Stack installed successfully!"
echo ""
echo "🔧 Next Steps:"
echo "1. Configure environment variables in your shell profile:"
echo ""
echo "   export JIRA_API_TOKEN='your_jira_api_token'"
echo "   export JIRA_BASE_URL='https://adesso.atlassian.net'"
echo "   export JIRA_USER_EMAIL='your_email@adesso.com'"
echo "   export GITHUB_PERSONAL_ACCESS_TOKEN='your_github_token'"
echo "   export CONFLUENCE_API_TOKEN='your_confluence_token'"
echo ""
echo "   # GPZH-specific configurations"
echo "   export GPZH_BASE_URL='https://adesso-cms.ddev.site'"
echo "   export GPZH_ADMIN_USER='admin'"
echo "   export GPZH_ADMIN_PASS='admin123'"
echo "   export GPZH_MUNICIPALITIES='thalwil,thalheim,erlenbach'"
echo ""
echo "2. Restart your shell or run: source ~/.zshrc (or ~/.bashrc)"
echo ""
echo "3. Test MCP integration:"
echo "   @jira-list"
echo "   @playwright-test-municipality --site='thalwil'"
echo "   @browser-audit-performance --url='https://adesso-cms.ddev.site'"
echo ""
echo "📋 Run '@gpzh-demo-ready-check' to validate demo environment"
