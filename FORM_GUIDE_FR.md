# 🎓 Guide Complet : Système Multi-Écoles ISPA & ISBITAGES

## 📖 Table des matières
1. [Installation & Démarrage](#installation--démarrage)
2. [Les 4 Formulaires](#les-4-formulaires)
3. [Structure des données](#structure-des-données)
4. [Gestion des prospects](#gestion-des-prospects)
5. [Troubleshooting](#troubleshooting)

---

## Installation & Démarrage

### Prérequis
- **Node.js** 14+ (téléchargez depuis https://nodejs.org)

### Étapes

```bash
# 1. Aller dans le dossier ISPA
cd "C:\Users\SOP TECH\OneDrive\Bureau\ISPA"

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur
npm start

# ✅ Vous verrez:
# ✅ Serveur ISPA/ISBITAGES sur http://localhost:3000
# 📁 Prospects enregistrés dans: .../prospects.json
```

### Accès aux pages
- **ISPA Français** : http://localhost:3000
- **ISPA English** : http://localhost:3000/index-en.html
- **ISBITAGES Français** : http://localhost:3000/ISBITAGES
- **ISBITAGES English** : http://localhost:3000/ISBITAGES/index-en.html

---

## Les 4 Formulaires

### 1️⃣ ISPA Français (/index.html)

**Trigger:** Clic sur "Parler à un conseiller sur WhatsApp" ou barre sticky mobile

**Champs:**
- Votre nom complet ✳️
- Numéro WhatsApp ✳️
- Quelle filière vous intéresse ? (dropdown + 14 filières)
- ☑️ J'aimerais qu'un conseiller m'aide à choisir ma filière

**Enregistrement:** `prospects.json` avec `school: "ispa"`, `lang: "fr"`

---

### 2️⃣ ISPA English (/index-en.html)

**Trigger:** Clic sur "Chat with an advisor on WhatsApp"

**Fields:**
- Your full name ✳️
- WhatsApp number ✳️
- Which program interests you? (dropdown in English)
- ☑️ I'd like an advisor to help me choose the right program

**Record:** `prospects.json` with `school: "ispa"`, `lang: "en"`

---

### 3️⃣ ISBITAGES Français (/ISBITAGES/index.html)

**Identique à ISPA Français** sauf:
- Texte: "un conseiller ISBITAGES"
- Enregistrement: `school: "isbitages"`, `lang: "fr"`

---

### 4️⃣ ISBITAGES English (/ISBITAGES/index-en.html)

**Identique à ISPA English** sauf:
- Texte: "an ISBITAGES advisor"
- Enregistrement: `school: "isbitages"`, `lang: "en"`

---

## Structure des données

### Format de prospects.json

```json
[
  {
    "id": "ISPA-1719232156789-abc123def",     // ID unique auto-généré
    "nom": "Jean Dupont",                     // Nom du prospect
    "telephone": "690123456",                 // WhatsApp
    "filiere": "Génie Informatique",          // Choix de filière
    "conseillerNeeded": true,                 // Besoin d'orientation ?
    "school": "ispa",                         // École (ispa ou isbitages)
    "lang": "fr",                             // Langue (fr ou en)
    "source": "form",                         // Source (toujours "form")
    "dateInscription": "2026-06-24T14:30:00.000Z"  // Date ISO
  },
  { ... autres prospects ... }
]
```

### Exemple avec tous les types

```json
[
  {
    "id": "ISPA-1719232156789-abc123",
    "nom": "Aminata Sow",
    "telephone": "690500100",
    "filiere": "Commerce & Gestion",
    "conseillerNeeded": false,
    "school": "ispa",
    "lang": "fr",
    "source": "form",
    "dateInscription": "2026-06-24T09:15:00.000Z"
  },
  {
    "id": "ISPA-1719232200456-def789",
    "nom": "Sarah Mvondo",
    "telephone": "+237690123456",
    "filiere": "Génie Informatique",
    "conseillerNeeded": true,
    "school": "isbitages",
    "lang": "fr",
    "source": "form",
    "dateInscription": "2026-06-24T10:30:00.000Z"
  },
  {
    "id": "ISPA-1719232250789-ghi012",
    "nom": "John Doe",
    "telephone": "690654321",
    "filiere": "Computer Engineering",
    "conseillerNeeded": true,
    "school": "ispa",
    "lang": "en",
    "source": "form",
    "dateInscription": "2026-06-24T11:45:00.000Z"
  }
]
```

---

## Gestion des prospects

### Via les APIs

**Voir tous les prospects:**
```bash
curl http://localhost:3000/api/prospects | jq
```

**Voir seulement ISPA:**
```bash
curl http://localhost:3000/api/prospects/school/ispa | jq
```

**Voir seulement ISBITAGES:**
```bash
curl http://localhost:3000/api/prospects/school/isbitages | jq
```

### Manuellement

Ouvrez le fichier:
```
C:\Users\SOP TECH\OneDrive\Bureau\ISPA\prospects.json
```

Avec n'importe quel éditeur (VS Code, Notepad++, etc.)

### Analyser les données

**Nombre de prospects total:**
```bash
curl -s http://localhost:3000/api/prospects | jq 'length'
```

**Prospects par école (demande à un ami avec bash):**
```bash
curl -s http://localhost:3000/api/prospects | jq 'group_by(.school) | map({school: .[0].school, count: length})'
```

**Prospects ayant besoin d'orientation:**
```bash
curl -s http://localhost:3000/api/prospects | jq '[.[] | select(.conseillerNeeded == true)]'
```

---

## 🎨 Flux complet (Exemple)

### Étape 1: Prospect arrive
```
👤 Aminata vient de Facebook
🌐 Arrive sur: http://localhost:3000 (ISPA FR automatique)
```

### Étape 2: Clique sur le CTA
```
👆 Clique: "Parler à un conseiller sur WhatsApp"
✨ Modal s'affiche avec animations
```

### Étape 3: Remplit le formulaire
```
✍️ Nom: Aminata Sow
📱 WhatsApp: 690500100
📚 Filière: Commerce & Gestion
☑️ Conseiller: NON
```

### Étape 4: Soumissio
```
✅ Prospect enregistré:
{
  "id": "ISPA-1719232156789-abc123",
  "nom": "Aminata Sow",
  "school": "ispa",
  "lang": "fr",
  ...
}
```

### Étape 5: Redirection WhatsApp
```
💬 Redirection avec le message:

Bonjour! 👋

*ID Prospect:* ISPA-1719232156789-abc123
*Nom:* Aminata Sow
*Téléphone:* 690500100
*École:* ISPA
*Filière:* Commerce & Gestion

Je souhaite être conseillé sur les formations ISPA.
```

### Étape 6: Le conseiller reçoit tout
```
✅ Tous les détails sont visibles
📝 Un ID unique pour tracker le prospect
🎯 Facile de suivre le prospect dans le CRM
```

---

## 📊 Cas d'usage

### Cas 1: Prospect ISPA (FR) → Commerce & Gestion
```json
{
  "school": "ispa",
  "lang": "fr",
  "filiere": "Commerce & Gestion"
}
```

### Cas 2: Prospect ISBITAGES (EN) → Computer Engineering + Besoin d'orientation
```json
{
  "school": "isbitages",
  "lang": "en",
  "filiere": "Computer Engineering",
  "conseillerNeeded": true
}
```

### Cas 3: Prospect ISPA (FR) → Pas sûr + Besoin d'orientation
```json
{
  "school": "ispa",
  "lang": "fr",
  "filiere": "",
  "conseillerNeeded": true
}
```

---

## 🔒 Sécurité & Bonnes pratiques

### ✅ À faire
- Garder `prospects.json` sans données sensibles (pas de mots de passe)
- Vérifier régulièrement les prospects
- Sauvegarder `prospects.json` régulièrement

### ❌ À éviter
- Ne pas partager le lien `http://localhost:3000` sur internet (local only)
- Ne pas committer `prospects.json` avec erreurs personnelles
- Ne pas modifier manuellement les IDs (ils sont auto-générés)

### En production
- Utilisez une vraie base de données (MongoDB, PostgreSQL, etc.)
- Utilisez HTTPS
- Limitez l'accès à l'API
- Conservez les logs

---

## Troubleshooting

### ❌ "Erreur de connexion. Assurez-vous que le serveur est lancé."

**Solution:**
```bash
# Vérifier que le serveur tourne
npm start

# Attendre 2-3 secondes
# Rechrager la page (F5)
```

### ❌ Les données ne s'enregistrent pas

**Checklist:**
1. Vérifier que `prospects.json` existe
2. Vérifier les permissions du dossier
3. Vérifier la console du serveur pour les erreurs
4. Vérifier la console du navigateur (F12)

### ❌ Le formulaire n'a pas la bonne langue

**Vérifier:**
- Vous êtes sur la bonne URL ?
  - FR: .../index.html ou .../ISBITAGES/
  - EN: .../index-en.html ou .../ISBITAGES/index-en.html
- Le lien a les bons attributs `data-lang` et `data-school`

### ❌ WhatsApp ne s'ouvre pas

**Solutions:**
1. WhatsApp doit être installé sur le téléphone
2. Sur desktop, un client WhatsApp Web doit être connecté
3. Le numéro dans le lien doit être valide (avec pays: +237...)

---

## 🚀 Prochaines étapes

### Améliorations possibles
- [ ] Export des prospects en CSV
- [ ] Dashboard de visualisation
- [ ] Confirmation par email
- [ ] CRM integration (Pipedrive, etc.)
- [ ] Statistiques (conversions, origine, etc.)

### Pour aller plus loin
- Ajouter une vraie BDD (MongoDB, Supabase)
- Ajouter l'authentification
- Créer un dashboard pour les conseillers
- Intégrer Zapier/IFTTT

---

**Documentation v1.0 - 24/06/2026** ✨
