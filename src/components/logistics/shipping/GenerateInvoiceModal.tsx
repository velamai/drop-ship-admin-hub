
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ShipmentForInvoice {
  trackingNumber: string;
  customer: string;
  isPriceReady: boolean;
}

interface GenerateInvoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shipments: ShipmentForInvoice[];
  onGenerate: (notes: string) => void;
}

export const GenerateInvoiceModal: React.FC<GenerateInvoiceModalProps> = ({
  open,
  onOpenChange,
  shipments,
  onGenerate
}) => {
  const [notes, setNotes] = useState('');
  
  const handleGenerate = () => {
    onGenerate(notes);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Invoice</DialogTitle>
          <DialogDescription>
            The following shipments will be included in this invoice
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {shipments.map((shipment, index) => (
            <div key={shipment.trackingNumber} 
                 className={`border rounded-md p-4 ${!shipment.isPriceReady ? 'bg-red-50 border-red-200' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-medium">{shipment.trackingNumber}</p>
                  <p className="text-sm text-gray-500">{shipment.customer}</p>
                </div>
                {shipment.isPriceReady ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                    Price Ready
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-200">
                    Not Ready
                  </Badge>
                )}
              </div>
              
              {!shipment.isPriceReady && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertTriangle size={16} />
                  <p>This shipment is not price ready and will be canceled if you proceed.</p>
                </div>
              )}
            </div>
          ))}
          
          <div className="space-y-2">
            <label htmlFor="invoiceNotes" className="text-sm font-medium">Invoice Notes</label>
            <textarea 
              id="invoiceNotes"
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[80px]"
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={handleGenerate}
          >
            Generate Invoice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
