
import { useState } from 'react';
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

  return (
    <header className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-40 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="relative flex items-center justify-center w-8 h-8 rounded-md bg-gray-900 dark:bg-gray-100 overflow-hidden">
                <Leaf className="absolute h-5 w-5 text-white dark:text-gray-900 animate-pulse-subtle" />
                <span className="absolute inset-0 bg-gradient-to-r from-canada-red to-canada-blue opacity-0 group-hover:opacity-80 transition-opacity duration-700"></span>
                <span className="absolute h-full w-full bg-canada-red/20 dark:bg-canada-red/30 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
              </span>
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 group-hover:from-canada-red group-hover:to-canada-blue transition-all duration-700">
                {t('app.name')}
              </span>
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
