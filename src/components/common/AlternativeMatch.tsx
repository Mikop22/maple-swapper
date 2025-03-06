
import { Product } from '@/data/products';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AlternativeMatchProps {
  americanProduct: Product | undefined;
  canadianAlternatives: Product[];
  originalName: string;
}

const AlternativeMatch = ({ 
  americanProduct, 
  canadianAlternatives, 
  originalName 
}: AlternativeMatchProps) => {
  const [expanded, setExpanded] = useState(false);
  const hasAlternatives = canadianAlternatives.length > 0;
  
  return (
    <Card className={cn(
      "overflow-hidden animate-fade-up border-l-4", 
      hasAlternatives ? "border-l-green-500" : "border-l-red-500"
    )}>
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              {americanProduct ? (
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-800">
                    <img 
                      src={americanProduct.image}
                      alt={americanProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {americanProduct.name}
                      </h3>
                      <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-xs rounded-full">
                        US
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {americanProduct.brand}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center h-16">
                  <div className="w-full">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      "{originalName}"
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Product not found in our database
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex md:flex-col items-center justify-center">
              <ArrowRight className="hidden md:block h-5 w-5 text-gray-400" />
              <div className="w-full md:w-auto h-px md:h-5 bg-gray-200 dark:bg-gray-700 md:bg-transparent"></div>
            </div>
            
            <div className="flex-1">
              {hasAlternatives ? (
                <div className="flex flex-col">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-800 relative">
                      <span className="absolute top-0 right-0 bg-green-500 p-0.5 rounded-bl-md">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </span>
                      <img 
                        src={canadianAlternatives[0].image}
                        alt={canadianAlternatives[0].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">
                          {canadianAlternatives[0].name}
                        </h3>
                        <span className="px-2 py-0.5 bg-red-50 dark:bg-red-900/20 text-canada-red text-xs rounded-full border border-canada-red/20">
                          Canadian
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {canadianAlternatives[0].brand}
                      </p>
                    </div>
                  </div>
                  
                  {canadianAlternatives.length > 1 && (
                    <Button 
                      variant="outline"
                      className="mt-3 text-sm h-8"
                      onClick={() => setExpanded(!expanded)}
                    >
                      {expanded ? "Show less" : `Show ${canadianAlternatives.length - 1} more alternatives`}
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex items-center h-16">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <p>No Canadian alternatives found</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {expanded && canadianAlternatives.length > 1 && (
            <div className={cn(
              "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800",
              "animate-fade-up"
            )}>
              {canadianAlternatives.slice(1).map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  compact
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlternativeMatch;
