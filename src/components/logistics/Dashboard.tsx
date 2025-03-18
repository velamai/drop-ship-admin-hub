
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  TruckIcon, 
  Users, 
  Calendar,
  ArrowUpRight
} from 'lucide-react';

export const LogisticsDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Shipments
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +5.2% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              -2.5% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Scheduled Pickups
            </CardTitle>
            <TruckIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +12% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">421</div>
            <p className="text-xs text-muted-foreground">
              +4.9% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recent Shipments</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Pickups</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Shipments</CardTitle>
              <CardDescription>
                Most recent shipments processed in the system
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-sm">
                    <th className="text-left p-4 font-medium">Tracking No</th>
                    <th className="text-left p-4 font-medium">Origin</th>
                    <th className="text-left p-4 font-medium">Destination</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: 'SHP00123',
                      origin: 'Colombo',
                      destination: 'New York',
                      status: 'In Transit',
                      date: '2023-06-15'
                    },
                    {
                      id: 'SHP00124',
                      origin: 'London',
                      destination: 'Colombo',
                      status: 'Processing',
                      date: '2023-06-14'
                    },
                    {
                      id: 'SHP00125',
                      origin: 'Dubai',
                      destination: 'Sydney',
                      status: 'Delivered',
                      date: '2023-06-13'
                    },
                    {
                      id: 'SHP00126',
                      origin: 'Singapore',
                      destination: 'Tokyo',
                      status: 'Pending',
                      date: '2023-06-12'
                    },
                  ].map((shipment) => (
                    <tr key={shipment.id} className="border-b hover:bg-muted/50">
                      <td className="p-4">{shipment.id}</td>
                      <td className="p-4">{shipment.origin}</td>
                      <td className="p-4">{shipment.destination}</td>
                      <td className="p-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                          shipment.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {shipment.status}
                        </span>
                      </td>
                      <td className="p-4">{shipment.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Key logistics performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2">Performance metrics visualization would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Pickups</CardTitle>
              <CardDescription>
                Scheduled pickups for the next 48 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: 'PCK001',
                    customer: 'ABC Corp',
                    address: '123 Main St, Colombo',
                    time: '2023-06-16 10:00 AM',
                    items: 3
                  },
                  {
                    id: 'PCK002',
                    customer: 'Global Enterprises',
                    address: '456 Market Ave, Kandy',
                    time: '2023-06-16 02:30 PM',
                    items: 5
                  },
                  {
                    id: 'PCK003',
                    customer: 'Tech Solutions Ltd',
                    address: '789 Tower Rd, Galle',
                    time: '2023-06-17 09:15 AM',
                    items: 2
                  }
                ].map((pickup) => (
                  <div key={pickup.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Calendar className="h-10 w-10 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{pickup.customer}</p>
                        <p className="text-sm text-muted-foreground">{pickup.address}</p>
                        <p className="text-sm text-muted-foreground">{pickup.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <p className="text-sm font-medium">{pickup.items} items</p>
                        <p className="text-xs text-muted-foreground">Pickup #{pickup.id}</p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: "New Order", icon: ShoppingCart },
                { title: "New Shipment", icon: Package },
                { title: "Schedule Pickup", icon: TruckIcon },
                { title: "New Walking Customer", icon: Users },
                { title: "Track Shipment", icon: Package },
                { title: "Generate Reports", icon: BarChart3 }
              ].map((action, i) => (
                <div 
                  key={i} 
                  className="flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer hover:bg-muted/50"
                >
                  <action.icon className="h-8 w-8 mb-2 text-primary" />
                  <span className="text-sm font-medium text-center">{action.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { message: "3 shipments pending customs clearance", level: "warning" },
                { message: "Pickup #PCK001 delayed", level: "error" },
                { message: "New service rates effective from July 1", level: "info" }
              ].map((alert, i) => (
                <div 
                  key={i} 
                  className={`p-3 rounded-lg text-sm ${
                    alert.level === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    alert.level === 'error' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}
                >
                  {alert.message}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
