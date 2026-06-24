# 🚀 Démarrage rapide

## Étape 1: Installer Node.js

Téléchargez et installez depuis : https://nodejs.org (LTS recommandé)

## Étape 2: Installer les dépendances

Ouvrez un terminal dans le dossier ISPA et tapez:

```bash
npm install
```

## Étape 3: Lancer le serveur

### Windows
Double-cliquez sur `start.bat`

Ou dans le terminal:
```bash
npm start
```

### Mac/Linux
```bash
bash start.sh
```

Ou simplement:
```bash
npm start
```

## Étape 4: Ouvrir le site

Allez sur: **http://localhost:3000**

---

## ✅ C'est prêt!

Cliquez sur n'importe quel bouton "Parler à un conseiller" → Le formulaire s'affiche → Les données sont enregistrées → Redirection WhatsApp automatique

---

## 📊 Voir les prospects

- **Via le terminal**: `curl http://localhost:3000/api/prospects`
- **Dans l'explorateur de fichiers**: Ouvrez `prospects.json`

---

## 🔧 Troubleshooting

**Erreur "npm command not found"?**
→ Redémarrez votre ordinateur après l'installation de Node.js

**Port 3000 déjà utilisé?**
→ Ouvrez un autre terminal en tapant: `PORT=3001 npm start`

**Le formulaire ne s'affiche pas?**
→ Vérifiez la console (F12) du navigateur pour les erreurs
