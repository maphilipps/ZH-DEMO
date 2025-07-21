# MCP (Model Context Protocol) Integration

## External Data Sources for Enhanced Agent Context

### MCP Configuration for adesso CMS

#### settings.json Configuration
```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["@figma/mcp-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "${FIGMA_TOKEN}"
      }
    },
    "slack": {
      "command": "npx", 
      "args": ["@slack/mcp-server"],
      "env": {
        "SLACK_BOT_TOKEN": "${SLACK_TOKEN}",
        "SLACK_APP_TOKEN": "${SLACK_APP_TOKEN}"
      }
    },
    "google_drive": {
      "command": "npx",
      "args": ["@google/drive-mcp-server"],
      "env": {
        "GOOGLE_API_KEY": "${GOOGLE_API_KEY}",
        "GOOGLE_CLIENT_ID": "${GOOGLE_CLIENT_ID}"
      }
    },
    "jira": {
      "command": "npx",
      "args": ["@atlassian/jira-mcp-server"],
      "env": {
        "JIRA_URL": "${JIRA_URL}",
        "JIRA_API_TOKEN": "${JIRA_TOKEN}"
      }
    },
    "drupal_api": {
      "command": "node",
      "args": [".claude/mcp/drupal-mcp-server.js"],
      "env": {
        "DRUPAL_BASE_URL": "http://localhost:8080",
        "DRUPAL_API_KEY": "${DRUPAL_API_KEY}"
      }
    }
  }
}
```

### Agent-Specific MCP Usage

#### Planner Agent MCP Integration
```xml
<mcp_enhanced_planning>
<external_context_sources>
  <figma_designs>
    <!-- Fetch latest design components and patterns -->
    <mcp_call server="figma" method="get_components">
      <project_id>{{ figma_project_id }}</project_id>
      <filter>accessibility_annotations</filter>
    </mcp_call>
  </figma_designs>
  
  <stakeholder_requirements>
    <!-- Get requirements from Slack discussions -->
    <mcp_call server="slack" method="search_messages">
      <channel>#adesso-cms-requirements</channel>
      <query>accessibility requirements component</query>
      <time_range>last_30_days</time_range>
    </mcp_call>
  </stakeholder_requirements>
  
  <existing_tickets>
    <!-- Check JIRA for related work -->
    <mcp_call server="jira" method="search_issues">
      <jql>project = ADS AND component = accessibility AND status != Done</jql>
    </mcp_call>
  </existing_tickets>
</external_context_sources>
</mcp_enhanced_planning>
```

#### Developer Agent MCP Integration
```xml
<mcp_enhanced_development>
<design_context>
  <!-- Get precise design specs from Figma -->
  <mcp_call server="figma" method="get_component_specs">
    <component_name>{{ component_name }}</component_name>
    <include_accessibility_notes>true</include_accessibility_notes>
    <include_responsive_variants>true</include_responsive_variants>
  </mcp_call>
</design_context>

<existing_patterns>
  <!-- Fetch existing Drupal components -->
  <mcp_call server="drupal_api" method="get_sdc_components">
    <component_type>navigation</component_type>
    <include_accessibility_features>true</include_accessibility_features>
  </mcp_call>
</existing_patterns>

<documentation_context>
  <!-- Get relevant documentation from Google Drive -->
  <mcp_call server="google_drive" method="search_documents">
    <query>accessibility guidelines component development</query>
    <folder_id>{{ adesso_cms_docs_folder }}</folder_id>
  </mcp_call>
</documentation_context>
</mcp_enhanced_development>
```

### Custom MCP Server for Drupal Integration

#### Drupal MCP Server Implementation
```javascript
// .claude/mcp/drupal-mcp-server.js
const { Server } = require('@modelcontextprotocol/sdk/server/index.js');

class DrupalMCPServer {
  constructor() {
    this.server = new Server(
      { name: 'drupal-mcp-server', version: '1.0.0' },
      { capabilities: { resources: {}, tools: {} } }
    );
    
    this.setupHandlers();
  }
  
  setupHandlers() {
    // Get SDC component information
    this.server.setRequestHandler('tools/call', async (request) => {
      const { name, arguments: args } = request.params;
      
      switch (name) {
        case 'get_sdc_components':
          return await this.getSDCComponents(args);
        case 'get_accessibility_audit':
          return await this.getAccessibilityAudit(args);
        case 'get_performance_metrics':
          return await this.getPerformanceMetrics(args);
        case 'get_content_types':
          return await this.getContentTypes(args);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }
  
  async getSDCComponents(args) {
    // Execute DDEV command to get component information
    const { execSync } = require('child_process');
    const componentData = execSync(
      `ddev drush eval "\\Drupal::service('plugin.manager.sdc')->getDefinitions();"`,
      { encoding: 'utf8' }
    );
    
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(JSON.parse(componentData), null, 2)
      }]
    };
  }
  
  async getAccessibilityAudit(args) {
    // Run accessibility audit via DDEV
    const auditResult = execSync(
      `ddev exec "cd /var/www/html && npx axe-core --url http://localhost"`,
      { encoding: 'utf8' }
    );
    
    return {
      content: [{
        type: 'text', 
        text: `Accessibility Audit Results:\n${auditResult}`
      }]
    };
  }
}

const server = new DrupalMCPServer();
server.run().catch(console.error);
```

### Intelligent Context Aggregation

#### Multi-Source Context Fusion
```javascript
// .claude/mcp/context-aggregator.js
class ContextAggregator {
  async aggregateContextForTask(task, agent) {
    const contextSources = await Promise.all([
      this.getFigmaContext(task),
      this.getSlackContext(task),
      this.getDrupalContext(task),
      this.getJiraContext(task)
    ]);
    
    return this.fuseContextSources(contextSources, agent);
  }
  
  async getFigmaContext(task) {
    if (!task.requires_design_specs) return null;
    
    return await this.mcpCall('figma', 'get_component_specs', {
      component_name: task.component_name,
      include_accessibility_notes: true
    });
  }
  
  async getSlackContext(task) {
    const discussions = await this.mcpCall('slack', 'search_messages', {
      query: `${task.component_name} accessibility requirements`,
      channels: ['#adesso-cms-dev', '#accessibility-guild'],
      time_range: 'last_60_days'
    });
    
    return this.extractKeyInsights(discussions);
  }
  
  fuseContextSources(sources, agent) {
    const fusedContext = {
      design_specs: sources[0]?.design_specifications || {},
      stakeholder_input: sources[1]?.key_requirements || [],
      technical_constraints: sources[2]?.system_limitations || {},
      related_work: sources[3]?.linked_tickets || []
    };
    
    return this.formatForAgent(fusedContext, agent);
  }
}
```

### Real-time Context Updates

#### Live Context Streaming
```javascript
// .claude/mcp/live-context-stream.js
class LiveContextStream {
  constructor() {
    this.activeStreams = new Map();
  }
  
  async startContextStream(taskId, agent) {
    const stream = {
      figma: this.watchFigmaChanges(taskId),
      slack: this.watchSlackMentions(taskId),
      jira: this.watchTicketUpdates(taskId)
    };
    
    this.activeStreams.set(taskId, stream);
    
    // Stream updates to agent context
    this.streamUpdatesToAgent(taskId, agent);
  }
  
  async watchFigmaChanges(taskId) {
    return setInterval(async () => {
      const updates = await this.mcpCall('figma', 'get_recent_changes', {
        project_id: taskId,
        since: this.getLastCheck(taskId)
      });
      
      if (updates.length > 0) {
        this.notifyContextUpdate(taskId, 'figma', updates);
      }
    }, 30000); // Check every 30 seconds
  }
  
  streamUpdatesToAgent(taskId, agent) {
    // Update agent context file with real-time changes
    this.contextUpdates.on('update', (update) => {
      if (update.taskId === taskId) {
        this.updateAgentContext(agent, update);
      }
    });
  }
}
```

### MCP-Enhanced Quality Gates

#### External Validation Integration
```xml
<mcp_quality_gates>
<design_approval>
  <!-- Verify implementation matches Figma specs -->
  <mcp_call server="figma" method="compare_implementation">
    <figma_component_id>{{ figma_id }}</figma_component_id>
    <implementation_screenshots>{{ screenshots }}</implementation_screenshots>
    <tolerance_threshold>95</tolerance_threshold>
  </mcp_call>
</design_approval>

<stakeholder_feedback>
  <!-- Get feedback from Slack stakeholders -->
  <mcp_call server="slack" method="request_feedback">
    <channel>#design-review</channel>
    <component_preview>{{ preview_url }}</component_preview>
    <feedback_deadline>24_hours</feedback_deadline>
  </mcp_call>
</stakeholder_feedback>

<accessibility_validation>
  <!-- Cross-reference with accessibility guidelines -->
  <mcp_call server="google_drive" method="validate_against_guidelines">
    <guideline_doc_id>{{ accessibility_guidelines_id }}</guideline_doc_id>
    <component_implementation>{{ implementation_details }}</component_implementation>
  </mcp_call>
</accessibility_validation>
</mcp_quality_gates>
```

This MCP integration provides agents with rich, real-time context from external sources, dramatically improving decision-making and reducing the need for manual context gathering.