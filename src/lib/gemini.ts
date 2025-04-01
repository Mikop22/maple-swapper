import { loadDefaultCSVData } from '@/lib/csvParser';
import OpenAI from "openai";

const canadianBrands = "Black Diamond, Lactantia, Liberté, Gay Lea, Organic Meadow, Dempster's, Country Harvest, President's Choice, No Name,";
const americanBrands = "Kraft, Yoplait, Land O'Lakes, Horizon Organic, Wonder Bread, Pepperidge Farm, Arnold Bread, Thomas, Kellogg's,";

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY || "",
  dangerouslyAllowBrowser: true
});

interface GroceryAnalysisResult {
  brandsToAvoid: string[];
  brandsToLookFor: string[];
  insights: string;
  recommendedProducts: string[];
}

export const analyzeGroceryList = async (items: string): Promise<GroceryAnalysisResult> => {
  const data = await loadDefaultCSVData();
  console.log("Starting grocery analysis for:", items);
  
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

  console.log("Sending prompt to DeepSeek API");
  
  try {
    const completion = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [{
        role: "user",
        content: prompt
      }],
      response_format: { type: "json_object" }
    });

    console.log("API response received:", completion.choices[0].message.content);
    
    const result = JSON.parse(completion.choices[0].message.content);
    console.log("Parsed result:", result);
    
    return result;
  } catch (error) {
    console.error('DeepSeek API Error:', error);
    throw new Error('Failed to analyze grocery list');
  }
};

export const findGrocery = analyzeGroceryList;
