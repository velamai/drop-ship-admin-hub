
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui/PageTitle';

const PickupOrders = () => {
  return (
    <Layout>
      <PageTitle 
        title="Pickup Orders" 
        description="Coordinate package collection from customers" 
      />
      
      <div className="container mx-auto py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Pickup Orders Management</h2>
          <p className="text-muted-foreground mb-4">
            This page is used to manage and track pickup orders where packages are collected from customers.
            You can schedule pickups, assign personnel, and track collection status.
          </p>
          
          {/* Placeholder content - to be implemented */}
          <div className="border rounded-md p-8 flex items-center justify-center">
            <p className="text-muted-foreground">Pickup orders content will be displayed here.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PickupOrders;
