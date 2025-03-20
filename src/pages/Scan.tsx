
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import GroceryListInput from '@/components/scan/GroceryListInput';
import AlternativeMatch from '@/components/common/AlternativeMatch';
import { findProductByName, getCanadianProducts, Product } from '@/data/products';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, ArrowLeft, CheckCircle, XCircle, Leaf } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { analyzeGroceryList } from '@/lib/gemini';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface ResultItem {
  originalName: string;
  americanProduct: Product | undefined;
  canadianAlternatives: Product[];
}

interface GeminiAnalysis {
  recommendedBrands: string[];
  brandsToAvoid: string[];
  brandsToLookFor: string[];
  insights: string;
}

const Scan = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<ResultItem[] | null>(null);
  const [geminiAnalysis, setGeminiAnalysis] = useState<GeminiAnalysis | null>(null);
  const [canadianScore, setCanadianScore] = useState<number>(0);
  const navigate = useNavigate();
  
  const handleGroceryListSubmit = async (items: string[]) => {
    setIsProcessing(true);
    
    try {
      // Find Canadian alternatives
      const canadianProducts = getCanadianProducts();
      
      const processedResults: ResultItem[] = items.map(name => {
        const americanProduct = findProductByName(name);
        
        // Simple logic to find Canadian alternatives based on category
        const canadianAlternatives = americanProduct 
          ? canadianProducts.filter(p => p.category === americanProduct.category)
          : [];
        
        return {
          originalName: name,
          americanProduct,
          canadianAlternatives
        };
      });
      
      // Get Gemini AI analysis
      const analysis = await analyzeGroceryList(items);
      
      // Calculate Canadian score based on items with alternatives
      const itemsWithAlternatives = processedResults.filter(r => r.canadianAlternatives.length > 0).length;
      const totalItems = processedResults.length;
      const calculatedScore = totalItems > 0 ? Math.round((itemsWithAlternatives / totalItems) * 100) : 0;
      
      setResults(processedResults);
      setGeminiAnalysis(analysis);
      setCanadianScore(calculatedScore);
    } catch (error) {
      console.error('Error processing grocery list:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const BrandList = ({ 
    brands, 
    icon: Icon, 
    title, 
    description, 
    iconColor 
  }: { 
    brands: string[], 
    icon: any, 
    title: string, 
    description: string,
    iconColor: string 
  }) => (
    <Card className="bg-white dark:bg-gray-900 shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-full ${iconColor}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {brands.map((brand, index) => (
            <li key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
              {/* Display the brand logo or icon here */}
              <div className="w-6 h-6 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src={`/brands/${brand.toLowerCase().replace(/\s+/g, '-')}.png`} 
                  alt={brand}
                  className="w-5 h-5 object-contain"
                  onError={(e) => {
                    // Fallback to showing the first letter if image doesn't load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = brand.charAt(0).toUpperCase();
                  }}
                />
              </div>
              <span>{brand}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
  
  const getCanadianScoreLabel = (score: number): string => {
    if (score < 30) return "Mostly American";
    if (score < 60) return "Mixed";
    if (score < 85) return "Primarily Canadian";
    return "Very Canadian";
  };
  
  const getScoreColor = (score: number): string => {
    if (score < 30) return "bg-red-500";
    if (score < 60) return "bg-amber-500";
    if (score < 85) return "bg-blue-500";
    return "bg-canada-blue";
  };
  
  return (
    <Layout className="py-12 px-4 md:px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')} 
            className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-4 px-0"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Home</span>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white animate-fade-in">
            Scan Your Grocery List
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Enter your list of American products to find Canadian alternatives
          </p>
        </div>
        
        {!results && (
          <GroceryListInput 
            onSubmit={handleGroceryListSubmit}
            isProcessing={isProcessing}
          />
        )}
        
        {results && results.length > 0 && (
          <div className="mt-8 animate-fade-in space-y-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 animate-fade-in">
                Here's Your Canadian Grocery List
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
                We've analyzed your list using Google Gemini AI and found Canadian alternatives for your American products.
              </p>
            </div>
            
            {/* Canadian Score Progress Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-100 dark:border-gray-700 animate-fade-in">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Canadian Score</h3>
                <span className="text-lg font-bold">{canadianScore}%</span>
              </div>
              <div className="mb-2">
                <Progress 
                  value={canadianScore} 
                  className="h-3" 
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>🇺🇸 American</span>
                <span className="font-medium">{getCanadianScoreLabel(canadianScore)}</span>
                <span>🇨🇦 Canadian</span>
              </div>
            </div>
            
            {geminiAnalysis && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <BrandList 
                  brands={geminiAnalysis.brandsToAvoid} 
                  icon={XCircle} 
                  title="Brands to Avoid" 
                  description="American brands that may have different ingredients or standards"
                  iconColor="bg-canada-red" 
                />
                <BrandList 
                  brands={geminiAnalysis.brandsToLookFor} 
                  icon={CheckCircle} 
                  title="Brands to Look For" 
                  description="Canadian alternatives with local ingredients and standards"
                  iconColor="bg-canada-blue" 
                />
              </div>
            )}
            
            {geminiAnalysis?.insights && (
              <Alert className="mb-8 bg-secondary border-canada-blue">
                <InfoIcon className="h-4 w-4 text-canada-blue" />
                <AlertTitle>Insights from Analysis</AlertTitle>
                <AlertDescription>
                  {geminiAnalysis.insights}
                </AlertDescription>
              </Alert>
            )}
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 animate-fade-in">
                <Leaf className="h-5 w-5 text-canada-red" />
                <span>Product Alternatives</span>
              </h3>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium">
                    Found alternatives for {results.filter(r => r.canadianAlternatives.length > 0).length} out of {results.length} items
                  </p>
                  <div className="flex gap-2">
                    <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Found</span>
                    </span>
                    <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full flex items-center gap-1">
                      <XCircle className="h-3 w-3 text-red-500" />
                      <span>Not found</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className={cn(
                "space-y-4 grid gap-4",
                results.length > 2 ? "grid-cols-1" : "grid-cols-1"
              )}>
                {results.map((result, index) => (
                  <AlternativeMatch
                    key={index}
                    americanProduct={result.americanProduct}
                    canadianAlternatives={result.canadianAlternatives}
                    originalName={result.originalName}
                  />
                ))}
              </div>
            </div>
            
            <div className="mt-12 flex justify-center">
              <Button 
                variant="outline" 
                onClick={() => {
                  setResults(null);
                  setGeminiAnalysis(null);
                  setCanadianScore(0);
                }}
                className="px-8"
              >
                Scan Another List
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Scan;
