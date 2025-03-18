
import React, { useState } from 'react';
import { PlusCircle, Filter, MapPin, Loader2 } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';
import { AddressCard } from './AddressCard';
import { Address } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { AddressForm } from './AddressForm';

interface AddressListProps {
  addresses: Address[];
  loading?: boolean;
  onAddAddress?: (newAddress: Omit<Address, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateAddress?: (updatedAddress: Address) => void;
  onDeleteAddress?: (id: string) => void;
}

export const AddressList: React.FC<AddressListProps> = ({ 
  addresses: initialAddresses,
  loading = false,
  onAddAddress,
  onUpdateAddress,
  onDeleteAddress
}) => {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const { toast } = useToast();

  // Update local addresses when initialAddresses changes (e.g. from parent fetching data)
  React.useEffect(() => {
    setAddresses(initialAddresses);
  }, [initialAddresses]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // In a real app, this would likely be an API call
    if (!value) {
      setAddresses(initialAddresses);
    } else {
      const filtered = initialAddresses.filter(address => 
        address.addressLine1.toLowerCase().includes(value.toLowerCase()) ||
        address.city.toLowerCase().includes(value.toLowerCase()) ||
        address.country.toLowerCase().includes(value.toLowerCase())
      );
      setAddresses(filtered);
    }
  };

  const handleDelete = (id: string) => {
    if (onDeleteAddress) {
      onDeleteAddress(id);
    } else {
      // Fallback to local state if no callback provided
      setAddresses(addresses.filter(address => address.id !== id));
      
      toast({
        title: "Address deleted",
        description: "The address has been removed successfully.",
      });
    }
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setShowAddForm(true);
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setShowAddForm(true);
  };

  const handleFormSubmit = (addressData: Omit<Address, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingAddress) {
      const updatedAddress = { 
        ...editingAddress, 
        ...addressData 
      };
      
      if (onUpdateAddress) {
        onUpdateAddress(updatedAddress);
      } else {
        // Fallback to local state if no callback provided
        setAddresses(addresses.map(addr => 
          addr.id === editingAddress.id ? updatedAddress : addr
        ));

        toast({
          title: "Address updated",
          description: "The address has been updated successfully.",
        });
      }
    } else {
      if (onAddAddress) {
        onAddAddress(addressData);
      } else {
        // Fallback to local state if no callback provided
        // Note: In a real app, we would need to generate an id
        const newAddress: Address = {
          id: `temp-${Date.now()}`,
          ...addressData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        setAddresses([...addresses, newAddress]);
        
        toast({
          title: "Address added",
          description: "The address has been added successfully.",
        });
      }
    }
    
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SearchBar 
          placeholder="Search addresses..." 
          onSearch={handleSearch} 
        />
        
        <div className="flex items-center gap-3">
          <button className="btn-outline">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
          
          <button 
            className="btn-primary"
            onClick={handleAddNew}
          >
            <PlusCircle size={16} className="mr-2" />
            Add Address
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Loader2 size={40} className="animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading addresses...</p>
        </div>
      ) : addresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <MapPin size={24} className="text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-1">No addresses found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm 
              ? `No addresses match "${searchTerm}"`
              : "Get started by adding a new address"
            }
          </p>
          {!searchTerm && (
            <button 
              className="btn-primary"
              onClick={handleAddNew}
            >
              <PlusCircle size={16} className="mr-2" />
              Add Address
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {addresses.map((address) => (
            <AddressCard 
              key={address.id} 
              address={address} 
              onEdit={() => handleEdit(address)}
              onDelete={() => handleDelete(address.id)}
            />
          ))}
        </div>
      )}
      
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h2>
              
              <AddressForm 
                address={editingAddress || undefined}
                onSubmit={handleFormSubmit}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
