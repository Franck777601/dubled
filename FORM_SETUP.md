# 🎯 Système de Formulaire ISPA + WhatsApp

Un système complet pour capturer les informations des prospects via un formulaire **avant** de les rediriger vers WhatsApp.

## 📋 Fonctionnalités

✅ **Formulaire modal** intercepte les clics sur les boutons WhatsApp
✅ **Collecte de données** : nom, téléphone, filière, demande de conseiller
✅ **ID unique** attribué automatiquement à chaque prospect
✅ **Enregistrement** dans `prospects.json`
✅ **WhatsApp enrichi** : les données du prospect s'affichent au conseiller
✅ **Responsive** : fonctionne sur mobile et desktop

---

## 🚀 Installation & Démarrage

### 1️⃣ Installer les dépendances

```bash
npm install
```

### 2️⃣ Lancer le serveur

```bash
npm start
```

Vous verrez :
```
✅ Serveur ISPA sur http://localhost:3000
📁 Prospects enregistrés dans: .../prospects.json
```

### 3️⃣ Ouvrir le site

Ouvrez dans votre navigateur :
```
http://localhost:3000
```

---

## 📝 Comment ça marche

### Flux utilisateur

1. **Prospect clique** sur "Parler à un conseiller sur WhatsApp"
2. **Formulaire modal** s'affiche avec les champs :
   - Nom complet ✳️
   - Numéro WhatsApp ✳️
   - Filière souhaitée (optionnel)
   - ☑️ J'ai besoin d'un conseiller d'orientation
3. **Données enregistrées** dans `prospects.json` avec un ID unique
4. **Redirection WhatsApp** avec message pré-rempli incluant :
   - L'ID du prospect
   - Nom, téléphone, filière
   - Si demande d'orientation

### Exemple de message WhatsApp reçu par le conseiller

```
Bonjour! 👋

ID Prospect: ISPA-1719232156789-abc123def
Nom: Jean Dupont
Téléphone: 690123456
Filière souhaitée: Génie Informatique
Demande: Besoin d'un conseiller d'orientation

Je souhaite être conseillé sur les formations ISPA.
```

---

## 📁 Structure des fichiers

```
ISPA/
├── index.html              # Page d'accueil (modifiée)
├── style.css               # Styles (+ modal)
├── script.js               # Scripts principaux
├── form-handler.js         # Gestion du formulaire ⭐ NEW
├── server.js               # Backend Node.js ⭐ NEW
├── prospects.json          # Base de données prospects ⭐ NEW
└── package.json            # Dépendances ⭐ NEW
```

---

## 🗂️ Fichier prospects.json

Après chaque soumission :

```json
[
  {
    "id": "ISPA-1719232156789-abc123",
    "nom": "Jean Dupont",
    "telephone": "690123456",
    "filiere": "Génie Informatique",
    "conseillerNeeded": true,
    "dateInscription": "2026-06-24T14:30:00.000Z"
  }
]
```

---

## 🔧 Configuration

### Changer le numéro WhatsApp

Dans `form-handler.js` (ligne 11) :
```javascript
const WHATSAPP_PHONE = '15559707710'; // Changer ici
```

### Changer le port du serveur

Variables d'environnement :
```bash
PORT=8080 npm start
```

---

## 📊 Voir les prospects enregistrés

### Via l'API

```bash
curl http://localhost:3000/api/prospects
```

### Ou directement

Ouvrez `prospects.json` dans l'éditeur de texte.

---

## 🛠️ Dépannage

### ❌ "Erreur de connexion"

Assurez-vous que le serveur est lancé :
```bash
npm start
```

### ❌ Les données ne s'enregistrent pas

1. Vérifiez que `prospects.json` existe en racine
2. Vérifiez les permissions d'écriture du dossier
3. Vérifiez la console du navigateur (F12) pour les erreurs

### ❌ Le formulaire ne s'affiche pas

Vérifiez que `form-handler.js` est chargé :
```html
<script src="form-handler.js"></script>
```

---

## 📱 Customisation

### Ajouter des champs

Dans `index.html` (formulaire) :
```html
<div class="form-group">
  <label for="age">Votre âge</label>
  <input type="number" id="age" name="age">
</div>
```

Dans `server.js` (enregistrement) :
```javascript
const prospect = {
  id: id,
  nom: data.nom,
  telephone: data.telephone,
  age: data.age,  // ← Ajouter ici
  // ...
};
```

### Changer le style du formulaire

Modifiez les variables CSS dans `style.css` :
```css
:root {
  --primary: #0b6b63;   /* Couleur principale */
  --accent: #25D366;    /* Vert WhatsApp */
}
```

---

## 🚀 Déploiement

### Sur Vercel

```bash
vercel
```

Le serveur doit tourner en background ou utiliser une base de données cloud (MongoDB, Supabase, etc.) au lieu de `prospects.json`.

### Sur Heroku

```bash
heroku create ispa-form
git push heroku main
```

---

## 📞 Support

Si vous avez des questions, consultez :
- Les logs du serveur (`npm start`)
- La console du navigateur (F12)
- Le fichier `prospects.json` pour vérifier l'enregistrement

---

**Créé le 24/06/2026** ✨
