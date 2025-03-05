
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Leaf, Menu, X } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out px-6 md:px-10 py-4",
        scrolled ? "bg-white/80 dark:bg-canada-dark/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <NavLink 
          to="/" 
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Leaf className="h-6 w-6 text-canada-red" />
          <span className="font-medium text-lg text-canada-dark dark:text-white">MapleSwap</span>
        </NavLink>
        
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-canada-dark dark:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        <nav className={cn(
          "fixed md:static inset-0 top-16 bg-white dark:bg-canada-dark md:bg-transparent transform transition-transform duration-300 ease-in-out",
          "flex flex-col md:flex-row items-center justify-center md:justify-end gap-8 md:gap-6",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        )}>
          <NavLink 
            to="/"
            className={({ isActive }) => cn(
              "text-sm font-medium px-1 py-2 border-b-2 transition-all",
              isActive ? "border-canada-red text-canada-dark dark:text-white" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-canada-dark dark:hover:text-white"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/scan"
            className={({ isActive }) => cn(
              "text-sm font-medium px-1 py-2 border-b-2 transition-all",
              isActive ? "border-canada-red text-canada-dark dark:text-white" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-canada-dark dark:hover:text-white"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            Scan List
          </NavLink>
          <NavLink 
            to="/browse"
            className={({ isActive }) => cn(
              "text-sm font-medium px-1 py-2 border-b-2 transition-all",
              isActive ? "border-canada-red text-canada-dark dark:text-white" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-canada-dark dark:hover:text-white"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            Browse Alternatives
          </NavLink>
          <NavLink 
            to="/about"
            className={({ isActive }) => cn(
              "text-sm font-medium px-1 py-2 border-b-2 transition-all",
              isActive ? "border-canada-red text-canada-dark dark:text-white" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-canada-dark dark:hover:text-white"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
