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
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn( "fixed top-0 w-full z-20 transition-all duration-300 ease-in-out px-4 md:px-6 py-1", "bg-white/90 dark:bg-transparent backdrop-blur-md shadow-sm" )}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-lg">
                <Leaf className="h-4 w-4 text-red-600 dark:text-white" />
              </div>
              <span className="text-base font-weight-1000 text-black dark:text-white">
                MapleSwapper
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm transition-colors relative pb-1",
                  isActive(item.href)
                    ? "text-gray-900 dark:text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-600 dark:after:bg-red-600" 
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-red-600 dark:hover:after:bg-red-600 hover:after:opacity-50"
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
                    ? "bg-red-600 text-white"
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
