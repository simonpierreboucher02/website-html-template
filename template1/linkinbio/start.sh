#!/bin/bash

# Script de démarrage pour Link in Bio
echo "🌟 Démarrage de Link in Bio..."
echo "📱 Ouvrez votre navigateur sur: http://localhost:8000"
echo "🛑 Appuyez sur Ctrl+C pour arrêter le serveur"
echo ""

# Vérifier si Python 3 est installé
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 détecté"
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Python détecté"
    python -m http.server 8000
else
    echo "❌ Python n'est pas installé"
    echo "💡 Installez Python depuis https://python.org"
    exit 1
fi 