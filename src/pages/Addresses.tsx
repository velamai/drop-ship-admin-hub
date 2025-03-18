
import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui/PageTitle';
import { AddressList } from '@/components/addresses/AddressList';
import { Address } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Addresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('addresses')
        .select('*');

      if (error) {
        throw error;
      }

      if (data) {
        // Map the database results to our Address type
        const formattedAddresses: Address[] = data.map(item => ({
          id: item.id,
          addressLine1: item.address_line1,
          addressLine2: item.address_line2 || undefined,
          city: item.city,
          state: item.state || undefined,
          postalCode: item.postal_code,
          country: item.country,
          createdAt: item.created_at,
          updatedAt: item.updated_at
        }));
        setAddresses(formattedAddresses);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast({
        title: "Error fetching addresses",
        description: "There was a problem loading your addresses.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle create address
  const handleAddAddress = async (newAddress: Omit<Address, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data, error } = await supabase
        .from('addresses')
        .insert({
          address_line1: newAddress.addressLine1,
          address_line2: newAddress.addressLine2,
          city: newAddress.city,
          state: newAddress.state,
          postal_code: newAddress.postalCode,
          country: newAddress.country
        })
        .select();

      if (error) {
        throw error;
      }

      if (data && data[0]) {
        const formattedAddress: Address = {
          id: data[0].id,
          addressLine1: data[0].address_line1,
          addressLine2: data[0].address_line2 || undefined,
          city: data[0].city,
          state: data[0].state || undefined,
          postalCode: data[0].postal_code,
          country: data[0].country,
          createdAt: data[0].created_at,
          updatedAt: data[0].updated_at
        };
        setAddresses([...addresses, formattedAddress]);
        toast({
          title: "Address added",
          description: "The address has been successfully added."
        });
      }
    } catch (error) {
      console.error('Error adding address:', error);
      toast({
        title: "Error adding address",
        description: "There was a problem adding the address.",
        variant: "destructive"
      });
    }
  };

  // Handle update address
  const handleUpdateAddress = async (updatedAddress: Address) => {
    try {
      const { error } = await supabase
        .from('addresses')
        .update({
          address_line1: updatedAddress.addressLine1,
          address_line2: updatedAddress.addressLine2,
          city: updatedAddress.city,
          state: updatedAddress.state,
          postal_code: updatedAddress.postalCode,
          country: updatedAddress.country
        })
        .eq('id', updatedAddress.id);

      if (error) {
        throw error;
      }

      // Update local state
      setAddresses(addresses.map(addr => 
        addr.id === updatedAddress.id ? updatedAddress : addr
      ));
      
      toast({
        title: "Address updated",
        description: "The address has been successfully updated."
      });
    } catch (error) {
      console.error('Error updating address:', error);
      toast({
        title: "Error updating address",
        description: "There was a problem updating the address.",
        variant: "destructive"
      });
    }
  };

  // Handle delete address
  const handleDeleteAddress = async (id: string) => {
    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Update local state
      setAddresses(addresses.filter(addr => addr.id !== id));
      
      toast({
        title: "Address deleted",
        description: "The address has been successfully removed."
      });
    } catch (error) {
      console.error('Error deleting address:', error);
      toast({
        title: "Error deleting address",
        description: "There was a problem deleting the address.",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <PageTitle 
        title="Address Management" 
        description="Manage warehouse and facility addresses" 
      />
      
      <AddressList 
        addresses={addresses} 
        loading={loading} 
        onAddAddress={handleAddAddress}
        onUpdateAddress={handleUpdateAddress}
        onDeleteAddress={handleDeleteAddress}
      />
    </Layout>
  );
};

export default Addresses;
