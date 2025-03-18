
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui/PageTitle';

const OfficeOrders = () => {
  return (
    <Layout>
      <PageTitle 
        title="Office Orders" 
        description="Manage orders placed at physical offices" 
      />
      
      <div className="container mx-auto py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Office Orders Management</h2>
          <p className="text-muted-foreground mb-4">
            This page is used to manage and track orders placed at physical office locations.
            You can view order details, update status, and create new orders from this interface.
          </p>
          
          {/* Placeholder content - to be implemented */}
          <div className="border rounded-md p-8 flex items-center justify-center">
            <p className="text-muted-foreground">Office orders content will be displayed here.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OfficeOrders;
