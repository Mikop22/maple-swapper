
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Leaf, ShoppingCart, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <section className="relative overflow-hidden py-24 md:py-32 subtle-pattern">
        <div className="absolute inset-0 bg-gradient-radial from-white/60 to-transparent dark:from-gray-900/60 dark:to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-canada-red/10 text-canada-red mb-6 animate-fade-in">
              <Leaf className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Combat US tariffs with Canadian alternatives</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight animate-fade-up [animation-delay:0.1s]">
              <span className="gradient-text">Find Canadian alternatives</span> to American products
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-fade-up [animation-delay:0.2s]">
              Upload your grocery list and instantly discover Canadian-made alternatives to help you avoid US tariffs while supporting local businesses.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:0.3s]">
              <Button 
                size="lg" 
                className="gap-2 px-6 h-12 rounded-full shadow-lg shadow-primary/20"
                onClick={() => navigate('/scan')}
              >
                Start Scanning
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="gap-2 px-6 h-12 rounded-full bg-white/80 backdrop-blur-sm dark:bg-gray-800/80"
                onClick={() => navigate('/browse')}
              >
                Browse Alternatives
              </Button>
            </div>
          </div>

          <div className="mt-16 max-w-5xl mx-auto">
            <div className="flex justify-center">
              <div className="w-full max-w-3xl h-64 relative">
                <div className="absolute inset-2/4 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 relative animate-float">
                    <div className="absolute top-0 left-0 w-40 h-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 -rotate-6 transform-gpu">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                          <Leaf className="h-5 w-5 text-canada-red" />
                        </div>
                        <span className="text-sm font-semibold">Canadian Alternative</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full mb-2"></div>
                      <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full w-2/3 mb-2"></div>
                      <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full w-3/4"></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 rotate-6 transform-gpu">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                          <ShoppingCart className="h-5 w-5 text-blue-500" />
                        </div>
                        <span className="text-sm font-semibold">Your Shopping List</span>
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
      
      <section className="py-20 bg-white dark:bg-gray-900">
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
                  "border-none shadow-md hover:shadow-lg transition-all card-hover",
                  "animate-fade-up"
                )}
                style={{ animationDelay: step.delay }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-5">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-20 max-w-4xl mx-auto bg-secondary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to find Canadian alternatives?</h3>
            <p className="mb-6 max-w-2xl mx-auto">Support local businesses and avoid tariffs by making smarter choices with MapleSwap.</p>
            <Button 
              size="lg" 
              className="gap-2 px-8 h-12 rounded-full shadow-lg shadow-primary/20"
              onClick={() => navigate('/scan')}
            >
              Get Started Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
