
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to SSL Dropship</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Welcome to your newly updated Lovable application. This template has been upgraded to enable the latest features.</p>
            <Button className="w-full">Learn More</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Explore the new features available in this updated version of the Lovable template.</p>
            <Button variant="outline" className="w-full">View Features</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Check out the documentation to learn more about building with Lovable.</p>
            <Button variant="secondary" className="w-full">View Docs</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
