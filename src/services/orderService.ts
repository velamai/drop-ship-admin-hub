
import { supabase } from "@/integrations/supabase/client";
import { Order, OrderStatus } from "@/types";

// Get the session token for authenticated requests
const getAuthToken = async (): Promise<string | null> => {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token || null;
};

// Fetch all orders from the Edge Function
export const fetchOrders = async (): Promise<Order[]> => {
  const token = await getAuthToken();
  
  console.log("Auth token available:", !!token);
  
  try {
    const { data, error } = await supabase.functions.invoke('orders', {
      method: 'GET',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    if (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Fetch a specific order by ID
export const fetchOrderById = async (id: string): Promise<Order> => {
  const token = await getAuthToken();
  
  try {
    const { data, error } = await supabase.functions.invoke(`orders/${id}`, {
      method: 'GET',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    if (error) {
      console.error(`Error fetching order with ID ${id}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error fetching order with ID ${id}:`, error);
    throw error;
  }
};

// Add a new order
export const addOrder = async (
  newOrder: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'statusHistory'>
): Promise<Order> => {
  const token = await getAuthToken();
  
  try {
    // Add current status to statusHistory
    const orderWithHistory = {
      ...newOrder,
      statusHistory: [
        {
          status: newOrder.status,
          timestamp: new Date().toISOString()
        }
      ]
    };

    const { data, error } = await supabase.functions.invoke('orders', {
      method: 'POST',
      body: orderWithHistory,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    if (error) {
      console.error('Error adding order:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error adding order:', error);
    throw error;
  }
};

// Update an existing order
export const updateOrder = async (updatedOrder: Order): Promise<Order> => {
  const token = await getAuthToken();
  
  try {
    console.log(`Updating order with ID: ${updatedOrder.id}`);
    console.log('Order data being sent:', JSON.stringify(updatedOrder));
    
    const { data, error } = await supabase.functions.invoke(`orders/${updatedOrder.id}`, {
      method: 'PUT',
      body: updatedOrder,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    if (error) {
      console.error('Error updating order:', error);
      throw error;
    }

    console.log('Update successful, received data:', data);
    return data;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

// Update order status
export const updateOrderStatus = async (
  orderId: string, 
  newStatus: OrderStatus
): Promise<Order> => {
  const token = await getAuthToken();
  
  try {
    const { data: currentOrder, error: fetchError } = await supabase.functions.invoke(`orders/${orderId}`, {
      method: 'GET',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    if (fetchError) {
      console.error(`Error fetching order with ID ${orderId}:`, fetchError);
      throw fetchError;
    }

    // Create new status history entry
    const statusUpdate = {
      status: newStatus,
      timestamp: new Date().toISOString()
    };

    // Update the order with new status and history
    const updatedOrder = {
      ...currentOrder,
      status: newStatus,
      statusHistory: [...(currentOrder.statusHistory || []), statusUpdate]
    };

    const { data, error } = await supabase.functions.invoke(`orders/${orderId}`, {
      method: 'PUT',
      body: updatedOrder,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    if (error) {
      console.error('Error updating order status:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Delete an order
export const deleteOrder = async (id: string): Promise<{ success: boolean, id: string }> => {
  const token = await getAuthToken();
  
  try {
    const { data, error } = await supabase.functions.invoke(`orders/${id}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    if (error) {
      console.error('Error deleting order:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};
