import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import GroceryListInput from '@/components/scan/GroceryListInput';
import { findGrocery } from '@/lib/gemini';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getCanadianProducts, findProductByName, analyzeGroceryList } from '@/lib/products';
import { loadDefaultCSVData } from '@/lib/csvParser';

interface Product {
  name: string;
  category: string;
  brand: string;
}

interface ResultItem {
  originalName: string;
  americanProduct: Product | undefined;
  canadianAlternatives: Product[];
}

interface GeminiAnalysis {
  recommendedProducts: string[];
  brandsToAvoid: string[];
  brandsToLookFor: string[];
  insights: string;
}

const Scan = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [geminiAnalysis, setGeminiAnalysis] = useState<GeminiAnalysis | null>(null);
  const [canadianScore, setCanadianScore] = useState<number>(0);
  const [results, setResults] = useState<ResultItem[] | null>(null);
  const [productData, setProductData] = useState<any>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const csvData = await loadDefaultCSVData();
        setProductData(csvData);
        console.log("CSV data loaded:", csvData);
      } catch (error) {
        console.error("Error loading CSV data:", error);
      }
    };
    
    fetchData();
  }, []);

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

  const handleGrocerySubmit = async (items: string[]) => {
    setIsProcessing(true);
    try {
      // Join the array of items into a single string, separated by commas
      const groceryList = items.join(', ');
      console.log("Submitting grocery list:", groceryList);
      
      const analysis = await findGrocery(groceryList);
      console.log("Received analysis:", analysis);
      
      setGeminiAnalysis(analysis);
      
      // Create a simple results array based on geminiAnalysis
      // This is a simplified version - you may need to adjust based on your actual data structure
      if (analysis && analysis.recommendedProducts) {
        const simpleResults = analysis.recommendedProducts.map(product => ({
          originalName: product,
          americanProduct: undefined,
          canadianAlternatives: [{
            name: product,
            category: "Recommended",
            brand: analysis.brandsToLookFor[0] || "Canadian Brand"
          }]
        }));
        
        console.log("Setting results:", simpleResults);
        setResults(simpleResults);
        
        // Set a default Canadian score (adjust as needed)
        setCanadianScore(80);
      }
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
    iconColor,
  }: {
    brands: string[];
    icon: any;
    title: string;
    description: string;
    iconColor: string;
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
          {brands.length > 0 ? (
            brands.map((brand, index) => (
              <li key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                {/* Display the brand logo */}
                <div className="w-6 h-6 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src={`/brands/${brand.toLowerCase().replace(/\s+/g, '-')}.png`}
                    alt={brand}
                    className="w-5 h-5 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = '/brands/default-placeholder.png'; // Fallback image
                      e.currentTarget.onerror = null; // Prevent infinite error loop
                    }}
                  />
                </div>
                <span>{brand}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic">No brands to display</li>
          )}
        </ul>
      </CardContent>
    </Card>
  );

  const RecommendedProducts = ({ products }: { products: string[] }) => (
    <Card className="bg-white dark:bg-gray-900 shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-full bg-green-600">
            <CheckCircle className="h-5 w-5 text-white" />
          </div>
          <CardTitle className="text-xl">Recommended Products</CardTitle>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          These are the recommended products based on your input.
        </p>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product, index) => (
            <li
              key={index}
              className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md shadow-md"
            >
              {/* Display product image */}
              <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={`/products/${product.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.png`}
                  alt={product}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/brands/default-placeholder.png'; // Fallback image
                    e.currentTarget.onerror = null; // Prevent infinite error loop
                  }}
                />
              </div>
              {/* Display product name */}
              <span className="text-gray-900 dark:text-white font-medium">{product}</span>
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
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-4 px-0 mt-20"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Button>

        <div className='mb-5'>
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white animate-fade-in">
          Scan Your Grocery List
        </h1>
        <p
          className="text-gray-600 dark:text-gray-300 mt-4 animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          Enter your list of American products to find Canadian alternatives.
        </p>

        </div>

        {/* Input Form */}
        {!geminiAnalysis && (
          <GroceryListInput onSubmit={handleGrocerySubmit} isProcessing={isProcessing} />
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

            {/* Recommended Products */}
            {geminiAnalysis && geminiAnalysis.recommendedProducts && geminiAnalysis.recommendedProducts.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-100 dark:border-gray-700 animate-fade-in">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Recommended Canadian Products</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {geminiAnalysis.recommendedProducts.map((product, index) => {
                    // Find a matching product in the CSV data
                    const canadianProduct = productData?.canadianAlternatives?.find(
                      item => item.name.toLowerCase().includes(product.toLowerCase()) ||
                             product.toLowerCase().includes(item.name.toLowerCase())
                    );
                    
                    // Use exact image path from CSV or fallback
                    const imagePath = canadianProduct?.image || '/placeholder.svg';
                    
                    return (
                      <Card key={index} className="overflow-hidden border-canada-blue/20">
                        <div className="flex">
                          <div className="p-4 flex-shrink-0">
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-md w-24 h-24 flex items-center justify-center overflow-hidden">
                              <img 
                                src={imagePath} 
                                alt={product}
                                className="object-contain w-20 h-20" 
                                onError={(e) => {
                                  // Fallback if image doesn't load
                                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col flex-grow">
                            <CardHeader className="bg-canada-blue/5 pb-2">
                              <CardTitle className="text-lg font-medium">
                                {canadianProduct?.name || product}
                              </CardTitle>
                              {canadianProduct?.price && (
                                <p className="text-sm text-gray-500">${canadianProduct.price.toFixed(2)} CAD</p>
                              )}
                            </CardHeader>
                            <CardContent className="pt-4">
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Canadian alternative recommended based on your grocery list
                              </p>
                              {canadianProduct && (
                                <div className="mt-2 space-y-1">
                                  <p className="text-sm font-medium text-canada-blue">
                                    Category: {canadianProduct.category || 'Various'}
                                  </p>
                                  <p className="text-sm font-medium text-canada-blue">
                                    Brand: {canadianProduct.brand || 'Various'}
                                  </p>
                                </div>
                              )}
                            </CardContent>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Insights */}
            {geminiAnalysis && geminiAnalysis.insights && (
              <Alert className="mt-6 bg-secondary border-canada-blue">
                <InfoIcon className="h-4 w-4 text-canada-blue" />
                <AlertTitle>Insights from Analysis</AlertTitle>
                <AlertDescription>{geminiAnalysis.insights}</AlertDescription>
              </Alert>
            )}

            {/* Reset Button */}
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
