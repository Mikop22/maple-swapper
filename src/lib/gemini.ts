import { loadDefaultCSVData } from '@/lib/csvParser';
import OpenAI from "openai";

const canadianBrands = "Black Diamond, Lactantia, Liberté, Gay Lea, Organic Meadow, Dempster's, Country Harvest, President's Choice, No Name,";
const americanBrands = "Kraft, Yoplait, Land O'Lakes, Horizon Organic, Wonder Bread, Pepperidge Farm, Arnold Bread, Thomas, Kellogg's,";

// Maximum number of brands to return in fallback response
const MAX_BRANDS_IN_RESPONSE = 6;

// NOTE: Using dangerouslyAllowBrowser is a security risk as it exposes API keys in the browser.
// For production, API calls should be routed through a backend proxy server to protect credentials.
// This is a known limitation for client-side applications without a backend.
const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;

const openai = apiKey ? new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // Required for client-side usage - consider backend proxy for production
}) : null;

interface GroceryAnalysisResult {
  brandsToAvoid: string[];
  brandsToLookFor: string[];
  insights: string;
  recommendedProducts: string[];
}

export const analyzeGroceryList = async (items: string): Promise<GroceryAnalysisResult> => {
  // Validate API client is available
  if (!openai) {
    console.warn('DeepSeek API key not configured. Using fallback response.');
    return {
      brandsToAvoid: americanBrands.split(',').map(b => b.trim()).filter(Boolean).slice(0, MAX_BRANDS_IN_RESPONSE),
      brandsToLookFor: canadianBrands.split(',').map(b => b.trim()).filter(Boolean).slice(0, MAX_BRANDS_IN_RESPONSE),
      insights: 'API not configured. Showing default Canadian alternatives.',
      recommendedProducts: ['President\'s Choice products', 'No Name alternatives']
    };
  }

  await loadDefaultCSVData();
  
  const prompt = `Analyze this grocery list for Canadian consumers:
  ${items}
  
  Available Canadian brands: ${canadianBrands}
  Common American brands to avoid: ${americanBrands}
  
  Provide your response in JSON format with the following structure:
  {
    "recommendedProducts": ["Product 1", "Product 2"],
    "brandsToAvoid": ["Brand 1", "Brand 2", "Brand 3", "Brand 4", "Brand 5", "Brand 6"],
    "brandsToLookFor": ["Brand 1", "Brand 2", "Brand 3", "Brand 4", "Brand 5", "Brand 6"],
    "insights": "Brief shopping insights text here"
  }
  
  Include:
  - Top 2 Canadian product matches from our database
  - 6 recommended Canadian brands
  - 6 American brands to avoid
  - Brief shopping insights`;
  
  try {
    const completion = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [{
        role: "user",
        content: prompt
      }],
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('Empty response from API');
    }
    
    const result = JSON.parse(content);
    
    return result;
  } catch (error) {
    console.error('DeepSeek API Error:', error);
    throw new Error('Failed to analyze grocery list');
  }
};

export const findGrocery = analyzeGroceryList;
