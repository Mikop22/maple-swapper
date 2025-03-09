
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/common/ProductCard';
import { getCanadianProducts, Product, getAmericanProducts } from '@/data/products';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Browse = () => {
  const { t } = useLanguage();
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
    <Layout className="py-6 md:py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-6 md:mb-10 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4 animate-fade-in">
            {t('browse.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 animate-fade-in">
            {t('browse.description')}
          </p>
        </div>
        
        <div className="max-w-xl mx-auto mb-6 md:mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder={t('browse.search.placeholder')}
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
            className="mb-6 md:mb-8"
          >
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="canadian">{t('browse.tab.canadian')}</TabsTrigger>
              <TabsTrigger value="american">{t('browse.tab.american')}</TabsTrigger>
              <TabsTrigger value="all">{t('browse.tab.all')}</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {searchTerm && displayedProducts.length === 0 ? (
            <div className="text-center py-8 md:py-12 animate-fade-in">
              <p className="text-gray-500 dark:text-gray-400">
                {t('browse.no.results').replace('{0}', searchTerm)}
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSearchTerm('')}
              >
                {t('browse.clear.search')}
              </Button>
            </div>
          ) : (
            <>
              {activeTab === 'canadian' && displayedProducts.length > 0 && (
                <div className="bg-canada-red/5 rounded-lg p-4 mb-6 md:mb-8 flex items-center gap-3 border border-canada-red/20 animate-fade-in">
                  <Sparkles className="h-5 w-5 text-canada-red flex-shrink-0" />
                  <p className="text-sm">
                    {t('browse.canadian.banner')}
                  </p>
                </div>
              )}
            
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
