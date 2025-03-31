import { loadDefaultCSVData } from '@/lib/csvParser';
import { GoogleGenerativeAI } from '@google/generative-ai';
const canadianBrands = "Black Diamond, Lactantia, Liberté, Gay Lea, Organic Meadow, Dempster's, Country Harvest, President's Choice, No Name,"
const americanBrands = "Kraft, Yoplait, Land O'Lakes, Horizon Organic, Wonder Bread, Pepperidge Farm, Arnold Bread, Thomas, Kellogg's," 
interface GeminiAnalysisResult {
  brandsToAvoid?: string[];
  brandsToLookFor?: string[];
  insights?: string;
  reccomendedProducts?: string[];
}

export const findGrocery = async (items: string): Promise<GeminiAnalysisResult | null> => {
    const data = await loadDefaultCSVData();
    const canadianAlternatives = data.canadianAlternatives;
    const prompt = `given this grocery list ${items}, only using the following data ${JSON.stringify(canadianAlternatives)} reccomend canadian products (no more than 2) from the data, and 6 canadian brands from only this list ${canadianBrands} only , and their top 6 american brands to avoid based on what their needs from the data ${americanBrands} only. Return only the json,use exactly the brand and product names i've given, and use the following Schema:

responseSchema: {
type: "object",
properties: {
reccomendedProducts: {
type: "array",
items: {
type: "string"
}
},
brandsToAvoid: {
type: "array",
items: {
type: "string"
}
},
brandsToLookFor: {
type: "array",
items: {
type: "string"
}
},
insights: {
type: "string"
}
}
},
};`;

    const GEMINI_API_KEY = "AIzaSyDEIpiqa39xk347cn-Tj7aOhcJPPe6u-yw"; 

    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-lite",
      });
    
      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/text",
      };
    
      const chatSession = model.startChat({
        history: [],
      });
    
      const result = await chatSession.sendMessage(prompt);
      console.log(result.response.text());
      
      // Parse the JSON text response instead of using .json() method
      let responseText = result.response.text();
      responseText.trim()
      responseText = responseText.trim(); 
      responseText = responseText.replace(/^(```json\s*|\s*```|\n|\r)*/, ""); // Remove leading "```json", "```", newlines, and carriage returns
      responseText = responseText.replace(/(```\s*|\n|\r)*$/, ""); // Remove trailing "```", newlines, and carriage returns
      const jsonResponse = JSON.parse(responseText);
      
      return {
        reccomendedProducts: jsonResponse.reccomendedProducts || [],
        brandsToAvoid: jsonResponse.brandsToAvoid || [],
        brandsToLookFor: jsonResponse.brandsToLookFor || [],
        insights: jsonResponse.insights || ''
      };
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return null;
    }
};