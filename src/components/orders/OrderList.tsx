
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, EyeIcon, Package, AlertCircle, X, ArrowLeftRight } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';
import { Order, OrderStatus } from '@/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface OrderListProps {
  orders: Order[];
}

export const OrderList: React.FC<OrderListProps> = ({ orders: initialOrders }) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // In a real app, this would likely be an API call
    if (!value) {
      setOrders(initialOrders);
    } else {
      const filtered = initialOrders.filter(order => 
        order.id.toLowerCase().includes(value.toLowerCase()) ||
        order.userName.toLowerCase().includes(value.toLowerCase()) ||
        order.userEmail.toLowerCase().includes(value.toLowerCase())
      );
      setOrders(filtered);
    }
  };

  const getStatusBadgeClasses = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'delivered':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: OrderStatus) => {
    // In a real app, this would be an API call
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status: newStatus,
            statusHistory: [
              ...order.statusHistory,
              { status: newStatus, timestamp: new Date().toISOString() }
            ]
          } 
        : order
    ));
    
    toast({
      title: "Order status updated",
      description: `Order #${orderId.slice(0, 8)} status changed to ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SearchBar 
          placeholder="Search orders..." 
          onSearch={handleSearch} 
        />
        
        <div className="flex items-center gap-3">
          <button className="btn-outline">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
          
          <div className="relative inline-block">
            <select 
              className="appearance-none bg-transparent border border-input rounded-md h-10 pl-3 pr-8 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              defaultValue="all"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="processed">Processed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Package size={24} className="text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-1">No orders found</h3>
          <p className="text-muted-foreground">
            {searchTerm 
              ? `No orders match "${searchTerm}"`
              : "Orders will appear here when customers place them"
            }
          </p>
        </div>
      ) : (
        <div className="overflow-hidden border rounded-lg">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-background divide-y divide-border">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex flex-col">
                        <span>{order.userName}</span>
                        <span className="text-xs text-muted-foreground">{order.userEmail}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                        getStatusBadgeClasses(order.status)
                      )}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/orders/${order.id}`}
                          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
                        >
                          <EyeIcon size={16} />
                        </Link>
                        
                        <Link
                          to={`/orders/${order.id}/convert`}
                          className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10"
                        >
                          <Package size={16} />
                        </Link>
                        
                        {order.status !== 'cancelled' && (
                          <button
                            onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                            className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          >
                            <X size={16} />
                          </button>
                        )}
                        
                        {order.status === 'cancelled' && (
                          <button
                            onClick={() => handleStatusUpdate(order.id, 'pending')}
                            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
                          >
                            <ArrowLeftRight size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{orders.length}</span> of <span className="font-medium">{initialOrders.length}</span> orders
        </p>
        
        <div className="flex space-x-2">
          <button
            disabled
            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 border border-input bg-background text-muted-foreground disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled
            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 border border-input bg-background text-muted-foreground disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
