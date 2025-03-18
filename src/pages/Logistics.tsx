
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui/PageTitle';
import { LogisticsDashboard } from '@/components/logistics/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Building, Truck, Globe, DollarSign } from 'lucide-react';

const Logistics = () => {
  // Quick access cards for different logistics areas
  const quickAccessAreas = [
    {
      title: "Office Management",
      description: "Manage office orders, pickups, and walk-in customers",
      icon: Building,
      path: "/logistics/office/orders",
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Shipping Management",
      description: "Handle pending shipments, ready shipments, and view history",
      icon: Truck,
      path: "/logistics/shipping/pending",
      color: "bg-green-100 text-green-700"
    },
    {
      title: "Import & Export Services",
      description: "Manage import and export services and routes",
      icon: Globe,
      path: "/logistics/import-export",
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: "Currency Exchange",
      description: "Manage currency exchange transactions and rates",
      icon: DollarSign,
      path: "/logistics/currency-exchange",
      color: "bg-amber-100 text-amber-700"
    }
  ];

  return (
    <Layout>
      <PageTitle 
        title="Logistics" 
        description="Logistics operations management dashboard" 
      />
      
      <div className="container mx-auto py-6 space-y-6">
        {/* Dashboard summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Overview</h2>
          <LogisticsDashboard />
        </div>
        
        {/* Quick access cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickAccessAreas.map((area, index) => (
            <Link to={area.path} key={index}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className={`w-10 h-10 rounded-full ${area.color} flex items-center justify-center mb-2`}>
                    <area.icon size={20} />
                  </div>
                  <CardTitle className="text-lg">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{area.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        {/* Recent activities and metrics could go here */}
      </div>
    </Layout>
  );
};

export default Logistics;
