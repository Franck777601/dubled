// Petit helper pour appliquer facilement le numéro WhatsApp sans modifier plusieurs liens.
(function(){
  // Centralise le numéro WhatsApp. Définir window.ISPA_PHONE = '15559707710' avant ce script pour remplacer le placeholder.
  var phone = (window.ISPA_PHONE && String(window.ISPA_PHONE).replace(/\D/g,'')) || '15559707710';
  var text = (window.ISPA_DEFAULT_MESSAGE && String(window.ISPA_DEFAULT_MESSAGE)) || 'Bonjour je souhaite être conseillé sur les formations ISPA';
  var encoded = encodeURIComponent(text);
  document.querySelectorAll('a[href*="wa.me"]').forEach(function(a){
    a.href = 'https://wa.me/' + phone + '?text=' + encoded;
  });

  // Subtle hero parallax for the hero image
  var heroImg = document.querySelector('.hero-img');
  if(heroImg){
    var raf;
    window.addEventListener('scroll', function(){
      if(raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function(){
        var sc = window.scrollY || window.pageYOffset;
        var t = Math.max(0, Math.min(1, sc / 600));
        heroImg.style.transform = 'translateY(' + (t * -18) + 'px) scale(' + (1 + t*0.02) + ')';
      });
    });
  }

  // Count-up animation for hero stats
  function animateCounts(){
    var els = document.querySelectorAll('.count');
    els.forEach(function(el){
      var target = +el.getAttribute('data-target') || 0;
      var cur = 0;
      var step = Math.max(1, Math.floor(target / 40));
      var int = setInterval(function(){
        cur += step;
        if(cur >= target){
          el.textContent = target;
          clearInterval(int);
        } else {
          el.textContent = cur;
        }
      }, 18);
    });
  }

  // Trigger counts when hero is visible
  var hero = document.getElementById('hero');
  if(hero){
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ animateCounts(); obs.disconnect(); }
      });
    },{threshold:0.4});
    obs.observe(hero);
  }

  // Simple testimonials rotator
  (function(){
    var container = document.querySelector('.testimonials');
    if(!container) return;
    var quotes = Array.from(container.querySelectorAll('blockquote'));
    var idx = 0;
    quotes.forEach(function(q,i){ if(i!==0) q.style.display='none'; });
    setInterval(function(){
      quotes[idx].style.opacity=0; quotes[idx].style.transition='opacity .35s';
      setTimeout(function(){ quotes[idx].style.display='none'; idx=(idx+1)%quotes.length; quotes[idx].style.display='block'; quotes[idx].style.opacity=1; },360);
    },4500);
  })();

  // CTA sparkle on click
  document.querySelectorAll('.btn-whatsapp').forEach(function(btn){
    btn.addEventListener('click', function(e){
      for(var i=0;i<6;i++){
        var s = document.createElement('span'); s.className='spark';
        var rect = btn.getBoundingClientRect();
        var x = Math.random()*rect.width; var y = Math.random()*20; s.style.left = x+'px'; s.style.top = (rect.height/2 + (Math.random()*20-10))+'px';
        btn.appendChild(s);
        // delay to allow layout
        (function(sp){ setTimeout(function(){ sp.classList.add('animate'); setTimeout(function(){ sp.remove(); },900); }, Math.random()*120); })(s);
      }
    });
  });
})();
