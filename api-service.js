// ======================== API SERVICE ========================
// Handles communication with backend when CONFIG.mode = 'api'

const ApiService = {
  
  // Grade an interview response using AI
  async gradeResponse(role, type, transcript, question) {
    if (CONFIG.mode === 'local') {
      return gradeLocally(role, type, transcript, question);
    }
    
    try {
      const response = await fetch(`${CONFIG.api.baseUrl}${CONFIG.api.endpoints.grade}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, type, transcript, question })
      });
      
      if (!response.ok) throw new Error('Grading failed');
      return await response.json();
      
    } catch (error) {
      console.error('API grading failed, falling back to local:', error);
      return gradeLocally(role, type, transcript, question);
    }
  },
  
  // Save session to backend
  async saveSession(sessionData) {
    if (!CONFIG.features.enableHistory) return;
    
    try {
      const response = await fetch(`${CONFIG.api.baseUrl}${CONFIG.api.endpoints.saveSession}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionData)
      });
      
      if (!response.ok) throw new Error('Save failed');
      return await response.json();
      
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  },
  
  // Get user's session history
  async getHistory() {
    if (!CONFIG.features.enableHistory) return [];
    
    try {
      const response = await fetch(`${CONFIG.api.baseUrl}${CONFIG.api.endpoints.getHistory}`);
      
      if (!response.ok) throw new Error('Fetch failed');
      return await response.json();
      
    } catch (error) {
      console.error('Failed to fetch history:', error);
      return [];
    }
  },
  
  // Get user statistics
  async getStats() {
    if (!CONFIG.features.enableAnalytics) return null;
    
    try {
      const response = await fetch(`${CONFIG.api.baseUrl}${CONFIG.api.endpoints.getStats}`);
      
      if (!response.ok) throw new Error('Fetch failed');
      return await response.json();
      
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      return null;
    }
  }
  
};
