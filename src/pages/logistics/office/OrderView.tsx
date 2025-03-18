
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTitle } from '@/components/ui/PageTitle';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const OrderView = () => {
  const { id } = useParams();
  
  // In a real app, this would fetch data from an API
  const orderData = {
    orderId: 'LOG-2023-001',
    placedDate: '2023-09-01',
    shipment: {
      type: 'Express',
      totalWeight: '2.5 kg',
      shippingAddress: {
        name: 'Alice Smith',
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '92234',
        country: 'United States'
      },
      shippingMethod: 'Express Shipping (1-2 days)',
      specialInstructions: 'Please handle with care, contains fragile items.',
      carrier: {
        service: 'DHL',
        country: 'United States'
      }
    },
    sender: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 333-4444',
      company: 'Colombo Mail',
      address: {
        street: '456 Sender St',
        city: 'Colombo',
        zip: '00100',
        country: 'Sri Lanka'
      }
    },
    receiver: {
      name: 'Alice Smith',
      email: 'alice@example.com',
      phone: '+1 (555) 111-2222',
      company: 'Tech Solutions Inc.',
      vatTax: 'VAT123456789',
      address: {
        street: '123 Billing St',
        city: 'Billstown',
        state: 'CA',
        zip: '90210',
        country: 'United States'
      }
    },
    items: [
      {
        id: 1,
        product: 'Laptop',
        sku: 'SKU-789-456-123',
        desc: 'Macbook Pro 16-inch',
        quantity: 1,
        price: 1200.00
      },
      {
        id: 2,
        product: 'Wireless Mouse',
        sku: 'SKU-789-456-789',
        desc: 'Bluetooth Mouse',
        quantity: 2,
        price: 50.00
      }
    ],
    financials: {
      subtotal: 1300.00,
      shipping: 25.00,
      tax: 130.00,
      total: 1455.00
    },
    package: {
      type: 'Box',
      totalWeight: '2.5 kg',
      dimensions: {
        length: 40,
        width: 30,
        height: 10
      }
    }
  };

  return (
    <Layout>
      <div className="pb-8">
        {/* Header with back button */}
        <div className="flex items-center mb-4">
          <Link to="/logistics/office/orders" className="flex items-center text-gray-500 hover:text-gray-700 mr-4">
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to Orders</span>
          </Link>
        </div>
        
        {/* Title and print button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-semibold">Order #{orderData.orderId}</h1>
            <p className="text-gray-500 text-sm">Placed on {orderData.placedDate}</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Printer size={16} />
            Print
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipment Details */}
          <Card>
            <CardContent className="p-0">
              <div className="bg-gray-50 p-4 border-b flex items-center">
                <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                  <span className="text-purple-600 text-xs">📦</span>
                </div>
                <h2 className="font-medium">Shipment Details</h2>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Shipment Type</p>
                    <p className="font-medium">{orderData.shipment.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Country</p>
                    <p className="font-medium">{orderData.shipment.carrier.country}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Total Weight</p>
                    <p className="font-medium">{orderData.shipment.totalWeight}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Carrier Service</p>
                    <p className="font-medium">{orderData.shipment.carrier.service}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Shipping Address</p>
                  <p className="font-medium">{orderData.shipment.shippingAddress.name}</p>
                  <p>{orderData.shipment.shippingAddress.street}</p>
                  <p>
                    {orderData.shipment.shippingAddress.city}, {orderData.shipment.shippingAddress.state} {orderData.shipment.shippingAddress.zip}
                  </p>
                  <p>{orderData.shipment.shippingAddress.country}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Shipping Method</p>
                  <p className="font-medium">{orderData.shipment.shippingMethod}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Special Instructions</p>
                  <p className="text-sm">{orderData.shipment.specialInstructions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Sender Information */}
          <Card>
            <CardContent className="p-0">
              <div className="bg-gray-50 p-4 border-b flex items-center">
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <span className="text-blue-600 text-xs">👤</span>
                </div>
                <h2 className="font-medium">Sender Information</h2>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <p className="text-xs text-gray-500">Sender</p>
                  <p className="font-medium">{orderData.sender.name}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium">{orderData.sender.email}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="font-medium">{orderData.sender.phone}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Company</p>
                  <p className="font-medium">{orderData.sender.company}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Sender Address</p>
                  <p className="font-medium">{orderData.sender.address.street}</p>
                  <p>{orderData.sender.address.city} {orderData.sender.address.zip}</p>
                  <p>{orderData.sender.address.country}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Item Information */}
        <Card className="mt-6">
          <CardContent className="p-0">
            <div className="bg-gray-50 p-4 border-b flex items-center">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                <span className="text-green-600 text-xs">📋</span>
              </div>
              <h2 className="font-medium">Item Information</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-500 border-b">
                    <th className="p-4 font-medium">#</th>
                    <th className="p-4 font-medium">Product</th>
                    <th className="p-4 font-medium">Quantity</th>
                    <th className="p-4 font-medium text-right">Price</th>
                    <th className="p-4 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.items.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-4">{item.id}</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                            <span className="text-gray-600 text-xs">💻</span>
                          </div>
                          <div>
                            <p className="font-medium">{item.product}</p>
                            <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                            <p className="text-xs text-gray-500">Desc: {item.desc}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{item.quantity}</td>
                      <td className="p-4 text-right">${item.price.toFixed(2)}</td>
                      <td className="p-4 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t">
              <div className="flex flex-col items-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${orderData.financials.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>${orderData.financials.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${orderData.financials.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-purple-600">${orderData.financials.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Receiver Information */}
        <Card className="mt-6">
          <CardContent className="p-0">
            <div className="bg-gray-50 p-4 border-b flex items-center">
              <div className="h-5 w-5 rounded-full bg-pink-100 flex items-center justify-center mr-2">
                <span className="text-pink-600 text-xs">🧑</span>
              </div>
              <h2 className="font-medium">Receiver Information</h2>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500">Customer</p>
                  <p className="font-medium">{orderData.receiver.name}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium">{orderData.receiver.email}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="font-medium">{orderData.receiver.phone}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Company</p>
                  <p className="font-medium">{orderData.receiver.company}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">VAT/TAX</p>
                  <p className="font-medium">{orderData.receiver.vatTax}</p>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-500">Receiver Address</p>
                <p className="font-medium">{orderData.receiver.address.street}</p>
                <p>
                  {orderData.receiver.address.city}, {orderData.receiver.address.state} {orderData.receiver.address.zip}
                </p>
                <p>{orderData.receiver.address.country}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Package Information */}
        <Card className="mt-6">
          <CardContent className="p-0">
            <div className="bg-gray-50 p-4 border-b flex items-center">
              <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                <span className="text-orange-600 text-xs">📦</span>
              </div>
              <h2 className="font-medium">Package Information</h2>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500">Package Type</p>
                  <p className="font-medium">{orderData.package.type}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Total Weight</p>
                  <p className="font-medium">{orderData.package.totalWeight}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-xs text-gray-500">Dimensions (cm)</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Length</p>
                    <p className="font-medium">{orderData.package.dimensions.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Width</p>
                    <p className="font-medium">{orderData.package.dimensions.width}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Height</p>
                    <p className="font-medium">{orderData.package.dimensions.height}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OrderView;
