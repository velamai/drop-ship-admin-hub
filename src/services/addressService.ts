
import { supabase } from "@/integrations/supabase/client";
import { Address } from "@/types";

// Get the session token for authenticated requests
const getAuthToken = async (): Promise<string | null> => {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token || null;
};

// Fetch all addresses from the Edge Function
export const fetchAddresses = async (): Promise<Address[]> => {
  const token = await getAuthToken();
  
  console.log("Auth token available:", !!token);
  
  try {
    const { data, error } = await supabase.functions.invoke('addresses', {
      method: 'GET',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    if (error) {
      console.error('Error fetching addresses:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching addresses:', error);
    throw error;
  }
};

// Add a new address via the Edge Function
export const addAddress = async (
  newAddress: Omit<Address, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Address> => {
  const token = await getAuthToken();
  
  try {
    const { data, error } = await supabase.functions.invoke('addresses', {
      method: 'POST',
      body: newAddress,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    if (error) {
      console.error('Error adding address:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error adding address:', error);
    throw error;
  }
};

// Update an existing address via the Edge Function
export const updateAddress = async (updatedAddress: Address): Promise<Address> => {
  const token = await getAuthToken();
  
  try {
    const { data, error } = await supabase.functions.invoke(`addresses/${updatedAddress.id}`, {
      method: 'PUT',
      body: updatedAddress,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    if (error) {
      console.error('Error updating address:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating address:', error);
    throw error;
  }
};

// Delete an address via the Edge Function
export const deleteAddress = async (id: string): Promise<{ success: boolean, id: string }> => {
  const token = await getAuthToken();
  
  try {
    const { data, error } = await supabase.functions.invoke(`addresses/${id}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    if (error) {
      console.error('Error deleting address:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error;
  }
};
