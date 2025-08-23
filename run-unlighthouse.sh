#!/bin/bash

# Quick Unlighthouse Lösung für ZH-DEMO
# Läuft Unlighthouse direkt ohne DDEV-Komplexität

echo "🚀 Starting Unlighthouse for ZH-DEMO..."

# Install unlighthouse if not present
if ! command -v unlighthouse &> /dev/null; then
    echo "📦 Installing Unlighthouse..."
    npm install -g unlighthouse @unlighthouse/cli
fi

# Start unlighthouse with your configuration
echo "🔍 Starting scan of https://zh-demo.ddev.site..."
unlighthouse --site https://zh-demo.ddev.site --port 5678

echo "✅ Unlighthouse UI available at: http://localhost:5678"