
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronDown, 
  LayoutDashboard, 
  Users, 
  Truck, 
  Package, 
  FileBox, 
  Clock, 
  CheckCircle, 
  History, 
  Globe, 
  DollarSign, 
  LogOut,
  Warehouse,
  Box,
  Building
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const location = useLocation();
  const { signOut } = useAuth();
  
  // State to track expanded sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    logistics: true,
    office: true,
    shipping: true,
    dropship: true
  });

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

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
          "fixed md:sticky top-0 left-0 z-50 h-full w-64 md:w-64 bg-brand-primary transform transition-transform duration-300 ease-in-out",
          "border-r border-sidebar-border shadow-sm flex flex-col",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo & Close button */}
        <div className="flex items-center justify-between p-4 border-b border-brand-primary/80">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-white font-semibold text-lg"
            onClick={() => setOpen(false)}
          >
            <Package className="h-6 w-6 text-white" />
            <span>Drop & Ship</span>
          </Link>
          <button 
            onClick={() => setOpen(false)}
            className="p-1 rounded-full hover:bg-brand-primary/80 text-white md:hidden"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {/* Dashboard */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150",
              isActive("/") || isActive("/dashboard")
                ? "bg-white text-brand-primary"
                : "text-white hover:bg-brand-primary/80 hover:text-white"
            )}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>

          {/* Users */}
          <Link
            to="/users"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150",
              isActive("/users")
                ? "bg-white text-brand-primary"
                : "text-white hover:bg-brand-primary/80 hover:text-white"
            )}
          >
            <Users size={18} />
            <span>Users</span>
          </Link>

          {/* Logistics Section */}
          <div className="space-y-1">
            <button
              onClick={() => toggleSection('logistics')}
              className={cn(
                "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium",
                isActive("/logistics")
                  ? "bg-white text-brand-primary"
                  : "text-white hover:bg-brand-primary/80 hover:text-white"
              )}
            >
              <div className="flex items-center space-x-2">
                <Truck size={18} />
                <span>Logistics</span>
              </div>
              <ChevronDown 
                size={16} 
                className={cn(
                  "transition-transform duration-200",
                  expandedSections.logistics ? "rotate-180" : ""
                )} 
              />
            </button>

            {/* Logistics Submenu */}
            {expandedSections.logistics && (
              <div className="pl-4 ml-2 border-l border-white/30 space-y-1">
                {/* Office Section */}
                <div className="space-y-1">
                  <button
                    onClick={() => toggleSection('office')}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium",
                      isActive("/logistics/office")
                        ? "bg-white text-brand-primary"
                        : "text-white hover:bg-brand-primary/80 hover:text-white"
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <Building size={18} />
                      <span>Office</span>
                    </div>
                    <ChevronDown 
                      size={16} 
                      className={cn(
                        "transition-transform duration-200",
                        expandedSections.office ? "rotate-180" : ""
                      )} 
                    />
                  </button>

                  {/* Office Submenu */}
                  {expandedSections.office && (
                    <div className="pl-4 ml-2 border-l border-white/30 space-y-1">
                      <Link
                        to="/logistics/office/orders"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                          isActive("/logistics/office/orders")
                            ? "bg-white text-brand-primary"
                            : "text-white hover:bg-brand-primary/80 hover:text-white"
                        )}
                      >
                        <Box size={16} />
                        <span>Orders</span>
                      </Link>
                      <Link
                        to="/logistics/office/pickup-orders"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                          isActive("/logistics/office/pickup-orders")
                            ? "bg-white text-brand-primary"
                            : "text-white hover:bg-brand-primary/80 hover:text-white"
                        )}
                      >
                        <Truck size={16} />
                        <span>Pickup Orders</span>
                      </Link>
                      <Link
                        to="/logistics/office/walking-orders"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                          isActive("/logistics/office/walking-orders")
                            ? "bg-white text-brand-primary"
                            : "text-white hover:bg-brand-primary/80 hover:text-white"
                        )}
                      >
                        <Box size={16} />
                        <span>Walking Orders</span>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Shipping Section */}
                <div className="space-y-1">
                  <button
                    onClick={() => toggleSection('shipping')}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium",
                      isActive("/logistics/shipping")
                        ? "bg-white text-brand-primary"
                        : "text-white hover:bg-brand-primary/80 hover:text-white"
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <Truck size={18} />
                      <span>Shipping</span>
                    </div>
                    <ChevronDown 
                      size={16} 
                      className={cn(
                        "transition-transform duration-200",
                        expandedSections.shipping ? "rotate-180" : ""
                      )} 
                    />
                  </button>

                  {/* Shipping Submenu */}
                  {expandedSections.shipping && (
                    <div className="pl-4 ml-2 border-l border-white/30 space-y-1">
                      <Link
                        to="/logistics/shipping/pending"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                          isActive("/logistics/shipping/pending")
                            ? "bg-white text-brand-primary"
                            : "text-white hover:bg-brand-primary/80 hover:text-white"
                        )}
                      >
                        <Box size={16} />
                        <span>Pending</span>
                      </Link>
                      <Link
                        to="/logistics/shipping/ready"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                          isActive("/logistics/shipping/ready")
                            ? "bg-white text-brand-primary"
                            : "text-white hover:bg-brand-primary/80 hover:text-white"
                        )}
                      >
                        <Box size={16} />
                        <span>Ready</span>
                      </Link>
                      <Link
                        to="/logistics/shipping/history"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                          isActive("/logistics/shipping/history")
                            ? "bg-white text-brand-primary"
                            : "text-white hover:bg-brand-primary/80 hover:text-white"
                        )}
                      >
                        <History size={16} />
                        <span>History</span>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Import & Export */}
                <Link
                  to="/logistics/import-export"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                    isActive("/logistics/import-export")
                      ? "bg-white text-brand-primary"
                      : "text-white hover:bg-brand-primary/80 hover:text-white"
                  )}
                >
                  <Globe size={18} />
                  <span>Import & Export</span>
                </Link>

                {/* Currency Exchange */}
                <Link
                  to="/logistics/currency-exchange"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                    isActive("/logistics/currency-exchange")
                      ? "bg-white text-brand-primary"
                      : "text-white hover:bg-brand-primary/80 hover:text-white"
                  )}
                >
                  <DollarSign size={18} />
                  <span>Currency Exchange</span>
                </Link>
              </div>
            )}
          </div>

          {/* Drop & Ship Section */}
          <div className="space-y-1">
            <button
              onClick={() => toggleSection('dropship')}
              className={cn(
                "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium",
                isActive("/dropship")
                  ? "bg-white text-brand-primary"
                  : "text-white hover:bg-brand-primary/80 hover:text-white"
              )}
            >
              <div className="flex items-center space-x-2">
                <Warehouse size={18} />
                <span>Drop & Ship</span>
              </div>
              <ChevronDown 
                size={16} 
                className={cn(
                  "transition-transform duration-200",
                  expandedSections.dropship ? "rotate-180" : ""
                )} 
              />
            </button>

            {/* Drop & Ship Submenu */}
            {expandedSections.dropship && (
              <div className="pl-4 ml-2 border-l border-white/30 space-y-1">
                <Link
                  to="/addresses"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                    isActive("/addresses")
                      ? "bg-white text-brand-primary"
                      : "text-white hover:bg-brand-primary/80 hover:text-white"
                  )}
                >
                  <FileBox size={18} />
                  <span>Addresses</span>
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                    isActive("/orders")
                      ? "bg-white text-brand-primary"
                      : "text-white hover:bg-brand-primary/80 hover:text-white"
                  )}
                >
                  <Box size={18} />
                  <span>Orders</span>
                </Link>
              </div>
            )}
          </div>
        </nav>
        
        {/* User section */}
        <div className="p-4 border-t border-white/30">
          <button 
            onClick={signOut}
            className="flex items-center w-full px-3 py-2 text-sm text-white hover:bg-brand-primary/80 rounded-md"
          >
            <LogOut size={18} className="mr-2" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
