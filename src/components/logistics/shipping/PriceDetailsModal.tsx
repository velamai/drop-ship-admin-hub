
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface PriceDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trackingId: string;
  initialValues?: {
    weight: string;
    quantity: string;
    courierService: string;
    basePrice: string;
    extraCharges: string;
    tax: string;
    discount: string;
    notes: string;
  };
  onSave: (values: any) => void;
}

export const PriceDetailsModal: React.FC<PriceDetailsModalProps> = ({
  open,
  onOpenChange,
  trackingId,
  initialValues = {
    weight: '0.0',
    quantity: '1',
    courierService: 'FedEx',
    basePrice: '0.00',
    extraCharges: '0.00',
    tax: '0.00',
    discount: '0.00',
    notes: ''
  },
  onSave
}) => {
  const [values, setValues] = useState(initialValues);
  
  const handleChange = (field: string, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSave = () => {
    onSave(values);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Price Details</DialogTitle>
          <DialogDescription>
            Enter pricing details for this shipment
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="weight" className="text-sm font-medium">Weight (kg)</label>
              <Input 
                id="weight" 
                value={values.weight}
                onChange={e => handleChange('weight', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
              <Input 
                id="quantity" 
                value={values.quantity}
                onChange={e => handleChange('quantity', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="courier" className="text-sm font-medium">Courier Service</label>
            <div className="relative">
              <select 
                id="courier"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 appearance-none"
                value={values.courierService}
                onChange={e => handleChange('courierService', e.target.value)}
              >
                <option value="FedEx">FedEx</option>
                <option value="UPS">UPS</option>
                <option value="DHL">DHL</option>
                <option value="USPS">USPS</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="trackingId" className="text-sm font-medium">Tracking ID</label>
            <Input 
              id="trackingId" 
              value={trackingId}
              readOnly
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="basePrice" className="text-sm font-medium">Base Price ($)</label>
              <Input 
                id="basePrice" 
                value={values.basePrice}
                onChange={e => handleChange('basePrice', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="extraCharges" className="text-sm font-medium">Extra Charges ($)</label>
              <Input 
                id="extraCharges" 
                value={values.extraCharges}
                onChange={e => handleChange('extraCharges', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="tax" className="text-sm font-medium">Tax ($)</label>
              <Input 
                id="tax" 
                value={values.tax}
                onChange={e => handleChange('tax', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="discount" className="text-sm font-medium">Discount ($)</label>
              <Input 
                id="discount" 
                value={values.discount}
                onChange={e => handleChange('discount', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">Notes</label>
            <textarea 
              id="notes"
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[80px]"
              value={values.notes}
              onChange={e => handleChange('notes', e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={handleSave}
          >
            Save Price Details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
