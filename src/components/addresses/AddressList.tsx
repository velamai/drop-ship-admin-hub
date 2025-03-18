
import React, { useState } from 'react';
import { PlusCircle, Filter, MapPin } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';
import { AddressCard } from './AddressCard';
import { Address } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface AddressListProps {
  addresses: Address[];
}

export const AddressList: React.FC<AddressListProps> = ({ addresses: initialAddresses }) => {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const { toast } = useToast();

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
    // In a real app, this would be an API call
    setAddresses(addresses.filter(address => address.id !== id));
    
    toast({
      title: "Address deleted",
      description: "The address has been removed successfully.",
    });
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setShowAddForm(true);
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setShowAddForm(true);
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
      
      {addresses.length === 0 ? (
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
              
              {/* This would be replaced with AddressForm component */}
              <div className="space-y-4">
                <p>Address form would go here</p>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button 
                    className="btn-outline"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={() => setShowAddForm(false)}
                  >
                    {editingAddress ? 'Save Changes' : 'Add Address'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
