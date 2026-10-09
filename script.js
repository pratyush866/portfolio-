// =========================================================
// PRATYUSH MISHRA - EXECUTIVE FOUNDER PORTFOLIO ENGINE
// KISAN MARKET THEME:
// 1. Golden Harvest & Emerald Bio-Flame Cursor Engine (Canvas)
// 2. Interactive Photo Switcher (Formal Executive <-> Founder & CEO Mode)
// 3. AI Executive Voice Engine (Web Speech API)
// 4. 3D Tilt, Typewriter, Filters, Counters
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // =======================================================
  // 1. LIGHTWEIGHT SUBTLE FIRE EMBER CURSOR ENGINE ("Halka Fire")
  // =======================================================
  const canvas = document.getElementById('fireTrailCanvas');
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  let mouse = { x: width / 2, y: height / 2, lastX: width / 2, lastY: height / 2 };

  // Delicate, authentic flame spark ember (Warm gold, amber, fire orange)
  const flameColors = [
    '#f59e0b', // Gold / Amber
    '#fbbf24', // Warm Flame
    '#f97316', // Orange Fire
    '#ef4444'  // Deep Ember
  ];

  class FlameSparkParticle {
    constructor(x, y) {
      this.x = x + (Math.random() - 0.5) * 6;
      this.y = y + (Math.random() - 0.5) * 6;
      
      this.vx = (Math.random() - 0.5) * 0.9;
      this.vy = -(Math.random() * 1.5 + 0.6); // Soft buoyant upward rise
      
      this.size = Math.random() * 2.8 + 1.6; // Small, delicate spark (2-4px)
      this.initialSize = this.size;
      this.life = 0;
      this.maxLife = Math.random() * 22 + 16; // Quick, graceful fade
      this.color = flameColors[Math.floor(Math.random() * flameColors.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy -= 0.02; // gentle float
      this.vx *= 0.96;
      
      this.life++;
      const progress = this.life / this.maxLife;
      this.size = this.initialSize * (1 - progress);
      
      return this.life < this.maxLife && this.size > 0.2;
    }

    draw() {
      const progress = this.life / this.maxLife;
      const alpha = Math.max(0, 1 - progress);
      
      ctx.save();
      ctx.globalAlpha = alpha * 0.85;
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function emitFlameSpark(x, y, count = 1) {
    for (let i = 0; i < count; i++) {
      if (particles.length < 45) { // Cap particles strictly for 60 FPS
        particles.push(new FlameSparkParticle(x, y));
      }
    }
  }

  // Smooth, throttled mouse tracking (Gentle fire trail, never laggy)
  window.addEventListener('mousemove', (e) => {
    const dx = e.clientX - mouse.lastX;
    const dy = e.clientY - mouse.lastY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist > 8) { // Only emit when mouse actually moves
      emitFlameSpark(e.clientX, e.clientY, 1);
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;
    }
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      emitFlameSpark(e.touches[0].clientX, e.touches[0].clientY, 1);
    }
  }, { passive: true });

  function renderFlameCursor() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const alive = particles[i].update();
      if (alive) {
        particles[i].draw();
      } else {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(renderFlameCursor);
  }
  renderFlameCursor();


  // =======================================================
  // 2. INTERACTIVE DUAL PHOTO SWITCHER
  // (Formal Executive <---> Founder & CEO Mode)
  // =======================================================
  const photo1 = document.getElementById('photo1');
  const photo2 = document.getElementById('photo2');
  const profileBorder = document.getElementById('profileBorder');
  const btnModeFormal = document.getElementById('btnModeFormal');
  const btnModeFounder = document.getElementById('btnModeFounder');
  const tagLookText = document.getElementById('tagLookText');
  const switchPromptText = document.getElementById('switchPromptText');

  let currentPhotoIndex = 0; // 0 = Formal, 1 = Founder

  function switchPhoto(index) {
    currentPhotoIndex = index;

    if (currentPhotoIndex === 0) {
      photo1.classList.add('active');
      photo2.classList.remove('active');
      btnModeFormal.classList.add('active');
      btnModeFounder.classList.remove('active');
      if (tagLookText) tagLookText.textContent = "PRATYUSH MISHRA — FORMAL EXECUTIVE";
      if (switchPromptText) switchPromptText.textContent = "Click photo for Founder Mode ⚡";
      showToast("👔 Switched to Formal Executive Look");
    } else {
      photo1.classList.remove('active');
      photo2.classList.add('active');
      btnModeFormal.classList.remove('active');
      btnModeFounder.classList.add('active');
      if (tagLookText) tagLookText.textContent = "PRATYUSH MISHRA — FOUNDER & CEO ⚡";
      if (switchPromptText) switchPromptText.textContent = "Click photo for Formal Look 👔";
      showToast("⚡ Switched to Founder & CEO Mode!");
    }
  }

  // Toggle on click of the profile image card
  if (profileBorder) {
    profileBorder.addEventListener('click', () => {
      const nextIndex = currentPhotoIndex === 0 ? 1 : 0;
      switchPhoto(nextIndex);
    });
  }

  // Specific selector buttons
  if (btnModeFormal) {
    btnModeFormal.addEventListener('click', (e) => {
      e.stopPropagation();
      switchPhoto(0);
    });
  }

  if (btnModeFounder) {
    btnModeFounder.addEventListener('click', (e) => {
      e.stopPropagation();
      switchPhoto(1);
    });
  }


  // =======================================================
  // 3. AI EXECUTIVE VOICE ENGINE (Indian English Speech Synthesis)
  // =======================================================
  const voiceTriggerBtn = document.getElementById('voiceTriggerBtn');
  const voicePlayBtn = document.getElementById('voicePlayBtn');
  const voiceStatusText = document.getElementById('voiceStatusText');
  const voiceCard = document.getElementById('voiceCard');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');

  let isSpeaking = false;
  let synth = window.speechSynthesis;
  let executiveUtterance = null;
  let availableVoices = [];

  function loadVoices() {
    if (!synth) return;
    availableVoices = synth.getVoices() || [];
  }
  loadVoices();
  if (synth && synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadVoices;
  }

  const executiveSpeechText = 
    "Namaste and welcome. I am Pratyush Mishra, Founder and Chief Executive Officer of Kisan Market, based in Khalilabad, Sant Kabir Nagar. " +
    "I architect sovereign technology platforms including Kisan Market, Shaadi Ram Ghar Jode, and Travel Market — empowering farmers, families, and drivers across India through transparent zero brokerage digital trade. " +
    "Thank you for visiting my official portfolio.";

  function getExecutiveVoice() {
    if (!availableVoices || availableVoices.length === 0) {
      loadVoices();
    }
    const voices = availableVoices;
    if (!voices || voices.length === 0) return null;

    // Priority 1: Indian English (en-IN)
    const indianEnglish = voices.find(v => {
      const lang = (v.lang || '').toLowerCase().replace('_', '-');
      const name = (v.name || '').toLowerCase();
      return lang === 'en-in' || name.includes('india') || name.includes('ravi') || name.includes('heera') || name.includes('neerja');
    });
    if (indianEnglish) return indianEnglish;

    // Priority 2: Natural or UK English
    const naturalVoice = voices.find(v => {
      const name = (v.name || '').toLowerCase();
      return name.includes('natural') || name.includes('google uk english male');
    });
    if (naturalVoice) return naturalVoice;

    // Priority 3: Any English
    const anyEnglish = voices.find(v => (v.lang || '').toLowerCase().startsWith('en'));
    return anyEnglish || voices[0] || null;
  }

  function startVoiceBriefing() {
    if (!synth) {
      showToast("Speech synthesis is not supported on this browser.");
      return;
    }

    if (synth.speaking) {
      synth.cancel();
    }

    executiveUtterance = new SpeechSynthesisUtterance(executiveSpeechText);
    const chosenVoice = getExecutiveVoice();
    if (chosenVoice) {
      executiveUtterance.voice = chosenVoice;
    }

    executiveUtterance.rate = 0.92;   // Natural, calm executive pacing
    executiveUtterance.pitch = 1.02;  // Natural tone
    executiveUtterance.volume = 1.0;

    executiveUtterance.onstart = () => {
      isSpeaking = true;
      updateVoiceUI(true);
      showToast("🎙️ Playing Founder Statement (Indian English)...");
    };

    executiveUtterance.onend = () => {
      isSpeaking = false;
      updateVoiceUI(false);
    };

    executiveUtterance.onerror = () => {
      isSpeaking = false;
      updateVoiceUI(false);
    };

    synth.speak(executiveUtterance);
  }

  function stopVoiceBriefing() {
    if (synth && synth.speaking) {
      synth.cancel();
    }
    isSpeaking = false;
    updateVoiceUI(false);
  }

  function toggleVoiceBriefing() {
    if (isSpeaking) {
      stopVoiceBriefing();
    } else {
      startVoiceBriefing();
    }
  }

  function updateVoiceUI(speaking) {
    if (speaking) {
      if (voiceBtnText) voiceBtnText.textContent = "Briefing Active...";
      if (voiceStatusText) voiceStatusText.textContent = "AI Executive voice active — Speaking now...";
      if (voiceTriggerBtn) voiceTriggerBtn.classList.add('playing');
      if (voiceCard) voiceCard.classList.add('speaking');
      if (playIcon) playIcon.classList.add('hidden');
      if (pauseIcon) pauseIcon.classList.remove('hidden');
    } else {
      if (voiceBtnText) voiceBtnText.textContent = "Executive Voice";
      if (voiceStatusText) voiceStatusText.textContent = "Tap play to listen to Founder Pratyush's mission statement";
      if (voiceTriggerBtn) voiceTriggerBtn.classList.remove('playing');
      if (voiceCard) voiceCard.classList.remove('speaking');
      if (playIcon) playIcon.classList.remove('hidden');
      if (pauseIcon) pauseIcon.classList.add('hidden');
    }
  }

  if (voiceTriggerBtn) voiceTriggerBtn.addEventListener('click', toggleVoiceBriefing);
  if (voicePlayBtn) voicePlayBtn.addEventListener('click', toggleVoiceBriefing);

  if (synth && synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getExecutiveVoice;
  }


  // =======================================================
  // 4. TYPEWRITER EFFECT
  // =======================================================
  const phrases = [
    "Founder & CEO — Kisan Market (किसान मार्केट)",
    "Democratizing Bharat's Agriculture at 0% Commission",
    "High-Performance Next.js 14 & Python FastAPI Systems",
    "Sarvam AI Vernacular Voice Technology",
    "Grassroots Innovations Scaling Nationwide"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterEl = document.getElementById('typewriter');
  const typingDelay = 80;
  const deletingDelay = 40;
  const pauseEnd = 2200;

  function typeWriter() {
    if (!typewriterEl) return;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingDelay : typingDelay;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(typeWriter, delay);
  }
  typeWriter();


  // =======================================================
  // 5. NAVBAR SCROLL & SCROLLSPY
  // =======================================================
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 130;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });


  // =======================================================
  // 6. MOBILE MENU TOGGLE
  // =======================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('open');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('open');
      });
    });
  }


  // 7. ROCK-SOLID STATIC FOUNDER CARD (No Disorienting Tilt or Spin)
  const profileCard = document.getElementById('profileCard');
  if (profileCard) {
    profileCard.style.transform = 'none'; // Keep rock solid and stable
  }

  // Back to Top smooth scroll
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // =======================================================
  // 8. PROJECT / VENTURE FILTER
  // =======================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'block';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // =======================================================
  // 8.5. VERIFIED CERTIFICATE VAULT FILTER (Interactive Categories)
  // =======================================================
  const certFilterBtns = document.querySelectorAll('.cert-filter-btn');
  const certCards = document.querySelectorAll('.certificates-grid .cert-card:not(.add-cert-card)');

  certFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      certFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      certCards.forEach((card) => {
        const cat = card.getAttribute('data-category') || '';
        if (filterVal === 'all' || cat.includes(filterVal)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // =======================================================
  // 9. STAT COUNTER ANIMATION
  // =======================================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let counted = false;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        statNumbers.forEach((stat) => {
          const target = +stat.getAttribute('data-target');
          let current = 0;
          const increment = Math.ceil(target / 40);
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              stat.textContent = target;
              clearInterval(interval);
            } else {
              stat.textContent = current;
            }
          }, 35);
        });
      }
    });
  }, { threshold: 0.5 });

  const statBar = document.querySelector('.stat-bar');
  if (statBar) {
    countObserver.observe(statBar);
  }


  // =======================================================
  // 10. TOAST NOTIFICATION
  // =======================================================
  const toast = document.getElementById('toast');
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }


  // =======================================================
  // 11. EXECUTIVE CONTACT FORM
  // =======================================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName').value;
      const email = document.getElementById('senderEmail').value;
      const subject = document.getElementById('senderSubject').value;
      const message = document.getElementById('senderMessage').value;

      const mailtoUrl = `mailto:pratyushm866@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Executive Transmission to Pratyush Mishra (Founder & CEO, Kisan Market):\n\nSender: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      window.location.href = mailtoUrl;

      showToast(`Transmitting executive message to pratyushm866@gmail.com...`);
      contactForm.reset();
    });
  }

});

// Global Certificate Lightbox Functions
window.openCertModal = function(imageSrc, title) {
  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('certModalImg');
  const modalTitle = document.getElementById('certModalTitle');

  if (modal && modalImg) {
    modalImg.src = imageSrc;
    if (modalTitle) modalTitle.textContent = title;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeCertModal = function() {
  const modal = document.getElementById('certModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closeCertModal();
  }
});
