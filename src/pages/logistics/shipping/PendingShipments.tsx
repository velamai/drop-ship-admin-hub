
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui/PageTitle';
import { SearchBar } from '@/components/ui/SearchBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { DownloadIcon, CheckIcon, X, Filter, ChevronDown, AlertTriangle } from 'lucide-react';

// Shipment status types
type ShipmentStatus = 'Received' | 'Accepted' | 'Price Ready' | 'Invoice Generated';

// Mock shipment data
interface ShipmentDetails {
  id: string;
  trackingNumber: string;
  orderId: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  status: ShipmentStatus;
  weight: string;
  dimensions: string;
  serviceType: string;
}

const mockShipments: ShipmentDetails[] = [
  {
    id: '1',
    trackingNumber: 'CM1234567890',
    orderId: 'ORD-2023-001',
    customer: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    address: 'New York, NY',
    date: '2023-05-15',
    status: 'Received',
    weight: '2.5 kg',
    dimensions: '30 × 20 × 15 cm',
    serviceType: 'Express'
  },
  {
    id: '2',
    trackingNumber: 'CM9876543210',
    orderId: 'ORD-2023-001',
    customer: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 987-6543',
    address: 'Boston, MA',
    date: '2023-05-16',
    status: 'Received',
    weight: '1.8 kg',
    dimensions: '25 × 18 × 10 cm',
    serviceType: 'Standard'
  },
  {
    id: '3',
    trackingNumber: 'CM5678901234',
    orderId: 'ORD-2023-002',
    customer: 'Maria Rodriguez',
    email: 'maria.r@example.com',
    phone: '+1 (555) 345-6789',
    address: 'Miami, FL',
    date: '2023-05-14',
    status: 'Accepted',
    weight: '4.2 kg',
    dimensions: '40 × 30 × 25 cm',
    serviceType: 'Priority'
  },
  {
    id: '4',
    trackingNumber: 'CM1357924680',
    orderId: 'ORD-2023-004',
    customer: 'Michael Brown',
    email: 'michael.b@example.com',
    phone: '+1 (555) 567-8901',
    address: 'Denver, CO',
    date: '2023-05-14',
    status: 'Price Ready',
    weight: '3.1 kg',
    dimensions: '45 × 35 × 20 cm',
    serviceType: 'Standard'
  },
  {
    id: '5',
    trackingNumber: 'CM2468013579',
    orderId: 'ORD-2023-005',
    customer: 'Emily Clark',
    email: 'emily.c@example.com',
    phone: '+1 (555) 678-9012',
    address: 'Chicago, IL',
    date: '2023-05-13',
    status: 'Invoice Generated',
    weight: '2.3 kg',
    dimensions: '38 × 28 × 15 cm',
    serviceType: 'Standard'
  }
];

// Shipment type for the price details modal
interface PriceDetails {
  weight: string;
  quantity: string;
  courierService: string;
  trackingId: string;
  basePrice: string;
  extraCharges: string;
  tax: string;
  discount: string;
  notes: string;
}

const PendingShipments = () => {
  // State management
  const [selectedStatus, setSelectedStatus] = useState<ShipmentStatus>('Received');
  const [expandedShipment, setExpandedShipment] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPriceDetailsModal, setShowPriceDetailsModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [priceDetails, setPriceDetails] = useState<PriceDetails>({
    weight: '4.2',
    quantity: '1',
    courierService: 'FedEx',
    trackingId: 'CM5678901234',
    basePrice: '25.00',
    extraCharges: '0.00',
    tax: '2.50',
    discount: '0.00',
    notes: ''
  });

  // Filter shipments based on selected status and search query
  const filteredShipments = mockShipments.filter(shipment => 
    shipment.status === selectedStatus && 
    (searchQuery === '' || 
     shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
     shipment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
     shipment.orderId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Toggle expanded shipment details
  const toggleExpand = (id: string) => {
    if (expandedShipment === id) {
      setExpandedShipment(null);
    } else {
      setExpandedShipment(id);
    }
  };

  // Handle status tab change
  const handleStatusChange = (value: string) => {
    setSelectedStatus(value as ShipmentStatus);
    setExpandedShipment(null);
  };

  // Handle search
  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  // Get action buttons based on shipment status
  const getActionButtons = (status: ShipmentStatus) => {
    switch (status) {
      case 'Received':
        return (
          <>
            <Button 
              variant="default" 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => { /* Accept logic */ }}
            >
              Accept
            </Button>
            <Button 
              variant="outline" 
              onClick={() => { /* Cancel logic */ }}
            >
              Cancel
            </Button>
            <Button 
              variant="outline" 
              onClick={() => { /* Reset logic */ }}
            >
              Reset
            </Button>
          </>
        );
      case 'Accepted':
        return (
          <>
            <Button 
              variant="default" 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setShowPriceDetailsModal(true)}
            >
              Price Details
            </Button>
            <Button 
              variant="outline" 
              onClick={() => { /* Cancel logic */ }}
            >
              Cancel
            </Button>
            <Button 
              variant="outline" 
              onClick={() => { /* Reset logic */ }}
            >
              Reset
            </Button>
          </>
        );
      case 'Price Ready':
        return (
          <>
            <Button 
              variant="default" 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setShowInvoiceModal(true)}
            >
              Generate Invoice
            </Button>
            <Button 
              variant="outline" 
              onClick={() => { /* Cancel logic */ }}
            >
              Cancel
            </Button>
            <Button 
              variant="outline" 
              onClick={() => { /* Reset logic */ }}
            >
              Reset
            </Button>
          </>
        );
      case 'Invoice Generated':
        return (
          <>
            <Button 
              variant="default" 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => { /* Request Pay logic */ }}
            >
              Request Pay
            </Button>
            <Button 
              variant="outline" 
              onClick={() => { /* View Invoice logic */ }}
            >
              View Invoice
            </Button>
            <Button 
              variant="outline" 
              onClick={() => { /* Cancel logic */ }}
            >
              Cancel
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: ShipmentStatus }) => {
    let className = "rounded-full px-3 py-1 text-xs font-semibold text-white";
    
    switch (status) {
      case 'Received':
        className += " bg-indigo-600";
        break;
      case 'Accepted':
        className += " bg-blue-600";
        break;
      case 'Price Ready':
        className += " bg-green-600";
        break;
      case 'Invoice Generated':
        className += " bg-purple-600";
        break;
      default:
        className += " bg-gray-600";
    }
    
    return <span className={className}>{status}</span>;
  };

  return (
    <Layout>
      <PageTitle 
        title="Shipping - Pending" 
        description="Manage shipments that have been received but not yet ready" 
      />
      
      <div className="container mx-auto py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">Pending Shipments</h2>
              <Button variant="outline" className="gap-2">
                <DownloadIcon size={16} />
                Export
              </Button>
            </div>
            <p className="text-gray-500 mb-6">Manage shipments that need processing</p>
            
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-6">
              <SearchBar 
                placeholder="Search shipments..." 
                onSearch={handleSearch}
              />
              <Button variant="outline" className="gap-2">
                <Filter size={16} />
                Filter
              </Button>
            </div>

            <Tabs defaultValue="Received" onValueChange={handleStatusChange}>
              <TabsList className="mb-6 bg-gray-100 p-1">
                <TabsTrigger value="Received">Received</TabsTrigger>
                <TabsTrigger value="Accepted">Accepted</TabsTrigger>
                <TabsTrigger value="Price Ready">Price Ready</TabsTrigger>
                <TabsTrigger value="Invoice Generated">Invoice Generated</TabsTrigger>
              </TabsList>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[5%]">#</TableHead>
                      <TableHead>Tracking #</TableHead>
                      <TableHead>Order #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[5%]">Expand</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredShipments.map((shipment) => (
                      <React.Fragment key={shipment.id}>
                        <TableRow className="hover:bg-gray-50">
                          <TableCell>{shipment.id}</TableCell>
                          <TableCell>{shipment.trackingNumber}</TableCell>
                          <TableCell>{shipment.orderId}</TableCell>
                          <TableCell>{shipment.customer}</TableCell>
                          <TableCell>{shipment.date}</TableCell>
                          <TableCell>
                            <StatusBadge status={shipment.status} />
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toggleExpand(shipment.id)}
                            >
                              <ChevronDown 
                                size={18} 
                                className={`transition-transform ${expandedShipment === shipment.id ? 'rotate-180' : ''}`} 
                              />
                            </Button>
                          </TableCell>
                        </TableRow>
                        
                        {expandedShipment === shipment.id && (
                          <TableRow className="bg-gray-50 border-t-0">
                            <TableCell colSpan={7} className="p-0">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
                                <div>
                                  <h3 className="text-sm font-medium text-gray-500 mb-3">Shipment Details</h3>
                                  <div className="space-y-2 text-sm">
                                    <p><span className="text-gray-500">Tracking #:</span> {shipment.trackingNumber}</p>
                                    <p><span className="text-gray-500">Order #:</span> {shipment.orderId}</p>
                                    <p><span className="text-gray-500">Weight:</span> {shipment.weight}</p>
                                    <p><span className="text-gray-500">Dimensions:</span> {shipment.dimensions}</p>
                                    <p><span className="text-gray-500">Service Type:</span> {shipment.serviceType}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <h3 className="text-sm font-medium text-gray-500 mb-3">Customer Information</h3>
                                  <div className="space-y-2 text-sm">
                                    <p><span className="text-gray-500">Name:</span> {shipment.customer}</p>
                                    <p><span className="text-gray-500">Email:</span> {shipment.email}</p>
                                    <p><span className="text-gray-500">Phone:</span> {shipment.phone}</p>
                                    <p><span className="text-gray-500">Address:</span> {shipment.address}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <h3 className="text-sm font-medium text-gray-500 mb-3">Actions</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {getActionButtons(shipment.status)}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}

                    {filteredShipments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No shipments found for this status.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {filteredShipments.length > 0 && (
                <div className="py-4 mt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      Showing 1-{filteredShipments.length} of {filteredShipments.length} shipments
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
              )}
            </Tabs>
          </div>
        </div>
      </div>

      {/* Price Details Modal */}
      <Dialog open={showPriceDetailsModal} onOpenChange={setShowPriceDetailsModal}>
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
                  value={priceDetails.weight}
                  onChange={e => setPriceDetails({...priceDetails, weight: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
                <Input 
                  id="quantity" 
                  value={priceDetails.quantity}
                  onChange={e => setPriceDetails({...priceDetails, quantity: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="courier" className="text-sm font-medium">Courier Service</label>
              <div className="relative">
                <select 
                  id="courier"
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 appearance-none"
                  value={priceDetails.courierService}
                  onChange={e => setPriceDetails({...priceDetails, courierService: e.target.value})}
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
                value={priceDetails.trackingId}
                readOnly
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="basePrice" className="text-sm font-medium">Base Price ($)</label>
                <Input 
                  id="basePrice" 
                  value={priceDetails.basePrice}
                  onChange={e => setPriceDetails({...priceDetails, basePrice: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="extraCharges" className="text-sm font-medium">Extra Charges ($)</label>
                <Input 
                  id="extraCharges" 
                  value={priceDetails.extraCharges}
                  onChange={e => setPriceDetails({...priceDetails, extraCharges: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="tax" className="text-sm font-medium">Tax ($)</label>
                <Input 
                  id="tax" 
                  value={priceDetails.tax}
                  onChange={e => setPriceDetails({...priceDetails, tax: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="discount" className="text-sm font-medium">Discount ($)</label>
                <Input 
                  id="discount" 
                  value={priceDetails.discount}
                  onChange={e => setPriceDetails({...priceDetails, discount: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">Notes</label>
              <textarea 
                id="notes"
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[80px]"
                value={priceDetails.notes}
                onChange={e => setPriceDetails({...priceDetails, notes: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setShowPriceDetailsModal(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => {
                setShowPriceDetailsModal(false);
                // Save price details logic
              }}
            >
              Save Price Details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Generate Invoice Modal */}
      <Dialog open={showInvoiceModal} onOpenChange={setShowInvoiceModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Generate Invoice</DialogTitle>
            <DialogDescription>
              The following shipments will be included in this invoice
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-white border rounded-md p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">CM1357924680</p>
                  <p className="text-sm text-gray-500">Michael Brown</p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                  Price Ready
                </Badge>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-medium">CM9876543210</p>
                  <p className="text-sm text-gray-500">Sarah Johnson</p>
                </div>
                <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-200">
                  Not Ready
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertTriangle size={16} />
                <p>This shipment is not price ready and will be canceled if you proceed.</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="invoiceNotes" className="text-sm font-medium">Invoice Notes</label>
              <textarea 
                id="invoiceNotes"
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[80px]"
              />
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setShowInvoiceModal(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => {
                setShowInvoiceModal(false);
                // Generate invoice logic
              }}
            >
              Generate Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default PendingShipments;
