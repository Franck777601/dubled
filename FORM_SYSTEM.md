# 🎯 Système de Formulaires Multi-Écoles ISPA & ISBITAGES

## 📋 Vue d'ensemble

Un système **premium** de capture de prospects avec :
- ✅ **4 formulaires spécifiques** : ISPA (FR/EN) + ISBITAGES (FR/EN)
- ✅ **1 fichier de prospects** partagé (`prospects.json`)
- ✅ **Design moderne** avec animations fluides
- ✅ **ID unique** généré automatiquement
- ✅ **Multilangue** avec messages WhatsApp contextuels
- ✅ **Traçabilité** : école, langue, source, date

---

## 🚀 Démarrage rapide

### 1️⃣ Installation

```bash
npm install
```

### 2️⃣ Lancer le serveur

```bash
npm start
```

### 3️⃣ Accéder aux 4 pages

| Page | URL | Formulaire |
|------|-----|-----------|
| ISPA Français | http://localhost:3000 | FR avec filieres ISPA |
| ISPA English | http://localhost:3000/index-en.html | EN avec programs ISPA |
| ISBITAGES Français | http://localhost:3000/ISBITAGES | FR avec filieres ISBITAGES |
| ISBITAGES English | http://localhost:3000/ISBITAGES/index-en.html | EN avec programs ISBITAGES |

---

## 🎨 Design du formulaire

### Caractéristiques
- 📱 **Responsive** : mobile, tablette, desktop
- ✨ **Animations** : ouverture fluide, fade-in en cascade
- 🎯 **Focus states** : feedback visuel clair
- 🌈 **Gradient** : primary + accent (WhatsApp green)
- 🔒 **Validation** : champs requis indiqués avec `*` rouge

### Champs du formulaire
1. **Nom complet** ✳️ (requis)
2. **Numéro WhatsApp** ✳️ (requis)
3. **Filière** (optionnel) - dropdown avec 14+ options
4. **Besoin conseiller** (optionnel) - checkbox pour orientation

---

## 📊 Fichier prospects.json

### Format unique et centralisé

Tous les prospects des 4 pages → **1 seul prospects.json**

```json
[
  {
    "id": "ISPA-1719232156789-abc123def",
    "nom": "Jean Dupont",
    "telephone": "690123456",
    "filiere": "Génie Informatique",
    "conseillerNeeded": true,
    "school": "ispa",
    "lang": "fr",
    "source": "form",
    "dateInscription": "2026-06-24T14:30:00.000Z"
  },
  {
    "id": "ISPA-1719232167891-xyz789abc",
    "nom": "John Smith",
    "telephone": "+237690654321",
    "filiere": "Computer Engineering",
    "conseillerNeeded": false,
    "school": "isbitages",
    "lang": "en",
    "source": "form",
    "dateInscription": "2026-06-24T14:35:00.000Z"
  }
]
```

### Champs enregistrés
- `id` : ID unique (format: `ISPA-timestamp-random`)
- `nom` : Nom du prospect
- `telephone` : Numéro WhatsApp
- `filiere` : Programme/filière choisie
- `conseillerNeeded` : Besoin d'orientation? (true/false)
- `school` : École (`ispa` ou `isbitages`)
- `lang` : Langue (`fr` ou `en`)
- `source` : Source (`form`, etc.)
- `dateInscription` : ISO 8601 timestamp

---

## 💬 Message WhatsApp

Le message envoyé au conseiller contient **toutes les infos du prospect** :

### Exemple FR (ISPA)
```
Bonjour! 👋

*ID Prospect:* ISPA-1719232156789-abc123
*Nom:* Jean Dupont
*Téléphone:* 690123456
*École:* ISPA
*Filière:* Génie Informatique
*Demande:* Besoin d'un conseiller d'orientation

Je souhaite être conseillé sur les formations ISPA.
```

### Exemple EN (ISBITAGES)
```
Hello! 👋

*Prospect ID:* ISPA-1719232167891-xyz789
*Name:* John Smith
*Phone:* +237690654321
*School:* ISBITAGES
*Program:* Computer Engineering
*Request:* Needs guidance choosing a program

I would like to be advised about ISBITAGES training programs.
```

---

## 🔗 Flux utilisateur

```
1. Prospect arrive sur page (ISPA FR/EN ou ISBITAGES FR/EN)
   ↓
2. Clique sur "Parler à un conseiller" / "Chat with advisor"
   ↓
3. Formulaire modal s'affiche (langue & école correctes)
   ↓
4. Remplissage des champs
   ↓
5. Soumission
   ↓
6. Enregistrement dans prospects.json avec ID unique
   ↓
7. Redirection WhatsApp avec message pré-rempli
   ↓
8. Conseiller reçoit tous les détails via WhatsApp
```

---

## 📂 Structure des fichiers

```
ISPA/
├── index.html                        (ISPA FR)
├── index-en.html                     (ISPA EN)
├── style.css                         (Styles + form modals)
├── script.js                         (Scripts principaux)
├── form-handler.js                   (Gestion des formulaires)
├── server.js                         (Backend Node.js)
├── prospects.json                    (💾 Base de données unifiée)
├── package.json                      (Dépendances)
├── start.bat / start.sh              (Scripts de démarrage)
├── FORM_SYSTEM.md                    (Cette documentation)
│
└── ISBITAGES/
    ├── index.html                    (ISBITAGES FR)
    ├── index-en.html                 (ISBITAGES EN)
    ├── style.css                     (Idem ISPA)
    ├── script.js                     (Idem ISPA)
    └── form-handler.js               (Idem ISPA)
```

---

## 🛠️ API Endpoints

### Enregistrer un prospect
```bash
POST /api/register
Content-Type: application/json

{
  "nom": "Jean Dupont",
  "telephone": "690123456",
  "filiere": "Génie Informatique",
  "conseillerNeeded": true,
  "school": "ispa",
  "lang": "fr"
}
```

**Response:**
```json
{
  "success": true,
  "id": "ISPA-1719232156789-abc123",
  "whatsappLink": "https://wa.me/...",
  "prospect": { ... }
}
```

### Voir tous les prospects
```bash
GET /api/prospects
```

### Filtrer par école
```bash
GET /api/prospects/school/ispa
GET /api/prospects/school/isbitages
```

---

## 🎌 Système de langues

### Textes traduits

Formation de formulaire:
- `fr` : Français (Canada/France)
- `en` : English (USA)

Messages d'erreur, succès, etc. → traités en form-handler.js

### Options de filière

| Français | English |
|----------|---------|
| Traduction & Interprétation | Translation & Interpretation |
| Commerce & Gestion | Business & Management |
| Carrières Juridiques | Legal Careers |
| Études médico-sanitaires | Medical & Health Studies |
| ... | ... |

---

## 🔍 Filtrage des prospects

### Via API

Voir seulement les prospects ISPA:
```bash
curl http://localhost:3000/api/prospects/school/ispa | jq
```

### Manuellement

Ouvrez `prospects.json` et cherchez `"school": "ispa"` ou `"school": "isbitages"`

---

## ⚙️ Configuration

### Changer le numéro WhatsApp

Dans `form-handler.js` (ligne ~5):
```javascript
const WHATSAPP_PHONE = '237653665618'; // ← Changer ici
```

Aussi dans `server.js` si vous envoyez le message directement.

### Changer le port

```bash
PORT=8080 npm start
```

### Ajouter des filières

Dans chaque fichier HTML index:

```html
<select id="filiere">
  <option value="Ma nouvelle filière">Ma nouvelle filière</option>
</select>
```

---

## 🚀 Déploiement

### Vercel
```bash
vercel
```

### Heroku
```bash
heroku create ispa-form
git push heroku main
```

### Autre hosting Node.js
- Railway.app
- Render.com
- DigitalOcean App Platform

**Note**: En production, utilisez une vraie base de données (MongoDB, Supabase) au lieu de `prospects.json`.

---

## 🐛 Troubleshooting

### Le formulaire ne s'affiche pas
- Vérifiez que `form-handler.js` est chargé (F12 → Network)
- Vérifiez la console (F12) pour les erreurs

### Erreur "Connection refused"
- Assurez-vous que le serveur est lancé : `npm start`
- Vérifiez que le port 3000 n'est pas utilisé

### Les données ne s'enregistrent pas
- Vérifiez que `prospects.json` existe
- Vérifiez les permissions d'écriture du dossier
- Consultez les logs du serveur (`npm start`)

### Le message WhatsApp ne contient pas les données
- Les données doivent être dans `prospects.json`
- Vérifiez que le formul aire a été soumis correctement
- Vérifiez la réponse du serveur (F12 → Network)

---

## 📝 Notes importantes

1. **Un seul fichier de prospects** : Pas de duplication entre ISPA et ISBITAGES
2. **Distinctions claires** : Chaque record indique école + langue
3. **Traçabilité** : Date, source, et ID unique pour chaque prospect
4. **Scalabilité** : Le système supporte facilement d'autres écoles

---

## 📞 Support

Pour plus d'aide:
- Consultez les logs: `npm start`
- Vérifiez la console du navigateur (F12)
- Inspectez `prospects.json` directement

---

**Créé le 24/06/2026** ✨
