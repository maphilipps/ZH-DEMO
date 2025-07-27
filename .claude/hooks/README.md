# Claude Code Hooks für adesso CMS

Dieses Verzeichnis enthält Claude Code Hooks für automatisierte Quality Gates, Sicherheitschecks und Workflow-Optimierung.

## 🎯 Hook-System Übersicht

Das Hook-System implementiert **proaktive Qualitätssicherung** durch automatisierte Checkpoints in allen Entwicklungsphasen.

### Verfügbare Hooks

#### 🔄 Workflow Hooks
- **`user-prompt-submit.sh`** - Requirements Engineering Workflow
- **`pre-file-edit.sh`** - Sicherheitschecks vor Dateiänderungen  
- **`post-implementation.sh`** - Qualitätsvalidierung nach Implementation
- **`quality-gate.sh`** - Milestone-basierte Qualitätsgates

#### 🚨 Emergency & Security Hooks
- **`error-detected.sh`** - Automatisierte Fehleranalyse und Recovery
- **`pre-deployment.sh`** - Umfassende Deployment-Validierung

## 🚀 Key Features

### Requirements Engineering Workflow
Der `user-prompt-submit.sh` Hook implementiert einen **intelligenten Requirements-Filter**:

```
User Prompt → RE Agent Analysis → Structured Requirements → User Approval → Implementation
```

**Benefits:**
- ✅ Keine Requirements gehen verloren
- ✅ Klare Scope-Definition vor Implementation  
- ✅ User behält Kontrolle über den Prozess
- ✅ Strukturierte Qualitätsgates

### Proaktive Fehlererkennung
Automatisierte Diagnose und Recovery-Suggestions für häufige Entwicklungsprobleme:

- **Twig Template Errors** → Auto-Trigger Error Debugger
- **PHP Fatal Errors** → Syntax-Check und Dependency-Validation
- **Build Failures** → Frontend Specialist Analysis
- **DDEV Issues** → System Diagnostician Auto-Activation

### Multi-Level Quality Gates
Stufenweise Qualitätsvalidierung je nach Entwicklungsphase:

- **Component Level** → SDC, Storybook, Accessibility
- **Feature Level** → Integration, Performance, Security  
- **Pre-Review** → Code Quality, Tests, Documentation
- **Deployment** → Security, Performance, Rollback-Readiness

## 🔧 Hook-Konfiguration

### Aktivierung in Claude Code
Hooks werden über `.claude/settings.json` konfiguriert und automatisch von Claude Code ausgeführt.

**Konfigurierte Hook Events:**
```json
{
  "hooks": {
    "UserPromptSubmit": ["*"] → Requirements Engineering Activation
    "PreToolUse": ["Edit|Write|MultiEdit"] → Safety Checks before file changes
    "PostToolUse": ["Edit|Write|MultiEdit|Task"] → Quality validation after implementation
    "PostToolUse": ["Bash"] → Quality gates for command execution
    "Notification": ["*"] → Error detection and recovery
  }
}
```

### Hook-Trigger Events
- **UserPromptSubmit** → Automatische Requirements Engineering Aktivierung
- **PreToolUse** → Sicherheitschecks vor Dateiänderungen (Edit/Write/MultiEdit)
- **PostToolUse** → Qualitätsvalidierung nach Implementation
- **Notification** → Spezialisierte Agent Auto-Aktivierung bei Fehlern

## 🎛️ Agent Integration

### Automatische Agent-Aktivierung
Hooks triggern automatisch spezialisierte Agenten basierend auf Context:

```bash
# Beispiel: Twig Error Detection
Twig Error → error-detected.sh → Error Debugger Agent → Resolution Steps
```

### Multi-Agent Coordination
Komplexe Qualitätsgates koordinieren mehrere Agenten parallel:

```bash
# Feature Complete Gate
quality-gate.sh feature_complete →
  ├── QA Playwright Expert (E2E Testing)
  ├── Security Specialist (Security Audit)  
  ├── Performance Specialist (Performance Validation)
  └── A11y Review Specialist (Accessibility Compliance)
```

## 📊 Quality Metrics & Thresholds

### Performance Standards
- **Lighthouse Score**: > 85
- **Core Web Vitals**: Green Rating
- **Bundle Size**: < 150KB (gzipped)
- **Load Time**: < 3s on 3G

### Security Standards  
- **Critical Vulnerabilities**: 0 Tolerance
- **OWASP Top 10**: Full Compliance
- **Access Controls**: 100% Verified
- **Input Validation**: Complete Coverage

### Accessibility Standards
- **WCAG 2.1 AA**: 100% Compliance
- **Screen Reader**: Full Compatibility
- **Keyboard Navigation**: Complete Coverage
- **Color Contrast**: 4.5:1 Minimum

## 🛠️ Development Workflow Integration

### 1. Request Processing
```
User Request → Requirements Engineer → Structured Requirements → Approval
```

### 2. Safe Implementation
```
Pre-Edit Checks → Implementation → Post-Implementation Validation
```

### 3. Quality Assurance
```
Component Gate → Feature Gate → Review Gate → Deployment Gate
```

### 4. Error Handling
```
Error Detection → Specialized Analysis → Recovery Steps → Validation
```

## 🔄 Continuous Improvement

### Hook Analytics
Hooks sammeln Metriken für kontinuierliche Verbesserung:
- Error Pattern Recognition
- Performance Trend Analysis  
- Quality Gate Success Rates
- Agent Effectiveness Metrics

### Adaptive Thresholds
Quality-Thresholds passen sich basierend auf Projekt-Performance an:
- **Green Zone**: Standards erhöhen
- **Yellow Zone**: Focused Improvement
- **Red Zone**: Emergency Protocols

## 📚 Best Practices

### Hook Development
- **Idempotent**: Hooks können sicher mehrfach ausgeführt werden
- **Fast Execution**: < 5s für kritische Hooks
- **Clear Messaging**: Actionable Feedback für Entwickler
- **Graceful Degradation**: Funktioniert auch bei Teilfehlern

### Integration Guidelines
- **Agent Coordination**: Vermeidung von Agent-Konflikten
- **Resource Management**: Effiziente Hook-Ausführung
- **Error Handling**: Robuste Fehlerbehandlung
- **User Experience**: Minimal invasive, maximal hilfreich

## 🚀 Next Steps

### Planned Enhancements
- [ ] Machine Learning-basierte Error Pattern Recognition
- [ ] Advanced Performance Budgeting
- [ ] Custom Quality Gate Definitions
- [ ] Real-time Quality Dashboards
- [ ] Integration mit External Quality Tools

### Custom Hook Development
Für projektspezifische Requirements können custom hooks entwickelt werden:
```bash
# Custom Hook Template
.claude/hooks/custom-[purpose].sh
```

---

**🎯 Das Hook-System transformiert reaktive Entwicklung in proaktive Qualitätssicherung.**