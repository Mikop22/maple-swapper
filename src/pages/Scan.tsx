import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import GroceryListInput from '@/components/scan/GroceryListInput';
import { findGrocery } from '@/lib/gemini';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GeminiAnalysis {
  recommendedProducts: string[];
  brandsToAvoid: string[];
  brandsToLookFor: string[];
  insights: string;
}

const Scan = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [geminiAnalysis, setGeminiAnalysis] = useState<GeminiAnalysis | null>(null);

  const handleGroceryListSubmit = async (items: string[]) => {
    setIsProcessing(true);

    try {
      const itemsString = items.join(', ');
      const geminiResult = await findGrocery(itemsString);

      const analysis: GeminiAnalysis = {
        recommendedProducts: geminiResult?.reccomendedProducts || [],
        brandsToAvoid: geminiResult?.brandsToAvoid || [],
        brandsToLookFor: geminiResult?.brandsToLookFor || [],
        insights: geminiResult?.insights || '',
      };

      setGeminiAnalysis(analysis);
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
          <GroceryListInput onSubmit={handleGroceryListSubmit} isProcessing={isProcessing} />
        )}
        {/* Results */}

        {geminiAnalysis && (
          <div className="mt-8 space-y-10 animate-fade-in">
            {/* Recommended Products */}
            {geminiAnalysis.recommendedProducts.length > 0 && (
              <RecommendedProducts products={geminiAnalysis.recommendedProducts} />
            )}

            {/* Brand Analysis */}
            {geminiAnalysis && (
              <>
                {/* Brands to Avoid */}
                <BrandList
                  brands={geminiAnalysis.brandsToAvoid}
                  icon={XCircle}
                  title="Brands to Avoid"
                  description="American brands that may have different ingredients or standards."
                  iconColor="bg-canada-red"
                />

                {/* Brands to Look For */}
                <BrandList
                  brands={geminiAnalysis.brandsToLookFor}
                  icon={CheckCircle}
                  title="Brands to Look For"
                  description="Canadian alternatives with local ingredients and standards."
                  iconColor="bg-canada-blue"
                />
              </>
            )}

            {/* Insights */}
            {geminiAnalysis.insights && (
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
                onClick={() => setGeminiAnalysis(null)}
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
