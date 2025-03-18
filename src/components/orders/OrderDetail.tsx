
import React, { useState } from 'react';
import { ArrowLeft, Package, AlertTriangle, Check, Clock, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Order, OrderStatus } from '@/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface OrderDetailProps {
  order: Order;
}

export const OrderDetail: React.FC<OrderDetailProps> = ({ order: initialOrder }) => {
  const [order, setOrder] = useState<Order>(initialOrder);
  const [isConfirmingCancel, setIsConfirmingCancel] = useState(false);
  const { toast } = useToast();

  const handleStatusUpdate = (newStatus: OrderStatus) => {
    // In a real app, this would be an API call
    setOrder({
      ...order,
      status: newStatus,
      statusHistory: [
        ...order.statusHistory,
        { status: newStatus, timestamp: new Date().toISOString() }
      ]
    });
    
    setIsConfirmingCancel(false);
    
    toast({
      title: "Order status updated",
      description: `Order status changed to ${newStatus}.`,
    });
  };

  const statusTimeline = [
    { key: 'pending', label: 'Pending', icon: Clock },
    { key: 'processing', label: 'Processing', icon: Clock },
    { key: 'processed', label: 'Processed', icon: Check },
    { key: 'shipped', label: 'Shipped', icon: Package },
    { key: 'delivered', label: 'Delivered', icon: Check }
  ];

  const orderHasWarnings = order.items.some(item => !item.isReady);

  const getStatusStepClass = (statusKey: string) => {
    const statusIndex = statusTimeline.findIndex(s => s.key === statusKey);
    const currentStatusIndex = statusTimeline.findIndex(s => s.key === order.status);
    
    if (order.status === 'cancelled') {
      return 'text-muted-foreground border-muted-foreground';
    }
    
    if (statusIndex < currentStatusIndex) {
      return 'text-primary border-primary';
    } else if (statusIndex === currentStatusIndex) {
      return 'text-primary border-primary bg-primary/10';
    } else {
      return 'text-muted-foreground border-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/orders" className="p-2 rounded-full hover:bg-accent">
            <ArrowLeft size={18} />
          </Link>
          <h2 className="text-xl font-bold">Order #{order.id.slice(0, 8)}</h2>
          <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
            order.status === 'pending' && "bg-yellow-100 text-yellow-800 border-yellow-200",
            order.status === 'processing' && "bg-blue-100 text-blue-800 border-blue-200",
            order.status === 'processed' && "bg-green-100 text-green-800 border-green-200",
            order.status === 'shipped' && "bg-indigo-100 text-indigo-800 border-indigo-200",
            order.status === 'delivered' && "bg-purple-100 text-purple-800 border-purple-200",
            order.status === 'cancelled' && "bg-red-100 text-red-800 border-red-200"
          )}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          {order.status !== 'cancelled' && !isConfirmingCancel && (
            <button 
              onClick={() => setIsConfirmingCancel(true)}
              className="btn-outline text-destructive border-destructive hover:bg-destructive/10"
            >
              <X size={16} className="mr-2" />
              Cancel Order
            </button>
          )}
          
          {isConfirmingCancel && (
            <div className="flex items-center gap-2">
              <span className="text-sm">Are you sure?</span>
              <button 
                onClick={() => setIsConfirmingCancel(false)}
                className="btn-outline"
              >
                No
              </button>
              <button 
                onClick={() => handleStatusUpdate('cancelled')}
                className="btn-destructive"
              >
                Yes, Cancel
              </button>
            </div>
          )}
          
          {order.status === 'cancelled' && (
            <button 
              onClick={() => handleStatusUpdate('pending')}
              className="btn-outline"
            >
              <Clock size={16} className="mr-2" />
              Reactivate Order
            </button>
          )}
          
          {order.status !== 'cancelled' && (
            <Link 
              to={`/orders/${order.id}/convert`}
              className="btn-primary"
            >
              <Package size={16} className="mr-2" />
              Convert to Shipment
            </Link>
          )}
        </div>
      </div>
      
      {/* Order Timeline */}
      {order.status !== 'cancelled' && (
        <div className="relative">
          <div className="flex items-center justify-between">
            {statusTimeline.map((step, index) => (
              <div key={step.key} className="flex flex-col items-center relative">
                <div className={cn(
                  "w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2",
                  getStatusStepClass(step.key)
                )}>
                  <step.icon size={16} />
                </div>
                <span className="text-xs font-medium">{step.label}</span>
                
                {/* Connector line */}
                {index < statusTimeline.length - 1 && (
                  <div className={cn(
                    "absolute top-5 left-[50%] w-[calc(100%-1.25rem)] h-[2px]",
                    getStatusStepClass(statusTimeline[index + 1].key)
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Warning for items not ready (if any) */}
      {orderHasWarnings && (
        <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-md flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-800">Some items are not ready for shipment</h3>
            <p className="text-sm text-yellow-700 mt-1">
              The highlighted items below are not ready for shipment yet. You can still create a partial shipment for ready items.
            </p>
          </div>
        </div>
      )}
      
      {/* Order Details - 2 columns on desktop, 1 on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Information */}
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="bg-muted/30 px-4 py-3 border-b border-border">
            <h3 className="font-medium">Customer Information</h3>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Customer</p>
              <p className="font-medium">{order.userName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{order.userEmail}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="font-medium">{new Date(order.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        {/* Shipping Address */}
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="bg-muted/30 px-4 py-3 border-b border-border">
            <h3 className="font-medium">Shipping Address</h3>
          </div>
          <div className="p-4 space-y-2">
            <p className="font-medium">{order.userName}</p>
            <p>{order.shippingAddress.addressLine1}</p>
            {order.shippingAddress.addressLine2 && (
              <p>{order.shippingAddress.addressLine2}</p>
            )}
            <p>
              {order.shippingAddress.city}
              {order.shippingAddress.state ? `, ${order.shippingAddress.state}` : ''}
              {` ${order.shippingAddress.postalCode}`}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>
      </div>
      
      {/* Order Items */}
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="bg-muted/30 px-4 py-3 border-b border-border">
          <h3 className="font-medium">Order Items</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/20">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-border">
              {order.items.map((item) => (
                <tr 
                  key={item.id} 
                  className={cn(
                    !item.isReady && "bg-red-50"
                  )}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {item.productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    {item.isReady ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-green-100 text-green-800 border-green-200">
                        Ready
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-red-100 text-red-800 border-red-200">
                        Not Ready
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Order Summary */}
        <div className="border-t border-border p-4">
          <div className="flex flex-col items-end space-y-2">
            <div className="flex justify-between w-full max-w-xs">
              <span className="text-sm text-muted-foreground">Subtotal:</span>
              <span className="text-sm font-medium">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-full max-w-xs">
              <span className="text-sm text-muted-foreground">Shipping:</span>
              <span className="text-sm font-medium">${order.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-full max-w-xs">
              <span className="text-sm text-muted-foreground">Tax:</span>
              <span className="text-sm font-medium">${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-full max-w-xs border-t border-border pt-2">
              <span className="font-medium">Total:</span>
              <span className="font-bold">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Order Status History */}
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="bg-muted/30 px-4 py-3 border-b border-border">
          <h3 className="font-medium">Status History</h3>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {[...order.statusHistory].reverse().map((statusChange, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center mt-0.5",
                  statusChange.status === 'pending' && "bg-yellow-100 text-yellow-800",
                  statusChange.status === 'processing' && "bg-blue-100 text-blue-800",
                  statusChange.status === 'processed' && "bg-green-100 text-green-800",
                  statusChange.status === 'shipped' && "bg-indigo-100 text-indigo-800",
                  statusChange.status === 'delivered' && "bg-purple-100 text-purple-800",
                  statusChange.status === 'cancelled' && "bg-red-100 text-red-800"
                )}>
                  {statusChange.status === 'pending' && <Clock size={14} />}
                  {statusChange.status === 'processing' && <Clock size={14} />}
                  {statusChange.status === 'processed' && <Check size={14} />}
                  {statusChange.status === 'shipped' && <Package size={14} />}
                  {statusChange.status === 'delivered' && <Check size={14} />}
                  {statusChange.status === 'cancelled' && <X size={14} />}
                </div>
                <div>
                  <p className="font-medium">
                    Status changed to <span className="capitalize">{statusChange.status}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(statusChange.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
