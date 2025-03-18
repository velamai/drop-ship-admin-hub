
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { OrderDetail as OrderDetailComponent } from '@/components/orders/OrderDetail';
import { Order } from '@/types';
import { useToast } from '@/hooks/use-toast';

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch order details
    // In a real app, this would be an actual API call
    setTimeout(() => {
      // Sample data - This would come from an API in a real app
      if (id === 'ORD123456789') {
        setOrder({
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
        });
      } else if (id === 'ORD987654321') {
        setOrder({
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
        });
      } else if (id === 'ORD567891234') {
        setOrder({
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
        });
      } else {
        // Handle invalid order ID
        toast({
          title: "Order not found",
          description: "The requested order could not be found.",
          variant: "destructive"
        });
        navigate('/orders');
      }
      
      setLoading(false);
    }, 800); // Simulate network delay
  }, [id, navigate, toast]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-t-4 border-primary border-solid rounded-full animate-spin"></div>
            <p className="mt-4 text-muted-foreground">Loading order details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested order could not be found.</p>
          <button 
            onClick={() => navigate('/orders')}
            className="btn-primary"
          >
            Return to Orders
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <OrderDetailComponent order={order} />
    </Layout>
  );
};

export default OrderDetail;
