# Simple Compounding Engineering Hook System - Commit Guide

## Was wurde implementiert? (VEREINFACHT)

### 1. User-Prompt-Submit Hook (Simplified)
- **Datei**: `.claude/hooks/user-prompt-submit.sh`  
- **Zweck**: Erkennt Feedback-Patterns und setzt Kontext
- **Funktionen**:
  - Feedback Detection: "du musst", "falsch", "nochmal", "überarbeiten"
  - Context Setting: demo, forms, compliance, lanes
  - Simple ENV-File output (kein JSON parsing)

### 2. Pre-Response Hook (Simplified)  
- **Datei**: `.claude/hooks/pre-response.sh`
- **Zweck**: Injiziert Learning-Prompts direkt in Claude's Context
- **Funktionen**:
  - Feedback-Learning Prompt injection
  - Context-specific Reminders  
  - Direct prompt text (keine komplexe Validierung)

## Feedback-Patterns die erkannt werden

### Frustration/Korrektur-Indikatoren
- "Du musst"
- "Das ist falsch" 
- "Nochmal"
- "Nicht richtig"
- "Überarbeiten"
- "Vergessen"
- "Solltest"
- "Hast nicht"

### Feedback-Indikatoren
- "Feedback:"
- "Verbesserung:"
- "Nächstes Mal:"
- "Besser wäre:"
- "Stattdessen:"
- "Ich erwarte:"

## How to Commit

### 1. Alle Hook-Dateien zum Git hinzufügen:
```bash
# Hook-Dateien
git add .claude/hooks/user-prompt-submit.sh
git add .claude/hooks/pre-response.sh

# Learning System
git add .claude/knowledge/learnings.json
git add .claude/scripts/learning-system.sh

# Dokumentation
git add .claude/docs/hook-commit-guide.md
```

### 2. Commit erstellen:
```bash
git commit -m "feat: Implement Compounding Engineering Learning System

- Add automatic feedback detection in user-prompt-submit hook
- Add pre-response validation hook for learning violations
- Add persistent learning storage system (learnings.json)
- Add learning-system.sh for feedback capture and violation checking
- Enable continuous improvement through accumulated knowledge

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

### 3. Hook-Permissions prüfen:
```bash
# Sicherstellen dass alle Scripts executable sind
chmod +x .claude/hooks/*.sh
chmod +x .claude/scripts/*.sh
```

## Testing

### 1. Feedback Detection testen:
```bash
# Simuliere User-Feedback
echo "Du musst die Hooks nochmal überarbeiten" | .claude/scripts/learning-system.sh capture-feedback
```

### 2. Learning Stats prüfen:
```bash
.claude/scripts/learning-system.sh stats
```

### 3. Violation Check testen:
```bash
# Teste gegen eine beispiel Antwort
echo "Ich implementiere das direkt ohne Agent" | .claude/scripts/learning-system.sh check-violations
```

## Wie das System funktioniert

### User gibt Feedback → Automatic Learning
1. User sagt: "Du musst die Lane-Regeln besser befolgen"
2. `user-prompt-submit.sh` erkennt Feedback-Pattern
3. `learning-system.sh` speichert Learning in `lane_violations`
4. Nächste Antwort wird gegen dieses Learning geprüft

### Pre-Response Validation
1. Assistant formuliert Antwort
2. `pre-response.sh` prüft gegen alle gespeicherten Learnings
3. Warnt vor potentiellen Verstößen
4. Assistant kann Antwort anpassen

### Continuous Improvement
- Jedes Feedback wird zu permanentem Wissen
- Wiederholte Fehler werden automatisch verhindert
- System lernt User-Präferenzen
- Cross-session Konsistenz

## Erweiterte Funktionen

### Manual Learning Management:
```bash
# Manuell Learning hinzufügen
.claude/scripts/learning-system.sh add-learning "user_preferences" "Immer @planning-lane-orchestrator für strategische Fragen verwenden" "lanes"

# Learning-Status prüfen
cat .claude/knowledge/learnings.json | jq '.statistics'
```

Das System implementiert echtes "Compounding Engineering" - jede Interaktion macht das System besser für die Zukunft.