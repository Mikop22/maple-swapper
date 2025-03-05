
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import GroceryListInput from '@/components/scan/GroceryListInput';
import AlternativeMatch from '@/components/common/AlternativeMatch';
import { getAlternativesForList, findProductByName, Product } from '@/data/products';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ResultItem {
  originalName: string;
  americanProduct: Product | undefined;
  canadianAlternatives: Product[];
}

const Scan = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<ResultItem[] | null>(null);
  
  const handleGroceryListSubmit = (items: string[]) => {
    setIsProcessing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const alternatives = getAlternativesForList(items);
      
      const processedResults: ResultItem[] = items.map(name => {
        const americanProduct = findProductByName(name);
        return {
          originalName: name,
          americanProduct,
          canadianAlternatives: alternatives[name] || []
        };
      });
      
      setResults(processedResults);
      setIsProcessing(false);
    }, 1500);
  };
  
  return (
    <Layout className="py-12 px-4 md:px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Scan Your Grocery List
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Enter your list of American products to find Canadian alternatives
          </p>
        </div>
        
        <GroceryListInput 
          onSubmit={handleGroceryListSubmit}
          isProcessing={isProcessing}
        />
        
        {results && results.length > 0 && (
          <div className="mt-10 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Canadian Alternatives
            </h2>
            
            <Alert className="mb-6">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                We found alternatives for {results.filter(r => r.canadianAlternatives.length > 0).length} out of {results.length} items.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4">
              {results.map((result, index) => (
                <AlternativeMatch
                  key={index}
                  americanProduct={result.americanProduct}
                  canadianAlternatives={result.canadianAlternatives}
                  originalName={result.originalName}
                />
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button variant="outline" onClick={() => setResults(null)}>
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
