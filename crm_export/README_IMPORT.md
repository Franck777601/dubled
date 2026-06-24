Instructions d'import rapide

Option A — Importer les CSV (rapide, manuel)
1. Ouvre Google Drive → Nouveau → Google Sheets → Feuille de calcul vierge.
2. Menu Fichier → Importer → Onglet "Téléverser" → sélectionne un fichier CSV.
3. Pour chaque CSV dans `crm_export` :
   - PROSPECTS.csv : Importer → Insérer une nouvelle feuille → conserver les en-têtes.
   - STATUTS.csv : Importer → Insérer une nouvelle feuille.
   - CONSEILLERS.csv : Importer → Insérer une nouvelle feuille.
   - REPORTING.csv : Importer → Insérer une nouvelle feuille.
4. Renomme les feuilles si nécessaire (`PROSPECTS`, `STATUTS`, `CONSEILLERS`, `REPORTING`).
5. Dans `PROSPECTS` :
   - Sélectionne la ligne 1 → mettre en gras → couleur de fond gris clair.
   - Affichage → Figer → 1 ligne.
6. Créer la validation des données pour Statut :
   - Sélectionne la colonne J (Statut) → Données → Validation des données → Liste à partir d'une plage → `STATUTS!A1:A8` → Enregistrer.

Option B — Exécuter le script Apps Script (automatique)
1. Ouvre https://script.google.com/ ou dans un Google Sheet : Extensions → Apps Script.
2. Crée un nouveau projet et colle le contenu de `create_ispa_crm.gs`.
3. Enregistre, puis exécute la fonction `createISPAcrm()` (la première exécution demandera autorisations).
4. Le script créera automatiquement le fichier `ISPA CRM 2026` et configurera tout.

Si tu veux, je peux :
- exécuter le script pour toi (je ne peux pas accéder à ton Drive — tu dois lancer le script),
- ou je prépare un ZIP des CSV à télécharger (déjà dans `crm_export`).

Dis‑moi si tu veux que je prépare un ZIP téléchargeable ou si tu veux que je te guide pas à pas pour exécuter le script maintenant.