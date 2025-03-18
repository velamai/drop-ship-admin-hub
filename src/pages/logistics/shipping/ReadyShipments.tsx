
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Truck, 
  FileText, 
  Calendar, 
  Search, 
  Filter, 
  RefreshCw,
  CheckCircle,
  Printer,
  Package,
  ArrowRight
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface ReadyShipment {
  id: string;
  trackingNumber: string;
  customer: string;
  origin: string;
  destination: string;
  packages: number;
  weight: string;
  service: string;
  carrier: string;
  readyDate: string;
}

const ReadyShipments = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShipments, setSelectedShipments] = useState<string[]>([]);

  // Mock data for ready shipments
  const readyShipments: ReadyShipment[] = [
    {
      id: "SHP001",
      trackingNumber: "CM12345678",
      customer: "ABC Corporation",
      origin: "Colombo",
      destination: "New York",
      packages: 3,
      weight: "12.5 kg",
      service: "Express International",
      carrier: "Not Assigned",
      readyDate: "2023-06-15"
    },
    {
      id: "SHP002",
      trackingNumber: "CM23456789",
      customer: "Global Enterprises",
      origin: "Colombo",
      destination: "London",
      packages: 1,
      weight: "5.2 kg",
      service: "Standard International",
      carrier: "Not Assigned",
      readyDate: "2023-06-14"
    },
    {
      id: "SHP003",
      trackingNumber: "CM34567890",
      customer: "Tech Solutions Ltd",
      origin: "Colombo",
      destination: "Singapore",
      packages: 2,
      weight: "8.7 kg",
      service: "Priority International",
      carrier: "DHL Express",
      readyDate: "2023-06-14"
    },
    {
      id: "SHP004",
      trackingNumber: "CM45678901",
      customer: "Eastern Imports",
      origin: "Colombo",
      destination: "Dubai",
      packages: 5,
      weight: "22.3 kg",
      service: "Economy International",
      carrier: "Not Assigned",
      readyDate: "2023-06-13"
    },
    {
      id: "SHP005",
      trackingNumber: "CM56789012",
      customer: "Summit Trading Co.",
      origin: "Colombo",
      destination: "Tokyo",
      packages: 4,
      weight: "15.8 kg",
      service: "Express International",
      carrier: "FedEx",
      readyDate: "2023-06-13"
    }
  ];

  // Filter shipments based on search query
  const filteredShipments = readyShipments.filter(shipment => 
    shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle shipment selection
  const toggleShipmentSelection = (id: string) => {
    if (selectedShipments.includes(id)) {
      setSelectedShipments(selectedShipments.filter(shipmentId => shipmentId !== id));
    } else {
      setSelectedShipments([...selectedShipments, id]);
    }
  };

  // Handle batch actions
  const handleAssignCarrier = () => {
    if (selectedShipments.length === 0) {
      toast({
        title: "No shipments selected",
        description: "Please select one or more shipments to assign a carrier.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Carrier assignment",
      description: `Carrier assignment dialog would open for ${selectedShipments.length} shipment(s).`,
    });
  };

  const handleGenerateManifest = () => {
    if (selectedShipments.length === 0) {
      toast({
        title: "No shipments selected",
        description: "Please select one or more shipments to generate a manifest.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Manifest generation",
      description: `Manifest generated for ${selectedShipments.length} shipment(s).`,
    });
  };

  const handleScheduleDeparture = () => {
    if (selectedShipments.length === 0) {
      toast({
        title: "No shipments selected",
        description: "Please select one or more shipments to schedule departure.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Departure scheduling",
      description: `Departure scheduling dialog would open for ${selectedShipments.length} shipment(s).`,
    });
  };

  const handleDispatch = () => {
    if (selectedShipments.length === 0) {
      toast({
        title: "No shipments selected",
        description: "Please select one or more shipments to dispatch.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Shipments dispatched",
      description: `${selectedShipments.length} shipment(s) have been dispatched and moved to history.`,
    });
    
    // In a real implementation, we would update the shipments status and remove them from this view
    setSelectedShipments([]);
  };

  return (
    <Layout>
      <PageTitle 
        title="Ready Shipments" 
        description="Manage shipments prepared for dispatch" 
        actions={
          <>
            <Button variant="outline" onClick={() => setSelectedShipments([])}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button>
              <Printer className="mr-2 h-4 w-4" />
              Print Labels
            </Button>
          </>
        }
      />
      
      <div className="container mx-auto py-6 space-y-6">
        {/* Action buttons */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleAssignCarrier} disabled={selectedShipments.length === 0}>
              <Truck className="mr-2 h-4 w-4" />
              Assign Carrier
            </Button>
            <Button onClick={handleGenerateManifest} disabled={selectedShipments.length === 0}>
              <FileText className="mr-2 h-4 w-4" />
              Generate Manifest
            </Button>
            <Button onClick={handleScheduleDeparture} disabled={selectedShipments.length === 0}>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Departure
            </Button>
            <Button 
              variant="default" 
              className="bg-green-600 hover:bg-green-700" 
              onClick={handleDispatch}
              disabled={selectedShipments.length === 0}
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Dispatch Shipments
            </Button>
          </div>
        </div>
        
        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by tracking #, customer, or destination..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <div className="text-sm text-muted-foreground ml-auto">
              {selectedShipments.length} of {readyShipments.length} selected
            </div>
          </div>
        </div>
        
        {/* Ready shipments list */}
        <div className="bg-white rounded-lg shadow">
          <Tabs defaultValue="all">
            <div className="p-4 border-b">
              <TabsList>
                <TabsTrigger value="all">All Ready Shipments</TabsTrigger>
                <TabsTrigger value="assigned">Carrier Assigned</TabsTrigger>
                <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4"
                          checked={selectedShipments.length === readyShipments.length}
                          onChange={() => {
                            if (selectedShipments.length === readyShipments.length) {
                              setSelectedShipments([]);
                            } else {
                              setSelectedShipments(readyShipments.map(s => s.id));
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>Tracking #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Origin</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead className="text-center">Packages</TableHead>
                      <TableHead>Weight</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Carrier</TableHead>
                      <TableHead>Ready Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredShipments.length > 0 ? (
                      filteredShipments.map((shipment) => (
                        <TableRow key={shipment.id}>
                          <TableCell>
                            <input 
                              type="checkbox" 
                              className="h-4 w-4"
                              checked={selectedShipments.includes(shipment.id)}
                              onChange={() => toggleShipmentSelection(shipment.id)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{shipment.trackingNumber}</TableCell>
                          <TableCell>{shipment.customer}</TableCell>
                          <TableCell>{shipment.origin}</TableCell>
                          <TableCell>{shipment.destination}</TableCell>
                          <TableCell className="text-center">{shipment.packages}</TableCell>
                          <TableCell>{shipment.weight}</TableCell>
                          <TableCell>{shipment.service}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              shipment.carrier === 'Not Assigned' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {shipment.carrier}
                            </span>
                          </TableCell>
                          <TableCell>{shipment.readyDate}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Package className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={11} className="text-center py-6 text-muted-foreground">
                          No ready shipments matching your search criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="assigned" className="p-6 text-center text-muted-foreground">
              Shipments with assigned carriers would be listed here
            </TabsContent>
            
            <TabsContent value="unassigned" className="p-6 text-center text-muted-foreground">
              Shipments without assigned carriers would be listed here
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Summary card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Ready Shipments Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="font-medium text-blue-600">Total Ready Shipments</div>
              <div className="text-2xl font-bold mt-1">{readyShipments.length}</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="font-medium text-yellow-600">Awaiting Carrier Assignment</div>
              <div className="text-2xl font-bold mt-1">
                {readyShipments.filter(s => s.carrier === 'Not Assigned').length}
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="font-medium text-green-600">Ready for Dispatch</div>
              <div className="text-2xl font-bold mt-1">
                {readyShipments.filter(s => s.carrier !== 'Not Assigned').length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReadyShipments;
