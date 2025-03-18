
import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui/PageTitle';
import { AddressList } from '@/components/addresses/AddressList';
import { Address } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { 
  fetchAddresses, 
  addAddress, 
  updateAddress, 
  deleteAddress 
} from '@/services/addressService';

const Addresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      const data = await fetchAddresses();
      setAddresses(data);
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
      const createdAddress = await addAddress(newAddress);
      setAddresses([...addresses, createdAddress]);
      
      toast({
        title: "Address added",
        description: "The address has been successfully added."
      });
      
      return createdAddress;
    } catch (error) {
      console.error('Error adding address:', error);
      toast({
        title: "Error adding address",
        description: "There was a problem adding the address.",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Handle update address
  const handleUpdateAddress = async (updatedAddress: Address) => {
    try {
      const result = await updateAddress(updatedAddress);
      
      // Update local state
      setAddresses(addresses.map(addr => 
        addr.id === updatedAddress.id ? result : addr
      ));
      
      toast({
        title: "Address updated",
        description: "The address has been successfully updated."
      });
      
      return result;
    } catch (error) {
      console.error('Error updating address:', error);
      toast({
        title: "Error updating address",
        description: "There was a problem updating the address.",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Handle delete address
  const handleDeleteAddress = async (id: string) => {
    try {
      await deleteAddress(id);
      
      // Update local state
      setAddresses(addresses.filter(addr => addr.id !== id));
      
      toast({
        title: "Address deleted",
        description: "The address has been successfully removed."
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting address:', error);
      toast({
        title: "Error deleting address",
        description: "There was a problem deleting the address.",
        variant: "destructive"
      });
      throw error;
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
