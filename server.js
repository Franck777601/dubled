const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

const PROSPECTS_FILE = path.join(__dirname, 'prospects.json');
const PORT = process.env.PORT || 3000;
// Final WhatsApp destination number for prospects (country code included)
const WHATSAPP_PHONE = process.env.WHATSAPP_PHONE || '237677688000';

// Ensure prospects.json exists
if (!fs.existsSync(PROSPECTS_FILE)) {
  fs.writeFileSync(PROSPECTS_FILE, JSON.stringify([], null, 2));
}

function normalizeTelephone(phone) {
  return String(phone || '').replace(/\D/g, '');
}

// Generate unique ID using school and language
function generateId(school, lang) {
  // Normalize school to an uppercase code (ISPA or ISBITAGES)
  const schoolCode = String(school || 'ispa').trim().toUpperCase().replace(/\s+/g, '');
  // Use uppercase language code for immediate visibility (FR or EN)
  const langCode = String(lang || 'fr').trim().toUpperCase();
  return `${schoolCode}-${langCode}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Save prospect data
function saveProspect(data) {
  let prospects = [];
  if (fs.existsSync(PROSPECTS_FILE)) {
    const content = fs.readFileSync(PROSPECTS_FILE, 'utf8');
    try {
      prospects = JSON.parse(content);
    } catch (e) {
      console.error('Error parsing prospects.json:', e);
      prospects = [];
    }
  }

  const normalizedPhone = normalizeTelephone(data.telephone);
  const existing = prospects.find(p => normalizeTelephone(p.telephone) === normalizedPhone);

  if (existing) {
    existing.nom = data.nom || existing.nom;
    existing.telephone = data.telephone;
    existing.filiere = data.filiere || existing.filiere;
    existing.conseillerNeeded = data.conseillerNeeded === 'true' || data.conseillerNeeded === true;
    existing.school = data.school || existing.school;
    existing.lang = data.lang || existing.lang;
    existing.source = data.source || existing.source;
    existing.dateInscription = new Date().toISOString();

    fs.writeFileSync(PROSPECTS_FILE, JSON.stringify(prospects, null, 2));
    return existing;
  }

  const prospect = {
    id: generateId(data.school, data.lang),
    nom: data.nom,
    telephone: data.telephone,
    filiere: data.filiere || 'Non spécifiée',
    conseillerNeeded: data.conseillerNeeded === 'true' || data.conseillerNeeded === true,
    school: data.school || 'ispa',
    lang: data.lang || 'fr',
    source: data.source || 'form',
    dateInscription: new Date().toISOString(),
  };

  prospects.push(prospect);
  fs.writeFileSync(PROSPECTS_FILE, JSON.stringify(prospects, null, 2));

  console.log(`📝 Nouveau prospect: ${prospect.id} - ${prospect.nom} (${prospect.school}/${prospect.lang})`);

  return prospect;
}

function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const normalized = phone.replace(/[^+\d]/g, '');
  const digits = normalized.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15 && /^\+?\d+$/.test(normalized);
}

// API endpoint to register prospect
app.post('/api/register', (req, res) => {
  try {
    const { nom, telephone, filiere, conseillerNeeded, school, lang } = req.body;

    if (!nom || !telephone) {
      return res.status(400).json({ error: 'Nom et téléphone sont requis' });
    }

    if (!isValidPhone(telephone)) {
      return res.status(400).json({ error: 'Téléphone WhatsApp invalide' });
    }

    const prospect = saveProspect({
      nom,
      telephone,
      filiere,
      conseillerNeeded,
      school: school || 'ispa',
      lang: lang || 'fr',
      source: 'form'
    });

    const whatsappMessage = buildWhatsappMessage(prospect);
    const whatsappLink = `https://wa.me/${encodeURIComponent(WHATSAPP_PHONE)}?text=${encodeURIComponent(whatsappMessage)}`;

    res.json({
      success: true,
      id: prospect.id,
      whatsappLink: whatsappLink,
      prospect: prospect,
    });
  } catch (error) {
    console.error('Error registering prospect:', error);
    res.status(500).json({ error: 'Erreur serveur lors de l\'enregistrement' });
  }
});

// Build WhatsApp message with prospect data
function buildWhatsappMessage(prospect) {
  const schoolName = prospect.school === 'isbitages' ? 'ISBITAGES' : 'ISPA';
  const isEnglish = prospect.lang === 'en';

  let message = isEnglish ? `Hello! 👋\n\n` : `Bonjour! 👋\n\n`;

  message += isEnglish ? `*Prospect ID:* ${prospect.id}\n` : `*ID Prospect:* ${prospect.id}\n`;
  message += isEnglish ? `*Name:* ${prospect.nom}\n` : `*Nom:* ${prospect.nom}\n`;
  message += isEnglish ? `*Phone:* ${prospect.telephone}\n` : `*Téléphone:* ${prospect.telephone}\n`;
  message += isEnglish ? `*School:* ${schoolName}\n` : `*École:* ${schoolName}\n`;

  if (prospect.filiere && prospect.filiere !== 'Non spécifiée' && prospect.filiere !== '') {
    message += isEnglish ? `*Program:* ${prospect.filiere}\n` : `*Filière:* ${prospect.filiere}\n`;
  }

  if (prospect.conseillerNeeded) {
    message += isEnglish
      ? `*Request:* Needs guidance choosing a program\n`
      : `*Demande:* Besoin d'un conseiller d'orientation\n`;
  }

  message += isEnglish
    ? `\nI would like to be advised about ${schoolName} training programs.`
    : `\nJe souhaite être conseillé sur les formations ${schoolName}.`;

  return message;
}

// API endpoint to view all prospects
app.get('/api/prospects', (req, res) => {
  try {
    const content = fs.readFileSync(PROSPECTS_FILE, 'utf8');
    const prospects = JSON.parse(content);
    res.json(prospects);
  } catch (error) {
    console.error('Error reading prospects:', error);
    res.status(500).json({ error: 'Erreur lors de la lecture des prospects' });
  }
});

// API endpoint to filter prospects
app.get('/api/prospects/school/:school', (req, res) => {
  try {
    const { school } = req.params;
    const content = fs.readFileSync(PROSPECTS_FILE, 'utf8');
    let prospects = JSON.parse(content);
    prospects = prospects.filter(p => p.school === school);
    res.json(prospects);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la lecture' });
  }
});

app.listen(PORT, () => {
  console.log(`\n✅ Serveur ISPA/ISBITAGES sur http://localhost:${PORT}`);
  console.log(`📁 Prospects enregistrés dans: ${PROSPECTS_FILE}`);
  console.log(`🌍 Accédez aux 4 pages:\n   - http://localhost:${PORT}/ (ISPA FR)\n   - http://localhost:${PORT}/index-en.html (ISPA EN)\n   - http://localhost:${PORT}/ISBITAGES/ (ISBITAGES FR)\n   - http://localhost:${PORT}/ISBITAGES/index-en.html (ISBITAGES EN)\n`);
});
