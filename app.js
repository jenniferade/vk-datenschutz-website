document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. CONFIGURATION DATA
  // ==========================================

  const personas = {
    a: { name: "Anna", age: "19", location: "Berlin", relationship: "Single", lastVisit: "instagram.com", image: "/1_a.png", interests: "Fashion, Lifestyle" },
    b: { name: "Ben", age: "21", location: "Hamburg", relationship: "Vergeben", lastVisit: "twitch.tv", image: "/1_b.png", interests: "Gaming, Tech" },
    c: { name: "Clara", age: "18", location: "München", relationship: "Kompliziert", lastVisit: "tiktok.com", image: "/1_c.png", interests: "Musik, Kunst" },
    fallback: { name: "Anna", age: "19", location: "Berlin", relationship: "Single", lastVisit: "instagram.com", image: "/1_a.png", interests: "Fashion, Lifestyle" }
  };

  const flashcardsData = [
    { label: "FAKT 1:", title: "SIE WISSEN,<br>WO DU WARST", desc: "Bewegungsdaten via GPS und WLAN." },
    { label: "FAKT 2:", title: "SIE WISSEN, WAS<br>DICH INTERESSIERT", desc: "Psychologische Profile durch Klicks." },
    { label: "FAKT 3:", title: "SIE WISSEN,<br>WANN DU WACH BIST", desc: "Schlafrhythmus anhand der Nutzung." },
    { label: "FAKT 4:", title: "SIE WISSEN,<br>WONACH DU SUCHST", desc: "Suchmaschinen protokollieren alles." },
    { label: "FAKT 5:", title: "SIE KENNEN<br>DEINE FREUNDE", desc: "Kontaktlisten und Interaktionen." },
    { label: "FAKT 6:", title: "SIE WISSEN,<br>WIE DU FÜHLST", desc: "Stimmungsanalyse durch Algorithmen." }
  ];

  const tinderStackData = [
    { title: "Dynamic Pricing & Nudging", desc: "Unternehmen passen Preise an dein Kaufverhalten an. Du bezahlst mehr, wenn du dringend buchen musst." },
    { title: "Filterblasen & Manipulation", desc: "Algorithmen zeigen dir nur Inhalte, die deine Meinung verstärken. Das beeinflusst dein Denken." },
    { title: "Du bekommst eine<br>digitale Version von dir", desc: "Aus Daten entsteht ein Profil.<br>Dieses Profil entscheidet mit,<br>was du online siehst" }
  ];

  const quizData = [
    {
      question: "Wie oft überprüfst du die Datenschutz-Einstellungen deiner Apps?",
      options: ["Regelmäßig", "Manchmal", "Selten", "Nie"]
    },
    {
      question: "Wie viele SM-Plattformen nutzt du aktiv?",
      options: ["1-2", "3-4", "5-6", "Mehr als 6"]
    },
    {
      question: "Hast du schon einmal einer App Zugriff auf deinen Standort erlaubt?",
      options: ["Nur wenn es unbedingt nötig ist", "Ja, einigen Apps", "Ja, den meisten Apps", "Ich überprüfe garnicht"]
    },
    {
      question: "Wie häufig akzeptierst du Cookies auf Websiten, ohne die Einstellung anzupassen?",
      options: ["Fast nie", "Manchmal", "Oft", "Immer"]
    },
    {
      question: "Ist dein Social-Media-Profil öffentlich sichtbar?",
      options: ["Nein", "Teilweise", "Ja", "Ich weiß es nicht"]
    },
    {
      question: "Verwendest du für verschiedene Konten unterschiedliche Passwörter?",
      options: ["Immer", "Meistens", "Selten", "Nein"]
    },
    {
      question: "Wie oft postest du Fotos oder Stories von deinem aktuellen Aufenthaltsort?",
      options: ["Nie", "Selten", "Regelmäßig", "Sehr häufig"]
    }
  ];

  const quizResults = {
    0: { title: "Datenschutz-Profi", desc: "Du achtest bewusst auf deine Privatsphäre und gibst nur wenige Informationen preis. Unternehmen können zwar trotzdem Daten über dich sammeln, aber du erschwerst dies deutlich." },
    1: { title: "Aufmerksam, aber ausbaufähig", desc: "Du kennst die Risiken und schützt dich teilweise. Mit einigen Anpassungen deiner Einstellungen könntest du deine Daten deutlich besser schützen." },
    2: { title: "Digital sichtbar", desc: "Viele deiner Daten sind für Plattformen und Werbenetzwerke leicht zugänglich. Du hinterlässt zahlreiche digitale Spuren, oft ohne es zu merken." },
    3: { title: "Digitale Katastrophe", desc: "Dein digitales Verhalten macht es Unternehmen besonders einfach, Informationen über dich zu sammeln. Es lohnt sich, deine Privatsphäre-Einstellungen zu überprüfen." }
  };

  // ==========================================
  // 2. PARSE URL & INIT PERSONA
  // ==========================================

  const urlParams = new URLSearchParams(window.location.search);
  const personParam = urlParams.get('person')?.toLowerCase();
  const activePersona = personas[personParam] || personas.fallback;

  const profileImg = document.getElementById('profile-img');
  if (profileImg) {
    profileImg.src = activePersona.image;
    profileImg.onerror = () => profileImg.src = '/1.png';
  }

  // ==========================================
  // 3. LOADING SCREEN (Exact 3 Seconds)
  // ==========================================

  const scrollContainer = document.getElementById('scroll-container');
  if (scrollContainer) scrollContainer.style.overflowY = 'hidden';

  const loadingBarFill = document.getElementById('loading-bar-fill');
  const loadingOverlay = document.getElementById('loading-overlay');

  let progress = 0;
  const duration = 2000;
  const intervalTime = 30; // ms
  const step = 100 / (duration / intervalTime);

  const loadingInterval = setInterval(() => {
    progress += step;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);

      setTimeout(() => {
        if (loadingOverlay) {
          loadingOverlay.style.opacity = '0';
          setTimeout(() => {
            loadingOverlay.style.display = 'none';
            if (scrollContainer) scrollContainer.style.overflowY = 'scroll';
            startTypingAnimation(); // Start typing only after loading
          }, 500);
        }
      }, 200); // slight pause at 100%
    }
    if (loadingBarFill) loadingBarFill.style.width = `${progress}%`;
  }, intervalTime);


  // ==========================================
  // 4. EERIE TYPING ANIMATION (Screen 1)
  // ==========================================

  function startTypingAnimation() {
    const grid = document.getElementById('profile-info-grid');
    if (!grid) return;
    grid.innerHTML = ''; // Clear

    const rows = [
      { label: "NAME:", value: activePersona.name },
      { label: "ALTER:", value: activePersona.age },
      { label: "WOHNORT:", value: activePersona.location },
      { label: "BEZIEHUNG:", value: activePersona.relationship },
      { label: "ZULETZT BESUCHT:", value: activePersona.lastVisit },
      { label: "INTERESSEN:", value: activePersona.interests }
    ];

    let rowIndex = 0;

    function typeNextRow() {
      if (rowIndex >= rows.length) return;

      const rowData = rows[rowIndex];
      const rowDiv = document.createElement('div');
      rowDiv.className = 'info-row';

      const labelSpan = document.createElement('span');
      labelSpan.className = 'info-label';
      labelSpan.textContent = rowData.label;

      const valueSpan = document.createElement('span');
      valueSpan.className = 'info-value typing-cursor';

      rowDiv.appendChild(labelSpan);
      rowDiv.appendChild(valueSpan);
      grid.appendChild(rowDiv);

      const textToType = rowData.value.toUpperCase();
      let charIndex = 0;

      function typeChar() {
        if (charIndex < textToType.length) {
          valueSpan.textContent += textToType.charAt(charIndex);
          charIndex++;
          setTimeout(typeChar, 40 + Math.random() * 60); // eerie variable speed
        } else {
          valueSpan.classList.remove('typing-cursor');
          rowIndex++;
          setTimeout(typeNextRow, 200); // pause before next row
        }
      }
      typeChar();
    }

    // Start typing the first row
    typeNextRow();
  }


  // ==========================================
  // 6. RENDER CONFIGURABLE FLASHCARDS (Screen 4)
  // ==========================================

  const flashcardsGrid = document.getElementById('flashcards-grid');
  if (flashcardsGrid) {
    flashcardsData.forEach(card => {
      const wrapper = document.createElement('div');
      wrapper.className = 'flashcard-wrapper';
      wrapper.innerHTML = `
        <div class="flashcard" onclick="this.classList.toggle('flipped')">
          <div class="card-face card-front">
            <span class="fakt-label">${card.label}</span>
            <h3>${card.title}</h3>
          </div>
          <div class="card-face card-back">
            <p>${card.desc}</p>
          </div>
        </div>
      `;
      flashcardsGrid.appendChild(wrapper);
    });
  }


  // ==========================================
  // 7. VERTICAL TINDER STACK (Screen 5)
  // ==========================================

  const deck = document.getElementById('tinder-deck');
  if (deck) {
    rebuildDeck();
  }

  const screen5 = document.getElementById('screen-5');
  if (screen5 && deck) {
    let startY = 0;
    let moveY = 0;
    let isDragging = false;

    screen5.addEventListener('touchstart', (e) => {
      const topCard = deck.querySelector('.swipe-card:last-child');
      if (!topCard) return;
      startY = e.touches[0].clientY;
      isDragging = true;
      topCard.style.transition = 'none';
    });

    screen5.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const topCard = deck.querySelector('.swipe-card:last-child');
      if (!topCard) return;
      e.preventDefault();
      moveY = e.touches[0].clientY - startY;

      const rotate = moveY * 0.02;
      topCard.style.transform = `translateY(${moveY}px) rotate(${rotate}deg)`;
    }, { passive: false });

    screen5.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;
      const topCard = deck.querySelector('.swipe-card:last-child');
      if (!topCard) return;

      topCard.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s';
      const threshold = window.innerHeight * 0.15;

      if (Math.abs(moveY) > threshold) {
        const remaining = deck.getElementsByClassName('swipe-card');

        if (remaining.length === 1) {
          // It's the last card: don't swipe it away, just scroll to the next screen
          topCard.style.transform = '';
          const container = document.getElementById('scroll-container');
          if (container) {
            container.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
          }
        } else {
          // Swipe away the card
          topCard.classList.add(moveY > 0 ? 'swiped-down' : 'swiped-up');
          topCard.style.opacity = '0';
          setTimeout(() => {
            topCard.remove();
          }, 400);
        }
      } else {
        topCard.style.transform = '';
      }
      moveY = 0;
    });
  }

  function rebuildDeck() {
    deck.innerHTML = '';
    // Reverse the data so the first item in array is appended last (top of the DOM stack)
    const reversedData = [...tinderStackData].reverse();

    reversedData.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'swipe-card';
      div.innerHTML = `
        <div class="swipe-card-content">
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </div>
      `;
      deck.appendChild(div);
      // initSwipeEvents is no longer needed per card as screen5 handles touches
    });
  }


  // ==========================================
  // 8. CHECKLIST ANIMATIONS (Screen 6)
  // ==========================================

  window.toggleChecklistItem = function (element) {
    const checkbox = element.querySelector('.hidden-checkbox');
    const svg = element.querySelector('.purple-check-icon');
    if (checkbox && svg) {
      checkbox.checked = !checkbox.checked;
      svg.style.opacity = checkbox.checked ? '1' : '0.2';
    }
  };

  const screen6 = document.getElementById('screen-6');
  if (screen6 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const rows = entry.target.querySelectorAll('.fade-in-row');
          rows.forEach((row, idx) => {
            setTimeout(() => {
              row.classList.add('visible');
            }, idx * 150); // Stagger by 150ms
          });
          observer.unobserve(entry.target); // Play once
        }
      });
    }, { threshold: 0.3 });
    observer.observe(screen6);
  } else {
    // Fallback if no IntersectionObserver
    document.querySelectorAll('.fade-in-row').forEach(row => row.classList.add('visible'));
  }


  // ==========================================
  // 9. RENDER CONFIGURABLE QUIZ (Screen 7)
  // ==========================================

  const quizContainer = document.getElementById('quiz-container');
  const quizNavigator = document.getElementById('quiz-navigator');
  const quizBtn = document.getElementById('quiz-submit-btn');

  let currentQuestionIndex = 0;
  let userAnswers = new Array(quizData.length).fill(null);

  function renderQuestion(index) {
    if (!quizContainer) return;

    quizContainer.innerHTML = '';

    if (quizNavigator) {
      quizNavigator.textContent = `Frage ${index + 1} von ${quizData.length}`;
    }

    const q = quizData[index];
    const block = document.createElement('div');
    block.className = 'quiz-question-block';

    let optionsHTML = '';
    q.options.forEach((opt, optIndex) => {
      const isChecked = userAnswers[index] === optIndex ? 'checked' : '';
      optionsHTML += `
        <label class="quiz-option">
          <input type="radio" name="q${index}" value="${optIndex}" ${isChecked}>
          <span class="radio-circle"></span>
          ${opt}
        </label>
      `;
    });

    block.innerHTML = `
      <div class="quiz-question-header">Frage ${index + 1}</div>
      <div class="quiz-question-body">
        <p class="quiz-question-text">${q.question}</p>
        <div class="quiz-options">
          ${optionsHTML}
        </div>
      </div>
    `;
    quizContainer.appendChild(block);

    if (quizBtn) {
      if (index === quizData.length - 1) {
        quizBtn.textContent = "Ergebnis anzeigen";
      } else {
        quizBtn.textContent = "Weiter";
      }
    }
  }

  if (quizContainer) {
    renderQuestion(currentQuestionIndex);
  }

  window.nextQuizQuestion = function () {
    const selected = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);

    if (!selected) {
      const originalText = quizBtn.textContent;
      quizBtn.textContent = "Bitte eine Antwort wählen!";
      quizBtn.style.backgroundColor = "#ff3b30";
      setTimeout(() => {
        quizBtn.textContent = originalText;
        quizBtn.style.backgroundColor = "var(--accent-purple)";
      }, 1500);
      return;
    }

    // Save user's choice
    userAnswers[currentQuestionIndex] = parseInt(selected.value);

    if (currentQuestionIndex < quizData.length - 1) {
      // Next question
      currentQuestionIndex++;
      renderQuestion(currentQuestionIndex);
    } else {
      // Evaluate
      evaluateQuiz();
    }
  };

  function evaluateQuiz() {
    let counts = [0, 0, 0, 0];
    for (let i = 0; i < userAnswers.length; i++) {
      counts[userAnswers[i]]++;
    }

    let maxIndex = 0;
    for (let i = 1; i < 4; i++) {
      if (counts[i] > counts[maxIndex]) {
        maxIndex = i;
      }
    }

    const result = quizResults[maxIndex];

    const screen8 = document.getElementById('screen-8');
    if (screen8) {
      screen8.style.display = 'flex';

      const conclusionContainer = document.getElementById('conclusion-container');
      conclusionContainer.innerHTML = `
        <div style="background-color: var(--accent-purple); border-radius: 20px; padding: 40px 30px; text-align: center; box-shadow: 0 10px 30px rgba(139,122,240,0.3);">
          <h3 style="color: var(--text-white); font-size: 26px; margin-bottom: 20px; font-weight: 800;">${result.title}</h3>
          <p style="color: var(--text-white); font-size: 16px; line-height: 1.6; font-weight: 500;">${result.desc}</p>
        </div>
      `;

      quizBtn.textContent = "Ergebnis unten ansehen!";
      quizBtn.style.backgroundColor = "var(--bg-card)";
      quizBtn.style.border = "1px solid var(--accent-purple)";
      quizBtn.disabled = true;

      setTimeout(() => {
        const scrollContainer = document.getElementById('scroll-container');
        if (scrollContainer) {
          screen8.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }

});
