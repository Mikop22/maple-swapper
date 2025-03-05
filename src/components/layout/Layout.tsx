
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={cn("flex-1 pt-20", className)}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
