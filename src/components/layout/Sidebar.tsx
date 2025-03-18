
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, LayoutDashboard, Package, MapPin, Settings, LogOut, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const location = useLocation();
  const { signOut } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Orders', path: '/orders', icon: Package },
    { name: 'Addresses', path: '/addresses', icon: MapPin },
    { name: 'Logistics', path: '/logistics', icon: Truck },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed md:sticky top-0 left-0 z-50 h-full w-64 md:w-64 bg-sidebar transform transition-transform duration-300 ease-in-out",
          "border-r border-sidebar-border shadow-sm flex flex-col",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo & Close button */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-sidebar-foreground font-semibold text-lg"
            onClick={() => setOpen(false)}
          >
            <Package className="h-6 w-6 text-primary" />
            <span>Drop & Ship</span>
          </Link>
          <button 
            onClick={() => setOpen(false)}
            className="p-1 rounded-full hover:bg-sidebar-accent text-sidebar-foreground md:hidden"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                location.pathname === item.path
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        
        {/* User section */}
        <div className="p-4 border-t border-sidebar-border">
          <button 
            onClick={signOut}
            className="flex items-center w-full px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-md"
          >
            <LogOut size={18} className="mr-2" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
