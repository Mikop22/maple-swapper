
import { ReactNode } from 'react';
import PageTransition from './PageTransition';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className={cn("flex-1", className)}>
        <PageTransition>
          {children}
        </PageTransition>
      </main>
    </div>
  );
};

export default Layout;
