// ================================================================
//  Interview Coach — Voice Interview Practice
//  app.js — All application logic
// ================================================================


// ======================== INTERVIEW PROMPTS ========================

const PROMPTS = {
  pm: {
    'design-thinking': {
      easy: [
        "Design a feature that helps users track their water intake.",
        "Improve the checkout experience for an online bookstore.",
        "Design a timer feature for a cooking recipe app.",
        "Create a wishlist feature for a travel planning app.",
        "Design a progress tracker for a language learning app.",
        "Improve the search experience for a music streaming app.",
        "Design a reminder system for a medication tracking app.",
        "Create a photo organization feature for a cloud storage app.",
        "Design a rating system for a restaurant review app.",
        "Improve the calendar view for a scheduling app.",
        "Design a note-taking feature for a student app.",
        "Create a sleep tracking feature for a wellness app.",
        "Design a favorites feature for a news reading app.",
        "Improve the settings menu for a mobile weather app.",
        "Design a sharing feature for a fitness achievement app."
      ],
      medium: [
        "Design a self-checkout experience for a busy grocery store.",
        "Redesign hospital check-in to reduce wait times by 50%.",
        "Design a voice UI for elderly smart home users.",
        "Create a peer-to-peer car rental marketplace.",
        "Design payments in a messaging app for emerging markets.",
        "Redesign the returns experience for an e-commerce platform.",
        "Design a scheduling system for a telehealth platform.",
        "Create a moderation system for user-generated content.",
        "Design a subscription management interface for streaming services.",
        "Redesign airport security screening process.",
        "Design a collaborative meal planning app for families.",
        "Create a mentorship matching platform for professionals.",
        "Design a virtual event platform for 10,000+ attendees.",
        "Redesign the delivery tracking experience for food orders.",
        "Design a carpooling feature for a rideshare app.",
        "Create a task delegation system for project management.",
        "Design an emergency alert system for a campus.",
        "Redesign hotel booking for business travelers.",
        "Design a social feature for a fitness app.",
        "Create a feedback collection system for restaurants."
      ],
      hard: [
        "Design a crisis communication system for a city of 2 million.",
        "Create a marketplace connecting farmers with restaurants.",
        "Design a carbon footprint tracking ecosystem for consumers.",
        "Create a decentralized identity verification system.",
        "Design a mental health support platform with crisis intervention.",
        "Redesign the entire voting experience for national elections.",
        "Create a platform for managing clinical trials across hospitals.",
        "Design an AI-powered job matching platform for gig workers.",
        "Create a community-driven disaster response coordination system.",
        "Design a blockchain-based supply chain transparency platform.",
        "Create a platform for coordinating volunteer efforts citywide.",
        "Design a comprehensive eldercare coordination system.",
        "Create a peer-to-peer renewable energy trading platform.",
        "Design a universal healthcare patient portal.",
        "Create a platform for coordinating refugee resettlement services."
      ]
    },
    'product-sense': {
      easy: [
        "How would you prioritize features for a fitness app?",
        "Define success metrics for a food delivery subscription.",
        "What metrics would you track for a podcast app?",
        "How would you measure success of a new onboarding flow?",
        "Define KPIs for a mobile game's tutorial.",
        "What would you measure for a referral program?",
        "How would you prioritize bugs vs new features?",
        "Define success metrics for a push notification strategy.",
        "What metrics matter for a freemium conversion?",
        "How would you measure engagement for a reading app?",
        "Define success for a dark mode feature.",
        "What metrics would you track for app store optimization?",
        "How would you measure success of faster load times?",
        "Define KPIs for in-app customer support.",
        "What would you track for a loyalty rewards program?"
      ],
      medium: [
        "Prioritize creator monetization features for a video platform.",
        "Define a North Star metric for a dating app.",
        "Launch strategy for payments in a messaging app.",
        "How would you prioritize accessibility improvements?",
        "Define success metrics for a B2B SaaS trial period.",
        "Should a photo app add video? Build the case.",
        "Prioritize features for a two-sided marketplace.",
        "Define metrics for community health in a social platform.",
        "Launch strategy for AI features in a productivity app.",
        "How would you measure network effects?",
        "Define a North Star metric for a professional networking app.",
        "Prioritize personalization features for a news app.",
        "Should an e-learning platform add live classes?",
        "Define success metrics for reducing churn.",
        "Launch strategy for enterprise tier of consumer app.",
        "How would you prioritize technical debt vs features?",
        "Define metrics for marketplace quality and trust.",
        "Should a music app add podcasts?",
        "Prioritize privacy features vs engagement features.",
        "Define North Star metric for a collaborative workspace."
      ],
      hard: [
        "Should Spotify launch hardware? Build the business case.",
        "Design a 5-year roadmap for an autonomous vehicle company.",
        "Should a fintech app become a bank? Business case.",
        "Define strategy for entering a new international market.",
        "Should a B2C company pivot to B2B? Analysis.",
        "Build the case for acquiring vs building a feature.",
        "Design a platform strategy: open ecosystem vs walled garden.",
        "Should a subscription app add an ad-supported tier?",
        "Define strategy for competing with a tech giant entering your space.",
        "Build the business case for blockchain integration.",
        "Should a company spin off a popular feature as standalone product?",
        "Design monetization strategy for a high-growth, pre-revenue product.",
        "Define expansion strategy: horizontal vs vertical.",
        "Should a marketplace take on inventory risk?",
        "Build the case for mandatory vs optional AI features."
      ]
    },
    'execution': {
      easy: [
        "DAU dropped 5% week-over-week. Investigation plan?",
        "A feature underperformed. How do you diagnose why?",
        "User complaints spiked after a release. Next steps?",
        "Your top competitor launched a new feature. Response?",
        "App store rating dropped from 4.5 to 3.8. What do you do?",
        "A key metric plateaued. How do you investigate?",
        "Beta users report the app feels slow. Approach?",
        "Conversion rate dropped 3% this week. Action plan?",
        "Engineering says a feature will take 3x longer. What do you do?",
        "Customer support tickets doubled suddenly. Response?",
        "A viral tweet criticizes your product. Action plan?",
        "New user activation rate is dropping. Investigation?",
        "A third-party API you rely on is shutting down. Response?",
        "Your team missed the sprint goal. Post-mortem?",
        "Power users are churning. How do you investigate?"
      ],
      medium: [
        "Retention dropped 8% this quarter—what do you do?",
        "A/B test inconclusive after 2 weeks—next steps?",
        "Revenue grew but engagement declined. Analysis?",
        "Your PM team is split on which feature to build. Resolution?",
        "Engineering wants to refactor for 2 months. How do you decide?",
        "New feature has 20% adoption after a month. Success or failure?",
        "CEO wants a feature in 2 weeks, eng says 6 weeks. Navigate this.",
        "Data shows feature is unused but users say they love it. Reconcile.",
        "Your biggest customer is threatening to churn. Response?",
        "Privacy regulation requires removing a core feature. Strategy?",
        "Engagement is up but revenue is flat. Investigation?",
        "Design and engineering disagree on feasibility. Mediate.",
        "You launched in a new market with zero traction. Next steps?",
        "Competitor's feature is objectively better. Response?",
        "Half your users on old app version won't update. Approach?",
        "Viral growth spiking but infrastructure struggling. Prioritization?",
        "Sales team wants features but roadmap is full. Resolution?",
        "User research contradicts your assumptions. What now?",
        "Investors want faster growth, team wants quality. Balance?",
        "Core metric improving but users complaining more. Reconcile?"
      ],
      hard: [
        "Competitor launched your feature. Response?",
        "Revenue up 20% but NPS down 15 points. Address this.",
        "Your platform enabled harmful content. Crisis response?",
        "Regulatory change threatens your business model. Strategy?",
        "Top 3 engineers quit suddenly. Roadmap implications?",
        "Major security breach exposed user data. Response plan?",
        "Board wants profitability, users want free features. Strategy?",
        "Your product became addictive in a harmful way. Ethics response?",
        "Entire product strategy based on tech that's now obsolete. Pivot?",
        "Company wants to sell, but product needs 6 months work. Prioritize?",
        "Viral success overwhelmed infrastructure. Scale strategy?",
        "Founder/CEO vision conflicts with user data. Navigate this.",
        "Partnership that drives 40% of revenue is ending. Response?",
        "Product used for something illegal/unintended. Address this.",
        "Market leader copying everything you do. Differentiation strategy?"
      ]
    }
  },
  ux: {
    'design-thinking': {
      easy: [
        "Redesign settings for a mobile banking app.",
        "Design onboarding for a meditation app.",
        "Improve the profile editing experience for a social app.",
        "Design a better error state for a form submission.",
        "Redesign the app icon and splash screen.",
        "Improve the photo upload flow for a marketplace.",
        "Design a first-time user tutorial.",
        "Redesign the notification preferences screen.",
        "Improve the search results page layout.",
        "Design a 'forgot password' flow that doesn't frustrate users.",
        "Redesign a pricing page to be clearer.",
        "Improve the map view for a local services app.",
        "Design a better empty state for a content feed.",
        "Redesign the app's navigation structure.",
        "Improve the multi-step signup form."
      ],
      medium: [
        "Design inclusive onboarding for a budgeting app.",
        "Redesign returns for an online retailer.",
        "Design accessible video controls for deaf users.",
        "Create a design system for a growing startup.",
        "Redesign file sharing for team collaboration.",
        "Design a dashboard for small business owners.",
        "Improve discoverability in a content-heavy app.",
        "Design cross-platform consistency (mobile, web, tablet).",
        "Redesign checkout for one-click purchasing.",
        "Design for slow/unreliable internet connections.",
        "Improve data visualization for non-technical users.",
        "Design a review/rating experience that feels trustworthy.",
        "Redesign multi-language support.",
        "Design personalization that doesn't feel creepy.",
        "Improve complex filtering and sorting.",
        "Design social features without compromising privacy.",
        "Redesign an admin panel for power users.",
        "Design offline functionality for a cloud app.",
        "Improve trust and safety indicators.",
        "Design for seniors with limited tech literacy."
      ],
      hard: [
        "Design a collaborative tool for remote teams.",
        "Create accessible wayfinding for a large airport.",
        "Design AR try-on experience for furniture shopping.",
        "Create a design system for autonomous vehicle interfaces.",
        "Design healthcare provider portal with HIPAA compliance.",
        "Redesign legal contract signing for accessibility.",
        "Design voice-first interface for smart assistant.",
        "Create mental health crisis intervention interface.",
        "Design educational platform for students with learning disabilities.",
        "Redesign government services portal for all citizens.",
        "Design blockchain/crypto wallet for mainstream users.",
        "Create immersive VR training for hazardous jobs.",
        "Design AI-powered assistant that earns user trust.",
        "Redesign voting interface for maximum accessibility.",
        "Design ethical data consent experience."
      ]
    },
    'research': {
      easy: [
        "How would you validate if users need dark mode?",
        "Design a usability study for checkout flow.",
        "Research plan for testing new navigation.",
        "How would you validate icon design choices?",
        "Plan research for color palette accessibility.",
        "How would you test button placement?",
        "Research plan for mobile vs desktop preference.",
        "How would you validate loading state design?",
        "Plan research for notification timing.",
        "How would you test error message clarity?",
        "Research plan for A/B testing layout changes.",
        "How would you validate onboarding effectiveness?",
        "Plan research for feature discoverability.",
        "How would you test form field labels?",
        "Research plan for animation preferences."
      ],
      medium: [
        "Research plan to understand cart abandonment.",
        "Measure success of redesigned navigation.",
        "How would you research accessibility needs for your product?",
        "Plan research for international expansion.",
        "How would you validate a new design system?",
        "Research plan for understanding power user needs.",
        "How would you measure emotional response to design?",
        "Plan research for cross-generational product usage.",
        "How would you research trust factors in fintech?",
        "Research plan for mobile app vs web preference.",
        "How would you validate personalization effectiveness?",
        "Plan research for understanding churn reasons.",
        "How would you research competitive landscape?",
        "Research plan for voice UI usability.",
        "How would you validate privacy concerns?",
        "Plan research for onboarding drop-off.",
        "How would you research feature adoption barriers?",
        "Research plan for enterprise user needs.",
        "How would you validate information architecture?",
        "Plan research for multi-platform consistency."
      ],
      hard: [
        "Longitudinal study for design system changes.",
        "Research for users with cognitive disabilities.",
        "Plan research for culturally diverse global markets.",
        "How would you research ethical AI implications?",
        "Research plan for understanding accessibility at scale.",
        "How would you validate safety features in crisis situations?",
        "Plan research for regulatory compliance (GDPR, WCAG).",
        "How would you research behavioral addiction patterns?",
        "Research plan for vulnerable user populations.",
        "How would you validate trust in sensitive contexts (healthcare, finance)?",
        "Plan research for emerging technology adoption (AR/VR).",
        "How would you research unconscious bias in design?",
        "Research plan for measuring long-term product impact.",
        "How would you validate inclusive design across abilities?",
        "Plan research for privacy-preserving data collection."
      ]
    },
    'critique': {
      easy: [
        "Critique onboarding of a social media app.",
        "What would you improve about e-commerce pages?",
        "Critique the signup flow of a streaming service.",
        "Evaluate the navigation of a news app.",
        "Critique the search experience of an app you use.",
        "What would you improve about mobile banking apps?",
        "Critique the settings menu of your phone.",
        "Evaluate the checkout flow of an online store.",
        "Critique the notifications you receive daily.",
        "What would you improve about email apps?",
        "Critique the profile page of a social network.",
        "Evaluate the home screen of a productivity app.",
        "Critique the photo sharing flow of an app.",
        "What would you improve about music players?",
        "Critique the help/support section of an app."
      ],
      medium: [
        "Critique a complex dashboard.",
        "Evaluate IA of a large news website.",
        "Critique the design system of a major product.",
        "Evaluate accessibility of a government website.",
        "Critique the mobile app vs web experience consistency.",
        "Evaluate the data visualization in analytics tools.",
        "Critique the personalization in a content platform.",
        "Evaluate the collaboration features in a workspace tool.",
        "Critique the privacy controls in a social app.",
        "Evaluate the search and filtering in a marketplace.",
        "Critique the admin panel of a SaaS product.",
        "Evaluate the error handling across a product.",
        "Critique the multi-step form in complex workflows.",
        "Evaluate the responsive design of a web app.",
        "Critique the notification strategy of an app.",
        "Evaluate the empty states across a product.",
        "Critique the loading and performance perception.",
        "Evaluate the help documentation and tooltips.",
        "Critique the mobile-first vs desktop-first approach.",
        "Evaluate the visual hierarchy in a content-heavy site."
      ],
      hard: [
        "Critique online tax filing experience.",
        "Evaluate end-to-end car buying online.",
        "Critique the entire healthcare patient portal experience.",
        "Evaluate the accessibility of a complex enterprise software.",
        "Critique the ethics of persuasive design in social media.",
        "Evaluate the trust and safety design in a marketplace.",
        "Critique the data privacy transparency in a major platform.",
        "Evaluate the inclusive design for diverse abilities.",
        "Critique the AI transparency in algorithm-driven products.",
        "Evaluate the crisis intervention design in mental health apps.",
        "Critique the design for children's safety in products.",
        "Evaluate the accessibility compliance of a government service.",
        "Critique the ethical implications of dark patterns.",
        "Evaluate the inclusive language across a global product.",
        "Critique the balance of engagement vs wellbeing in an app."
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


// ======================== MODEL ANSWER GENERATOR ========================

function generateModelAnswer(role, type, question) {
  const q = question.toLowerCase();
  
  // Generate contextual model answer based on the actual question
  if (role === 'pm') {
    if (type === 'design-thinking') {
      return `For this design challenge, I'd start by clarifying the problem space: Who are our target users? What are their current pain points with existing solutions? What constraints exist (technical, business, regulatory)?\n\nMy structured approach would be:\n\n1. **Understand**: Research user needs through interviews and data analysis. Look at competitive solutions and identify gaps.\n\n2. **Define**: Create 2-3 user personas representing key segments. Map their journeys and identify critical pain points specific to this problem.\n\n3. **Ideate**: Brainstorm multiple solution approaches. Consider both quick wins and transformative changes.\n\n4. **Prioritize**: Use impact vs effort framework. Focus on solutions that address the biggest pain points with reasonable complexity.\n\n5. **Measure**: Define success metrics before building. Primary metric should tie directly to user value (e.g., task completion, time saved, satisfaction).\n\nFor this specific problem, key considerations would include: user adoption barriers, technical feasibility, accessibility for diverse users, edge cases and failure modes, and privacy/security implications.\n\nI'd recommend a phased rollout: MVP with core functionality, gather feedback, iterate based on real usage data, then expand to additional features.`;
    } else if (type === 'product-sense') {
      return `I'd start by clarifying the product context: What stage is this product/feature at? What's the business model? Who are the target users and what core problem does this solve?\n\nFor defining success metrics, my approach:\n\n**North Star Metric**: Identify one metric that captures the core value exchange. It should be actionable, measurable, and tied to long-term business success. For this problem, it might be related to user engagement, task completion, or value realization.\n\n**Supporting Metrics**:\n- Engagement health: DAU/MAU ratio, session frequency, retention cohorts\n- Feature effectiveness: Adoption rate, feature usage depth, user satisfaction\n- Business impact: Conversion rates, revenue per user, customer lifetime value\n- Product quality: Load times, error rates, support ticket volume\n\nFor prioritization, I'd use a framework like RICE (Reach × Impact × Confidence / Effort) or Impact vs Effort matrix. Key factors:\n- User impact: How many users affected? How significantly?\n- Business value: Revenue impact, strategic importance, competitive advantage\n- Feasibility: Engineering effort, dependencies, risk\n- Learning value: What will we learn that informs future decisions?\n\nI'd also define leading indicators that predict success before we have months of data, and set up weekly metric reviews to catch issues early.`;
    } else if (type === 'execution') {
      return `I'd approach this execution challenge systematically:\n\n**1. Validate & Understand**:\n- Verify the data is accurate (no tracking bugs, data pipeline issues, or seasonality effects)\n- Segment the problem: Which user cohorts are affected? When did it start? Which platforms/regions?\n- Timeline: Correlate with product changes, external events, competitor actions\n\n**2. Root Cause Analysis**:\n- Analyze user funnels to identify where the problem manifests\n- Pull qualitative data: support tickets, app reviews, user interviews\n- Look at leading indicators that preceded the issue\n- Review recent releases, experiments, or system changes\n\n**3. Hypothesis Generation**:\n- Develop 3-5 hypotheses for what's causing the issue\n- For each hypothesis, identify what data would confirm/reject it\n- Run quick tests or analyses to validate hypotheses\n\n**4. Solution & Prioritization**:\n- Based on root cause, identify potential fixes\n- Prioritize by: severity, user impact, time to fix, confidence level\n- Consider: immediate hotfix, short-term mitigation, long-term solution\n\n**5. Execution & Monitoring**:\n- Set clear success criteria and recovery targets\n- Implement fixes with proper instrumentation\n- Monitor key metrics daily during recovery period\n- Weekly check-ins with team until metrics stabilize\n- Document learnings and update processes to prevent recurrence\n\n**Communication**: Keep stakeholders informed with regular updates on status, findings, and next steps.`;
    }
  } else if (role === 'ux') {
    if (type === 'design-thinking') {
      return `For this UX design challenge, I'd follow a human-centered design process:\n\n**1. Research & Discovery**:\n- Understand the full problem space and context\n- Conduct user interviews with diverse participants (different ages, abilities, tech literacy)\n- Observe current behavior and pain points\n- Analyze competitors and existing solutions\n- Identify accessibility requirements\n\n**2. Define & Synthesize**:\n- Create 2-3 personas representing key user segments\n- Map user journeys showing current experience and pain points\n- Define "How Might We" statements to frame design opportunities\n- Prioritize which problems to solve first\n\n**3. Ideate**:\n- Run collaborative design studios with cross-functional team\n- Sketch multiple solution directions (not just the first idea)\n- Consider progressive disclosure, error prevention, and recovery\n- Ensure solutions work across different contexts and abilities\n\n**4. Prototype**:\n- Start with low-fidelity sketches and flows\n- Create interactive prototypes for key interactions\n- Ensure WCAG 2.1 AA compliance (color contrast, keyboard navigation, screen reader support)\n- Design for different screen sizes and devices\n\n**5. Test & Iterate**:\n- Conduct usability testing with diverse users (including those with disabilities)\n- Test in realistic contexts and scenarios\n- Measure: task success rate, time on task, error rate, satisfaction\n- Iterate based on findings\n\n**Key Design Considerations**:\n- Clear information architecture and intuitive navigation\n- Consistent design patterns and mental models\n- Accessible for users with visual, motor, cognitive, or hearing differences\n- Appropriate visual hierarchy and content prioritization\n- Emotional design that builds trust and confidence\n- Graceful error handling and helpful guidance\n\nI'd ship incrementally, gather real-world feedback, and continue iterating.`;
    } else if (type === 'research') {
      return `I'd design a comprehensive research plan using mixed methods:\n\n**Quantitative Research**:\n- Analyze existing data: product analytics, funnels, heatmaps, session recordings\n- Identify patterns: where users succeed, where they struggle, drop-off points\n- Segment users: behavior patterns across different user groups\n- Define baseline metrics for current experience\n- A/B test setup if we're validating specific hypotheses\n\n**Qualitative Research**:\n\n1. **User Interviews** (8-12 participants):\n   - Recruit diverse participants representing key user segments\n   - Include users with different abilities, ages, tech literacy, contexts\n   - Use open-ended questions to understand motivations, needs, pain points\n   - Explore the "why" behind behaviors we see in data\n\n2. **Usability Testing**:\n   - 5-8 participants per round (test iteratively)\n   - Think-aloud protocol to understand mental models\n   - Task-based scenarios reflecting real use cases\n   - Observe struggles, workarounds, delights\n   - Test with assistive technologies (screen readers, keyboard-only, voice control)\n\n3. **Surveys**:\n   - Broader reach for quantifying findings from qualitative research\n   - Keep short (5-7 questions) for higher completion rates\n   - Mix of rating scales and open-ended questions\n\n4. **Contextual Inquiry**:\n   - Observe users in their natural environment\n   - Understand real-world constraints and contexts\n\n**Synthesis & Insights**:\n- Affinity mapping to identify themes and patterns\n- Triangulate quantitative and qualitative findings\n- Prioritize findings by severity (blocker/major/minor) and frequency\n- Create artifacts: journey maps, pain point analysis, opportunity areas\n\n**Deliverables**:\n- Research report with key findings, user quotes, data backing\n- Severity ratings and frequency for each issue\n- Prioritized recommendations with projected impact\n- Design implications and next steps\n\n**Inclusive Research Practices**:\n- Recruit participants with disabilities\n- Provide accommodations as needed\n- Test in multiple languages if applicable\n- Consider cultural contexts and sensitivities`;
    } else if (type === 'critique') {
      return `I'd evaluate this experience systematically across multiple dimensions:\n\n**1. Usability Heuristics**:\n- **Learnability**: Can new users quickly understand how to use it?\n- **Efficiency**: Can experienced users accomplish tasks quickly?\n- **Memorability**: Can users return after time away and remember how to use it?\n- **Error Prevention**: Does the design prevent mistakes? Are errors easy to recover from?\n- **Satisfaction**: Is the experience pleasant and confidence-building?\n\n**2. Information Architecture**:\n- Is content organized logically and intuitively?\n- Can users find what they need without hunting?\n- Is navigation clear and consistent?\n- Are mental models aligned with user expectations?\n- Is the hierarchy appropriate for user goals?\n\n**3. Visual & Interaction Design**:\n- **Hierarchy**: Does the design guide attention appropriately?\n- **Consistency**: Are patterns reused throughout?\n- **Affordances**: Are interactive elements obviously clickable/tappable?\n- **Feedback**: Do interactions provide clear, immediate feedback?\n- **Visual Design**: Does it build trust and credibility?\n\n**4. Accessibility** (WCAG 2.1):\n- Color contrast meets minimum 4.5:1 for text\n- Keyboard navigation works for all interactions\n- Screen reader support with proper ARIA labels and semantic HTML\n- Focus indicators are visible\n- No reliance on color alone to convey meaning\n- Content is understandable and operable for diverse abilities\n\n**5. Content & Communication**:\n- Is language clear, concise, and jargon-free?\n- Are error messages helpful and actionable?\n- Does microcopy guide users appropriately?\n- Is tone appropriate for context and audience?\n\n**6. Performance & Technical**:\n- Load times and perceived performance\n- Responsive design across devices\n- Error handling and edge cases\n- Offline functionality if applicable\n\n**7. Trust & Safety**:\n- Privacy controls and transparency\n- Security indicators and trust signals\n- Data handling clarity\n\n**Specific Improvements I'd Recommend**:\n[Based on the critique, I'd prioritize:]\\n1. **Critical usability blockers** that prevent task completion\n2. **Accessibility barriers** that exclude users\n3. **Information architecture issues** causing confusion\n4. **Trust/safety concerns** that undermine confidence\n5. **Visual polish** and consistency improvements\n\nEach recommendation would include: the problem, user impact, proposed solution, and expected outcome. I'd validate improvements through usability testing before launch.`;
    }
  }
  
  return "A strong answer would demonstrate deep user empathy, structured thinking, clear prioritization, and consideration of metrics, edge cases, and accessibility.";
}


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

function gradeLocally(role, type, transcript, question) {
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

  const goldAnswer = generateModelAnswer(role, type, question);
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
    const questionToGrade = S.followUp || S.prompt;
    S.feedback = gradeLocally(S.role, S.type, S.transcript, questionToGrade);
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
      <h1>🎤 Interview Coach</h1>
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
