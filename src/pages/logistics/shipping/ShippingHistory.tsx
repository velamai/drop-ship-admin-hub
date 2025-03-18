
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui/PageTitle';
import { ChevronRight, Download, Eye, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface ShipmentRecord {
  id: number;
  trackingNumber: string;
  customer: string;
  destination: string;
  shipDate: string;
  deliveryDate: string;
  status: 'Delivered' | 'Returned' | 'Lost';
}

const ShippingHistory = () => {
  const [shipments, setShipments] = useState<ShipmentRecord[]>([
    { 
      id: 1, 
      trackingNumber: 'TRK-2023-001', 
      customer: 'John Smith', 
      destination: 'New York, USA', 
      shipDate: '2023-01-15', 
      deliveryDate: '2023-01-20',
      status: 'Delivered'
    },
    { 
      id: 2, 
      trackingNumber: 'TRK-2023-015', 
      customer: 'Sarah Johnson', 
      destination: 'London, UK', 
      shipDate: '2023-02-10', 
      deliveryDate: '2023-02-18',
      status: 'Delivered'
    },
    { 
      id: 3, 
      trackingNumber: 'TRK-2023-023', 
      customer: 'Tech Solutions Inc.', 
      destination: 'Sydney, Australia', 
      shipDate: '2023-03-05', 
      deliveryDate: '2023-03-15',
      status: 'Returned'
    },
    { 
      id: 4, 
      trackingNumber: 'TRK-2023-042', 
      customer: 'Michael Brown', 
      destination: 'Toronto, Canada', 
      shipDate: '2023-04-20', 
      deliveryDate: '2023-04-28',
      status: 'Delivered'
    },
    { 
      id: 5, 
      trackingNumber: 'TRK-2023-057', 
      customer: 'Global Enterprises', 
      destination: 'Berlin, Germany', 
      shipDate: '2023-05-12', 
      deliveryDate: '',
      status: 'Lost'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredShipments = shipments.filter(shipment => 
    shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredShipments.length / itemsPerPage);
  const currentShipments = filteredShipments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const viewShipmentDetails = (id: number) => {
    console.log(`View shipment details for ID: ${id}`);
    // In a real app, this would navigate to a details page
  };

  const generateReport = () => {
    console.log('Generating shipping history report');
    // In a real app, this would generate a PDF or CSV report
  };

  return (
    <Layout>
      <PageTitle 
        title="Shipping History" 
        description="View archive of completed shipments" 
      />
      
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-medium">Shipping History</h2>
              <p className="text-muted-foreground mt-1">Complete archive of all past shipments</p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={generateReport}
              className="flex items-center gap-2"
            >
              <Download size={16} />
              Generate Report
            </Button>
          </div>
          
          <div className="flex justify-between mb-6">
            <div className="relative w-full max-w-md">
              <Input 
                type="text" 
                placeholder="Search by tracking number, customer, or destination..." 
                className="pl-10"
                value={searchTerm}
                onChange={handleSearch}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
            </div>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Filter
            </Button>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-12 text-center">#</TableHead>
                  <TableHead>Tracking Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Ship Date</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-20 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentShipments.map((shipment) => (
                  <TableRow key={shipment.id} className="border-b border-gray-200">
                    <TableCell className="text-center">{shipment.id}</TableCell>
                    <TableCell>{shipment.trackingNumber}</TableCell>
                    <TableCell>{shipment.customer}</TableCell>
                    <TableCell>{shipment.destination}</TableCell>
                    <TableCell>{shipment.shipDate}</TableCell>
                    <TableCell>{shipment.deliveryDate || 'N/A'}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        shipment.status === 'Returned' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {shipment.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <button 
                        onClick={() => viewShipmentDetails(shipment.id)}
                        className="p-1.5 hover:bg-gray-100 rounded-full inline-flex items-center justify-center"
                        title="View Details"
                      >
                        <Eye size={18} className="text-gray-500" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
                
                {currentShipments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-gray-400 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="5" width="20" height="14" rx="2" />
                            <line x1="2" y1="10" x2="22" y2="10" />
                          </svg>
                        </div>
                        <p className="text-gray-500 font-medium">No shipments found</p>
                        <p className="text-gray-400 text-sm mt-1">
                          {searchTerm ? `No shipments matching "${searchTerm}"` : 'No shipment history available yet'}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {filteredShipments.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredShipments.length)} to {Math.min(currentPage * itemsPerPage, filteredShipments.length)} of {filteredShipments.length} shipments
              </p>
              
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) handlePageChange(currentPage - 1);
                      }}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => 
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    )
                    .map((page, i, arr) => (
                      <React.Fragment key={page}>
                        {i > 0 && arr[i - 1] !== page - 1 && (
                          <PaginationItem>
                            <span className="px-4 py-2">...</span>
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(page);
                            }}
                            isActive={page === currentPage}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      </React.Fragment>
                    ))
                  }
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) handlePageChange(currentPage + 1);
                      }}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ShippingHistory;
