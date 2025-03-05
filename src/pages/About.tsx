
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { MapleLeaf, Leaf, Heart, DollarSign, Package } from 'lucide-react';

const About = () => {
  return (
    <Layout className="py-12 px-4 md:px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            About MapleSwap
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Helping Canadians find local alternatives to American products
          </p>
        </div>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <Card className="overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  In response to recent tariffs on American products, we created MapleSwap to help Canadians easily find locally-made alternatives. Our mission is to support Canadian businesses and help consumers avoid unnecessary tariffs while discovering high-quality Canadian products.
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: <MapleLeaf className="h-6 w-6 text-canada-red" />,
                      title: "Canadian Pride",
                      description: "Promoting and supporting Canadian-made products."
                    },
                    {
                      icon: <DollarSign className="h-6 w-6 text-green-600" />,
                      title: "Tariff Avoidance",
                      description: "Helping consumers avoid unnecessary import tariffs."
                    },
                    {
                      icon: <Leaf className="h-6 w-6 text-emerald-600" />,
                      title: "Local Support",
                      description: "Strengthening the Canadian economy and local businesses."
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-4">
                      <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                        {item.icon}
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <Card className="overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <ol className="space-y-6">
                  {[
                    {
                      title: "Upload Your Grocery List",
                      description: "Enter your shopping list manually, upload a file, or take a photo. We'll process each item to identify American-made products."
                    },
                    {
                      title: "Smart Detection",
                      description: "Our system analyzes each product to determine its origin and identifies potential tariff implications."
                    },
                    {
                      title: "Find Canadian Alternatives",
                      description: "We match American products with comparable Canadian-made alternatives based on quality, price, and availability."
                    },
                    {
                      title: "Save and Shop",
                      description: "Use your new shopping list with Canadian alternatives to save money and support local businesses."
                    }
                  ].map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Heart className="h-6 w-6 text-rose-500" />,
                  title: "Community Support",
                  description: "We believe in strengthening Canadian communities by promoting local products and businesses."
                },
                {
                  icon: <Package className="h-6 w-6 text-amber-500" />,
                  title: "Quality Products",
                  description: "We only recommend high-quality Canadian alternatives that match or exceed their American counterparts."
                },
                {
                  icon: <Leaf className="h-6 w-6 text-emerald-500" />,
                  title: "Environmental Responsibility",
                  description: "Local products often have a smaller carbon footprint due to reduced transportation needs."
                },
                {
                  icon: <DollarSign className="h-6 w-6 text-blue-500" />,
                  title: "Economic Growth",
                  description: "Supporting Canadian businesses helps create jobs and stimulates our local economy."
                }
              ].map((value, index) => (
                <Card key={index} className="overflow-hidden h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 flex-1">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
