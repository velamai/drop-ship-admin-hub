
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui/PageTitle';

const PendingShipments = () => {
  return (
    <Layout>
      <PageTitle 
        title="Pending Shipments" 
        description="Manage shipments awaiting processing" 
      />
      
      <div className="container mx-auto py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Pending Shipments Management</h2>
          <p className="text-muted-foreground mb-4">
            This page displays all shipments that are awaiting processing.
            You can verify information, prepare packages, and move shipments to the Ready state.
          </p>
          
          {/* Placeholder content - to be implemented */}
          <div className="border rounded-md p-8 flex items-center justify-center">
            <p className="text-muted-foreground">Pending shipments content will be displayed here.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PendingShipments;
