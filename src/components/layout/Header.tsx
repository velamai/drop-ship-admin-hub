
import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarOpen }) => {
  const isMobile = useIsMobile();
  
  return (
    <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-16 px-4">
        {isMobile && (
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-accent"
          >
            <Menu size={20} />
          </button>
        )}
        
        <div className="flex-1 md:ml-4">
          <h1 className="text-lg font-medium">Drop & Ship Admin</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full hover:bg-accent relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 p-1 rounded-full border border-border hover:bg-accent">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <User size={16} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
