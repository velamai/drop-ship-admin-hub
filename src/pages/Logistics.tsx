
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui/PageTitle';
import { LogisticsDashboard } from '@/components/logistics/Dashboard';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

const Logistics = () => {
  return (
    <Layout>
      <PageTitle 
        title="Logistics" 
        description="Logistics operations management dashboard" 
      />
      
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="w-full h-auto flex flex-wrap bg-transparent p-0 border-b">
          <TabsTrigger 
            value="dashboard" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent data-[state=active]:shadow-none"
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger 
            value="office" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent data-[state=active]:shadow-none"
          >
            Office Management
          </TabsTrigger>
          <TabsTrigger 
            value="shipping" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent data-[state=active]:shadow-none"
          >
            Shipping
          </TabsTrigger>
          <TabsTrigger 
            value="shipments" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent data-[state=active]:shadow-none"
          >
            Shipments
          </TabsTrigger>
          <TabsTrigger 
            value="services" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent data-[state=active]:shadow-none"
          >
            Import/Export Services
          </TabsTrigger>
          <TabsTrigger 
            value="exchange" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent data-[state=active]:shadow-none"
          >
            Currency Exchange
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-4 pt-2">
          <LogisticsDashboard />
        </TabsContent>
        
        <TabsContent value="office" className="space-y-4 pt-2">
          <p className="text-muted-foreground">
            Office Management content will be displayed here, including Office Orders, 
            Pickup Orders, Walking Customers, and related functionality.
          </p>
        </TabsContent>
        
        <TabsContent value="shipping" className="space-y-4 pt-2">
          <p className="text-muted-foreground">
            Shipping Management content will be displayed here, including Pending Shipments,
            Ready Shipments, and Shipping History.
          </p>
        </TabsContent>
        
        <TabsContent value="shipments" className="space-y-4 pt-2">
          <p className="text-muted-foreground">
            Shipments content will be displayed here, including the Shipments List and 
            individual Shipment Details.
          </p>
        </TabsContent>
        
        <TabsContent value="services" className="space-y-4 pt-2">
          <p className="text-muted-foreground">
            Import/Export Services content will be displayed here, including Service Lists,
            Service Details, Service Management, Static Services, and Route Services.
          </p>
        </TabsContent>
        
        <TabsContent value="exchange" className="space-y-4 pt-2">
          <p className="text-muted-foreground">
            Currency Exchange content will be displayed here, including current exchange
            rates, transaction recording, and transaction history.
          </p>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Logistics;
