
import { supabase } from "@/integrations/supabase/client";
import { Address } from "@/types";

// Get the session token for authenticated requests
const getAuthToken = async (): Promise<string> => {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token || '';
};

// Fetch all addresses from the Edge Function
export const fetchAddresses = async (): Promise<Address[]> => {
  const token = await getAuthToken();
  
  const { data, error } = await supabase.functions.invoke('addresses', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (error) {
    console.error('Error fetching addresses:', error);
    throw error;
  }

  return data;
};

// Add a new address via the Edge Function
export const addAddress = async (
  newAddress: Omit<Address, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Address> => {
  const token = await getAuthToken();
  
  const { data, error } = await supabase.functions.invoke('addresses', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: newAddress,
  });

  if (error) {
    console.error('Error adding address:', error);
    throw error;
  }

  return data;
};

// Update an existing address via the Edge Function
export const updateAddress = async (updatedAddress: Address): Promise<Address> => {
  const token = await getAuthToken();
  
  const { data, error } = await supabase.functions.invoke(`addresses/${updatedAddress.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'PUT',
    body: updatedAddress,
  });

  if (error) {
    console.error('Error updating address:', error);
    throw error;
  }

  return data;
};

// Delete an address via the Edge Function
export const deleteAddress = async (id: string): Promise<{ success: boolean, id: string }> => {
  const token = await getAuthToken();
  
  const { data, error } = await supabase.functions.invoke(`addresses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'DELETE',
  });

  if (error) {
    console.error('Error deleting address:', error);
    throw error;
  }

  return data;
};
