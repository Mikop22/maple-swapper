import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Leaf, ShoppingCart, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Index = () => {
  const navigate = useNavigate();

  const gradientBg = {
    backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.8) 100%)',
  };

  return (
    <Layout>
      <section className="relative overflow-hidden py-24 md:py-32">
        <div 
          className="absolute inset-0 z-0"
          style={gradientBg}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-canada-red/10 text-canada-red mb-6 animate-fade-in">
              <Leaf className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Combat US tariffs with Canadian alternatives</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight animate-fade-up [animation-delay:0.1s]">
              Find Canadian alternatives to American products
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-fade-up [animation-delay:0.2s]">
              Upload your grocery list and instantly discover Canadian-made alternatives to help you avoid US tariffs while supporting local businesses.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:0.3s]">
              <Button 
                size="lg" 
                className="gap-2 px-6 h-12"
                onClick={() => navigate('/scan')}
              >
                Start Scanning
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="gap-2 px-6 h-12"
                onClick={() => navigate('/browse')}
              >
                Browse Alternatives
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Three simple steps to find Canadian alternatives
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShoppingCart className="h-6 w-6" />,
                title: "Upload Your List",
                description: "Enter your grocery list manually or upload it from a file.",
                delay: "0.1s"
              },
              {
                icon: <Leaf className="h-6 w-6" />,
                title: "Discover Alternatives",
                description: "Our system finds Canadian-made alternatives to American products.",
                delay: "0.2s"
              },
              {
                icon: <DollarSign className="h-6 w-6" />,
                title: "Save on Tariffs",
                description: "Avoid tariffs while supporting Canadian businesses and products.",
                delay: "0.3s"
              }
            ].map((step, index) => (
              <Card 
                key={index} 
                className={cn(
                  "border-none shadow-md hover:shadow-lg transition-all",
                  "animate-fade-up"
                )}
                style={{ animationDelay: step.delay }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
