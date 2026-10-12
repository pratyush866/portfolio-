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
    const maxParticles = window.innerWidth < 768 ? 16 : 42;
    for (let i = 0; i < count; i++) {
      if (particles.length < maxParticles) { // Cap particles strictly for 60 FPS
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

  let lastTouchEmit = 0;
  window.addEventListener('touchmove', (e) => {
    const now = performance.now();
    if (now - lastTouchEmit > 40 && e.touches.length > 0) {
      lastTouchEmit = now;
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
  // 3. AI EXECUTIVE VOICE ENGINE (Strict Executive Male Speech Synthesis)
  // =======================================================
  const voiceTriggerBtn = document.getElementById('voiceTriggerBtn');
  const voicePlayBtn = document.getElementById('voicePlayBtn');
  const voiceStatusText = document.getElementById('voiceStatusText');
  const voiceCard = document.getElementById('voiceCard');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const voiceBtnText = document.getElementById('voiceBtnText');
  const voiceBadgeText = document.getElementById('voiceBadgeText');
  const voiceWaveIndicator = document.getElementById('voiceWaveIndicator');
  const voiceDialectBtns = document.querySelectorAll('.dialect-pill');

  let isSpeaking = false;
  const synth = window.speechSynthesis;
  let executiveUtterance = null;
  let availableVoices = [];
  let voiceKeepAliveTimer = null;
  let selectedAccent = 'indian'; // 'indian' | 'british' | 'us'

  function loadVoices() {
    if (!synth) return;
    const v = synth.getVoices();
    if (v && v.length > 0) {
      availableVoices = v;
      updateVoiceBadge();
    }
  }
  loadVoices();
  if (synth) {
    synth.onvoiceschanged = () => {
      loadVoices();
    };
  }

  // Refined executive speech: 100% articulate, natural pauses, no abbreviations that stutter
  const executiveSpeechText = 
    "Namaste, and welcome to my official portfolio. " +
    "I am Pratyush Mishra, Founder and Chief Executive Officer of Kisan Market. " +
    "As a software architect and technology entrepreneur from Uttar Pradesh, " +
    "I build transparent digital platforms that empower farmers, families, and local commerce with zero brokerage. " +
    "Thank you for exploring my executive space.";

  // Strict blacklist to filter out ALL female voices across Chrome, Edge, Safari, Android, and Windows
  function isFemaleVoice(voice) {
    if (!voice) return false;
    const name = (voice.name || '').toLowerCase();
    const uri = (voice.voiceURI || '').toLowerCase();
    const combined = name + ' ' + uri;

    const femaleKeywords = [
      'female', 'woman', 'girl', '#female', '-female', 'female_',
      'google us english', // Chrome's default female voice
      'google हिन्दी',   // Chrome's default Hindi female voice
      'google uk english female',
      'google español', 'google français', 'google deutsch',
      'zira', 'heera', 'neerja', 'swara', 'susan', 'hazel', 'catherine',
      'jenny', 'aria', 'eva', 'sara', 'kalpana', 'ananya', 'priya',
      'aditi', 'kavya', 'samantha', 'victoria', 'karen', 'linda',
      'serena', 'yuna', 'ayumi', 'haruka', 'amelie', 'anna', 'helena',
      'laura', 'maria', 'paulina', 'clara', 'elsa', 'fiona', 'moira',
      'tessa', 'veena', 'alice', 'ayanda', 'sabina', 'en-in-x-ahp'
    ];
    return femaleKeywords.some(keyword => combined.includes(keyword));
  }

  // Identify authentic executive male voices by accent
  function getExecutiveMaleVoice(accent = selectedAccent) {
    let voices = availableVoices;
    if (!voices || voices.length === 0) {
      if (synth) voices = synth.getVoices() || [];
    }
    if (!voices || voices.length === 0) return null;

    // Filter out all female voices
    const nonFemale = voices.filter(v => !isFemaleVoice(v));
    const pool = nonFemale.length > 0 ? nonFemale : voices;

    if (accent === 'indian') {
      // 1. Indian English / Hindi Male (Microsoft Ravi, Prabhat, Madhur, Rishi, en-in male)
      const indianMale = pool.find(v => {
        const n = (v.name || '').toLowerCase();
        const l = (v.lang || '').toLowerCase().replace('_', '-');
        const u = (v.voiceURI || '').toLowerCase();
        const isIndian = l.includes('en-in') || l.includes('hi-in') || n.includes('india') || n.includes('hindi');
        const isMaleNamed = n.includes('ravi') || n.includes('prabhat') || n.includes('madhur') || n.includes('rishi') || n.includes('namit') || n.includes('male') || u.includes('#male') || u.includes('-male');
        return isIndian && (isMaleNamed || !isFemaleVoice(v));
      });
      if (indianMale) return indianMale;

      // Fallback for Indian: Google UK English Male or Microsoft David
      const cleanUk = pool.find(v => (v.name || '').toLowerCase().includes('uk english male'));
      if (cleanUk) return cleanUk;

      const cleanDavid = pool.find(v => (v.name || '').toLowerCase().includes('david'));
      if (cleanDavid) return cleanDavid;
    }

    if (accent === 'british') {
      // 2. British English Male (Google UK English Male, Microsoft George, Ryan, Daniel, Oliver)
      const ukMale = pool.find(v => {
        const n = (v.name || '').toLowerCase();
        const l = (v.lang || '').toLowerCase().replace('_', '-');
        const isUk = l.includes('en-gb') || n.includes('uk') || n.includes('united kingdom');
        const isMale = n.includes('male') || n.includes('george') || n.includes('ryan') || n.includes('daniel') || n.includes('oliver') || n.includes('arthur');
        return (isUk && isMale) || n.includes('uk english male');
      });
      if (ukMale) return ukMale;
    }

    if (accent === 'us') {
      // 3. US English Male (Microsoft David, Guy, Mark, Eric, Aaron, Alex)
      const usMale = pool.find(v => {
        const n = (v.name || '').toLowerCase();
        const l = (v.lang || '').toLowerCase().replace('_', '-');
        const isUs = l.includes('en-us') || n.includes('united states');
        const isMale = n.includes('david') || n.includes('guy') || n.includes('mark') || n.includes('eric') || n.includes('aaron') || n.includes('alex') || n.includes('male');
        return isUs && isMale && !isFemaleVoice(v);
      });
      if (usMale) return usMale;
    }

    // General high-priority male search across all English voices
    const generalMale = pool.find(v => {
      const n = (v.name || '').toLowerCase();
      const u = (v.voiceURI || '').toLowerCase();
      return n.includes('uk english male') ||
             n.includes('david') ||
             n.includes('mark') ||
             n.includes('ravi') ||
             n.includes('george') ||
             n.includes('guy') ||
             n.includes('ryan') ||
             n.includes('daniel') ||
             n.includes('rishi') ||
             n.includes('male') ||
             u.includes('#male') ||
             u.includes('-male');
    });
    if (generalMale) return generalMale;

    // Any English voice that is strictly NOT female
    const safeEnglish = pool.find(v => (v.lang || '').toLowerCase().startsWith('en') && !isFemaleVoice(v));
    return safeEnglish || pool[0] || null;
  }

  function updateVoiceBadge() {
    const chosen = getExecutiveMaleVoice(selectedAccent);
    if (voiceBadgeText) {
      if (chosen) {
        let cleanName = chosen.name.replace(/Microsoft |Google |Online \(Natural\)| - English \(United States\)| - English \(India\)| - English \(United Kingdom\)/gi, '').trim();
        if (cleanName.length > 20) cleanName = cleanName.substring(0, 18) + '...';
        voiceBadgeText.textContent = `Executive Male Voice (${cleanName})`;
      } else {
        voiceBadgeText.textContent = 'Executive Male AI Voice';
      }
    }
  }

  // Dialect pill click listeners
  if (voiceDialectBtns && voiceDialectBtns.length > 0) {
    voiceDialectBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        voiceDialectBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedAccent = btn.getAttribute('data-accent') || 'indian';
        
        updateVoiceBadge();
        const chosen = getExecutiveMaleVoice(selectedAccent);
        const nameStr = chosen ? chosen.name.split(' - ')[0] : btn.textContent.trim();
        showToast(`🎙️ Selected ${nameStr} (Executive Male Voice)`);
        
        if (isSpeaking) {
          stopVoiceBriefing();
          setTimeout(() => startVoiceBriefing(), 250);
        }
      });
    });
  }

  function startVoiceBriefing() {
    if (!synth) {
      showToast("Speech synthesis is not supported on this browser.");
      return;
    }

    if (voiceKeepAliveTimer) {
      clearInterval(voiceKeepAliveTimer);
      voiceKeepAliveTimer = null;
    }

    // Stop ongoing speech cleanly
    synth.cancel();

    // Chrome unpause safety
    if (synth.paused) {
      synth.resume();
    }

    // Refresh voices list if not loaded yet
    if (!availableVoices || availableVoices.length === 0) {
      availableVoices = synth.getVoices() || [];
    }

    // 60ms delay ensures Chromium finishes canceling before queueing new utterance
    setTimeout(() => {
      synth.resume();

      executiveUtterance = new SpeechSynthesisUtterance(executiveSpeechText);
      const chosenVoice = getExecutiveMaleVoice(selectedAccent);
      if (chosenVoice) {
        executiveUtterance.voice = chosenVoice;
        executiveUtterance.lang = chosenVoice.lang || 'en-GB';
      } else {
        executiveUtterance.lang = selectedAccent === 'indian' ? 'en-IN' : (selectedAccent === 'us' ? 'en-US' : 'en-GB');
      }

      // Natural resonant masculine pitch (1.0) and articulate executive pacing (0.94)
      executiveUtterance.pitch = 1.0;
      executiveUtterance.rate = 0.94;
      executiveUtterance.volume = 1.0;

      executiveUtterance.onstart = () => {
        isSpeaking = true;
        updateVoiceUI(true);
        const voiceName = chosenVoice ? chosenVoice.name.split(' - ')[0] : 'Executive Male Voice';
        showToast(`🎙️ Playing Founder Statement (${voiceName})...`);

        // Chrome keep-alive safeguard to prevent pause after 10s
        voiceKeepAliveTimer = setInterval(() => {
          if (!synth.speaking) {
            clearInterval(voiceKeepAliveTimer);
          } else {
            synth.pause();
            synth.resume();
          }
        }, 8000);
      };

      executiveUtterance.onend = () => {
        isSpeaking = false;
        if (voiceKeepAliveTimer) clearInterval(voiceKeepAliveTimer);
        updateVoiceUI(false);
      };

      executiveUtterance.onerror = (e) => {
        if (e.error === 'interrupted' || e.error === 'canceled') {
          return; // Ignore normal user interruption
        }
        console.warn("Speech synthesis event:", e);
        isSpeaking = false;
        if (voiceKeepAliveTimer) clearInterval(voiceKeepAliveTimer);
        updateVoiceUI(false);
      };

      try {
        synth.speak(executiveUtterance);
        synth.resume(); // Immediate wake-up poke for Chrome audio engine
      } catch (err) {
        console.error("Synth speak error:", err);
        isSpeaking = false;
        updateVoiceUI(false);
      }
    }, 60);
  }

  function stopVoiceBriefing() {
    if (voiceKeepAliveTimer) {
      clearInterval(voiceKeepAliveTimer);
      voiceKeepAliveTimer = null;
    }
    if (synth) {
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
      if (voiceStatusText) voiceStatusText.textContent = "Executive Male AI Voice speaking clearly...";
      if (voiceTriggerBtn) voiceTriggerBtn.classList.add('playing');
      if (voiceCard) voiceCard.classList.add('speaking');
      if (playIcon) playIcon.classList.add('hidden');
      if (pauseIcon) pauseIcon.classList.remove('hidden');
    } else {
      if (voiceBtnText) voiceBtnText.textContent = "Executive Voice";
      if (voiceStatusText) voiceStatusText.textContent = "Tap play to listen to Founder Pratyush's official statement";
      if (voiceTriggerBtn) voiceTriggerBtn.classList.remove('playing');
      if (voiceCard) voiceCard.classList.remove('speaking');
      if (playIcon) playIcon.classList.remove('hidden');
      if (pauseIcon) pauseIcon.classList.add('hidden');
    }
  }

  if (voiceTriggerBtn) voiceTriggerBtn.addEventListener('click', toggleVoiceBriefing);
  if (voicePlayBtn) voicePlayBtn.addEventListener('click', toggleVoiceBriefing);


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
