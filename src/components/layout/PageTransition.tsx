
import { ReactNode, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const PageTransition = ({ children, className }: PageTransitionProps) => {
  const location = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Reset animation classes
    if (pageRef.current) {
      pageRef.current.classList.remove('animate-slide-out');
      pageRef.current.classList.remove('animate-slide-in');
      
      // Force a reflow
      void pageRef.current.offsetWidth;
      
      // Add the animation class
      pageRef.current.classList.add('animate-slide-in');
    }
  }, [location.pathname]);

  return (
    <div 
      ref={pageRef}
      className={cn(
        "animate-slide-in transition-all duration-300 ease-in-out w-full",
        className
      )}
    >
      <div className="content-wrapper">
        {children}
      </div>
    </div>
  );
};

export default PageTransition;
