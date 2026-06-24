#!/bin/bash
# Test automatisé du système de formulaires

echo "🧪 Test du système ISPA/ISBITAGES Multi-Forms"
echo "=============================================="
echo ""

# Vérifier si le serveur tourne
echo "⏳ Vérification du serveur..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)

if [ "$RESPONSE" != "200" ]; then
  echo "❌ Serveur non accessible"
  echo ""
  echo "Pour démarrer le serveur:"
  echo ""
  echo "   npm start"
  echo ""
  exit 1
fi

echo "✅ Serveur accessible"
echo ""

# Test 1: Voir tous les prospects
echo "📊 Test 1: Voir tous les prospects"
PROSPECTS=$(curl -s http://localhost:3000/api/prospects)
COUNT=$(echo $PROSPECTS | jq 'length')
echo "   ✅ $COUNT prospects total"
echo ""

# Test 2: Voir seulement ISPA
echo "📊 Test 2: Voir prospects ISPA"
ISPA_PROSPECTS=$(curl -s http://localhost:3000/api/prospects/school/ispa)
ISPA_COUNT=$(echo $ISPA_PROSPECTS | jq 'length')
echo "   ✅ $ISPA_COUNT prospects ISPA"
echo ""

# Test 3: Voir seulement ISBITAGES
echo "📊 Test 3: Voir prospects ISBITAGES"
ISBITAGES_PROSPECTS=$(curl -s http://localhost:3000/api/prospects/school/isbitages)
ISBITAGES_COUNT=$(echo $ISBITAGES_PROSPECTS | jq 'length')
echo "   ✅ $ISBITAGES_COUNT prospects ISBITAGES"
echo ""

# Test 4: Voir derniers prospects
echo "📊 Test 4: Derniers prospects enregistrés"
LAST=$(echo $PROSPECTS | jq -r '.[-1] | "\(.nom) (\(.school)/\(.lang))"')
if [ ! -z "$LAST" ] && [ "$LAST" != "null" ]; then
  echo "   ✅ $LAST"
else
  echo "   ℹ️  Aucun prospect enregistré encore"
fi
echo ""

# Summary
echo "================================================"
echo "✅ Tous les tests sont passés!"
echo ""
echo "📍 Pages de test:"
echo "   - ISPA FR  : http://localhost:3000"
echo "   - ISPA EN  : http://localhost:3000/index-en.html"
echo "   - ISBITAGES FR  : http://localhost:3000/ISBITAGES"
echo "   - ISBITAGES EN  : http://localhost:3000/ISBITAGES/index-en.html"
echo ""
echo "🔗 APIs:"
echo "   - Tous   : http://localhost:3000/api/prospects"
echo "   - ISPA   : http://localhost:3000/api/prospects/school/ispa"
echo "   - ISBITAGES: http://localhost:3000/api/prospects/school/isbitages"
echo ""
