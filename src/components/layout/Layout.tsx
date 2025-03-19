
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen w-full bg-background overflow-hidden">
      <div className="h-screen flex-shrink-0">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      </div>
      
      <div className="flex flex-col flex-1 w-full h-screen overflow-hidden">
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className={`flex-1 p-4 md:p-6 transition-all duration-300 overflow-y-auto ${isMobile && sidebarOpen ? 'opacity-50' : ''}`}>
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
