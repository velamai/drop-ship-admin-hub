
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui/PageTitle';
import { OrderList } from '@/components/orders/OrderList';
import { Order } from '@/types';

const Orders = () => {
  // Sample data - in a real app, this would come from an API call
  const orders: Order[] = [
    {
      id: 'ORD123456789',
      userId: 'USR123',
      userName: 'John Smith',
      userEmail: 'john.smith@example.com',
      status: 'pending',
      items: [
        {
          id: 'ITM1',
          productId: 'PROD1',
          productName: 'Ergonomic Desk Chair',
          quantity: 1,
          price: 249.99,
          isReady: true
        },
        {
          id: 'ITM2',
          productId: 'PROD2',
          productName: 'Standing Desk Converter',
          quantity: 1,
          price: 179.99,
          isReady: false
        }
      ],
      subtotal: 429.98,
      tax: 34.40,
      shipping: 15.00,
      total: 479.38,
      shippingAddress: {
        addressLine1: '123 Main St',
        addressLine2: 'Apt 4B',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'United States'
      },
      createdAt: '2023-05-15T10:30:00Z',
      updatedAt: '2023-05-15T10:30:00Z',
      statusHistory: [
        {
          status: 'pending',
          timestamp: '2023-05-15T10:30:00Z'
        }
      ]
    },
    {
      id: 'ORD987654321',
      userId: 'USR456',
      userName: 'Jane Doe',
      userEmail: 'jane.doe@example.com',
      status: 'processing',
      items: [
        {
          id: 'ITM3',
          productId: 'PROD3',
          productName: 'Wireless Keyboard',
          quantity: 1,
          price: 89.99,
          isReady: true
        },
        {
          id: 'ITM4',
          productId: 'PROD4',
          productName: 'Wireless Mouse',
          quantity: 1,
          price: 59.99,
          isReady: true
        },
        {
          id: 'ITM5',
          productId: 'PROD5',
          productName: 'Monitor Stand',
          quantity: 2,
          price: 34.99,
          isReady: true
        }
      ],
      subtotal: 219.96,
      tax: 17.60,
      shipping: 10.00,
      total: 247.56,
      shippingAddress: {
        addressLine1: '456 Market St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'United States'
      },
      createdAt: '2023-05-14T14:45:00Z',
      updatedAt: '2023-05-15T09:15:00Z',
      statusHistory: [
        {
          status: 'pending',
          timestamp: '2023-05-14T14:45:00Z'
        },
        {
          status: 'processing',
          timestamp: '2023-05-15T09:15:00Z'
        }
      ]
    },
    {
      id: 'ORD567891234',
      userId: 'USR789',
      userName: 'Emily Johnson',
      userEmail: 'emily.johnson@example.com',
      status: 'delivered',
      items: [
        {
          id: 'ITM6',
          productId: 'PROD6',
          productName: 'Laptop Stand',
          quantity: 1,
          price: 49.99,
          isReady: true
        },
        {
          id: 'ITM7',
          productId: 'PROD7',
          productName: 'USB-C Hub',
          quantity: 1,
          price: 39.99,
          isReady: true
        }
      ],
      subtotal: 89.98,
      tax: 7.20,
      shipping: 5.00,
      total: 102.18,
      shippingAddress: {
        addressLine1: '789 King Road',
        addressLine2: 'Building B',
        city: 'London',
        postalCode: 'EC1A 1BB',
        country: 'United Kingdom'
      },
      createdAt: '2023-05-10T11:20:00Z',
      updatedAt: '2023-05-13T16:30:00Z',
      statusHistory: [
        {
          status: 'pending',
          timestamp: '2023-05-10T11:20:00Z'
        },
        {
          status: 'processing',
          timestamp: '2023-05-11T09:00:00Z'
        },
        {
          status: 'processed',
          timestamp: '2023-05-11T14:15:00Z'
        },
        {
          status: 'shipped',
          timestamp: '2023-05-12T10:30:00Z'
        },
        {
          status: 'delivered',
          timestamp: '2023-05-13T16:30:00Z'
        }
      ]
    }
  ];

  return (
    <Layout>
      <PageTitle 
        title="Order Management" 
        description="View and manage customer orders" 
      />
      
      <OrderList orders={orders} />
    </Layout>
  );
};

export default Orders;
