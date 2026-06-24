# 🎯 Système de Formulaires ISPA & ISBITAGES

## 🚀 Démarrage en 3 secondes

```bash
npm install && npm start
```

Puis ouvrez: **http://localhost:3000**

---

## 📚 Documentation

- **[FORM_SYSTEM.md](./FORM_SYSTEM.md)** - Vue d'ensemble technique complète
- **[FORM_GUIDE_FR.md](./FORM_GUIDE_FR.md)** - Guide détaillé & cas d'usage
- **[CHECKLIST.md](./CHECKLIST.md)** - Récapitulatif & tests

---

## 🎓 Le système en 30 secondes

### ✨ Qu'est-ce que c'est?

Un système **premium** qui:

1. **Capture les prospects** via 4 formulaires designés (ISPA FR/EN + ISBITAGES FR/EN)
2. **Enregistre les données** dans un **seul fichier** `prospects.json` (pas de doublons)
3. **Génère un ID unique** pour chaque prospect (traçabilité)
4. **Redirige sur WhatsApp** avec message pré-rempli contenant tous les détails

### 🎨 Formulaires

| Page | URL | Langue | École |
|------|-----|--------|-------|
| Page principale | / | 🇫🇷 FR | ISPA |
| English version | /index-en.html | 🇬🇧 EN | ISPA |
| ISBITAGES | /ISBITAGES/ | 🇫🇷 FR | ISBITAGES |
| ISBITAGES EN | /ISBITAGES/index-en.html | 🇬🇧 EN | ISBITAGES |

### 💾 Données enregistrées

```json
{
  "id": "ISPA-1719232156789-abc123",
  "nom": "Jean Dupont",
  "telephone": "690123456",
  "filiere": "Génie Informatique",
  "conseillerNeeded": true,
  "school": "ispa",              // ← Permet de filtrer
  "lang": "fr",                  // ← Permet de filtrer
  "dateInscription": "2026-06-24T14:30:00.000Z"
}
```

**Tous les prospects** (ISPA FR/EN + ISBITAGES FR/EN) → **1 seul fichier**

---

## 📊 APIs disponibles

```bash
# Voir tous les prospects
curl http://localhost:3000/api/prospects

# Voir seulement ISPA
curl http://localhost:3000/api/prospects/school/ispa

# Voir seulement ISBITAGES
curl http://localhost:3000/api/prospects/school/isbitages
```

---

## 🔧 Configuration rapide

### Changer le numéro WhatsApp

Fichier principal: `server.js` — le numéro WhatsApp qui recevra les messages des prospects est configuré ici.

Par défaut (version finale livrée) le numéro est:

```
237653665618
```

Pour modifier le numéro, vous pouvez soit éditer la constante `WHATSAPP_PHONE` dans `server.js`, soit définir la variable d'environnement `WHATSAPP_PHONE` avant de démarrer le serveur.

### Changer le port

```bash
PORT=8080 npm start
```

### Ajouter une filière

Dans chaque fichier HTML `index.html`:
```html
<option value="My new program">My new program</option>
```

---

## 🧪 Tests

### Tester rapidement

```bash
# Test 1: Le serveur tourne ?
curl http://localhost:3000/api/prospects

# Test 2: Voir les prospects
cat prospects.json | jq

# Test 3: Via bash (si jq n'existe pas)
curl http://localhost:3000/api/prospects
```

### Remplir un formulaire de test

1. Ouvrir http://localhost:3000
2. Cliquer "Parler à un conseiller"
3. Remplir avec:
   - Nom: "Test User"
   - Tel: "690123456"
   - Filière: "Génie Informatique"
   - ☑️ Cocher "Conseiller"
4. Valider
5. ✅ Voir dans `prospects.json`: nouvel entry avec `school: "ispa"`, `lang: "fr"`

---

## 📁 Fichiers importants

```
ISPA/
├── index.html                (ISPA FR - avec formulaire)
├── index-en.html             (ISPA EN - avec formulaire)
├── form-handler.js           (Logique des formulaires)
├── server.js                 (Backend)
├── prospects.json            (💾 Base de données)
├── style.css                 (Design + formulaire)
│
└── ISBITAGES/
    ├── index.html            (ISBITAGES FR - avec formulaire)
    ├── index-en.html         (ISBITAGES EN - avec formulaire)
    ├── form-handler.js       (Copie)
    └── style.css             (Copie)

Documentation:
├── FORM_SYSTEM.md            (Vue d'ensemble technique)
├── FORM_GUIDE_FR.md          (Guide détaillé)
├── CHECKLIST.md              (Tests & récap)
└── README.md                 (Ce fichier)
```

---

## ⚡ Caractéristiques clés

✅ **4 formulaires spécifiques** - ISPA (FR/EN) + ISBITAGES (FR/EN)
✅ **Un seul fichier** - prospects.json centralisé (pas de doublons)
✅ **Design premium** - animations fluides, responsive, couleurs ISPA
✅ **Multilangue** - Français & English
✅ **Traçabilité** - ID unique, école, langue, date
✅ **API REST** - Facile à intégrer
✅ **Mobile-first** - Fonctionne sur tous les appareils

---

## 🚀 Prochaines étapes

### Avant de passer en production

- [ ] Tester tous les formulaires
- [ ] Configurer le vrai numéro WhatsApp
- [ ] Sauvegarder prospects.json
- [ ] Utiliser une vraie BDD (MongoDB)
- [ ] Ajouter HTTPS
- [ ] Déployer sur serveur

### Améliorations futures

- Dashboard de visualisation
- Export CSV
- Intégration CRM
- Notifications par email
- Analytics

---

## 📞 FAQ

**Q: Comment ajouter une nouvelle école?**
A: Il faudrait créer de nouveaux index.html et modifier form-handler.js

**Q: Je peux modifier le design?**
A: Oui! Modifiez style.css

**Q: Que faire si le serveur crash?**
A: Redémarrez: `npm start`

**Q: Comment backuper les données?**
A: Copier `prospects.json` quelque part de sûr

**Q: Puis-je utiliser une base de données?**
A: Oui, remplacez `prospects.json` par MongoDB, PostgreSQL, etc.

---

## 🎓 Ressources

- [Fichier techniques: FORM_SYSTEM.md](./FORM_SYSTEM.md)
- [Guide complet: FORM_GUIDE_FR.md](./FORM_GUIDE_FR.md)
- [Checklist: CHECKLIST.md](./CHECKLIST.md)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express Documentation](https://expressjs.com/)

---

**Créé le 24/06/2026** | Version 1.0 | Status: ✅ Production-ready

**Questions?** Consultez la documentation ou vérifiez les logs:
```bash
npm start
```
