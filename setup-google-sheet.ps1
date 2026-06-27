# Script de configuration Google Sheets pour ISPA CRM
# Ce script guide l'utilisateur et automatise la configuration

Write-Host "================================" -ForegroundColor Cyan
Write-Host "🚀 Configuration Google Sheets ISPA CRM" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Étape 1 : Vérifier que le code Apps Script est présent
Write-Host "✅ Étape 1 : Vérification du code Apps Script..." -ForegroundColor Yellow
$appsScriptFile = ".\crm_export\create_ispa_crm.gs"
if ((Test-Path $appsScriptFile) -eq $true) {
    Write-Host "✓ Fichier trouvé: $appsScriptFile" -ForegroundColor Green
    $appsScriptCode = Get-Content $appsScriptFile -Raw
}
else {
    Write-Host "✗ Fichier non trouvé!" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Étape 2 : Copier le code Apps Script dans le presse-papiers
Write-Host "✅ Étape 2 : Copie du code Apps Script dans le presse-papiers..." -ForegroundColor Yellow
$appsScriptCode | Set-Clipboard
Write-Host "✓ Code copié! (Ctrl+V pour coller)" -ForegroundColor Green
Write-Host ""

# Étape 3 : Ouvrir Google Apps Script
Write-Host "✅ Étape 3 : Ouverture de Google Apps Script..." -ForegroundColor Yellow
Write-Host "Clic sur le lien ou appuyez sur Entrée pour ouvrir..." -ForegroundColor Cyan
Start-Process "https://script.google.com/"
Write-Host "✓ Ouverture en cours..." -ForegroundColor Green
Write-Host ""

Write-Host "📋 INSTRUCTIONS MANUELLES REQUISES :" -ForegroundColor Cyan
Write-Host "1. Connectez-vous à votre compte Google (si nécessaire)" -ForegroundColor White
Write-Host "2. Cliquez sur '+ Nouveau projet'" -ForegroundColor White
Write-Host "3. Donnez un nom au projet (ex: 'ISPA Integration')" -ForegroundColor White
Write-Host "4. Collez le code (Ctrl+V) dans l'éditeur" -ForegroundColor White
Write-Host "5. Cliquez sur 'Exécuter' en haut" -ForegroundColor White
Write-Host "6. Sélectionnez la fonction 'createISPAcrm'" -ForegroundColor White
Write-Host "7. Autorisez les permissions Google" -ForegroundColor White
Write-Host ""

# Attendre que l'utilisateur ait terminé
Write-Host "🔄 Appuyez sur Entrée une fois l'exécution terminée..." -ForegroundColor Magenta
Read-Host ""

Write-Host ""
Write-Host "📋 ÉTAPE 4 : Créer le déploiement Web App" -ForegroundColor Cyan
Write-Host "1. Dans Google Apps Script, cliquez sur '🔄 Déploiements' en haut à gauche" -ForegroundColor White
Write-Host "2. Cliquez sur '+ Nouveau déploiement'" -ForegroundColor White
Write-Host "3. Type : Sélectionnez 'Application web'" -ForegroundColor White
Write-Host "4. Exécuter en tant que : Votre compte Google" -ForegroundColor White
Write-Host "5. Qui a accès : 'Toute personne possédant l'URL'" -ForegroundColor White
Write-Host "6. Cliquez sur 'Déployer'" -ForegroundColor White
Write-Host "7. Copiez l'URL de déploiement (ressemble à: https://script.google.com/macros/d/XXXXXXXX/userweb)" -ForegroundColor White
Write-Host ""

# Récupérer l'URL du déploiement
$url = Read-Host "📌 Collez l'URL de déploiement ici"

if ($url -like "https://script.google.com/macros/d/*") {
    Write-Host "✓ URL valide!" -ForegroundColor Green
}
else {
    Write-Host "⚠️  L'URL ne semble pas correcte. Continuez quand même? (O/n)" -ForegroundColor Yellow
    $continue = Read-Host
    if ($continue -eq "n") {
        exit 1
    }
}

# Créer le fichier .env
Write-Host ""
Write-Host "✅ Étape 5 : Configuration du fichier .env..." -ForegroundColor Yellow
$envContent = @"
## Configuration ISPA Forms
WHATSAPP_PHONE=15559707710
PORT=3000
NODE_ENV=development
GOOGLE_APPS_SCRIPT_URL=$url
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8
Write-Host "✓ Fichier .env créé avec la configuration" -ForegroundColor Green
Write-Host ""

# Vérifier que npm est installé
Write-Host "✅ Étape 6 : Vérification de Node.js..." -ForegroundColor Yellow
if ((Get-Command npm -ErrorAction SilentlyContinue) -ne $null) {
    Write-Host "✓ npm est installé" -ForegroundColor Green
}
else {
    Write-Host "⚠️  npm n'est pas trouvé. Installez Node.js depuis https://nodejs.org/" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Installer les dépendances
Write-Host "✅ Étape 7 : Installation des dépendances npm..." -ForegroundColor Yellow
npm install
Write-Host ""

# Résumé
Write-Host "================================" -ForegroundColor Green
Write-Host "✅ CONFIGURATION COMPLÈTE!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 Prochaines étapes :" -ForegroundColor Cyan
Write-Host "1. Démarrer le serveur : npm start" -ForegroundColor White
Write-Host "2. Ouvrir http://localhost:3000 dans le navigateur" -ForegroundColor White
Write-Host "3. Tester le flux complet :" -ForegroundColor White
Write-Host "   - Cliquer sur 'Parler à un conseiller'" -ForegroundColor Gray
Write-Host "   - Remplir le formulaire" -ForegroundColor Gray
Write-Host "   - Vérifier le Google Sheet 'ISPA CRM 2026'" -ForegroundColor Gray
Write-Host ""
Write-Host "📌 Infos de configuration sauvegardées dans .env" -ForegroundColor Cyan
Write-Host ""
