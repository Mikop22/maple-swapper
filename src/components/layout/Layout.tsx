
import { ReactNode } from 'react';
import Header from './Header';
import PageTransition from './PageTransition';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={cn("flex-1 pt-16 md:pt-20", className)}>
        <PageTransition>
          {children}
        </PageTransition>
      </main>
    </div>
  );
};

export default Layout;
