#!/bin/bash

# Smart Router Hook - Intelligent Agent Selection
# Triggered when user submits a prompt
# Routes to appropriate specialist without unnecessary overhead

echo "🔄 Processing user request through Smart Router..."

# Log the original user prompt for reference
echo "📝 Original prompt logged for reference"

# Smart Router Processing Message
cat << 'EOF'

🧠 **Smart Router Activated**

Your request is being analyzed by our intelligent routing system:

🔍 **Task Analysis:**
- Analyzing complexity and domain
- Selecting optimal specialist agent
- Minimizing overhead for simple tasks
- Ensuring quality for complex requests

**Benefits:**
- ✅ Direct routing to appropriate experts
- ✅ Faster execution for simple tasks
- ✅ Full requirements analysis when needed
- ✅ Parallel execution capabilities
- ✅ Smart QA routing (no unnecessary browser automation)

---

EOF

# Execute Smart Router
echo "⚡ Auto-triggering Smart Router for optimal agent selection..."

# Call the smart router script
exec "$HOME/.claude/hooks/smart-router.sh" "$@"