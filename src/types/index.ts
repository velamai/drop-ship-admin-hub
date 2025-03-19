
export interface Address {
  id: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'processed'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  isReady: boolean;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
  }[];
}

export type ShipmentStatus = 
  | 'Received'
  | 'Accepted' 
  | 'Price Ready' 
  | 'Invoice Generated'
  | 'Shipped'
  | 'Delivered';

export interface Shipment {
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
  priceDetails?: {
    basePrice: number;
    extraCharges: number;
    tax: number;
    discount: number;
    total: number;
    courierService: string;
    quantity: number;
  };
  notes?: string;
}
