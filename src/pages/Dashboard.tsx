
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui/PageTitle';
import { Link } from 'react-router-dom';
import { Package, MapPin, Settings, TrendingUp, AlertTriangle, Check } from 'lucide-react';

const Dashboard = () => {
  // This would come from an API in a real application
  const stats = {
    orders: {
      total: 142,
      pending: 24,
      processing: 18,
      shipped: 38,
      delivered: 62,
    },
    addresses: 12,
  };

  return (
    <Layout>
      <PageTitle 
        title="Dashboard" 
        description="Welcome to the Drop & Ship Admin Dashboard" 
      />
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card rounded-lg border shadow-sm p-6 flex items-start space-x-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
            <h3 className="text-3xl font-bold">{stats.orders.total}</h3>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <p className="text-xs font-medium text-green-500">5% from last week</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg border shadow-sm p-6 flex items-start space-x-4">
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-yellow-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
            <h3 className="text-3xl font-bold">{stats.orders.pending}</h3>
            <div className="flex items-center mt-1">
              <Link to="/orders" className="text-xs font-medium text-primary">View all pending orders</Link>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg border shadow-sm p-6 flex items-start space-x-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="h-6 w-6 text-green-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Completed Orders</p>
            <h3 className="text-3xl font-bold">{stats.orders.delivered}</h3>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <p className="text-xs font-medium text-green-500">12% from last month</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/orders" className="block bg-card rounded-lg border shadow-sm overflow-hidden group hover:border-primary transition-colors">
          <div className="p-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Manage Orders</h3>
            <p className="text-sm text-muted-foreground">
              View, process, and update order statuses
            </p>
          </div>
          <div className="px-6 py-3 bg-muted/30 border-t border-border flex justify-between items-center">
            <span className="text-sm font-medium">View Orders</span>
            <span className="text-primary">&rarr;</span>
          </div>
        </Link>
        
        <Link to="/addresses" className="block bg-card rounded-lg border shadow-sm overflow-hidden group hover:border-primary transition-colors">
          <div className="p-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Manage Addresses</h3>
            <p className="text-sm text-muted-foreground">
              View and manage warehouse/facility addresses
            </p>
          </div>
          <div className="px-6 py-3 bg-muted/30 border-t border-border flex justify-between items-center">
            <span className="text-sm font-medium">View Addresses</span>
            <span className="text-primary">&rarr;</span>
          </div>
        </Link>
        
        <Link to="/settings" className="block bg-card rounded-lg border shadow-sm overflow-hidden group hover:border-primary transition-colors">
          <div className="p-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Settings</h3>
            <p className="text-sm text-muted-foreground">
              Configure system settings and preferences
            </p>
          </div>
          <div className="px-6 py-3 bg-muted/30 border-t border-border flex justify-between items-center">
            <span className="text-sm font-medium">View Settings</span>
            <span className="text-primary">&rarr;</span>
          </div>
        </Link>
      </div>
      
      {/* Recent Activity - Placeholder for future functionality */}
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="bg-card rounded-lg border shadow-sm p-6">
        <p className="text-muted-foreground text-center py-6">
          Recent activity will be displayed here.
        </p>
      </div>
    </Layout>
  );
};

export default Dashboard;
