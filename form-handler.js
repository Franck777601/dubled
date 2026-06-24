// Form Handler - Advanced version with multi-language & school support
(function() {
  const API_URL = 'https://dubled.onrender.com';
  const WHATSAPP_PHONE = '237677688000';

  // Translations
  const translations = {
    fr: {
      errorRequired: 'Veuillez remplir tous les champs obligatoires',
      errorConnection: 'Erreur de connexion. Assurez-vous que le serveur est lancé.\nPour tester: npm install && npm start',
      successTitle: (name) => `✅ Merci ${name}!`,
      successRedirect: 'Vous allez être redirigé vers WhatsApp...',
      consoleConfirm: (id, name) => `Prospect enregistré: ID ${id} - ${name}`,
    },
    en: {
      errorRequired: 'Please fill in all required fields',
      errorConnection: 'Connection error. Make sure the server is running.\nTo test: npm install && npm start',
      successTitle: (name) => `✅ Thank you ${name}!`,
      successRedirect: 'You will be redirected to WhatsApp...',
      consoleConfirm: (id, name) => `Prospect registered: ID ${id} - ${name}`,
    }
  };

  // Get translations for current form
  function getTrans(lang) {
    return translations[lang] || translations.fr;
  }

  function validateWhatsAppPhone(phone) {
    const normalized = phone.replace(/[^+\d]/g, '');
    const digits = normalized.replace(/\D/g, '');
    return digits.length >= 8 && digits.length <= 15 && /^\+?\d+$/.test(normalized);
  }

  // Find form modal
  function findFormModal() {
    return document.getElementById('formModal');
  }

  // Open form modal
  function openFormModal(school, lang) {
    const modal = findFormModal();
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      document.getElementById('nom')?.focus();
    }
  }

  // Close form modal
  function closeFormModal() {
    const modal = findFormModal();
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      const form = document.getElementById('prospectForm');
      if (form) form.reset();
    }
  }

  // Setup form links (on page load)
  document.addEventListener('DOMContentLoaded', () => {
    // Find all form trigger links
    const formLinks = document.querySelectorAll('[data-form-link="true"]');

    formLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const school = link.getAttribute('data-school') || 'ispa';
        const lang = link.getAttribute('data-lang') || 'fr';
        openFormModal(school, lang);
      });
    });

    // Find modal & setup close button
    const modal = findFormModal();
    if (modal) {
      const closeBtn = modal.querySelector('.form-modal-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', closeFormModal);
      }

      // Close on overlay click
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeFormModal();
        }
      });

      // Get form data attributes
      const school = modal.getAttribute('data-school') || 'ispa';
      const lang = modal.getAttribute('data-lang') || 'fr';

      // Setup form submission
      const form = modal.querySelector('#prospectForm');
      if (form) {
        form.addEventListener('submit', (e) => handleFormSubmit(e, school, lang));
      }
    }
  });

  // Handle form submission
  async function handleFormSubmit(e, school, lang) {
    e.preventDefault();

    const nom = document.getElementById('nom').value.trim();
    const telephone = document.getElementById('telephone').value.trim();
    const filiere = document.getElementById('filiere').value;
    const conseillerNeeded = document.getElementById('conseiller-needed').checked;

    const trans = getTrans(lang);

    if (!nom || !telephone) {
      alert(trans.errorRequired);
      return;
    }

    if (!validateWhatsAppPhone(telephone)) {
      alert(lang === 'fr' ? 'Veuillez saisir un numéro WhatsApp valide (avec indicatif international si possible).' : 'Please enter a valid WhatsApp number (include country code if possible).');
      return;
    }

    const submitBtn = e.target.querySelector('.btn-submit');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = lang === 'fr' ? 'Envoi...' : 'Sending...';
    }

    try {
      // Send to server
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom,
          telephone,
          filiere: filiere || '',
          conseillerNeeded,
          school: school,
          lang: lang,
          source: 'form'
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log(trans.consoleConfirm(data.id, nom));

      alert(`${trans.successTitle(nom)}\nID: ${data.id}\n${trans.successRedirect}`);
closeFormModal();

// Déclencher l'événement Lead Facebook Pixel
if (typeof fbq === 'function') {
  fbq('track', 'Lead', {
    content_name: school,
    content_category: filiere || 'non précisée',
    content_category2: lang
  });
}

// Redirect to WhatsApp using direct navigation to avoid popup blockers
window.location.href = data.whatsappLink;

      } else {
        alert('Erreur: ' + (data.error || 'Une erreur est survenue'));
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = lang === 'fr' ? 'Continuer sur WhatsApp →' : 'Continue on WhatsApp →';
        }
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert(trans.errorConnection);

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = lang === 'fr' ? 'Continuer sur WhatsApp →' : 'Continue on WhatsApp →';
      }
    }
  }

  // Animation sparkle on button click (if not form link)
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-whatsapp')) {
      if (e.target.getAttribute('data-form-link') !== 'true') {
        // Add sparkle animation for non-form buttons
        for (let i = 0; i < 6; i++) {
          const s = document.createElement('span');
          s.className = 'spark';
          const rect = e.target.getBoundingClientRect();
          const x = Math.random() * rect.width;
          const y = Math.random() * 20;
          s.style.left = x + 'px';
          s.style.top = (rect.height / 2 + (Math.random() * 20 - 10)) + 'px';
          e.target.appendChild(s);

          (function(sp) {
            setTimeout(function() {
              sp.classList.add('animate');
              setTimeout(function() { sp.remove(); }, 900);
            }, Math.random() * 120);
          })(s);
        }
      }
    }
  });
})();
