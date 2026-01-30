
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Make body non-scrollable on this page only
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <Layout>
      <section className="relative overflow-hidden h-screen flex items-center subtle-pattern">
        <div className="absolute inset-0 bg-gradient-radial from-white/60 to-transparent"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-canada-red/10 text-canada-red mb-4 md:mb-6 fade-up-item">
              <Leaf className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">{t('home.hero.tag')}</span>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 tracking-tight fade-up-item">
              <span className="gradient-text">{t('app.tagline')}</span>
            </h1>
            
            <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed fade-up-delayed">
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
                className="gap-2 px-6 h-12 rounded-full bg-white/80 backdrop-blur-sm w-full sm:w-auto"
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
                    <div className="absolute top-0 left-0 w-32 md:w-40 h-32 md:h-40 bg-white shadow-lg rounded-lg p-4 -rotate-6 transform-gpu animate-float" style={{ animationDelay: "0.1s" }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                          <Leaf className="h-5 w-5 text-canada-red" />
                        </div>
                        <span className="text-xs md:text-sm font-semibold">Canadian Alternative</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full mb-2"></div>
                      <div className="h-1.5 bg-gray-100 rounded-full w-2/3 mb-2"></div>
                      <div className="h-1.5 bg-gray-100 rounded-full w-3/4"></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-white shadow-lg rounded-lg p-4 rotate-6 transform-gpu animate-float" style={{ animationDelay: "0.3s" }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                          <ShoppingCart className="h-5 w-5 text-blue-500" />
                        </div>
                        <span className="text-xs md:text-sm font-semibold">Your Shopping List</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full mb-2"></div>
                      <div className="h-1.5 bg-gray-100 rounded-full w-1/2 mb-2"></div>
                      <div className="h-1.5 bg-gray-100 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Language Switcher - Fixed in bottom right corner */}
      <div className="fixed bottom-6 right-6 z-50">
        <LanguageSwitcher />
      </div>
    </Layout>
  );
};

export default Index;
