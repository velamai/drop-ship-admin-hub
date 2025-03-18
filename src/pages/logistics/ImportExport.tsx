
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui/PageTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ImportExport = () => {
  return (
    <Layout>
      <PageTitle 
        title="Import & Export Services" 
        description="Manage import and export services" 
      />
      
      <div className="container mx-auto py-6">
        <Tabs defaultValue="services" className="space-y-4">
          <TabsList className="w-full h-auto flex flex-wrap bg-transparent p-0 border-b">
            <TabsTrigger 
              value="services" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent data-[state=active]:shadow-none"
            >
              Services List
            </TabsTrigger>
            <TabsTrigger 
              value="management" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent data-[state=active]:shadow-none"
            >
              Service Management
            </TabsTrigger>
            <TabsTrigger 
              value="static" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent data-[state=active]:shadow-none"
            >
              Static Services
            </TabsTrigger>
            <TabsTrigger 
              value="routes" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent data-[state=active]:shadow-none"
            >
              Route Services
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="services" className="space-y-4 pt-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-4">Services List</h2>
              <p className="text-muted-foreground mb-4">
                Directory of all available import and export services.
              </p>
              
              {/* Placeholder content - to be implemented */}
              <div className="border rounded-md p-8 flex items-center justify-center">
                <p className="text-muted-foreground">Services list content will be displayed here.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="management" className="space-y-4 pt-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-4">Service Management</h2>
              <p className="text-muted-foreground mb-4">
                Create and modify import and export services.
              </p>
              
              {/* Placeholder content - to be implemented */}
              <div className="border rounded-md p-8 flex items-center justify-center">
                <p className="text-muted-foreground">Service management content will be displayed here.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="static" className="space-y-4 pt-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-4">Static Services</h2>
              <p className="text-muted-foreground mb-4">
                Management of fixed-route or standard services.
              </p>
              
              {/* Placeholder content - to be implemented */}
              <div className="border rounded-md p-8 flex items-center justify-center">
                <p className="text-muted-foreground">Static services content will be displayed here.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="routes" className="space-y-4 pt-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-4">Route Services</h2>
              <p className="text-muted-foreground mb-4">
                Management of customizable route-based services.
              </p>
              
              {/* Placeholder content - to be implemented */}
              <div className="border rounded-md p-8 flex items-center justify-center">
                <p className="text-muted-foreground">Route services content will be displayed here.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ImportExport;
