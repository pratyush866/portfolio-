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
  // 1. KISAN MARKET GOLDEN-EMERALD BIO-FLAME CURSOR ENGINE
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
  let mouse = { x: width / 2, y: height / 2, moved: false, lastX: width / 2, lastY: height / 2 };

  class KisanBioParticle {
    constructor(x, y, speedMult = 1) {
      this.x = x + (Math.random() - 0.5) * 8;
      this.y = y + (Math.random() - 0.5) * 8;
      
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 2.5 + 0.8) * speedMult;
      this.vx = Math.cos(angle) * speed * 0.7;
      this.vy = Math.sin(angle) * speed * 0.7 - (Math.random() * 2.2 + 1.2); // upward buoyancy
      
      this.size = Math.random() * 14 + 7;
      this.initialSize = this.size;
      this.life = 0;
      this.maxLife = Math.random() * 30 + 22;
      
      // Dual Theme: Golden Harvest Wheat (hue ~42) & Emerald Bio-Glow (hue ~150)
      this.isEmerald = Math.random() > 0.55;
      this.hue = this.isEmerald 
        ? Math.random() * 25 + 140  // 140 to 165 (Emerald / Mint green)
        : Math.random() * 18 + 36;  // 36 to 54 (Golden Wheat / Amber)
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      this.vy -= 0.07;
      this.vx *= 0.98;
      
      this.life++;
      const progress = this.life / this.maxLife;
      this.size = this.initialSize * (1 - progress);
      
      return this.life < this.maxLife && this.size > 0.4;
    }

    draw() {
      const progress = this.life / this.maxLife;
      const alpha = Math.max(0, 1 - progress);
      
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      
      const radGrad = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, Math.max(0.1, this.size)
      );
      
      if (this.isEmerald) {
        radGrad.addColorStop(0, `hsla(${this.hue}, 100%, 95%, ${alpha})`);
        radGrad.addColorStop(0.35, `hsla(${this.hue}, 90%, 65%, ${alpha * 0.9})`);
        radGrad.addColorStop(0.75, `hsla(${this.hue - 15}, 100%, 45%, ${alpha * 0.5})`);
        radGrad.addColorStop(1, `hsla(160, 100%, 20%, 0)`);
      } else {
        radGrad.addColorStop(0, `hsla(${this.hue + 10}, 100%, 96%, ${alpha})`);
        radGrad.addColorStop(0.35, `hsla(${this.hue}, 100%, 65%, ${alpha * 0.9})`);
        radGrad.addColorStop(0.75, `hsla(${this.hue - 15}, 100%, 45%, ${alpha * 0.5})`);
        radGrad.addColorStop(1, `hsla(30, 100%, 20%, 0)`);
      }
      
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(0.1, this.size * 1.5), 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }
  }

  function createBioEmbers(x, y, count = 4) {
    for (let i = 0; i < count; i++) {
      particles.push(new KisanBioParticle(x, y));
    }
  }

  window.addEventListener('mousemove', (e) => {
    mouse.moved = true;
    const dx = e.clientX - mouse.lastX;
    const dy = e.clientY - mouse.lastY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    const count = Math.min(10, Math.max(2, Math.floor(dist / 6)));
    createBioEmbers(e.clientX, e.clientY, count);
    
    mouse.lastX = e.clientX;
    mouse.lastY = e.clientY;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      createBioEmbers(e.touches[0].clientX, e.touches[0].clientY, 4);
    }
  }, { passive: true });

  function renderBioFire() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const alive = particles[i].update();
      if (alive) {
        particles[i].draw();
      } else {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(renderBioFire);
  }
  renderBioFire();


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
  // 3. AI EXECUTIVE VOICE BRIEFING ENGINE (Web Speech API)
  // =======================================================
  const voiceTriggerBtn = document.getElementById('voiceTriggerBtn');
  const voicePlayBtn = document.getElementById('voicePlayBtn');
  const voiceBtnText = document.getElementById('voiceBtnText');
  const voiceStatusText = document.getElementById('voiceStatusText');
  const voiceCard = document.getElementById('voiceCard');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');

  let isSpeaking = false;
  let synth = window.speechSynthesis;
  let executiveUtterance = null;

  const executiveSpeechText = 
    "Greetings. I am Pratyush Mishra, Founder and Chief Executive Officer of Kisan Market. " +
    "We are transforming Indian agriculture through a zero-brokerage digital commodity exchange, " +
    "integrated with Sarvam AI vernacular voice assistance to empower rural farmers across Bharat. " +
    "Welcome to my official executive space.";

  function getExecutiveVoice() {
    if (!synth) return null;
    const voices = synth.getVoices();
    const preferredVoices = voices.filter(v => 
      v.lang.includes('en-IN') || 
      v.name.includes('Natural') || 
      v.name.includes('Google UK English Male') || 
      v.name.includes('David') || 
      v.name.includes('George') ||
      v.lang.startsWith('en')
    );
    return preferredVoices[0] || voices[0] || null;
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

    executiveUtterance.rate = 0.95;
    executiveUtterance.pitch = 1.0;
    executiveUtterance.volume = 1.0;

    executiveUtterance.onstart = () => {
      isSpeaking = true;
      updateVoiceUI(true);
      showToast("🎙️ Playing Kisan Market Founder Statement...");
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


  // =======================================================
  // 7. 3D GYROSCOPE TILT ON FOUNDER CARD
  // =======================================================
  const profileCard = document.getElementById('profileCard');
  if (profileCard && window.innerWidth > 992) {
    profileCard.addEventListener('mousemove', (e) => {
      const rect = profileCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -14;
      const rotateY = ((x - centerX) / centerX) * 14;

      profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    profileCard.addEventListener('mouseleave', () => {
      profileCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
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
