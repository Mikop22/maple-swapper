
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Leaf, ShoppingCart, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Layout>
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32 subtle-pattern">
        <div className="absolute inset-0 bg-gradient-radial from-white/60 to-transparent dark:from-gray-900/60 dark:to-transparent"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-canada-red/10 text-canada-red mb-4 md:mb-6 fade-up-item">
              <Leaf className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">{t('home.hero.tag')}</span>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 tracking-tight fade-up-item">
              <span className="gradient-text">{t('app.tagline')}</span>
            </h1>
            
            <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8 leading-relaxed fade-up-delayed">
              {t('app.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center fade-up-more-delayed">
              <Button 
                size="lg" 
                className="gap-2 px-6 h-12 rounded-full shadow-lg shadow-primary/20 w-full sm:w-auto"
                onClick={() => navigate('/scan')}
              >
                {t('action.start.scanning')}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="gap-2 px-6 h-12 rounded-full bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 w-full sm:w-auto"
                onClick={() => navigate('/browse')}
              >
                {t('action.browse.alternatives')}
              </Button>
            </div>
          </div>

          <div className="mt-10 md:mt-16 max-w-5xl mx-auto">
            <div className="flex justify-center">
              <div className="w-full max-w-3xl h-48 md:h-64 relative">
                <div className="absolute inset-2/4 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 md:w-64 h-48 md:h-64 relative animate-float scale-in-item">
                    <div className="absolute top-0 left-0 w-32 md:w-40 h-32 md:h-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 -rotate-6 transform-gpu">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                          <Leaf className="h-5 w-5 text-canada-red" />
                        </div>
                        <span className="text-xs md:text-sm font-semibold">Canadian Alternative</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full mb-2"></div>
                      <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full w-2/3 mb-2"></div>
                      <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full w-3/4"></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 rotate-6 transform-gpu">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                          <ShoppingCart className="h-5 w-5 text-blue-500" />
                        </div>
                        <span className="text-xs md:text-sm font-semibold">Your Shopping List</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full mb-2"></div>
                      <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full w-1/2 mb-2"></div>
                      <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4 fade-cascade-1">
              {t('home.how.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 fade-cascade-2">
              {t('home.how.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <ShoppingCart className="h-6 w-6" />,
                titleKey: 'home.step1.title',
                descriptionKey: 'home.step1.description',
                delay: "0.1s"
              },
              {
                icon: <Leaf className="h-6 w-6" />,
                titleKey: 'home.step2.title',
                descriptionKey: 'home.step2.description',
                delay: "0.2s"
              },
              {
                icon: <DollarSign className="h-6 w-6" />,
                titleKey: 'home.step3.title',
                descriptionKey: 'home.step3.description',
                delay: "0.3s"
              }
            ].map((step, index) => (
              <Card 
                key={index} 
                className="border-none shadow-md hover:shadow-lg transition-all card-hover card-stagger"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-5">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t(step.descriptionKey)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 md:mt-20 max-w-4xl mx-auto bg-secondary rounded-2xl p-6 md:p-8 text-center scale-in-item" style={{"--item-delay": "0.4s"} as any}>
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 fade-cascade-3">{t('home.cta.title')}</h3>
            <p className="mb-4 md:mb-6 max-w-2xl mx-auto fade-cascade-4">{t('home.cta.description')}</p>
            <Button 
              size="lg" 
              className="gap-2 px-6 md:px-8 h-12 rounded-full shadow-lg shadow-primary/20 fade-cascade-5 w-full sm:w-auto"
              onClick={() => navigate('/scan')}
            >
              {t('action.get.started')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
