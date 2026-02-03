// API Configuration
export const API_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? '/api'  // Vercel will proxy to serverless functions
    : 'http://localhost:5000/api');

// Other configuration
export const config = {
  apiUrl: API_URL,
  appName: 'Talentinsulin',
  version: '2.0.0',
  // Add other configuration as needed
};

export default config;
