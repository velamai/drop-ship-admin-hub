
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui/PageTitle';
import { AddressList } from '@/components/addresses/AddressList';
import { Address } from '@/types';

const Addresses = () => {
  // Sample data - in a real app, this would come from an API call
  const addresses: Address[] = [
    {
      id: '1',
      addressLine1: '123 Main Street',
      addressLine2: 'Suite 100',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'United States',
      createdAt: '2023-01-15T10:00:00Z',
      updatedAt: '2023-01-15T10:00:00Z'
    },
    {
      id: '2',
      addressLine1: '456 Market Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
      createdAt: '2023-02-20T11:30:00Z',
      updatedAt: '2023-03-15T09:45:00Z'
    },
    {
      id: '3',
      addressLine1: '789 King Road',
      addressLine2: 'Building B',
      city: 'London',
      postalCode: 'EC1A 1BB',
      country: 'United Kingdom',
      createdAt: '2023-03-05T14:20:00Z',
      updatedAt: '2023-03-05T14:20:00Z'
    }
  ];

  return (
    <Layout>
      <PageTitle 
        title="Address Management" 
        description="Manage warehouse and facility addresses" 
      />
      
      <AddressList addresses={addresses} />
    </Layout>
  );
};

export default Addresses;
