#!/bin/bash

# Script de démarrage ISPA Form System
echo "🚀 Démarrage du système de formulaire ISPA..."
echo ""

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null
then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js depuis https://nodejs.org"
    exit 1
fi

echo "✅ Node.js trouvé: $(node --version)"
echo ""

# Vérifier si npm install est nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
    echo ""
fi

echo "✅ Dépendances prêtes"
echo ""
echo "🎯 Démarrage du serveur..."
echo "📍 Ouvrir: http://localhost:3000"
echo ""

npm start
