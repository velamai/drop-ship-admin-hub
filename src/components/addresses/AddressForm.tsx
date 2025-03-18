
import React, { useState } from 'react';
import { Address } from '@/types';

interface AddressFormProps {
  address?: Address;
  onSubmit: (address: Omit<Address, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  address,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    addressLine1: address?.addressLine1 || '',
    addressLine2: address?.addressLine2 || '',
    city: address?.city || '',
    state: address?.state || '',
    postalCode: address?.postalCode || '',
    country: address?.country || ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error on typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address Line 1 is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal Code is required';
    }
    
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="addressLine1" className="text-sm font-medium">
          Address Line 1 <span className="text-destructive">*</span>
        </label>
        <input
          id="addressLine1"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleChange}
          className={`w-full h-10 px-3 rounded-md border ${errors.addressLine1 ? 'border-destructive' : 'border-input'} bg-transparent text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
        />
        {errors.addressLine1 && (
          <p className="text-xs text-destructive">{errors.addressLine1}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="addressLine2" className="text-sm font-medium">
          Address Line 2
        </label>
        <input
          id="addressLine2"
          name="addressLine2"
          value={formData.addressLine2}
          onChange={handleChange}
          className="w-full h-10 px-3 rounded-md border border-input bg-transparent text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium">
            City <span className="text-destructive">*</span>
          </label>
          <input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full h-10 px-3 rounded-md border ${errors.city ? 'border-destructive' : 'border-input'} bg-transparent text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
          />
          {errors.city && (
            <p className="text-xs text-destructive">{errors.city}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="state" className="text-sm font-medium">
            State/Province
          </label>
          <input
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full h-10 px-3 rounded-md border border-input bg-transparent text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="postalCode" className="text-sm font-medium">
            Postal Code <span className="text-destructive">*</span>
          </label>
          <input
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className={`w-full h-10 px-3 rounded-md border ${errors.postalCode ? 'border-destructive' : 'border-input'} bg-transparent text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
          />
          {errors.postalCode && (
            <p className="text-xs text-destructive">{errors.postalCode}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="country" className="text-sm font-medium">
            Country <span className="text-destructive">*</span>
          </label>
          <input
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={`w-full h-10 px-3 rounded-md border ${errors.country ? 'border-destructive' : 'border-input'} bg-transparent text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
          />
          {errors.country && (
            <p className="text-xs text-destructive">{errors.country}</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button 
          type="button"
          onClick={onCancel}
          className="btn-outline"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="btn-primary"
        >
          {address ? 'Save Changes' : 'Add Address'}
        </button>
      </div>
    </form>
  );
};
