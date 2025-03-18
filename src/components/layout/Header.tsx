
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X, Leaf } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCanadianFlag, setIsCanadianFlag] = useState(true);

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.scan'), href: '/scan' },
    { name: t('nav.browse'), href: '/browse' },
    { name: t('nav.about'), href: '/about' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Animate between flags every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsCanadianFlag(prev => !prev);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-40 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-md overflow-hidden">
                {/* Canadian Flag */}
                <div 
                  className={cn(
                    "absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out",
                    isCanadianFlag ? "opacity-100" : "opacity-0"
                  )}
                >
                  <div className="h-full flex">
                    <div className="w-1/4 h-full bg-canada-red"></div>
                    <div className="w-2/4 h-full bg-white flex items-center justify-center">
                      <div className="text-canada-red text-lg transform scale-150">&#127809;</div>
                    </div>
                    <div className="w-1/4 h-full bg-canada-red"></div>
                  </div>
                </div>
                
                {/* American Flag */}
                <div 
                  className={cn(
                    "absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out",
                    isCanadianFlag ? "opacity-0" : "opacity-100"
                  )}
                >
                  <div className="h-full flex flex-col">
                    <div className="h-4/7 flex">
                      <div className="w-4/12 h-full bg-canada-blue flex items-center justify-center">
                        <span className="text-[7px] text-white">★</span>
                      </div>
                      <div className="w-8/12 h-full flex flex-col">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="h-1/4 bg-canada-red"></div>
                        ))}
                      </div>
                    </div>
                    <div className="h-3/7 flex flex-col">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-1/3 bg-canada-red"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-xl font-bold text-primary">{t('app.name')}</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right section with theme and language toggles */}
          <div className="flex items-center space-x-1">
            <ThemeToggle />
            <LanguageSwitcher />

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden ml-1"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
