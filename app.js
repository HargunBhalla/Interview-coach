// ================================================================
//  VoxCoach — Voice Interview Practice
//  app.js — All application logic
// ================================================================


// ======================== INTERVIEW PROMPTS ========================

const PROMPTS = {
  pm: {
    'design-thinking': {
      easy: [
        "Design a feature that helps users track their water intake.",
        "Improve the checkout experience for an online bookstore."
      ],
      medium: [
        "Design a self-checkout experience for a busy grocery store.",
        "Redesign hospital check-in to reduce wait times by 50%.",
        "Design a voice UI for elderly smart home users."
      ],
      hard: [
        "Design a crisis communication system for a city of 2 million.",
        "Create a marketplace connecting farmers with restaurants."
      ]
    },
    'product-sense': {
      easy: [
        "How would you prioritize features for a fitness app?",
        "Define success metrics for a food delivery subscription."
      ],
      medium: [
        "Prioritize creator monetization features for a video platform.",
        "Define a North Star metric for a dating app.",
        "Launch strategy for payments in a messaging app."
      ],
      hard: [
        "Should Spotify launch hardware? Build the business case.",
        "Design a 5-year roadmap for an autonomous vehicle company."
      ]
    },
    'execution': {
      easy: [
        "DAU dropped 5% week-over-week. Investigation plan?",
        "A feature underperformed. How do you diagnose why?"
      ],
      medium: [
        "Retention dropped 8% this quarter—what do you do?",
        "A/B test inconclusive after 2 weeks—next steps?"
      ],
      hard: [
        "Competitor launched your feature. Response?",
        "Revenue up 20% but NPS down 15 points. Address this."
      ]
    }
  },
  ux: {
    'design-thinking': {
      easy: [
        "Redesign settings for a mobile banking app.",
        "Design onboarding for a meditation app."
      ],
      medium: [
        "Design inclusive onboarding for a budgeting app.",
        "Redesign returns for an online retailer."
      ],
      hard: [
        "Design a collaborative tool for remote teams.",
        "Create accessible wayfinding for a large airport."
      ]
    },
    'research': {
      easy: [
        "How would you validate if users need dark mode?",
        "Design a usability study for checkout flow."
      ],
      medium: [
        "Research plan to understand cart abandonment.",
        "Measure success of redesigned navigation."
      ],
      hard: [
        "Longitudinal study for design system changes.",
        "Research for users with cognitive disabilities."
      ]
    },
    'critique': {
      easy: [
        "Critique onboarding of a social media app.",
        "What would you improve about e-commerce pages?"
      ],
      medium: [
        "Critique a complex dashboard.",
        "Evaluate IA of a large news website."
      ],
      hard: [
        "Critique online tax filing experience.",
        "Evaluate end-to-end car buying online."
      ]
    }
  }
};


// ======================== RUBRICS ========================

const RUBRICS = {
  pm: [
    { id: 'clarifying',    name: 'Clarifying Questions', keywords: ['clarif','who','user','goal','scope','constraint','assume','define','target','audience','context','before I','let me ask','understand'] },
    { id: 'structure',     name: 'Structured Approach',  keywords: ['first','second','third','step','framework','approach','phase','stage','process','plan','start by','then','next','finally','break down','organize','pillar','bucket'] },
    { id: 'user-needs',    name: 'User & Needs',         keywords: ['user','persona','pain point','need','frustrat','problem','experience','journey','customer','behavior','motivation','job to be done','empathy','interview','survey'] },
    { id: 'prioritization',name: 'Prioritization',       keywords: ['priorit','tradeoff','trade-off','impact','effort','important','critical','must have','nice to have','mvp','v1','scope','focus','rank','compare','weigh','versus','rice','moscow'] },
    { id: 'metrics',       name: 'Metrics',              keywords: ['metric','measure','kpi','success','conversion','retention','engagement','nps','satisfaction','rate','track','data','percent','number','goal','north star','funnel','analytics'] },
    { id: 'risks',         name: 'Risks & Edge Cases',   keywords: ['risk','edge case','fail','error','accessibility','abuse','privacy','security','scale','limitation','concern','worst case','what if','challenge','downside','mitigat'] },
    { id: 'communication', name: 'Communication',        keywords: [] }
  ],
  ux: [
    { id: 'empathy',       name: 'User Empathy',      keywords: ['user','empathy','feel','frustrat','need','pain','emotion','experience','perspective','understand','persona','accessibility','inclusive','diverse'] },
    { id: 'process',       name: 'Design Process',    keywords: ['research','wireframe','prototype','test','iterate','discover','define','ideate','design thinking','method','process','approach','step','phase'] },
    { id: 'solutions',     name: 'Solution Quality',  keywords: ['design','solution','interface','layout','component','feature','flow','interaction','visual','ui','ux','screen','navigation','modal','dashboard'] },
    { id: 'iteration',     name: 'Iteration Mindset', keywords: ['iterate','test','feedback','improve','refine','a/b','usability','learn','adjust','pivot','hypothesis','validate','measure','experiment'] },
    { id: 'accessibility', name: 'Accessibility',     keywords: ['accessib','wcag','screen reader','contrast','keyboard','disability','inclusive','universal','assistive','alt text','aria','semantic'] },
    { id: 'systems',       name: 'Systems Thinking',  keywords: ['system','scale','ecosystem','platform','component','reuse','consistent','design system','pattern','holistic','end to end','cross-platform','integration'] },
    { id: 'communication', name: 'Communication',     keywords: [] }
  ]
};


// ======================== COACHING TIPS ========================

const TIPS = {
  pm: {
    clarifying:      "Start by asking who the user is, what the goal is, and what constraints exist.",
    structure:       "Use a clear framework: Understand → Define → Ideate → Prioritize → Measure.",
    'user-needs':    "Identify 2-3 user personas and their specific pain points.",
    prioritization:  "Use impact vs effort or RICE to justify what to build first.",
    metrics:         "Define a North Star metric and 2-3 supporting metrics.",
    risks:           "Think about edge cases, accessibility, privacy, and scalability.",
    communication:   "Be concise, use signposting ('First... Second...'), and summarize."
  },
  ux: {
    empathy:       "Show deep understanding of diverse user needs and emotional states.",
    process:       "Walk through your design process: research → ideate → prototype → test.",
    solutions:     "Propose specific, creative solutions with clear rationale.",
    iteration:     "Explain how you'd test, measure, and iterate on your designs.",
    accessibility: "Address WCAG, assistive tech, and inclusive design principles.",
    systems:       "Consider the broader ecosystem, design system, and scalability.",
    communication: "Articulate design decisions clearly with supporting reasoning."
  }
};


// ======================== MODEL ANSWERS ========================

const GOLD_ANSWERS = {
  pm: {
    'design-thinking': "First, I'd clarify our users and constraints. For a hospital check-in redesign, our primary users are patients (ranging from tech-savvy to elderly), front-desk staff, and clinical teams. The goal is reducing wait times by 50%, and constraints include HIPAA compliance, varying tech literacy, and existing hospital systems.\n\nI'd structure my approach in three phases: (1) Pre-arrival digital check-in via SMS/app where patients can verify insurance, complete forms, and confirm appointments 24-48 hours ahead. (2) Arrival experience with a simple kiosk + greeter hybrid — kiosks for quick check-in for those who pre-registered, and a human greeter to help others. (3) Smart queue management that prioritizes by appointment time and urgency, with real-time wait time displays.\n\nFor metrics, I'd track average check-in time (target: under 3 min from current ~8 min), patient satisfaction scores, staff workload reduction, and digital adoption rate. Key risks include elderly patients struggling with technology (mitigated by the greeter), system downtime (paper backup process), and privacy concerns with kiosks (privacy screens, auto-logout).",
    'product-sense': "I'd start by clarifying what stage this dating app is at and our primary business model. Assuming it's a freemium app past product-market fit, the North Star metric should be 'Quality Matches Per Week' — defined as conversations that last beyond 5 messages, because this captures both matching quality and user engagement.\n\nSupporting metrics would include: DAU/MAU ratio (engagement health), match-to-conversation rate (feature effectiveness), Day 7 retention (new user experience quality), and premium conversion rate (business health).\n\nFor the experiment plan, I'd run three experiments: (1) Profile prompt optimization — test structured prompts vs free-text to improve match quality, measuring conversation length. (2) Match algorithm tuning — A/B test showing fewer but higher-quality matches vs more matches, measuring quality match rate. (3) First message assistance — test AI-suggested conversation starters vs no assistance, measuring response rates.",
    'execution': "I'd investigate the 8% retention drop systematically. First, I'd segment the data: Is this across all users or specific cohorts (new vs existing, platform, geography, acquisition channel)? I'd check if it correlates with any recent product changes, app updates, or external events.\n\nNext, I'd look at the funnel: Where are users dropping off? Is it session frequency, feature engagement, or full churn? I'd pull qualitative data from support tickets, app reviews, and run a quick user survey.\n\nBased on findings, I'd prioritize the highest-impact fix. If it's a specific cohort, I'd target interventions there. If it's a product change, I'd consider reverting while we iterate. I'd set up a weekly retention review with eng and design, define target recovery metrics, and create a 30/60/90 day plan."
  },
  ux: {
    'design-thinking': "I'd begin with research to understand the full context. For inclusive budgeting app onboarding, our users range from financially savvy to financial beginners, across different income levels, abilities, and cultural backgrounds with money.\n\nMy design process: (1) Research — interview diverse users about their relationship with money, pain points with existing tools, and accessibility needs. (2) Define personas representing key segments: the overwhelmed beginner, the organized tracker, the shared-household manager. (3) Design progressive onboarding that adapts: start with just one simple goal (not a full budget setup), use plain language (not financial jargon), support multiple input methods (voice, camera for receipts, manual), and celebrate small wins.\n\nI'd prototype and test with diverse participants, specifically including users with disabilities, non-native speakers, and those with financial anxiety. Key accessibility considerations: screen reader support, high contrast mode, large touch targets, and content that's sensitive to financial shame.",
    'research': "I'd design a mixed-methods research plan. For cart abandonment, I'd start with quantitative analysis: funnel analytics to identify exactly where users drop off, segmented by device, user type, cart value, and time of day.\n\nThen qualitative methods: (1) Moderated usability testing with 8-10 participants attempting to complete purchases, using think-aloud protocol. (2) Post-abandonment email survey with a simple 3-question form asking why they didn't complete. (3) Session recordings (with consent) to identify UI friction points.\n\nI'd synthesize findings into a prioritized list of issues with severity ratings and present recommendations with projected impact on conversion rate.",
    'critique': "I'd evaluate the dashboard holistically across usability heuristics. Common dashboard problems include: information overload (too many widgets competing for attention), poor hierarchy (everything looks equally important), lack of actionable insights (showing data without telling users what to do about it), and poor responsive design.\n\nSpecific improvements I'd propose: (1) Progressive disclosure — show a focused summary view with drill-down capability. (2) Smart defaults — surface the most relevant data based on user role and recent activity. (3) Actionable insights — pair data points with recommended actions. (4) Customization — let users configure their view. (5) Accessibility — ensure color isn't the only way to convey meaning, add proper ARIA labels, and support keyboard navigation."
  }
};


// ======================== FOLLOW-UP QUESTIONS ========================

const FOLLOWUP_OPTIONS = {
  pm: [
    "How would you handle pushback from engineering on your proposed solution?",
    "What would you do if user research contradicts your initial hypothesis?",
    "How would you measure success 6 months after launch?",
    "Walk me through how you'd prioritize if you only had 2 engineers for 1 month.",
    "What's the biggest risk and how would you mitigate it?"
  ],
  ux: [
    "How would you make this accessible for users with visual impairments?",
    "What would your usability test plan look like?",
    "How would you handle conflicting user feedback?",
    "Walk me through your design system considerations.",
    "How would this design scale to other platforms?"
  ]
};


// ======================== STATE ========================

let S = {
  stage: 'setup',         // setup | interview | grading | feedback
  role: 'pm',             // pm | ux
  type: 'design-thinking',
  diff: 'medium',         // easy | medium | hard
  prompt: '',
  transcript: '',
  recording: false,
  timeLeft: 120,
  timerOn: false,
  feedback: null,
  error: null,
  followUp: null
};

let recognition = null;
let timerInterval = null;
let accumulated = '';


// ======================== GRADING ENGINE ========================

function gradeLocally(role, type, transcript) {
  const rubric = RUBRICS[role];
  const lower = transcript.toLowerCase();
  const wordCount = transcript.split(/\s+/).filter(w => w).length;
  const scores = {};
  let totalScore = 0;

  rubric.forEach(cat => {
    let score = 0;

    if (cat.id === 'communication') {
      const fillers = (lower.match(/\b(um|uh|like|yeah|you know|basically|so|kind of|sort of)\b/g) || []).length;
      const fillerRate = fillers / Math.max(wordCount, 1);
      const hasStructure = /first|second|third|then|next|finally|step|phase/i.test(transcript);

      if (wordCount > 150 && fillerRate < 0.03 && hasStructure) score = 5;
      else if (wordCount > 100 && fillerRate < 0.05) score = 4;
      else if (wordCount > 60 && fillerRate < 0.08) score = 3;
      else if (wordCount > 30) score = 2;
      else score = 1;
    } else {
      let hits = 0;
      cat.keywords.forEach(kw => {
        const regex = new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
        if (regex.test(lower)) hits++;
      });
      const coverage = hits / Math.max(cat.keywords.length, 1);

      if (coverage > 0.4 && wordCount > 100) score = 5;
      else if (coverage > 0.3 && wordCount > 80) score = 4;
      else if (coverage > 0.2 && wordCount > 50) score = 3;
      else if (coverage > 0.1 || wordCount > 30) score = 2;
      else if (hits > 0) score = 1;
      else score = 0;
    }

    if (wordCount < 40 && score > 3) score = 3;
    if (wordCount < 20 && score > 2) score = 2;

    const tip = TIPS[role][cat.id] || '';
    let fb = '';
    if (score >= 4) fb = 'Strong coverage. ' + (score < 5 ? 'Add more specific examples.' : 'Excellent depth.');
    else if (score >= 3) fb = 'Good start but could go deeper. ' + tip;
    else if (score >= 2) fb = 'Mentioned briefly. ' + tip;
    else if (score >= 1) fb = 'Barely touched on this. ' + tip;
    else fb = 'Missing entirely. ' + tip;

    scores[cat.id] = { score, feedback: fb };
    totalScore += score;
  });

  const overallScore = Math.round((totalScore / rubric.length) * 10) / 10;

  const strengths = [];
  const improvements = [];
  rubric.forEach(cat => {
    if (scores[cat.id].score >= 4) strengths.push('Strong ' + cat.name.toLowerCase() + ' — you demonstrated good understanding.');
    else if (scores[cat.id].score >= 3) strengths.push('Decent ' + cat.name.toLowerCase() + ' — with more depth this would be great.');
    if (scores[cat.id].score <= 2) improvements.push(cat.name + ': ' + TIPS[role][cat.id]);
  });
  if (strengths.length === 0) strengths.push('You attempted to answer the question — keep practicing!');
  if (wordCount > 100) strengths.push('Good length and effort in your response.');

  const goldAnswer = GOLD_ANSWERS[role][type] || 'A strong answer would cover all rubric areas with specific examples, clear structure, and actionable recommendations.';
  const followUpQuestions = FOLLOWUP_OPTIONS[role].sort(() => Math.random() - 0.5).slice(0, 2);

  return { scores, overallScore, strengths, improvements, goldAnswer, followUpQuestions };
}


// ======================== TIMER ========================

function startTimer() {
  if (S.timerOn) return;
  S.timerOn = true;
  timerInterval = setInterval(() => {
    S.timeLeft--;
    if (S.timeLeft <= 0) { S.timerOn = false; clearInterval(timerInterval); }
    render();
  }, 1000);
}

function stopTimer() {
  S.timerOn = false;
  clearInterval(timerInterval);
}

function formatTime(s) {
  return Math.floor(s / 60) + ':' + (s % 60).toString().padStart(2, '0');
}


// ======================== SPEECH RECOGNITION ========================

async function startRecording() {
  S.error = null;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { S.error = 'Speech not supported. Use Chrome/Edge or type below.'; render(); return; }

  try { await navigator.mediaDevices.getUserMedia({ audio: true }); }
  catch (e) { S.error = 'Mic denied. Allow in browser settings or type below.'; render(); return; }

  recognition = new SR();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  accumulated = S.transcript;

  recognition.onstart = () => { S.recording = true; startTimer(); render(); };

  recognition.onresult = (e) => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (e.results[i].isFinal) accumulated += e.results[i][0].transcript + ' ';
      else interim = e.results[i][0].transcript;
    }
    S.transcript = accumulated + interim;
    render();
  };

  recognition.onerror = (e) => {
    if (e.error === 'not-allowed') { S.error = 'Mic blocked. Type instead.'; S.recording = false; render(); }
  };

  recognition.onend = () => {
    if (S.recording) { try { recognition.start(); } catch (e) { S.recording = false; render(); } }
  };

  recognition.start();
}

function stopRecording() {
  S.recording = false;
  if (recognition) { recognition.stop(); recognition = null; }
  render();
}

function toggleRec() {
  S.recording ? stopRecording() : startRecording();
}


// ======================== ACTIONS ========================

function startInterview() {
  const prompts = PROMPTS[S.role][S.type][S.diff];
  S.prompt = prompts[Math.floor(Math.random() * prompts.length)];
  S.transcript = ''; accumulated = '';
  S.timeLeft = S.diff === 'easy' ? 90 : S.diff === 'medium' ? 120 : 150;
  S.timerOn = false; S.feedback = null; S.followUp = null;
  S.error = null; S.recording = false;
  S.stage = 'interview';
  render();
}

function submitAnswer() {
  if (!S.transcript.trim()) { S.error = 'Please provide a response first.'; render(); return; }
  stopRecording(); stopTimer();
  S.stage = 'grading'; render();
  setTimeout(() => {
    S.feedback = gradeLocally(S.role, S.type, S.transcript);
    S.stage = 'feedback'; render();
  }, 1500);
}

function doFollowUp(q) {
  S.followUp = q; S.transcript = ''; accumulated = '';
  S.timeLeft = 90; S.timerOn = false; S.feedback = null;
  S.error = null; S.recording = false;
  S.stage = 'interview'; render();
}

function newSession() {
  S.stage = 'setup'; S.transcript = ''; S.feedback = null;
  S.followUp = null; S.error = null; render();
}

function onTextInput(e) {
  S.transcript = e.target.value;
  accumulated = e.target.value;
  if (e.target.value && !S.timerOn) startTimer();
}


// ======================== RENDER ========================

function render() {
  const app = document.getElementById('app');
  switch (S.stage) {
    case 'setup':     app.innerHTML = setupHTML();     break;
    case 'interview': app.innerHTML = interviewHTML(); break;
    case 'grading':   app.innerHTML = gradingHTML();   break;
    case 'feedback':  app.innerHTML = feedbackHTML();  break;
  }
}


// ======================== TEMPLATES ========================

function setupHTML() {
  const typeKeys = Object.keys(PROMPTS[S.role]);
  return `
    <div class="header">
      <h1>🎤 VoxCoach</h1>
      <p>Voice Interview Practice with AI Feedback</p>
    </div>
    <div class="card">
      <h2>👤 Role</h2>
      <div class="btn-grid btn-grid-2">
        <button class="btn ${S.role === 'pm' ? 'active-indigo' : ''}" onclick="S.role='pm';S.type='design-thinking';render()">
          <div style="font-weight:600">Product Manager</div>
          <div class="text-sm text-muted">Strategy, metrics, execution</div>
        </button>
        <button class="btn ${S.role === 'ux' ? 'active-indigo' : ''}" onclick="S.role='ux';S.type='design-thinking';render()">
          <div style="font-weight:600">UX Designer</div>
          <div class="text-sm text-muted">Research, design thinking</div>
        </button>
      </div>
    </div>
    <div class="card">
      <h2>📋 Interview Type</h2>
      <div class="btn-grid btn-grid-3">
        ${typeKeys.map(t => `
          <button class="btn ${S.type === t ? 'active-purple' : ''}" onclick="S.type='${t}';render()" style="text-align:center;text-transform:capitalize">
            ${t.replace('-', ' ')}
          </button>
        `).join('')}
      </div>
    </div>
    <div class="card">
      <h2>⚡ Difficulty</h2>
      <div class="btn-grid btn-grid-3">
        ${['easy', 'medium', 'hard'].map(d => `
          <button class="btn ${S.diff === d ? 'active-yellow' : ''}" onclick="S.diff='${d}';render()" style="text-align:center">
            <div style="font-weight:600;text-transform:capitalize">${d}</div>
            <div class="text-xs text-muted">${d === 'easy' ? '90s' : d === 'medium' ? '2 min' : '2.5 min'}</div>
          </button>
        `).join('')}
      </div>
    </div>
    <button class="btn-primary" onclick="startInterview()">▶️ Start Interview</button>
  `;
}

function interviewHTML() {
  const tClass = S.timeLeft < 30 ? 'timer red' : S.timerOn ? 'timer green' : 'timer';
  return `
    <div class="flex-between mb-4">
      <div class="flex-center gap-2">
        <span class="${tClass}">${formatTime(S.timeLeft)}</span>
        ${!S.timerOn ? '<span class="timer-hint">(starts when you begin)</span>' : ''}
      </div>
      ${S.followUp ? '<span class="followup-tag">Follow-up</span>' : ''}
    </div>
    <div class="card">
      <div class="question-label">${S.role.toUpperCase()} • ${S.type.replace('-', ' ').toUpperCase()} • ${S.diff.toUpperCase()}</div>
      <div class="question-text">${S.followUp || S.prompt}</div>
    </div>
    ${S.error ? '<div class="error-box">' + S.error + '</div>' : ''}
    <div class="mic-area">
      <button class="mic-btn ${S.recording ? 'recording' : 'idle'}" onclick="toggleRec()">
        ${S.recording
          ? '<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2" fill="white" stroke="none"/></svg>'
          : '<svg viewBox="0 0 24 24"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>'
        }
      </button>
      <div class="mic-label ${S.recording ? 'recording' : 'idle'}">
        ${S.recording ? '🔴 Recording... click to stop' : '🎤 Click to record'}
      </div>
    </div>
    <div class="card response-area">
      <div class="flex-between mb-2">
        <span class="text-sm text-muted">📝 Your Response</span>
        <span class="text-xs text-muted">${S.transcript.length} chars</span>
      </div>
      <textarea id="responseTA" oninput="onTextInput(event)"
        placeholder="Speak using mic above, or type/paste your response here..."
      >${S.transcript}</textarea>
    </div>
    <button class="btn-submit" onclick="submitAnswer()" ${!S.transcript.trim() ? 'disabled' : ''}>
      ✓ Submit for Feedback
    </button>
  `;
}

function gradingHTML() {
  return `
    <div class="spinner">
      <div class="spinner-icon">
        <svg viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
      </div>
      <h2 style="font-size:22px;margin-bottom:8px">Analyzing Your Response...</h2>
      <p class="text-muted">Grading against ${RUBRICS[S.role].length} criteria</p>
    </div>
  `;
}

function feedbackHTML() {
  const f = S.feedback;
  const rubric = RUBRICS[S.role];
  const sc = f.overallScore;
  const scoreClass = sc >= 4 ? 'score-green' : sc >= 3 ? 'score-yellow' : sc >= 2 ? 'score-orange' : 'score-red';

  return `
    <div class="card flex-between">
      <div>
        <h2 style="font-size:20px;margin-bottom:4px">Overall Score</h2>
        <p class="text-sm text-muted">${S.role.toUpperCase()} • ${S.type.replace('-', ' ')}</p>
      </div>
      <div class="score-circle ${scoreClass}">${sc.toFixed(1)}</div>
    </div>

    <div class="card">
      <h2>📊 Detailed Breakdown</h2>
      ${rubric.map(cat => {
        const s = f.scores[cat.id]?.score || 0;
        const fb = f.scores[cat.id]?.feedback || '';
        const pct = (s / 5) * 100;
        const barClass = s >= 4 ? 'bar-green' : s >= 3 ? 'bar-yellow' : s >= 2 ? 'bar-orange' : 'bar-red';
        return `
          <div style="margin-bottom:12px">
            <div class="flex-between text-sm"><span>${cat.name}</span><span class="font-bold">${s}/5</span></div>
            <div class="score-bar-track"><div class="score-bar-fill ${barClass}" style="width:${pct}%"></div></div>
            <div class="text-xs text-muted" style="margin-top:2px">${fb}</div>
          </div>
        `;
      }).join('')}
    </div>

    <div class="strength-box">
      <h3>✅ Strengths</h3>
      <ul class="feedback-list">${f.strengths.map(s => '<li>' + s + '</li>').join('')}</ul>
    </div>

    <div class="improve-box">
      <h3>📈 To Improve</h3>
      <ul class="feedback-list">${f.improvements.map(s => '<li>' + s + '</li>').join('')}</ul>
    </div>

    <div class="gold-box">
      <h3>✨ Model Answer</h3>
      <div class="gold-text">${f.goldAnswer}</div>
    </div>

    ${f.followUpQuestions?.length ? `
      <div class="card">
        <h2>🎯 Practice Follow-ups</h2>
        ${f.followUpQuestions.map(q => `
          <button class="btn-followup" onclick="doFollowUp(\`${q.replace(/`/g, '\\`')}\`)">
            <span>${q}</span><span>→</span>
          </button>
        `).join('')}
      </div>
    ` : ''}

    <button class="btn-secondary" onclick="newSession()">🔄 New Session</button>
  `;
}


// ======================== BOOT ========================
render();
