# Adesso CMS - Projekt Regeln

## 🔒 Verbindliche Entwicklungsregeln

Diese Regeln sind **MANDATORY** und **NICHT VERHANDELBAR**. Jeder Verstoß führt zu sofortigem Task-Rollback.

### Branch-Management (MANDATORY)

#### 1. Branch-Erstellung (ZERO TOLERANCE)
- **ABSOLUTES VERBOT**: Direktes Arbeiten auf `main` Branch
- **PFLICHT**: Alle Arbeiten NUR in Feature-Branches
- Branch-Naming-Convention (STRIKT):
  - `feature/[task-id]-[description]` - Für neue Features
  - `fix/[issue-id]-[description]` - Für Bugfixes  
  - `chore/[task-id]-[description]` - Für Maintenance
- Beispiele:
  - `feature/50-integration-testing-phase6`
  - `fix/123-recipe-validation-error`
  - `chore/45-update-documentation`

#### 2. GitHub Copilot Assignment (MANDATORY)
- **JEDER** Branch MUSS GitHub Copilot als Reviewer haben
- **KEIN MERGE** ohne Copilot-Approval
- Kommando-Sequenz (OBLIGATORISCH):
```bash
gh pr create --title "[Task ID]: [Task Name]" --body "[Description]" --reviewer @copilot
```
- Referenz: https://github.com/cli/cli/issues/10598
- **FEHLER-BEHANDLUNG**: Bei Copilot-Rejection → Sofortige Korrektur erforderlich

#### 3. Branch-Workflow (STRIKT)
```bash
# SCHRITT 1: PR-Status prüfen (PFLICHT vor neuer Arbeit)
gh pr list --state open
gh pr status

# SCHRITT 2: Main aktualisieren
git checkout main
git pull origin main

# SCHRITT 3: Feature Branch erstellen
git checkout -b feature/[task-id]-[description]

# SCHRITT 4: Entwicklung mit Tests
# ... Arbeit verrichten ...
# PFLICHT: Tests schreiben/aktualisieren
# PFLICHT: Performance validieren

# SCHRITT 5: Pre-Commit Validierung
ddev exec "vendor/bin/phpunit --configuration web/profiles/adesso_cms/phpunit.xml"
ddev exec "vendor/bin/phpstan analyse"
ddev exec "vendor/bin/phpcs --standard=Drupal"

# SCHRITT 6: Commit (nur bei allen grünen Tests)
git add .
git commit -m "feat(task-id): [description]

🎯 Deliverables:
- [List of deliverables]

✅ Tests: All passing
✅ Performance: Within baselines  
✅ Standards: PHPCS/PHPStan clean

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# SCHRITT 7: Push und PR erstellen
git push -u origin feature/[task-id]-[description]
gh pr create --title "[Task ID]: [Task Name]" --body "$(cat <<'EOF'
## Summary
[Detailed task description]

## Deliverables
- [✅/❌] [Deliverable 1]
- [✅/❌] [Deliverable 2]

## Quality Gates
- [✅] All tests passing
- [✅] Performance baselines met
- [✅] PHPCS/PHPStan clean
- [✅] Task updated in TASKS.md

## Impact
[Description of impact]

🤖 Generated with [Claude Code](https://claude.ai/code)
EOF
)" --reviewer @copilot

# SCHRITT 8: Warten auf Copilot Review
# SCHRITT 9: Nach Approval - Merge
gh pr merge --squash
```

### Task-Management (MANDATORY)

#### 1. Task-Dokumentation (OBLIGATORISCH)
- **ALLE** Tasks MÜSSEN in `.claude/TASKS.md` dokumentiert sein
- **JEDE** Status-Änderung MUSS sofort dokumentiert werden
- Status-Progression (STRIKT): `pending` → `in_progress` → `completed`
- **PFLICHT-FELDER** für jeden Task:
  - Eindeutige Task-ID (aufsteigend)
  - Detaillierte Beschreibung mit Akzeptanzkriterien
  - Branch-Name (wenn in_progress/completed)
  - Deliverables-Liste
  - Abhängigkeiten zu anderen Tasks
  - Geschätzte Zeit

#### 2. Ein Task = Ein PR (MANDATORY - NEU ab Version 3.0)
- **ABSOLUTE REGEL**: Jeder einzelne Task MUSS einen eigenen separaten Pull Request haben
- **VERBOTEN**: Mehrere Tasks in einem einzigen PR kombinieren
- **GRUND**: Basiert auf kritischen Learnings aus PR #159 (siehe Review-Feedback)
- **KONSEQUENZ**: PRs mit mehreren Tasks werden automatisch abgelehnt

#### 3. PR-Bearbeitung vor neuen Tasks (ZERO TOLERANCE)
- **ABSOLUTES VERBOT**: Neue Tasks beginnen bei offenen PRs
- **PFLICHT-SEQUENZ** vor jedem neuen Task:
```bash
# SCHRITT 1: Offene PRs identifizieren
gh pr list --state open

# SCHRITT 2: PR Status detailliert prüfen
gh pr status

# SCHRITT 3: Jeden offenen PR einzeln bearbeiten
gh pr view [PR-NUMBER] --json reviews,statusCheckRollup
gh pr merge [PR-NUMBER] --squash  # nur bei Copilot-Approval
```
- **FEHLER-BEHANDLUNG**: Bei offenen PRs → Stopp aller neuen Aktivitäten

#### 4. Task-Transitions (STRIKT)
- **Task-Start-Protokoll**:
  ```markdown
  # In TASKS.md aktualisieren:
  Status: pending → in_progress
  Branch: feature/[task-id]-[description]
  Start-Zeit: [timestamp]
  ```
- **Task-Completion-Protokoll**:
  ```markdown
  # In TASKS.md aktualisieren:
  Status: in_progress → completed
  End-Zeit: [timestamp]
  Branch: Merged to main
  Deliverables: [✅ Liste aller Deliverables]
  Files: [Liste aller erstellten/geänderten Files]
  Tests: [Testergebnisse]
  Impact: [Auswirkungen beschreiben]
  ```

### Code-Qualität (MANDATORY)

#### 1. Test-First Approach (OBLIGATORISCH)
- **ABSOLUTER ZWANG**: Tests VOR Implementation schreiben
- **KEIN COMMIT** ohne 100% Test-Pass-Rate
- **Performance-Gate**: Alle Benchmarks MÜSSEN eingehalten werden
- **Test-Kategorien** (ALLE PFLICHT):
  - Unit Tests (PHPUnit)
  - Functional Tests (Browser-basiert)
  - Integration Tests (Recipe-Kombinationen)
  - Performance Tests (Baseline-Compliance)

#### 2. Commit-Standards (STRIKT)
```bash
# OBLIGATORISCHE Commit-Prefixes:
feat(task-id): neue Features
fix(task-id): Bugfixes  
test(task-id): Test-Implementierungen
docs(task-id): Dokumentation
refactor(task-id): Code-Refactoring
perf(task-id): Performance-Verbesserungen
chore(task-id): Maintenance

# BEISPIEL:
git commit -m "feat(50): implement integration testing framework

🎯 Deliverables:
- RecipeCombinationConflictTest enhanced
- Integration testing scripts created
- Cross-environment validation

✅ Tests: 156/156 passing
✅ Performance: All baselines met  
✅ Standards: PHPCS/PHPStan Level 8 clean

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

#### 3. Pre-Commit Quality Gates (ZERO TOLERANCE)
**ALLE müssen ✅ sein vor Commit:**
```bash
# GATE 1: PHPStan Level 8 (OBLIGATORISCH)
ddev exec "vendor/bin/phpstan analyse --level=8 web/profiles/adesso_cms/"
# ERGEBNIS: 0 Fehler ERFORDERLICH

# GATE 2: PHPCS Drupal Standards (OBLIGATORISCH) 
ddev exec "vendor/bin/phpcs --standard=Drupal web/profiles/adesso_cms/"
# ERGEBNIS: 0 Violations ERFORDERLICH

# GATE 3: Unit/Functional Tests (OBLIGATORISCH)
ddev exec "vendor/bin/phpunit --configuration web/profiles/adesso_cms/phpunit.xml"
# ERGEBNIS: 100% Pass Rate ERFORDERLICH

# GATE 4: Performance Baseline Check (OBLIGATORISCH)
ddev exec "./web/profiles/adesso_cms/tests/scripts/performance-benchmarking.sh regression --alert"
# ERGEBNIS: Keine Performance-Regressionen ERFORDERLICH
```

**FEHLER-BEHANDLUNG**: Bei ANY Gate-Failure → SOFORTIGER STOPP, Korrektur PFLICHT

### Reflexions-Zyklen (MANDATORY)

#### 30-Minuten Reflexion (OBLIGATORISCH)
**AUTOMATISCHE TIMER-BASED REFLEXION** - alle 30 Minuten:
```
🤔 REFLEXION ERFORDERLICH (30min Timer):

"Reflect on what you've built so far. Are there edge cases we missed? 
Should we try a different approach? Continue."

PFLICHT-ANALYSE:
1. Aktueller Task-Fortschritt vs. Ziele
2. Potentielle Edge Cases identifizieren
3. Alternativer Ansatz evaluieren
4. Performance-Impact bewerten
5. Risk Assessment durchführen
6. Next Steps definieren

DOKUMENTATION: Jede Reflexion MUSS in TASKS.md Task-Kommentaren vermerkt werden.
```

#### Task-Completion Auto-Prompt (AUTOMATIC)
Nach **JEDEM** abgeschlossenen Task wird **AUTOMATISCH** dieser Prompt aktiviert:
```
🚀 AUTO-PROMPT NACH TASK-COMPLETION:

Please pull the next task from TASKS.md and fully implement and test it.
After running tests, analyze logs and screenshots to verify correctness.
If you spot any failures or issues, fix them and rerun tests—keep iterating until everything passes.
Once verified, commit your changes, then fetch the next task from TASKS.md.

PFLICHT-SCHRITTE:
1. TASKS.md öffnen und nächsten Task identifizieren
2. Pre-Task PR-Check durchführen (RULES.md)
3. Feature-Branch erstellen
4. Implementation + Tests
5. Quality Gates validieren
6. Commit + PR mit Copilot Review
7. TASKS.md aktualisieren (completed)

ITERATION BIS: 100% Tests ✅, Performance ✅, Standards ✅
```

#### Reflexions-Dokumentation (PFLICHT)
**JEDE Reflexion MUSS dokumentiert werden:**
```markdown
## Reflexions-Log

### [Timestamp] - 30min Reflexion
- **Aktueller Fortschritt**: [Status]
- **Identifizierte Edge Cases**: [Liste]
- **Alternative Ansätze**: [Evaluierung]
- **Risiken**: [Assessment]
- **Next Steps**: [Plan]
- **Entscheidung**: [Continue/Pivot/Optimize]
```

### Dokumentation (MANDATORY)

#### 1. CLAUDE.md Updates (OBLIGATORISCH)
- **JEDE** strukturelle Änderung MUSS sofort in CLAUDE.md dokumentiert werden
- AI Team Configuration MUSS bei Stack-Änderungen aktualisiert werden  
- Architektur-Änderungen MÜSSEN mit Impact-Assessment dokumentiert werden
- **Version Control**: Jede Änderung mit Timestamp und Grund

#### 2. Task-Dokumentation (VOLLSTÄNDIG)
**JEDER Task MUSS diese Dokumentation haben:**
```markdown
## Task [ID] - Completion Documentation
- **Files Created/Modified**: [Vollständige Liste mit Zeilenzahlen]
- **Branches**: [Branch-Name] → [Merge-Status]
- **Tests**: [X/Y passing] - [Details zu Failures]
- **Performance Impact**: [Baseline-Vergleich]
- **Dependencies**: [Neue/Geänderte Dependencies]
- **Breaking Changes**: [Liste mit Migration-Path]
- **Learnings**: [Was gelernt, Edge Cases discovered]
- **Next Tasks Impact**: [Auswirkungen auf folgende Tasks]
```

### Environment-Management (MANDATORY)

#### 1. DDEV Integration (OBLIGATORISCH)
- **ABSOLUTE PFLICHT**: Alle Entwicklung NUR in DDEV-Environment
- **Pre-Task Check**: DDEV Status validieren
```bash
# PFLICHT vor jedem Task:
ddev describe  # MUSS laufen
ddev exec "php --version"  # MUSS PHP 8.2+ zeigen
ddev exec "drush status"   # MUSS Drupal 11.2+ zeigen
```
- **DDEV Snapshots**: PFLICHT vor riskanten Operationen
```bash
# Vor major Changes:
ddev snapshot --name="before-task-[task-id]"
```

#### 2. Performance-Monitoring (CONTINUOUS)
- **JEDE** Implementation MUSS Performance-Impact in Real-time messen
- **Baseline-Enforcement**: Automatische Regression-Alerts
- **SOFORT-REAKTION**: Bei Performance-Regression → Task-Stopp, Optimierung PFLICHT
```bash
# Performance-Check nach jeder Implementation:
ddev exec "./web/profiles/adesso_cms/tests/scripts/performance-benchmarking.sh regression --alert"
```

### Fehlerbehandlung (MANDATORY)

#### 1. Iterative Fixes (ZERO TOLERANCE FOR FAILURES)
- **BEI Test-Fehlern**: SOFORTIGER Fix-Cycle: Fix → Re-test → Iterate bis 100% ✅
- **ABSOLUTES VERBOT**: Commits mit failing Tests
- **LOG-ANALYSE PFLICHT**: ALLE Logs und Screenshots MÜSSEN vollständig analysiert werden
- **Fehler-Dokumentation**: Jeder Fehler MUSS in TASKS.md mit Solution dokumentiert werden

#### 2. Rollback-Strategie (AUTOMATIC TRIGGERS)
```bash
# SOFORTIGE ROLLBACK-TRIGGERS:
- Performance Regression > 10%
- Test Success Rate < 95%  
- PHPStan/PHPCS Violations > 0
- DDEV Environment Failure

# ROLLBACK-PROTOKOLL:
ddev snapshot --restore="before-task-[task-id]"
git reset --hard HEAD~1  # oder git revert
# TASKS.md: Status → pending, Rollback-Grund dokumentieren
```

#### 3. Eskalation (AUTOMATIC)
**Bei wiederholten Failures (>3x):**
- Task-Approach überdenken (MANDATORY)
- Alternative Implementierung evaluieren  
- Stakeholder-Konsultation einleiten
- Task-Splitting in kleinere Einheiten

### 🎯 Qualitätsgates (ALLE MANDATORY)

#### Pre-Commit Gates (100% ERFORDERLICH)
```bash
# GATE 1: Tests ✅
[ ] Unit Tests: 100% passing
[ ] Functional Tests: 100% passing  
[ ] Integration Tests: 100% passing
[ ] Performance Tests: Baselines erfüllt

# GATE 2: Code Quality ✅
[ ] PHPStan Level 8: 0 Errors
[ ] PHPCS Drupal: 0 Violations
[ ] Performance: No Regressions

# GATE 3: Dokumentation ✅
[ ] TASKS.md aktualisiert
[ ] Code-Kommentare vollständig
[ ] Impact Assessment dokumentiert
```

#### Pre-PR Gates (ALL REQUIRED)
```bash
# GATE 4: Branch Management ✅
[ ] Feature-Branch von aktueller main
[ ] Branch-Naming Convention befolgt
[ ] All Commits haben korrekte Message-Format

# GATE 5: Integration ✅
[ ] Keine Merge-Konflikte
[ ] CI/CD Pipeline erfolgreich
[ ] Copilot als Reviewer assigned
```

#### Pre-Merge Gates (FINAL VALIDATION)
```bash
# GATE 6: Review & Approval ✅
[ ] GitHub Copilot Review: APPROVED
[ ] Alle CI/CD Checks: ✅ GREEN
[ ] Performance Impact: ACCEPTABLE
[ ] Task Documentation: COMPLETE

# GATE 7: Final Validation ✅
[ ] TASKS.md: Status → completed
[ ] Branch: Ready for squash merge
[ ] Next Task: Dependencies satisfied
```

## 🚨 Verstöße und Konsequenzen

### Stufe 1 Verstöße (WARNING)
- Unvollständige Task-Dokumentation → Documentation-Fix erforderlich
- Fehlende Branch-Naming Convention → Branch-Rename PFLICHT

### Stufe 2 Verstöße (CRITICAL) 
- Direct Push auf main → **SOFORTIGE Branch-Löschung + Task-Neustart**
- Commit mit failing Tests → **SOFORTIGER Rollback + Re-implementation**
- Performance-Regression → **SOFORTIGER Task-Stopp + Optimierung**

### Stufe 3 Verstöße (BLOCKING)
- Wiederholte Regel-Verstöße → **Task-Reassignment + Process-Review**
- Sicherheitslücken → **SOFORTIGER Production-Stopp + Security-Audit**

## 🔄 Regel-Evolution

### Regel-Updates (CONTROLLED PROCESS)
```markdown
# Regel-Update Protokoll:
1. Änderungs-Antrag in TASKS.md dokumentieren
2. Impact-Assessment durchführen
3. Team-Review (wenn applicable) 
4. Implementation mit Version-Bump
5. Kommunikation aller Änderungen
6. Monitoring der Regel-Compliance
```

### Regel-Compliance Monitoring
- **Wöchentliche Reviews**: Regel-Adherence überprüfen
- **Automatische Alerts**: Bei Regel-Verstößen  
- **Kontinuierliche Verbesserung**: Regel-Optimierung basierend auf Learnings

---

## 📋 Regel-Zusammenfassung (QUICK REFERENCE)

### ❌ VERBOTEN (ZERO TOLERANCE)
- Direct work auf main branch
- Commits mit failing tests
- PRs ohne Copilot review
- Neue Tasks bei offenen PRs
- Performance regressions
- Unvollständige Dokumentation

### ✅ PFLICHT (MANDATORY)
- Feature-branch für alle Arbeiten
- 100% test pass rate vor commit
- PHPStan Level 8 + PHPCS compliance
- Copilot review für alle PRs
- TASKS.md updates bei allen Änderungen
- Performance baseline compliance
- Vollständige Task-Dokumentation

---

**Version**: 3.0  
**Letzte Aktualisierung**: 2025-08-10 Lessons Learned PR #159  
**Status**: MANDATORY - Alle Regeln sind verbindlich und nicht verhandelbar  
**Nächste Review**: Bei Task-Completion oder auf Anfrage