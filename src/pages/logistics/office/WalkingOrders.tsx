
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui/PageTitle';

const WalkingOrders = () => {
  return (
    <Layout>
      <PageTitle 
        title="Walking Orders" 
        description="Manage orders from walk-in customers" 
      />
      
      <div className="container mx-auto py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Walking Orders Management</h2>
          <p className="text-muted-foreground mb-4">
            This page is used to manage orders from walk-in customers without registered accounts.
            You can create new orders, view customer history, and process services.
          </p>
          
          {/* Placeholder content - to be implemented */}
          <div className="border rounded-md p-8 flex items-center justify-center">
            <p className="text-muted-foreground">Walking orders content will be displayed here.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WalkingOrders;
