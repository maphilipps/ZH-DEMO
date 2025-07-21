# Unix-Style Piping for Agent Workflows

## Composable Agent Chains with Pipeline Automation

### Agent Piping Syntax

#### Basic Agent Pipeline
```bash
# Plan → Develop → Test → Deploy
claude /plan "accessible navigation" | claude /dev | claude /qa | claude /integrate

# Security-focused pipeline
claude /security scan | claude /dev --fix | claude /qa --security-audit | claude /integrate

# Performance optimization pipeline  
claude /performance baseline | claude /dev --optimize | claude /performance test | claude /integrate

# Accessibility-first pipeline
claude /accessibility audit | claude /plan --accessibility-critical | claude /dev --accessibility-focus | claude /qa --accessibility-audit
```

#### Conditional Piping
```bash
# Only proceed if QA passes
claude /dev ADS-123 | claude /qa && claude /integrate || claude /rollback

# Multi-path pipeline based on complexity
claude /plan "user authentication" | \
  if complexity=high then claude /security audit | claude /plan --security-critical
  else claude /dev fi | \
  claude /qa | claude /integrate

# Parallel branches with merge
(claude /dev --frontend | claude /dev --backend) | claude /qa --integration-test | claude /integrate
```

### Pipeline Data Format

#### Agent Output Structure
```json
{
  "agent": "planner",
  "status": "success",
  "timestamp": "2025-01-20T15:30:00Z",
  "task_id": "ADS-123",
  "output": {
    "ticket": {
      "id": "ADS-123",
      "title": "Accessible Navigation Component",
      "requirements": [...],
      "acceptance_criteria": [...]
    },
    "handoff_context": {
      "next_agent": "developer",
      "implementation_guidance": "...",
      "quality_gates": [...]
    }
  },
  "metadata": {
    "duration_ms": 45000,
    "memory_used": "23MB",
    "confidence_score": 0.95
  },
  "pipe_data": {
    "context_for_next": {...},
    "quality_signals": {...},
    "error_conditions": []
  }
}
```

#### Pipe Transform Functions
```bash
# Transform and filter pipeline data
claude /plan "navigation" | \
  jq '.output.handoff_context' | \
  claude /dev --stdin | \
  claude /qa --auto-approve-if='.metadata.confidence_score > 0.9' | \
  claude /integrate

# Error handling in pipeline
claude /dev ADS-123 2>&1 | \
  grep -q "ERROR" && \
  claude /plan --reassess --input="$(cat error.log)" | \
  claude /dev --retry
```

### Advanced Pipeline Patterns

#### Fan-out / Fan-in Patterns
```bash
# Fan-out: One plan, multiple implementations
claude /plan "responsive design system" | \
  tee >(claude /dev --mobile-first) \
      >(claude /dev --desktop-first) \
      >(claude /dev --tablet-optimized) | \
  claude /qa --merge-implementations | \
  claude /integrate

# Fan-in: Multiple audits, single remediation
(claude /accessibility audit & \
 claude /security scan & \
 claude /performance test &) | \
 wait | \
 claude /plan --consolidate-findings | \
 claude /dev --fix-all | \
 claude /qa --comprehensive
```

#### Iterative Refinement Pipelines
```bash
# Iterative improvement loop
function refine_until_perfect() {
  claude /dev $1 | \
  claude /qa | \
  while read -r qa_result; do
    if echo "$qa_result" | jq -e '.status == "failed"'; then
      echo "$qa_result" | \
      claude /plan --improve | \
      claude /dev --refine | \
      claude /qa
    else
      echo "$qa_result" | claude /integrate
      break
    fi
  done
}

refine_until_perfect "ADS-123"
```

#### Monitoring and Alerting Pipelines
```bash
# Continuous monitoring pipeline
tail -f /var/log/ddev.log | \
  claude -p 'Alert me if you see accessibility violations' | \
  while read alert; do
    echo "$alert" | claude /accessibility fix --urgent
  done

# Performance monitoring
ddev theme build 2>&1 | \
  claude -p 'Monitor build performance and suggest optimizations' | \
  tee build-analysis.log | \
  claude /performance --analyze --input=stdin
```

### Pipeline Control Mechanisms

#### Quality Gates in Pipelines
```bash
# Quality gate functions
quality_gate() {
  local input=$(cat)
  local threshold=$1
  local metric=$2
  
  local score=$(echo "$input" | jq -r ".quality_metrics.$metric")
  
  if (( $(echo "$score >= $threshold" | bc -l) )); then
    echo "$input"  # Pass through
  else
    echo "$input" | jq '.status = "quality_gate_failed"' >&2
    exit 1
  fi
}

# Usage in pipeline
claude /dev ADS-123 | \
  claude /qa | \
  quality_gate 0.9 accessibility_score | \
  quality_gate 0.8 performance_score | \
  claude /integrate
```

#### Rollback and Recovery
```bash
# Automatic rollback on failure
claude /integrate ADS-123 | \
  tee last_deployment.json | \
  claude /monitor --duration=5m | \
  if grep -q "CRITICAL"; then
    cat last_deployment.json | claude /rollback --automatic
  fi

# Checkpoint and restore
checkpoint_restore_pipeline() {
  local checkpoint_id=$(uuidgen)
  
  claude /plan "$1" | tee "checkpoint_${checkpoint_id}_plan.json" | \
  claude /dev | tee "checkpoint_${checkpoint_id}_dev.json" | \
  claude /qa | \
  if jq -e '.status == "failed"'; then
    echo "Restoring from checkpoint..."
    cat "checkpoint_${checkpoint_id}_plan.json" | \
    claude /plan --reassess | \
    claude /dev --retry
  else
    claude /integrate
  fi
}
```

### Pipeline Optimization

#### Parallel Execution Engine
```javascript
// .claude/pipeline/parallel-executor.js
class PipelineExecutor {
  async executePipeline(pipelineDefinition) {
    const stages = this.parsePipeline(pipelineDefinition);
    const results = new Map();
    
    for (const stage of stages) {
      if (stage.parallel) {
        // Execute parallel agents
        const parallelResults = await Promise.allSettled(
          stage.agents.map(agent => this.executeAgent(agent, results))
        );
        results.set(stage.id, this.mergeParallelResults(parallelResults));
      } else {
        // Sequential execution
        const result = await this.executeAgent(stage.agent, results);
        results.set(stage.id, result);
      }
    }
    
    return results;
  }
  
  async executeAgent(agentConfig, previousResults) {
    const context = this.buildContext(agentConfig, previousResults);
    const agent = this.createAgent(agentConfig.type);
    
    return await agent.execute(context);
  }
}
```

#### Pipeline Caching
```bash
# Cache pipeline results for efficiency
pipeline_cache() {
  local cache_key=$(echo "$@" | md5sum | cut -d' ' -f1)
  local cache_file=".claude/cache/pipeline_${cache_key}.json"
  
  if [ -f "$cache_file" ] && [ $(($(date +%s) - $(stat -c %Y "$cache_file"))) -lt 3600 ]; then
    echo "Using cached result for pipeline: $@" >&2
    cat "$cache_file"
  else
    echo "Executing pipeline: $@" >&2
    "$@" | tee "$cache_file"
  fi
}

# Usage
pipeline_cache claude /plan "navigation component" | \
pipeline_cache claude /dev | \
claude /qa | \
claude /integrate
```

### Pipeline Monitoring and Analytics

#### Real-time Pipeline Visualization
```bash
# Pipeline status monitoring
monitor_pipeline() {
  local pipeline_id=$1
  
  while true; do
    clear
    echo "Pipeline Status: $pipeline_id"
    echo "================================"
    
    jq -r '.stages[] | "\(.name): \(.status) (\(.progress)%)"' \
      ".claude/pipelines/${pipeline_id}/status.json"
    
    echo -e "\nAgent Activity:"
    ps aux | grep -E "(planner|developer|qa|integrator)" | \
      awk '{print $11 " " $12 " " $13}'
    
    sleep 2
  done
}

# Start monitoring
monitor_pipeline "ADS-123-navigation-component" &
```

#### Pipeline Performance Analytics
```javascript
// .claude/pipeline/analytics.js
class PipelineAnalytics {
  async analyzePipelinePerformance(pipelineId) {
    const metrics = await this.loadPipelineMetrics(pipelineId);
    
    return {
      total_duration: metrics.end_time - metrics.start_time,
      stage_durations: metrics.stages.map(s => ({
        name: s.name,
        duration: s.end_time - s.start_time,
        efficiency_score: this.calculateEfficiency(s)
      })),
      bottlenecks: this.identifyBottlenecks(metrics),
      optimization_suggestions: this.suggestOptimizations(metrics)
    };
  }
  
  identifyBottlenecks(metrics) {
    const avgDuration = this.calculateAverageStageDuration(metrics);
    
    return metrics.stages
      .filter(stage => stage.duration > avgDuration * 1.5)
      .map(stage => ({
        stage: stage.name,
        duration: stage.duration,
        suggested_optimization: this.getOptimizationSuggestion(stage)
      }));
  }
}
```

### Pipeline Configuration Files

#### Pipeline Definition Format
```yaml
# .claude/pipelines/accessible-component.yml
name: "Accessible Component Development"
description: "End-to-end accessible component development pipeline"

stages:
  - name: "planning"
    agent: "planner"
    options:
      accessibility_critical: true
      security_review: true
    timeout: "30m"
    
  - name: "parallel_development"
    parallel: true
    agents:
      - type: "developer"
        focus: "frontend"
        options:
          accessibility_focus: true
      - type: "developer" 
        focus: "backend"
        options:
          security_focus: true
    timeout: "4h"
    
  - name: "integration_testing"
    agent: "qa"
    depends_on: ["parallel_development"]
    options:
      comprehensive_testing: true
      accessibility_audit: true
      security_scan: true
    timeout: "2h"
    
  - name: "deployment"
    agent: "integrator"
    depends_on: ["integration_testing"]
    conditions:
      - quality_gate: "accessibility_score >= 0.95"
      - quality_gate: "security_score >= 0.9"
    timeout: "1h"

error_handling:
  rollback_on_failure: true
  max_retries: 3
  notification_channels: ["#adesso-cms-alerts"]
```

This Unix-style piping system transforms the multi-agent workflow into a composable, scriptable, and highly efficient development pipeline.