
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import Addresses from "./pages/Addresses";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Logistics from "./pages/Logistics";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

// Logistics pages
import OfficeOrders from "./pages/logistics/office/OfficeOrders";
import PickupOrders from "./pages/logistics/office/PickupOrders";
import WalkingOrders from "./pages/logistics/office/WalkingOrders";
import PendingShipments from "./pages/logistics/shipping/PendingShipments";
import ReadyShipments from "./pages/logistics/shipping/ReadyShipments";
import ShippingHistory from "./pages/logistics/shipping/ShippingHistory";
import ImportExport from "./pages/logistics/ImportExport";
import CurrencyExchange from "./pages/logistics/CurrencyExchange";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { session, loading } = useAuth();
  
  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }
  
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    
    {/* Main routes */}
    <Route 
      path="/" 
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } 
    />
    
    {/* Drop & Ship routes */}
    <Route 
      path="/addresses" 
      element={
        <ProtectedRoute>
          <Addresses />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/orders" 
      element={
        <ProtectedRoute>
          <Orders />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/orders/:id" 
      element={
        <ProtectedRoute>
          <OrderDetail />
        </ProtectedRoute>
      } 
    />
    
    {/* Logistics routes */}
    <Route 
      path="/logistics" 
      element={
        <ProtectedRoute>
          <Logistics />
        </ProtectedRoute>
      } 
    />
    
    {/* Office routes */}
    <Route 
      path="/logistics/office/orders" 
      element={
        <ProtectedRoute>
          <OfficeOrders />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/logistics/office/pickup-orders" 
      element={
        <ProtectedRoute>
          <PickupOrders />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/logistics/office/walking-orders" 
      element={
        <ProtectedRoute>
          <WalkingOrders />
        </ProtectedRoute>
      } 
    />
    
    {/* Shipping routes */}
    <Route 
      path="/logistics/shipping/pending" 
      element={
        <ProtectedRoute>
          <PendingShipments />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/logistics/shipping/ready" 
      element={
        <ProtectedRoute>
          <ReadyShipments />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/logistics/shipping/history" 
      element={
        <ProtectedRoute>
          <ShippingHistory />
        </ProtectedRoute>
      } 
    />
    
    {/* Import/Export and Currency Exchange */}
    <Route 
      path="/logistics/import-export" 
      element={
        <ProtectedRoute>
          <ImportExport />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/logistics/currency-exchange" 
      element={
        <ProtectedRoute>
          <CurrencyExchange />
        </ProtectedRoute>
      } 
    />
    
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
