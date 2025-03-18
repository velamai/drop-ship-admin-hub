
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui/PageTitle';
import { ChevronRight, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Link } from 'react-router-dom';

interface Order {
  id: number;
  orderId: string;
  customer: string;
  date: string;
  items: number;
  status: 'Pending' | 'Processing' | 'Processed' | 'Shipped' | 'Delivered' | 'Cancelled';
  expanded?: boolean;
  details?: {
    weight: string;
    dimensions: string;
    email: string;
    phone: string;
  };
}

const OfficeOrders = () => {
  const [orders, setOrders] = useState<Order[]>([
    { 
      id: 1, 
      orderId: 'ORD-2023-001', 
      customer: 'Tech Solutions Inc.', 
      date: '2023-05-14', 
      items: 2, 
      status: 'Pending',
      details: {
        weight: '3.5 kg',
        dimensions: '30 × 20 × 15 cm',
        email: 'shipping@techsolutions.com',
        phone: '+1 (555) 987-6543'
      }
    },
    { id: 2, orderId: 'ORD-2023-002', customer: 'Fashion Forward Inc.', date: '2023-05-09', items: 1, status: 'Pending' },
    { id: 3, orderId: 'ORD-2023-004', customer: 'Outdoor Adventures Co.', date: '2023-05-13', items: 3, status: 'Pending' },
  ]);

  const toggleExpand = (id: number) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, expanded: !order.expanded } : order
    ));
  };

  const cancelOrder = (id: number) => {
    console.log(`Cancel order ${id}`);
    // In a real app, this would be an API call
  };

  const receiveOrder = (id: number) => {
    console.log(`Receive order ${id}`);
    // In a real app, this would be an API call
  };

  return (
    <Layout>
      <PageTitle 
        title="Office - Orders" 
        description="View and manage all new orders that are not yet received" 
      />
      
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-medium mb-4 text-brand-text">Orders</h2>
          <p className="text-muted-foreground mb-6">Manage all new orders that are not yet received</p>
          
          <div className="flex justify-between mb-6">
            <div className="relative w-full max-w-md">
              <Input 
                type="text" 
                placeholder="Search orders..." 
                className="pl-10 border-brand-subtle-text/30 focus-visible:ring-brand-primary" 
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
            </div>
            
            <Button variant="outline" className="flex items-center gap-2 border-brand-primary/50 text-brand-primary hover:bg-brand-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
              Filter
            </Button>
          </div>
          
          <div className="border rounded-md overflow-hidden border-brand-subtle-text/20">
            <Table>
              <TableHeader>
                <TableRow className="bg-brand-accent/20">
                  <TableHead className="w-12 text-center text-brand-text">#</TableHead>
                  <TableHead className="text-brand-text">Order #</TableHead>
                  <TableHead className="text-brand-text">Customer</TableHead>
                  <TableHead className="text-brand-text">Date</TableHead>
                  <TableHead className="text-brand-text">Items</TableHead>
                  <TableHead className="text-brand-text">Status</TableHead>
                  <TableHead className="text-right text-brand-text">Expand</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <React.Fragment key={order.id}>
                    <TableRow className="border-b border-brand-subtle-text/20">
                      <TableCell className="text-center">{order.id}</TableCell>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-accent/20 text-brand-secondary">
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <button 
                          onClick={() => toggleExpand(order.id)}
                          className="p-1 hover:bg-brand-accent/20 rounded-full text-brand-primary"
                        >
                          <ChevronRight 
                            size={18} 
                            className={`transform transition-transform ${order.expanded ? 'rotate-90' : ''}`} 
                          />
                        </button>
                      </TableCell>
                    </TableRow>

                    {order.expanded && order.details && (
                      <TableRow className="bg-brand-accent/10">
                        <TableCell colSpan={7} className="p-0">
                          <div className="grid grid-cols-3 gap-6 p-4">
                            <div>
                              <h3 className="text-lg font-medium mb-3 text-brand-text">Shipment Details</h3>
                              <div className="space-y-2">
                                <p className="text-sm"><span className="text-brand-subtle-text">Items:</span> {order.items}</p>
                                <p className="text-sm"><span className="text-brand-subtle-text">Weight:</span> {order.details.weight}</p>
                                <p className="text-sm"><span className="text-brand-subtle-text">Dimensions:</span> {order.details.dimensions}</p>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-medium mb-3 text-brand-text">Customer Information</h3>
                              <div className="space-y-2">
                                <p className="text-sm"><span className="text-brand-subtle-text">Name:</span> {order.customer}</p>
                                <p className="text-sm"><span className="text-brand-subtle-text">Email:</span> {order.details.email}</p>
                                <p className="text-sm"><span className="text-brand-subtle-text">Phone:</span> {order.details.phone}</p>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-medium mb-3 text-brand-text">Actions</h3>
                              <div className="flex items-center gap-2">
                                <Link 
                                  to={`/logistics/office/orders/${order.id}`}
                                >
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="flex items-center gap-1 border-brand-primary/50 text-brand-primary hover:bg-brand-primary/10"
                                  >
                                    <Eye size={16} />
                                    View Details
                                  </Button>
                                </Link>
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  onClick={() => receiveOrder(order.id)}
                                  className="bg-brand-primary hover:bg-brand-primary/90"
                                >
                                  Receive
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => cancelOrder(order.id)}
                                  className="border-brand-subtle-text/30 hover:bg-brand-subtle-text/10"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Showing 1-3 of 3 orders
            </p>
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" className="text-brand-primary hover:bg-brand-primary/10" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" className="text-brand-primary hover:bg-brand-primary/10" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OfficeOrders;
