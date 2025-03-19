
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui/PageTitle';
import { useNavigate } from 'react-router-dom';
import { OfficeOrders as OfficeOrdersComponent } from '@/components/logistics/office/OfficeOrders';
import { supabase } from '@/integrations/supabase/client';
import { Order } from '@/types';
import { useToast } from '@/hooks/use-toast';

const OfficeOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch shipments from Supabase
  useEffect(() => {
    async function fetchShipments() {
      try {
        setLoading(true);
        
        // Fetch shipments data from the shipments table
        const { data, error } = await supabase
          .from('shipments')
          .select('*');
        
        if (error) {
          throw error;
        }
        
        // Transform shipment data to match Order format
        const transformedOrders: Order[] = data.map(shipment => ({
          id: shipment.id,
          userId: '',
          userName: shipment.recipient,
          userEmail: '',
          status: mapShipmentStatus(shipment.status),
          items: shipment.items_details ? 
            parseItems(shipment.items_details) : 
            [{ id: '1', productId: '1', productName: 'Item', quantity: shipment.items_count || 1, price: 0, isReady: true }],
          subtotal: shipment.total_amount || 0,
          tax: 0,
          shipping: 0,
          total: shipment.total_amount || 0,
          shippingAddress: parseAddress(shipment.destination_address, shipment.destination),
          createdAt: shipment.created_at,
          updatedAt: shipment.updated_at,
          statusHistory: [{
            status: mapShipmentStatus(shipment.status),
            timestamp: shipment.created_at
          }]
        }));
        
        setOrders(transformedOrders);
      } catch (error) {
        console.error('Error fetching shipments:', error);
        toast({
          title: "Error",
          description: "Failed to load shipments data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchShipments();
  }, [toast]);

  // Helper function to map shipment status to order status
  const mapShipmentStatus = (status: string | null): Order['status'] => {
    if (!status) return 'pending';
    
    const statusMap: Record<string, Order['status']> = {
      'Received': 'pending',
      'Accepted': 'processing',
      'Price Ready': 'processing',
      'Invoice Generated': 'processed',
      'Shipped': 'shipped',
      'Delivered': 'delivered'
    };
    
    return statusMap[status] || 'pending';
  };

  // Helper function to parse items from JSON
  const parseItems = (itemsDetails: any): Order['items'] => {
    try {
      if (Array.isArray(itemsDetails)) {
        return itemsDetails.map((item, index) => ({
          id: item.id || index.toString(),
          productId: item.productId || index.toString(),
          productName: item.name || 'Item',
          quantity: item.quantity || 1,
          price: item.price || 0,
          isReady: true
        }));
      }
      return [{ 
        id: '1', 
        productId: '1', 
        productName: 'Item', 
        quantity: 1, 
        price: 0, 
        isReady: true 
      }];
    } catch (error) {
      return [{ 
        id: '1', 
        productId: '1', 
        productName: 'Item', 
        quantity: 1, 
        price: 0, 
        isReady: true 
      }];
    }
  };

  // Helper function to parse address from JSON or string
  const parseAddress = (addressJson: any, destinationString: string | null): Order['shippingAddress'] => {
    try {
      if (addressJson && typeof addressJson === 'object') {
        return {
          addressLine1: addressJson.addressLine1 || addressJson.line1 || '',
          addressLine2: addressJson.addressLine2 || addressJson.line2,
          city: addressJson.city || '',
          state: addressJson.state,
          postalCode: addressJson.postalCode || addressJson.postal_code || '',
          country: addressJson.country || ''
        };
      }
      
      // Fallback to destination string
      return {
        addressLine1: destinationString || '',
        city: '',
        postalCode: '',
        country: ''
      };
    } catch (error) {
      return {
        addressLine1: destinationString || '',
        city: '',
        postalCode: '',
        country: ''
      };
    }
  };

  return (
    <Layout>
      <PageTitle 
        title="Office - Orders" 
        description="View and manage all orders and shipments" 
      />
      
      <div className="space-y-6">
        <OfficeOrdersComponent orders={orders} loading={loading} />
      </div>
    </Layout>
  );
};

export default OfficeOrders;
