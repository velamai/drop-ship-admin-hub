
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronDown, ChevronRight, LayoutDashboard, Users, Truck, Package, FileBox, Clock, Globe, DollarSign, LogOut, Warehouse, Box, Building, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  open,
  setOpen
}) => {
  const location = useLocation();
  const { signOut } = useAuth();

  // Determine if we're on specific page types
  const isShippingPage = location.pathname.includes('/logistics/shipping');
  const isOfficePage = location.pathname.includes('/logistics/office');
  const isLogisticsPage = location.pathname.startsWith('/logistics');
  const isDropshipPage = location.pathname.includes('/addresses') || location.pathname.includes('/orders');

  // State to track expanded sections - initialize based on current location
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    logistics: isLogisticsPage,
    office: isOfficePage,
    shipping: isShippingPage,
    dropship: isDropshipPage
  });

  // Update expanded sections when location changes
  useEffect(() => {
    setExpandedSections(prev => ({
      ...prev,
      logistics: isLogisticsPage,
      office: isOfficePage,
      shipping: isShippingPage,
      dropship: isDropshipPage
    }));
  }, [location.pathname, isLogisticsPage, isOfficePage, isShippingPage, isDropshipPage]);

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Check if a path is active
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/dashboard";
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" onClick={() => setOpen(false)} />}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed md:sticky top-0 left-0 z-50 h-screen bg-white transform transition-transform duration-300 ease-in-out",
        "border-r border-gray-200 shadow-sm flex flex-col w-64", 
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Logo & Close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-2 font-semibold" onClick={() => setOpen(false)}>
            <div className="w-7 h-7 bg-red-500 rotate-45"></div>
            <div>
              <div className="text-gray-800 text-lg font-bold">COLOMBO</div>
              <div className="text-red-500 text-xs -mt-1">MAIL ADMIN</div>
            </div>
          </Link>
          <button onClick={() => setOpen(false)} className="p-1 rounded-full hover:bg-gray-100 text-gray-500 md:hidden">
            <ChevronLeft size={18} />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto pt-4">
          <ul className="space-y-1 px-3">
            {/* Dashboard */}
            <li>
              <Link to="/" onClick={() => setOpen(false)} className={cn("flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150", isActive("/") ? "bg-purple-50 text-purple-700" : "text-gray-700 hover:bg-gray-100")}>
                <LayoutDashboard size={20} className={cn("", isActive("/") ? "text-purple-600" : "text-gray-600")} />
                <span>Dashboard</span>
              </Link>
            </li>

            {/* Users */}
            <li>
              <Link to="/users" onClick={() => setOpen(false)} className={cn("flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150", isActive("/users") ? "bg-purple-50 text-purple-700" : "text-gray-700 hover:bg-gray-100")}>
                <Users size={20} className={cn("", isActive("/users") ? "text-purple-600" : "text-gray-600")} />
                <span>Users</span>
              </Link>
            </li>

            {/* Logistics Section */}
            <li>
              <button onClick={() => toggleSection('logistics')} className={cn("flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium", isLogisticsPage ? "bg-purple-50 text-purple-700" : "text-gray-700 hover:bg-gray-100")}>
                <div className="flex items-center space-x-3">
                  <Truck size={20} className={cn("", isLogisticsPage ? "text-purple-600" : "text-gray-600")} />
                  <span>Logistics</span>
                </div>
                <ChevronDown size={16} className={cn("transition-transform duration-200", expandedSections.logistics ? "rotate-180" : "", isLogisticsPage ? "text-purple-600" : "text-gray-500")} />
              </button>

              {/* Logistics Submenu */}
              {expandedSections.logistics && <ul className="ml-7 mt-1 space-y-1 border-l border-gray-200 pl-4">
                  {/* Office Section */}
                  <li>
                    <div className={cn("flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium cursor-pointer", isOfficePage ? "bg-purple-50 text-purple-700" : "text-gray-700 hover:bg-gray-100")} onClick={() => toggleSection('office')}>
                      <div className="flex items-center space-x-3">
                        <Building size={18} className={cn("", isOfficePage ? "text-purple-600" : "text-gray-600")} />
                        <span>Office</span>
                      </div>
                      <ChevronRight size={16} className={cn("transition-transform duration-200", expandedSections.office ? "rotate-90" : "", isOfficePage ? "text-purple-600" : "text-gray-500")} />
                    </div>

                    {/* Office Submenu */}
                    {expandedSections.office && <ul className="ml-5 mt-1 space-y-1 border-l border-gray-200 pl-4">
                        <li>
                          <Link to="/logistics/office/orders" onClick={() => setOpen(false)} className={cn("flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors duration-150", isActive("/logistics/office/orders") ? "bg-purple-50 text-purple-700 font-medium" : "text-gray-600 hover:bg-gray-100")}>
                            <Box size={16} className={cn("", isActive("/logistics/office/orders") ? "text-purple-600" : "text-gray-500")} />
                            <span>Orders</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/logistics/office/pickup-orders" onClick={() => setOpen(false)} className={cn("flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors duration-150", isActive("/logistics/office/pickup-orders") ? "bg-purple-50 text-purple-700 font-medium" : "text-gray-600 hover:bg-gray-100")}>
                            <Truck size={16} className={cn("", isActive("/logistics/office/pickup-orders") ? "text-purple-600" : "text-gray-500")} />
                            <span>Pickup Orders</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/logistics/office/walking-orders" onClick={() => setOpen(false)} className={cn("flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors duration-150", isActive("/logistics/office/walking-orders") ? "bg-purple-50 text-purple-700 font-medium" : "text-gray-600 hover:bg-gray-100")}>
                            <Box size={16} className={cn("", isActive("/logistics/office/walking-orders") ? "text-purple-600" : "text-gray-500")} />
                            <span>Walking Orders</span>
                          </Link>
                        </li>
                      </ul>}
                  </li>

                  {/* Shipping Section */}
                  <li>
                    <div className={cn("flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium cursor-pointer", isShippingPage ? "bg-purple-50 text-purple-700" : "text-gray-700 hover:bg-gray-100")} onClick={() => toggleSection('shipping')}>
                      <div className="flex items-center space-x-3">
                        <Truck size={18} className={cn("", isShippingPage ? "text-purple-600" : "text-gray-600")} />
                        <span>Shipping</span>
                      </div>
                      <ChevronDown size={16} className={cn("transition-transform duration-200", expandedSections.shipping ? "rotate-180" : "", isShippingPage ? "text-purple-600" : "text-gray-500")} />
                    </div>

                    {/* Shipping Submenu */}
                    {expandedSections.shipping && <ul className="ml-5 mt-1 space-y-1 border-l border-gray-200 pl-4">
                        <li>
                          <Link to="/logistics/shipping/pending" onClick={() => setOpen(false)} className={cn("flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors duration-150", isActive("/logistics/shipping/pending") ? "bg-purple-50 text-purple-700 font-medium" : "text-gray-600 hover:bg-gray-100")}>
                            <Box size={16} className={cn("", isActive("/logistics/shipping/pending") ? "text-purple-600" : "text-gray-500")} />
                            <span>Pending</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/logistics/shipping/ready" onClick={() => setOpen(false)} className={cn("flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors duration-150", isActive("/logistics/shipping/ready") ? "bg-purple-50 text-purple-700 font-medium" : "text-gray-600 hover:bg-gray-100")}>
                            <Box size={16} className={cn("", isActive("/logistics/shipping/ready") ? "text-purple-600" : "text-gray-500")} />
                            <span>Ready</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/logistics/shipping/history" onClick={() => setOpen(false)} className={cn("flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors duration-150", isActive("/logistics/shipping/history") ? "bg-purple-50 text-purple-700 font-medium" : "text-gray-600 hover:bg-gray-100")}>
                            <Clock size={16} className={cn("", isActive("/logistics/shipping/history") ? "text-purple-600" : "text-gray-500")} />
                            <span>History</span>
                          </Link>
                        </li>
                      </ul>}
                  </li>

                  {/* Import & Export */}
                  <li>
                    <Link to="/logistics/import-export" onClick={() => setOpen(false)} className={cn("flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150", isActive("/logistics/import-export") ? "bg-purple-50 text-purple-700" : "text-gray-700 hover:bg-gray-100")}>
                      <Globe size={18} className={cn("", isActive("/logistics/import-export") ? "text-purple-600" : "text-gray-600")} />
                      <span>Import & Export</span>
                    </Link>
                  </li>

                  {/* Currency Exchange */}
                  <li>
                    <Link to="/logistics/currency-exchange" onClick={() => setOpen(false)} className={cn("flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150", isActive("/logistics/currency-exchange") ? "bg-purple-50 text-purple-700" : "text-gray-700 hover:bg-gray-100")}>
                      <DollarSign size={18} className={cn("", isActive("/logistics/currency-exchange") ? "text-purple-600" : "text-gray-600")} />
                      <span>Currency Exchange</span>
                    </Link>
                  </li>
                </ul>}
            </li>

            {/* Drop & Ship Section */}
            <li>
              <div className={cn("flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium cursor-pointer", isDropshipPage ? "bg-purple-50 text-purple-700" : "text-gray-700 hover:bg-gray-100")} onClick={() => toggleSection('dropship')}>
                <div className="flex items-center space-x-3">
                  <Warehouse size={20} className={cn("", isDropshipPage ? "text-purple-600" : "text-gray-600")} />
                  <span>Drop & Ship</span>
                </div>
                <ChevronRight size={16} className={cn("transition-transform duration-200", expandedSections.dropship ? "rotate-90" : "", isDropshipPage ? "text-purple-600" : "text-gray-500")} />
              </div>

              {/* Drop & Ship Submenu */}
              {expandedSections.dropship && <ul className="ml-7 mt-1 space-y-1 border-l border-gray-200 pl-4">
                  <li>
                    <Link to="/addresses" onClick={() => setOpen(false)} className={cn("flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors duration-150", isActive("/addresses") ? "bg-purple-50 text-purple-700 font-medium" : "text-gray-600 hover:bg-gray-100")}>
                      <FileBox size={18} className={cn("", isActive("/addresses") ? "text-purple-600" : "text-gray-500")} />
                      <span>Addresses</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" onClick={() => setOpen(false)} className={cn("flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors duration-150", isActive("/orders") ? "bg-purple-50 text-purple-700 font-medium" : "text-gray-600 hover:bg-gray-100")}>
                      <Box size={18} className={cn("", isActive("/orders") ? "text-purple-600" : "text-gray-500")} />
                      <span>Orders</span>
                    </Link>
                  </li>
                </ul>}
            </li>

            {/* E-commerce */}
            <li>
              <div className={cn("flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium cursor-pointer", "text-gray-700 hover:bg-gray-100")}>
                <div className="flex items-center space-x-3">
                  <ShoppingBag size={20} className="text-gray-600" />
                  <span>E-commerce</span>
                </div>
                <ChevronRight size={16} className="text-gray-500" />
              </div>
            </li>
          </ul>
        </nav>
        
        {/* User section */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          <button onClick={signOut} className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
            <LogOut size={18} className="mr-2" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>;
};
