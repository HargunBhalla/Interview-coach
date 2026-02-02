// ======================== BACKEND API SPECIFICATION ========================
// This file documents the API endpoints your backend should implement
// Use this as a reference when building your Express/Flask/FastAPI backend

/**
 * POST /api/grade
 * Grade an interview response using AI (OpenAI, Anthropic, etc.)
 * 
 * Request Body:
 * {
 *   "role": "pm" | "ux",
 *   "type": "design-thinking" | "product-sense" | "execution" | "research" | "critique",
 *   "transcript": "string - user's response",
 *   "question": "string - the interview question"
 * }
 * 
 * Response:
 * {
 *   "scores": {
 *     "clarifying": { "score": 0-5, "feedback": "string" },
 *     "structure": { "score": 0-5, "feedback": "string" },
 *     // ... other rubric categories
 *   },
 *   "overallScore": 0-5,
 *   "strengths": ["string", ...],
 *   "improvements": ["string", ...],
 *   "goldAnswer": "string - comprehensive model answer",
 *   "followUpQuestions": ["string", "string"]
 * }
 */

/**
 * POST /api/sessions
 * Save a completed interview session
 * 
 * Request Body:
 * {
 *   "role": "pm" | "ux",
 *   "type": "design-thinking" | "product-sense" | etc.,
 *   "difficulty": "easy" | "medium" | "hard",
 *   "question": "string",
 *   "transcript": "string",
 *   "feedback": { /* feedback object from grading */ },
 *   "timeSpent": number (seconds),
 *   "timestamp": "ISO date string"
 * }
 * 
 * Response:
 * {
 *   "sessionId": "string",
 *   "saved": true
 * }
 */

/**
 * GET /api/sessions/history
 * Get user's session history
 * 
 * Response:
 * [
 *   {
 *     "sessionId": "string",
 *     "role": "pm" | "ux",
 *     "type": "string",
 *     "difficulty": "string",
 *     "question": "string",
 *     "overallScore": number,
 *     "timestamp": "ISO date string"
 *   },
 *   ...
 * ]
 */

/**
 * GET /api/users/stats
 * Get user's overall statistics
 * 
 * Response:
 * {
 *   "totalSessions": number,
 *   "averageScore": number,
 *   "scoresByRole": {
 *     "pm": number,
 *     "ux": number
 *   },
 *   "scoresByDifficulty": {
 *     "easy": number,
 *     "medium": number,
 *     "hard": number
 *   },
 *   "recentProgress": [
 *     { "date": "YYYY-MM-DD", "score": number },
 *     ...
 *   ],
 *   "strongestAreas": ["string", ...],
 *   "areasToImprove": ["string", ...]
 * }
 */

// ======================== EXAMPLE BACKEND SETUP ========================

/**
 * EXAMPLE: Express.js Backend Setup
 * 
 * 1. Install dependencies:
 *    npm install express cors openai mongoose
 * 
 * 2. Create server.js:
 * 
 * const express = require('express');
 * const cors = require('cors');
 * const OpenAI = require('openai');
 * 
 * const app = express();
 * app.use(cors());
 * app.use(express.json());
 * 
 * const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
 * 
 * app.post('/api/grade', async (req, res) => {
 *   const { role, type, transcript, question } = req.body;
 *   
 *   // Use OpenAI to grade the response
 *   const completion = await openai.chat.completions.create({
 *     model: "gpt-4",
 *     messages: [
 *       { role: "system", content: "You are an expert interview coach..." },
 *       { role: "user", content: `Grade this ${role} ${type} response...` }
 *     ]
 *   });
 *   
 *   // Parse and return feedback
 *   res.json(parsedFeedback);
 * });
 * 
 * app.listen(3000);
 * 
 * 3. Set environment variables:
 *    OPENAI_API_KEY=your_key_here
 * 
 * 4. Run: node server.js
 */

/**
 * EXAMPLE: Python/FastAPI Backend Setup
 * 
 * 1. Install: pip install fastapi uvicorn openai
 * 
 * 2. Create main.py:
 * 
 * from fastapi import FastAPI
 * from fastapi.middleware.cors import CORSMiddleware
 * import openai
 * 
 * app = FastAPI()
 * app.add_middleware(CORSMiddleware, allow_origins=["*"])
 * 
 * @app.post("/api/grade")
 * async def grade_response(data: dict):
 *     # Use OpenAI to grade
 *     response = openai.ChatCompletion.create(
 *         model="gpt-4",
 *         messages=[...]
 *     )
 *     return parsed_feedback
 * 
 * 3. Run: uvicorn main:app --reload
 */
