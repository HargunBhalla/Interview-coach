# Rehears.io - Backend Server
# A simple Express.js backend for AI-powered grading

This backend adds:
- 🤖 AI-powered grading using OpenAI GPT-4
- 💾 Session history storage
- 📊 User progress analytics
- 🔐 Optional user authentication

## Quick Start

### 1. Install Node.js and npm
Download from: https://nodejs.org/

### 2. Create Backend Project
```bash
mkdir interview-coach-backend
cd interview-coach-backend
npm init -y
npm install express cors openai dotenv mongoose
```

### 3. Create `server.js`
```javascript
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

// AI-powered grading endpoint
app.post('/api/grade', async (req, res) => {
  try {
    const { role, type, transcript, question } = req.body;
    
    const prompt = `You are an expert interview coach. Grade this ${role} interview response for a ${type} question.

Question: ${question}

Response: ${transcript}

Provide detailed feedback in this JSON format:
{
  "scores": {
    "clarifying": {"score": 0-5, "feedback": "..."},
    "structure": {"score": 0-5, "feedback": "..."},
    "user-needs": {"score": 0-5, "feedback": "..."},
    "prioritization": {"score": 0-5, "feedback": "..."},
    "metrics": {"score": 0-5, "feedback": "..."},
    "risks": {"score": 0-5, "feedback": "..."},
    "communication": {"score": 0-5, "feedback": "..."}
  },
  "overallScore": 0-5,
  "strengths": ["...", "..."],
  "improvements": ["...", "..."],
  "goldAnswer": "comprehensive model answer...",
  "followUpQuestions": ["...", "..."]
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });
    
    const feedback = JSON.parse(completion.choices[0].message.content);
    res.json(feedback);
    
  } catch (error) {
    console.error('Grading error:', error);
    res.status(500).json({ error: 'Grading failed' });
  }
});

// Save session
app.post('/api/sessions', (req, res) => {
  const session = { ...req.body, id: Date.now().toString() };
  sessions.push(session);
  res.json({ sessionId: session.id, saved: true });
});

// Get session history
app.get('/api/sessions/history', (req, res) => {
  const history = sessions.map(s => ({
    sessionId: s.id,
    role: s.role,
    type: s.type,
    difficulty: s.difficulty,
    question: s.question,
    overallScore: s.feedback.overallScore,
    timestamp: s.timestamp
  }));
  res.json(history);
});

// Get user stats
app.get('/api/users/stats', (req, res) => {
  const totalSessions = sessions.length;
  const averageScore = sessions.reduce((sum, s) => sum + s.feedback.overallScore, 0) / totalSessions || 0;
  
  res.json({
    totalSessions,
    averageScore: averageScore.toFixed(1),
    scoresByRole: {
      pm: calculateAvg(sessions.filter(s => s.role === 'pm')),
      ux: calculateAvg(sessions.filter(s => s.role === 'ux'))
    },
    scoresByDifficulty: {
      easy: calculateAvg(sessions.filter(s => s.difficulty === 'easy')),
      medium: calculateAvg(sessions.filter(s => s.difficulty === 'medium')),
      hard: calculateAvg(sessions.filter(s => s.difficulty === 'hard'))
    }
  });
});

function calculateAvg(sessions) {
  if (sessions.length === 0) return 0;
  return (sessions.reduce((sum, s) => sum + s.feedback.overallScore, 0) / sessions.length).toFixed(1);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### 4. Create `.env` file
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

### 5. Start the server
```bash
node server.js
```

### 6. Update frontend config
In `config.js`, change:
```javascript
const CONFIG = {
  mode: 'api',  // Changed from 'local' to 'api'
  api: {
    baseUrl: 'http://localhost:3000/api',
    // ...
  },
  features: {
    enableUserAccounts: false,
    enableHistory: true,        // Enable!
    enableAIGrading: true,      // Enable!
    enableAnalytics: true       // Enable!
  }
};
```

## Deployment

### Deploy Backend to Heroku/Railway/Render:
1. Create account on Railway.app (free tier)
2. Create new project from GitHub repo
3. Add environment variable: `OPENAI_API_KEY`
4. Deploy!
5. Update frontend `config.js` with deployed URL

### Production MongoDB Setup:
Replace in-memory storage with MongoDB:
```javascript
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const SessionSchema = new mongoose.Schema({
  role: String,
  type: String,
  // ... other fields
});

const Session = mongoose.model('Session', SessionSchema);
```

## Cost Estimate
- OpenAI API: ~$0.03 per grading (GPT-4)
- Hosting: Free tier (Railway/Render)
- Database: Free tier (MongoDB Atlas)

**Total: ~$3/month for 100 gradings**
