
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui/PageTitle';

const ShippingHistory = () => {
  return (
    <Layout>
      <PageTitle 
        title="Shipping History" 
        description="View archive of completed shipments" 
      />
      
      <div className="container mx-auto py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Shipping History</h2>
          <p className="text-muted-foreground mb-4">
            This page provides a comprehensive archive of all completed shipments.
            You can search, filter, and generate reports based on historical shipping data.
          </p>
          
          {/* Placeholder content - to be implemented */}
          <div className="border rounded-md p-8 flex items-center justify-center">
            <p className="text-muted-foreground">Shipping history content will be displayed here.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingHistory;
