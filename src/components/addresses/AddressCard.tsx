
import React, { useState } from 'react';
import { Copy, Edit, Trash, Check } from 'lucide-react';
import { Address } from '@/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface AddressCardProps {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
}

export const AddressCard: React.FC<AddressCardProps> = ({ 
  address,
  onEdit,
  onDelete
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopy = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    
    toast({
      title: "Copied to clipboard",
      description: `${field} has been copied to your clipboard.`,
    });
    
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const confirmDelete = () => {
    setShowConfirmDelete(true);
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleDeleteConfirmed = () => {
    onDelete();
    setShowConfirmDelete(false);
  };

  return (
    <div className="relative group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-md">
      <div className="p-5">
        <div className="flex flex-col space-y-3">
          {/* Address Line 1 */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">Address Line 1</p>
              <p className="font-medium">{address.addressLine1}</p>
            </div>
            <button 
              onClick={() => handleCopy(address.addressLine1, 'Address Line 1')}
              className={cn(
                "p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent",
                copiedField === 'Address Line 1' && "text-primary bg-primary/10"
              )}
            >
              {copiedField === 'Address Line 1' ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
          
          {/* Address Line 2 (if available) */}
          {address.addressLine2 && (
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Address Line 2</p>
                <p className="font-medium">{address.addressLine2}</p>
              </div>
              <button 
                onClick={() => handleCopy(address.addressLine2 || '', 'Address Line 2')}
                className={cn(
                  "p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent",
                  copiedField === 'Address Line 2' && "text-primary bg-primary/10"
                )}
              >
                {copiedField === 'Address Line 2' ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          )}
          
          {/* City, State, Postal Code */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">City, Postal Code</p>
              <p className="font-medium">
                {address.city}
                {address.state && `, ${address.state}`}
                {` ${address.postalCode}`}
              </p>
            </div>
            <button 
              onClick={() => {
                const locationText = `${address.city}${address.state ? `, ${address.state}` : ''} ${address.postalCode}`;
                handleCopy(locationText, 'Location');
              }}
              className={cn(
                "p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent",
                copiedField === 'Location' && "text-primary bg-primary/10"
              )}
            >
              {copiedField === 'Location' ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
          
          {/* Country */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">Country</p>
              <p className="font-medium">{address.country}</p>
            </div>
            <button 
              onClick={() => handleCopy(address.country, 'Country')}
              className={cn(
                "p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent",
                copiedField === 'Country' && "text-primary bg-primary/10"
              )}
            >
              {copiedField === 'Country' ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="p-4 bg-card border-t border-border flex justify-between items-center">
        <p className="text-xs text-muted-foreground">
          Added: {new Date(address.createdAt).toLocaleDateString()}
        </p>
        
        <div className="flex space-x-2">
          <button 
            onClick={onEdit}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Edit size={16} />
          </button>
          
          <button 
            onClick={confirmDelete}
            className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
      
      {/* Delete Confirmation */}
      {showConfirmDelete && (
        <div className="absolute inset-0 flex items-center justify-center bg-card/95 backdrop-blur-sm animate-fade-in">
          <div className="p-4 text-center">
            <h3 className="font-medium mb-2">Delete this address?</h3>
            <p className="text-sm text-muted-foreground mb-4">This action cannot be undone.</p>
            
            <div className="flex justify-center space-x-3">
              <button 
                onClick={cancelDelete}
                className="btn-outline"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteConfirmed}
                className="btn-destructive"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
