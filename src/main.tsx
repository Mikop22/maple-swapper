
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { loadDefaultCSVData } from './lib/csvParser';
import { updateProductData } from './data/products';

// Initialize data from CSV before rendering the app
async function initApp() {
  try {
    // Try to load data from CSV
    const { americanProducts, canadianAlternatives } = await loadDefaultCSVData();
    
    // If we have data from CSV, update the product data
    if (americanProducts.length > 0) {
      updateProductData(americanProducts, canadianAlternatives);
      console.log(`Loaded ${americanProducts.length} products from CSV`);
    } else {
      console.log('No CSV data loaded, using default product data');
    }
  } catch (error) {
    console.error('Failed to load CSV data:', error);
    // App will fall back to default product data
  }
  
  // Render the app
  createRoot(document.getElementById("root")!).render(<App />);
}

initApp();
