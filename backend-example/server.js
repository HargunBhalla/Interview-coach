const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// In-memory storage (replace with MongoDB in production)
const sessions = [];

// Helper: Get rubric for role
function getRubric(role) {
  const rubrics = {
    pm: ['clarifying', 'structure', 'user-needs', 'prioritization', 'metrics', 'risks', 'communication'],
    ux: ['empathy', 'process', 'solutions', 'iteration', 'accessibility', 'systems', 'communication']
  };
  return rubrics[role] || rubrics.pm;
}

// AI-powered grading endpoint
app.post('/api/grade', async (req, res) => {
  try {
    const { role, type, transcript, question } = req.body;
    
    if (!transcript || !question) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const rubricCategories = getRubric(role);
    const rubricString = rubricCategories.map(cat => `"${cat}": {"score": 0-5, "feedback": "..."}`).join(',\n    ');
    
    const systemPrompt = `You are an expert interview coach specializing in ${role === 'pm' ? 'Product Management' : 'UX Design'} interviews. 

Your task is to grade interview responses using a structured rubric. Provide detailed, actionable feedback that helps candidates improve.

For Product Management interviews, evaluate:
- Clarifying Questions: Did they ask about users, goals, constraints?
- Structured Approach: Did they use a clear framework?
- User & Needs: Did they identify user personas and pain points?
- Prioritization: Did they justify what to build first?
- Metrics: Did they define success metrics?
- Risks & Edge Cases: Did they consider risks and accessibility?
- Communication: Was it clear, concise, and well-structured?

For UX Design interviews, evaluate:
- User Empathy: Understanding of diverse user needs
- Design Process: Clear research → ideate → prototype → test flow
- Solution Quality: Specific, creative solutions with rationale
- Iteration Mindset: How they'd test and improve
- Accessibility: WCAG compliance and inclusive design
- Systems Thinking: Scalability and design systems
- Communication: Clear articulation of design decisions

Be constructive, specific, and encouraging.`;

    const userPrompt = `Grade this ${role.toUpperCase()} ${type} interview response.

QUESTION:
${question}

CANDIDATE'S RESPONSE:
${transcript}

Provide feedback in this EXACT JSON format (no markdown, just JSON):
{
  "scores": {
    ${rubricString}
  },
  "overallScore": 0-5,
  "strengths": ["specific strength 1", "specific strength 2"],
  "improvements": ["specific area 1: how to improve", "specific area 2: how to improve"],
  "goldAnswer": "A comprehensive 3-4 paragraph model answer that demonstrates excellence across all rubric areas. Include specific examples, frameworks, and metrics relevant to this question.",
  "followUpQuestions": ["follow-up question 1", "follow-up question 2"]
}

Scores should be 0-5 where:
5 = Excellent, comprehensive coverage
4 = Strong, with minor gaps
3 = Good start, needs more depth
2 = Mentioned briefly, lacks detail
1 = Barely touched on
0 = Missing entirely`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });
    
    const content = completion.choices[0].message.content.trim();
    
    // Remove markdown code blocks if present
    const jsonMatch = content.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/) || [null, content];
    const jsonString = jsonMatch[1].trim();
    
    const feedback = JSON.parse(jsonString);
    
    res.json(feedback);
    
  } catch (error) {
    console.error('Grading error:', error);
    res.status(500).json({ 
      error: 'Grading failed',
      message: error.message 
    });
  }
});

// Save session
app.post('/api/sessions', (req, res) => {
  try {
    const session = { 
      ...req.body, 
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    sessions.push(session);
    
    console.log(`Session saved: ${session.id}`);
    res.json({ sessionId: session.id, saved: true });
    
  } catch (error) {
    console.error('Save session error:', error);
    res.status(500).json({ error: 'Failed to save session' });
  }
});

// Get session history
app.get('/api/sessions/history', (req, res) => {
  try {
    const history = sessions
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 50) // Last 50 sessions
      .map(s => ({
        sessionId: s.id,
        role: s.role,
        type: s.type,
        difficulty: s.difficulty,
        question: s.question.substring(0, 100) + '...',
        overallScore: s.feedback?.overallScore || 0,
        timestamp: s.timestamp
      }));
      
    res.json(history);
    
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// Get user stats
app.get('/api/users/stats', (req, res) => {
  try {
    const totalSessions = sessions.length;
    
    if (totalSessions === 0) {
      return res.json({
        totalSessions: 0,
        averageScore: 0,
        scoresByRole: { pm: 0, ux: 0 },
        scoresByDifficulty: { easy: 0, medium: 0, hard: 0 },
        recentProgress: []
      });
    }
    
    const averageScore = sessions.reduce((sum, s) => 
      sum + (s.feedback?.overallScore || 0), 0) / totalSessions;
    
    const pmSessions = sessions.filter(s => s.role === 'pm');
    const uxSessions = sessions.filter(s => s.role === 'ux');
    
    const scoresByRole = {
      pm: calculateAvg(pmSessions),
      ux: calculateAvg(uxSessions)
    };
    
    const scoresByDifficulty = {
      easy: calculateAvg(sessions.filter(s => s.difficulty === 'easy')),
      medium: calculateAvg(sessions.filter(s => s.difficulty === 'medium')),
      hard: calculateAvg(sessions.filter(s => s.difficulty === 'hard'))
    };
    
    // Recent progress (last 10 sessions)
    const recentProgress = sessions
      .slice(-10)
      .map(s => ({
        date: new Date(s.timestamp).toISOString().split('T')[0],
        score: s.feedback?.overallScore || 0
      }));
    
    res.json({
      totalSessions,
      averageScore: parseFloat(averageScore.toFixed(1)),
      scoresByRole,
      scoresByDifficulty,
      recentProgress
    });
    
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', sessions: sessions.length });
});

function calculateAvg(sessionList) {
  if (sessionList.length === 0) return 0;
  const sum = sessionList.reduce((acc, s) => acc + (s.feedback?.overallScore || 0), 0);
  return parseFloat((sum / sessionList.length).toFixed(1));
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Rehears.io Backend running on port ${PORT}`);
  console.log(`📊 API endpoints:`);
  console.log(`   POST   /api/grade`);
  console.log(`   POST   /api/sessions`);
  console.log(`   GET    /api/sessions/history`);
  console.log(`   GET    /api/users/stats`);
  console.log(`   GET    /api/health`);
});
