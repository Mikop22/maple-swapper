
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/common/ProductCard';
import { getCanadianProducts, Product, getAmericanProducts } from '@/data/products';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Sparkles } from 'lucide-react';

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const canadianProducts = getCanadianProducts();
  const americanProducts = getAmericanProducts();
  const [activeTab, setActiveTab] = useState<'all' | 'canadian' | 'american'>('canadian');
  
  const filterProducts = (products: Product[]) => {
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  let displayedProducts: Product[] = [];
  switch (activeTab) {
    case 'canadian':
      displayedProducts = filterProducts(canadianProducts);
      break;
    case 'american':
      displayedProducts = filterProducts(americanProducts);
      break;
    case 'all':
      displayedProducts = filterProducts([...canadianProducts, ...americanProducts]);
      break;
  }
  
  return (
    <Layout className="py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Browse Alternatives
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Explore Canadian-made alternatives to popular American products
          </p>
        </div>
        
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by product name, brand, or category..."
              className="pl-10 h-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as 'all' | 'canadian' | 'american')}
            className="mb-8"
          >
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="canadian">Canadian Products</TabsTrigger>
              <TabsTrigger value="american">American Products</TabsTrigger>
              <TabsTrigger value="all">All Products</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {searchTerm && displayedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No products found matching "{searchTerm}"
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSearchTerm('')}
              >
                Clear search
              </Button>
            </div>
          ) : (
            <>
              {activeTab === 'canadian' && displayedProducts.length > 0 && (
                <div className="bg-canada-red/5 rounded-lg p-4 mb-8 flex items-center gap-3 border border-canada-red/20">
                  <Sparkles className="h-5 w-5 text-canada-red flex-shrink-0" />
                  <p className="text-sm">
                    <span className="font-medium">Supporting local:</span> By choosing Canadian products, you're supporting local businesses and avoiding tariffs.
                  </p>
                </div>
              )}
            
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    className="animate-fade-up"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Browse;
