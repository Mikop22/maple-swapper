
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Heart, DollarSign, Package } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  
  return (
    <Layout className="py-6 md:py-12 px-4 md:px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
            {t('about.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
            {t('about.tagline')}
          </p>
        </div>
        
        <div className="space-y-8 md:space-y-12">
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('about.mission.title')}
            </h2>
            <Card className="overflow-hidden">
              <CardContent className="p-5 md:p-8">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('about.mission.description')}
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      icon: <Leaf className="h-6 w-6 text-canada-red" />,
                      titleKey: 'about.value1.title',
                      descriptionKey: 'about.value1.description'
                    },
                    {
                      icon: <DollarSign className="h-6 w-6 text-green-600" />,
                      titleKey: 'about.value2.title',
                      descriptionKey: 'about.value2.description'
                    },
                    {
                      icon: <Leaf className="h-6 w-6 text-emerald-600" />,
                      titleKey: 'about.value3.title',
                      descriptionKey: 'about.value3.description'
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-4">
                      <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                        {item.icon}
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                        {t(item.titleKey)}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t(item.descriptionKey)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
          
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('about.how.title')}
            </h2>
            <Card className="overflow-hidden">
              <CardContent className="p-5 md:p-8">
                <ol className="space-y-6">
                  {[
                    {
                      titleKey: 'about.how.step1.title',
                      descriptionKey: 'about.how.step1.description'
                    },
                    {
                      titleKey: 'about.how.step2.title',
                      descriptionKey: 'about.how.step2.description'
                    },
                    {
                      titleKey: 'about.how.step3.title',
                      descriptionKey: 'about.how.step3.description'
                    },
                    {
                      titleKey: 'about.how.step4.title',
                      descriptionKey: 'about.how.step4.description'
                    }
                  ].map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                          {t(step.titleKey)}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {t(step.descriptionKey)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </section>
          
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('about.values.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                {
                  icon: <Heart className="h-6 w-6 text-rose-500" />,
                  titleKey: 'about.value.community.title',
                  descriptionKey: 'about.value.community.description'
                },
                {
                  icon: <Package className="h-6 w-6 text-amber-500" />,
                  titleKey: 'about.value.quality.title',
                  descriptionKey: 'about.value.quality.description'
                },
                {
                  icon: <Leaf className="h-6 w-6 text-emerald-500" />,
                  titleKey: 'about.value.environment.title',
                  descriptionKey: 'about.value.environment.description'
                },
                {
                  icon: <DollarSign className="h-6 w-6 text-blue-500" />,
                  titleKey: 'about.value.economy.title',
                  descriptionKey: 'about.value.economy.description'
                }
              ].map((value, index) => (
                <Card key={index} className="overflow-hidden h-full">
                  <CardContent className="p-5 md:p-6 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-medium text-gray-900 dark:text-white mb-2">
                      {t(value.titleKey)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 flex-1">
                      {t(value.descriptionKey)}
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
