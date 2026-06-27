// Configuration multilingue des formulaires
const FORM_CONFIG = {
  whatsapp: {
    phone: '15559707710', // Numéro WhatsApp unique
    baseUrl: 'https://wa.me'
  },

  // Traductions et messages par école et langue
  schools: {
    ispa: {
      fr: {
        title: 'ISPA — Parlons de votre avenir',
        subtitle: 'Remplissez ce formulaire pour que nous vous guidions vers la filière idéale',
        labels: {
          nom: 'Votre nom complet',
          telephone: 'Votre numéro WhatsApp',
          filiere: 'Filière souhaitée',
          conseillerNeeded: 'J\'ai besoin d\'un conseiller pour m\'aider à choisir',
          submit: 'Continuer sur WhatsApp',
          loading: 'Envoi en cours...'
        },
        filieres: [
          'Génie Civil',
          'Génie Informatique',
          'Électronique & Télécommunications',
          'Génie Électrique',
          'Technologie Marine',
          'Énergie Renouvelable',
          'Gestion d\'Entreprise',
          'Comptabilité & Finance',
          'Hôtellerie & Tourisme',
          'Agriculture',
          'Santé Publique',
          'Autre (préciser avec le conseiller)'
        ],
        validation: {
          nom: 'Le nom est requis',
          telephone: 'Le numéro doit contenir au moins 8 chiffres',
          filiere: 'Veuillez sélectionner ou entrer une filière'
        },
        whatsappMessage: (data) => `Bonjour, je m'appelle ${data.nom}. Mon numéro: ${data.telephone}. ${data.conseillerNeeded ? 'J\'aimerais une aide pour choisir ma filière.' : `Je suis intéressé par: ${data.filiere}`}`
      },
      en: {
        title: 'ISPA — Let\'s Talk About Your Future',
        subtitle: 'Fill out this form and we\'ll guide you to the perfect program',
        labels: {
          nom: 'Full name',
          telephone: 'Your WhatsApp number',
          filiere: 'Desired program',
          conseillerNeeded: 'I need help choosing my program',
          submit: 'Continue on WhatsApp',
          loading: 'Sending...'
        },
        filieres: [
          'Civil Engineering',
          'Computer Engineering',
          'Electronics & Telecommunications',
          'Electrical Engineering',
          'Marine Technology',
          'Renewable Energy',
          'Business Management',
          'Accounting & Finance',
          'Hospitality & Tourism',
          'Agriculture',
          'Public Health',
          'Other (specify with advisor)'
        ],
        validation: {
          nom: 'Name is required',
          telephone: 'Phone must have at least 8 digits',
          filiere: 'Please select or enter a program'
        },
        whatsappMessage: (data) => `Hello, my name is ${data.nom}. My number: ${data.telephone}. ${data.conseillerNeeded ? 'I would like help choosing my program.' : `I\'m interested in: ${data.filiere}`}`
      }
    },
    isbitages: {
      fr: {
        title: 'ISBITAGES — Choisissez votre formation pratique',
        subtitle: 'Remplissez ce formulaire pour débuter votre parcours professionnel',
        labels: {
          nom: 'Votre nom complet',
          telephone: 'Votre numéro WhatsApp',
          filiere: 'Formation souhaitée',
          conseillerNeeded: 'Je souhaite être conseillé sur les formations disponibles',
          submit: 'Poursuivre sur WhatsApp',
          loading: 'Traitement en cours...'
        },
        filieres: [
          'Mécanique Automobile',
          'Électricité Bâtiment',
          'Plomberie & Sanitaire',
          'Maçonnerie & Gros Œuvre',
          'Menuiserie & Charpente',
          'Soudure & Métallurgie',
          'Coiffure & Beauté',
          'Cuisine & Restauration',
          'Couture & Confection',
          'Électronique Appliquée',
          'Installation Climatique',
          'Autre (à discuter avec le conseiller)'
        ],
        validation: {
          nom: 'Le nom est requis',
          telephone: 'Le numéro doit contenir au moins 8 chiffres',
          filiere: 'Veuillez sélectionner ou entrer une formation'
        },
        whatsappMessage: (data) => `Bonjour, je m'appelle ${data.nom}. Mon numéro: ${data.telephone}. ${data.conseillerNeeded ? 'Je souhaite en savoir plus sur les formations disponibles.' : `Je suis intéressé par: ${data.filiere}`}`
      },
      en: {
        title: 'ISBITAGES — Choose Your Practical Training',
        subtitle: 'Fill out this form to start your professional journey',
        labels: {
          nom: 'Full name',
          telephone: 'Your WhatsApp number',
          filiere: 'Desired training',
          conseillerNeeded: 'I want information about available trainings',
          submit: 'Continue on WhatsApp',
          loading: 'Processing...'
        },
        filieres: [
          'Automotive Mechanics',
          'Building Electricity',
          'Plumbing & Sanitation',
          'Masonry & Structure',
          'Carpentry & Framing',
          'Welding & Metallurgy',
          'Hairdressing & Beauty',
          'Cooking & Catering',
          'Sewing & Tailoring',
          'Applied Electronics',
          'Air Conditioning Installation',
          'Other (discuss with advisor)'
        ],
        validation: {
          nom: 'Name is required',
          telephone: 'Phone must have at least 8 digits',
          filiere: 'Please select or enter a training'
        },
        whatsappMessage: (data) => `Hello, my name is ${data.nom}. My phone: ${data.telephone}. ${data.conseillerNeeded ? 'I\'d like to learn more about available trainings.' : `I\'m interested in: ${data.filiere}`}`
      }
    }
  }
};
