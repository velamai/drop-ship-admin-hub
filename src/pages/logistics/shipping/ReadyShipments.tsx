
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui/PageTitle';

const ReadyShipments = () => {
  return (
    <Layout>
      <PageTitle 
        title="Ready Shipments" 
        description="Manage shipments prepared for dispatch" 
      />
      
      <div className="container mx-auto py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Ready Shipments Management</h2>
          <p className="text-muted-foreground mb-4">
            This page displays all shipments that are ready for dispatch.
            You can assign carriers, generate manifests, and schedule departures.
          </p>
          
          {/* Placeholder content - to be implemented */}
          <div className="border rounded-md p-8 flex items-center justify-center">
            <p className="text-muted-foreground">Ready shipments content will be displayed here.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReadyShipments;
