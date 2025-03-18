
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui/PageTitle';
import { ChevronDown, ChevronRight, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface PickupOrder {
  id: number;
  orderId: string;
  customer: string;
  date: string;
  items: number;
  status: 'Pickup' | 'Assigned' | 'Received' | 'Cancelled';
  expanded?: boolean;
  details?: {
    weight: string;
    location: string;
    pickupDate: string;
    phoneNumber: string;
    email: string;
    phone: string;
  };
}

const PickupOrders = () => {
  const [orders, setOrders] = useState<PickupOrder[]>([
    { 
      id: 1, 
      orderId: 'ORD-2023-005', 
      customer: 'John Smith', 
      date: '2023-05-16', 
      items: 1, 
      status: 'Pickup',
      details: {
        weight: '2.1 kg',
        location: '123 Main St, Colombo',
        pickupDate: '2023-06-01',
        phoneNumber: '+94771234567',
        email: 'john.smith@example.com',
        phone: '+1 (555) 123-4567'
      }
    },
    { 
      id: 2, 
      orderId: 'ORD-2023-006', 
      customer: 'Sarah Johnson', 
      date: '2023-05-17', 
      items: 2, 
      status: 'Pickup',
      details: {
        weight: '3.2 kg',
        location: '456 Oak Ave, Colombo',
        pickupDate: '2023-06-02',
        phoneNumber: '+94772345678',
        email: 'sarah.j@example.com',
        phone: '+1 (555) 987-6543'
      }
    },
    { 
      id: 3, 
      orderId: 'ORD-2023-007', 
      customer: 'Michael Brown', 
      date: '2023-05-18', 
      items: 3, 
      status: 'Assigned'
    },
  ]);

  const [movingOrder, setMovingOrder] = useState<PickupOrder | null>(null);

  const toggleExpand = (id: number) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, expanded: !order.expanded } : order
    ));
  };

  const cancelOrder = (id: number) => {
    console.log(`Cancel order ${id}`);
    // In a real app, this would be an API call
  };

  const assignOrder = (id: number) => {
    console.log(`Assign order ${id}`);
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: 'Assigned' as const } : order
    ));
    // In a real app, this would be an API call
  };

  const receiveOrder = (id: number) => {
    console.log(`Receive order ${id}`);
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: 'Received' as const } : order
    ));
    // In a real app, this would be an API call
  };

  const viewDetails = (id: number) => {
    console.log(`View details for order ${id}`);
    // In a real app, this would navigate to a details page
  };

  const moveToLogistics = (order: PickupOrder) => {
    setMovingOrder(order);
    setTimeout(() => {
      setOrders(orders.filter(o => o.id !== order.id));
      setMovingOrder(null);
    }, 3000);
  };

  return (
    <Layout>
      <PageTitle 
        title="Pickup Orders" 
        description="Manage pickup orders that need to be assigned and received" 
      />
      
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-medium mb-4">Pickup Orders</h2>
          <p className="text-muted-foreground mb-6">Assign and receive pickup orders</p>
          
          <div className="flex justify-between mb-6">
            <div className="relative w-full max-w-md">
              <Input 
                type="text" 
                placeholder="Search pickup orders..." 
                className="pl-10" 
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
            </div>
            
            <Button variant="outline" className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
              Filter
            </Button>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-12 text-center">#</TableHead>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Expand</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movingOrder && (
                  <TableRow className="bg-blue-50">
                    <TableCell colSpan={7} className="py-6 text-center">
                      <div className="text-blue-600 font-medium">Moving order to Logistics Orders...</div>
                      <div className="text-sm text-gray-500 mt-1">
                        Order #{movingOrder.orderId} is being moved to the Logistics Orders section
                      </div>
                    </TableCell>
                  </TableRow>
                )}
                {orders.map((order) => (
                  <React.Fragment key={order.id}>
                    <TableRow className="border-b border-gray-200">
                      <TableCell className="text-center">{order.id}</TableCell>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'Pickup' ? 'bg-purple-100 text-purple-800' :
                          order.status === 'Assigned' ? 'bg-indigo-100 text-indigo-800' :
                          order.status === 'Received' ? 'bg-green-100 text-green-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <button 
                          onClick={() => toggleExpand(order.id)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          {order.expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                        </button>
                      </TableCell>
                    </TableRow>

                    {order.expanded && order.details && (
                      <TableRow className="bg-gray-50">
                        <TableCell colSpan={7} className="p-0">
                          <div className="grid grid-cols-3 gap-6 p-4">
                            <div>
                              <h3 className="text-lg font-medium mb-3">Pickup Details</h3>
                              <div className="space-y-2">
                                <p className="text-sm"><span className="text-gray-500">Items:</span> {order.items}</p>
                                <p className="text-sm"><span className="text-gray-500">Weight:</span> {order.details.weight}</p>
                                <p className="text-sm"><span className="text-gray-500">Pickup Location:</span> {order.details.location}</p>
                                <p className="text-sm"><span className="text-gray-500">Pickup Date:</span> {order.details.pickupDate}</p>
                                <p className="text-sm"><span className="text-gray-500">Phone Number:</span> {order.details.phoneNumber}</p>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-medium mb-3">Customer Information</h3>
                              <div className="space-y-2">
                                <p className="text-sm"><span className="text-gray-500">Name:</span> {order.customer}</p>
                                <p className="text-sm"><span className="text-gray-500">Email:</span> {order.details.email}</p>
                                <p className="text-sm"><span className="text-gray-500">Phone:</span> {order.details.phone}</p>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-medium mb-3">Actions</h3>
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => viewDetails(order.id)}
                                  className="flex items-center gap-1"
                                >
                                  <Eye size={16} />
                                  View Details
                                </Button>
                                
                                {order.status === 'Pickup' && (
                                  <Button 
                                    variant="default" 
                                    size="sm"
                                    onClick={() => assignOrder(order.id)}
                                    className="bg-purple-600 hover:bg-purple-700"
                                  >
                                    Assign
                                  </Button>
                                )}
                                
                                {order.status === 'Assigned' && (
                                  <Button 
                                    variant="default" 
                                    size="sm"
                                    onClick={() => receiveOrder(order.id)}
                                    className="bg-purple-600 hover:bg-purple-700"
                                  >
                                    Received
                                  </Button>
                                )}
                                
                                {order.status === 'Received' && (
                                  <Button 
                                    variant="default" 
                                    size="sm"
                                    onClick={() => moveToLogistics(order)}
                                    className="bg-purple-600 hover:bg-purple-700"
                                  >
                                    Move to Orders
                                  </Button>
                                )}
                                
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => cancelOrder(order.id)}
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
              Showing 1-{orders.length} of {orders.length} pickup orders
            </p>
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PickupOrders;
