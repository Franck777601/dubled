# 📊 Configuration Google Sheets pour ISPA CRM

Ce guide explique comment connecter le serveur Node.js au Google Sheet **gratuitement** pour enregistrer automatiquement les prospects.

## ✅ Étape 1 : Créer le Google Sheet

1. Allez dans [Google Apps Script](https://script.google.com/)
2. Créez un nouveau projet
3. Collez le contenu du fichier `crm_export/create_ispa_crm.gs` 
4. Cliquez sur **Exécuter** → selectionnez la fonction `createISPAcrm`
5. Autorisez l'accès quand demandé
6. ✅ Un Google Sheet **"ISPA CRM 2026"** est créé avec les colonnes PROSPECTS

## ✅ Étape 2 : Déployer comme Web App

1. Dans l'Apps Script (même onglet), allez à **Déploiement** → **Nouveau déploiement**
2. Type : **Application web**
3. Exécuter en tant que : **Votre compte**
4. Qui a accès : **Toute personne possédant l'URL**
5. **Déployer**
6. Copiez l'**URL de déploiement** (ressemble à : `https://script.google.com/macros/d/XXXXXX/userweb`)

## ✅ Étape 3 : Configurer le serveur Node.js

### Sur serveur local
Créez un fichier `.env` à la racine du projet :

```bash
WHATSAPP_PHONE=15559707710
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/d/XXXXXX/userweb
```

Remplacez `XXXXXX` par votre URL de déploiement.

### Sur Render

1. Allez dans **Environment** de votre service Render
2. Ajoutez la variable :
   - **Clé** : `GOOGLE_APPS_SCRIPT_URL`
   - **Valeur** : Votre URL de déploiement (copiée à l'étape 2)

## ✅ Étape 4 : Tester le flux complet

1. **Démarrer le serveur** :
   ```bash
   npm start
   ```

2. **Ouvrir la landing page** :
   - http://localhost:3000 (ISPA FR)

3. **Cliquer sur "Parler à un conseiller"**

4. **Remplir le formulaire** :
   - Nom : `Jean Dupont`
   - Téléphone : `+237 6 12 34 56 78`
   - Filière : Sélectionner une filière
   - Cliquer sur **"Continuer sur WhatsApp"**

5. **Vérifier le Google Sheet** :
   - Allez sur [Google Drive](https://drive.google.com)
   - Ouvrez le Google Sheet **"ISPA CRM 2026"**
   - L'onglet **PROSPECTS** doit avoir une nouvelle ligne avec :
     - Prospect_ID : `ISPA-FR-XXXXX...`
     - Date_Creation : Aujourd'hui
     - Nom_Complet : `Jean Dupont`
     - Téléphone : `237612345678`
     - Etc...

6. **Vérifier aussi le WhatsApp** :
   - Un lien WhatsApp s'ouvre avec le message contenant l'ID unique

## 🔧 Dépannage

### Le Google Sheet ne se remplit pas ?

1. **Vérifiez la variable d'environnement** :
   ```bash
   echo $GOOGLE_APPS_SCRIPT_URL  # sur Mac/Linux
   echo %GOOGLE_APPS_SCRIPT_URL%  # sur Windows
   ```

2. **Consultez les logs du server** :
   - Si vous voyez `✅ Google Sheet updated:` → ✅ Ça fonctionne
   - Si vous voyez `⚠️  Could not sync to Google Sheet:` → Vérifiez l'URL

3. **Redéployez l'Apps Script** si vous le modifiez

4. **Les données locales dans `prospects.json` restent** même si Google Sheet ne fonctionne pas

## 📌 À savoir

- ✅ **Gratuit** : Google Sheets et Apps Script sont inclus dans Google
- ✅ **Données sauvegardées** : Deux copies (local + Google Sheet)
- ✅ **ID unique** : Chaque prospect reçoit un ID unique `ISPA-FR-1234567890-xyz`
- ✅ **Synchronisation automatique** : Aucun délai supplémentaire

## 🚀 Flux complet

```
1. Prospect clique sur "Parler à un conseiller" (Landing page)
   ↓
2. Formulaire s'ouvre → Remplit infos
   ↓
3. Clique sur "Continuer sur WhatsApp"
   ↓
4. Serveur génère l'ID unique
   ↓
5. Données sauvegardées en local (prospects.json)
   ↓
6. Données envoyées au Google Sheet (async)
   ↓
7. Redirection vers WhatsApp avec l'ID + infos
```

Besoin d'aide ? Consultez le fichier [FORM_SYSTEM.md](./FORM_SYSTEM.md) pour la documentation complète du système de formulaire.
