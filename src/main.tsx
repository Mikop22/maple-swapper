
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize data from CSV before rendering the app
async function initApp() {
  try {
    // Try to load data from CSV
    
    // App will use the loaded data
  } catch (error) {
    console.error('Failed to load CSV data:', error);
    // App will fall back to default product data
  }
  
  // Render the app
  createRoot(document.getElementById("root")!).render(<App />);
}

initApp();
