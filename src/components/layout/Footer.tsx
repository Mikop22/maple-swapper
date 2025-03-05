
import { Leaf, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-8 px-6 md:px-10 border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-canada-red" />
            <span className="font-medium text-gray-700 dark:text-gray-300">MapleSwap</span>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
            Finding Canadian alternatives to American products.
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-gray-500 hover:text-canada-red transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="mailto:contact@mapleswap.ca" 
              className="text-gray-500 hover:text-canada-red transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-xs text-center text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} MapleSwap. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
