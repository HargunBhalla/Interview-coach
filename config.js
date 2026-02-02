// ======================== CONFIGURATION ========================

const CONFIG = {
  // Set to 'local' for client-side only, 'api' for backend integration
  mode: 'local', // Change to 'api' when backend is available
  
  // API endpoints (used when mode = 'api')
  api: {
    baseUrl: 'http://localhost:3000/api', // Change to your deployed backend URL
    endpoints: {
      grade: '/grade',
      saveSession: '/sessions',
      getHistory: '/sessions/history',
      getStats: '/users/stats'
    }
  },
  
  // Feature flags
  features: {
    enableUserAccounts: false,  // Requires backend
    enableHistory: false,        // Requires backend
    enableAIGrading: false,      // Requires backend with AI API
    enableAnalytics: false       // Requires backend
  }
};
