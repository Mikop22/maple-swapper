
// Utility for interacting with Google Gemini AI API

interface GeminiAnalysisResult {
  recommendedBrands: string[];
  brandsToAvoid: string[];
  brandsToLookFor: string[];
  insights: string;
}

// API key for Gemini - in production, this should come from environment variables
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with your actual API key

export const analyzeGroceryList = async (items: string[]): Promise<GeminiAnalysisResult> => {
  console.log('Analyzing grocery list with Gemini AI:', items);
  
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analyze this grocery list for a Canadian shopper looking for local alternatives: ${items.join(', ')}. 
            Provide your response in the following JSON format with these exact keys:
            {
              "recommendedBrands": [list of 6 Canadian brands recommended specifically for these items],
              "brandsToAvoid": [list of 6 American brands that Canadians should avoid],
              "brandsToLookFor": [list of 6 Canadian brands that are good alternatives in general],
              "insights": "A paragraph of insights about differences between US and Canadian grocery products"
            }`
          }]
        }],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the text from the response
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      throw new Error('Invalid response format from Gemini API');
    }
    
    // Find the JSON object in the text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not extract JSON from Gemini response');
    }
    
    // Parse the JSON response
    const jsonResponse = JSON.parse(jsonMatch[0]);
    
    return {
      recommendedBrands: jsonResponse.recommendedBrands || [],
      brandsToAvoid: jsonResponse.brandsToAvoid || [],
      brandsToLookFor: jsonResponse.brandsToLookFor || [],
      insights: jsonResponse.insights || ''
    };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    // Return a fallback response in case of errors
    return {
      recommendedBrands: [
        "President's Choice",
        "No Name",
        "Compliments",
        "Great Value Canada",
        "Selection",
        "Our Finest"
      ],
      brandsToAvoid: [
        "Kraft Singles",
        "Hershey's Chocolate",
        "Nabisco Oreos",
        "Lay's Chips",
        "Kellogg's Cereals",
        "Jimmy Dean"
      ],
      brandsToLookFor: [
        "Chapman's Ice Cream",
        "Maple Leaf Foods",
        "PC Blue Menu",
        "Saputo Dairy",
        "Dare Foods",
        "McCain Foods"
      ],
      insights: "Many American brands use different ingredients or formulations in Canada due to stricter regulations. Look for local Canadian alternatives which often have fewer preservatives and artificial ingredients."
    };
  }
};
