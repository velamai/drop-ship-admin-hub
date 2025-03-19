
import React from 'react';
import { ShipmentStatus } from '@/types';

interface ShipmentStatusBadgeProps {
  status: ShipmentStatus;
  className?: string;
}

export const ShipmentStatusBadge: React.FC<ShipmentStatusBadgeProps> = ({ 
  status, 
  className = '' 
}) => {
  let badgeClass = "rounded-full px-3 py-1 text-xs font-semibold text-white " + className;
  
  switch (status) {
    case 'Received':
      badgeClass += " bg-indigo-600";
      break;
    case 'Accepted':
      badgeClass += " bg-blue-600";
      break;
    case 'Price Ready':
      badgeClass += " bg-green-600";
      break;
    case 'Invoice Generated':
      badgeClass += " bg-purple-600";
      break;
    case 'Shipped':
      badgeClass += " bg-amber-600";
      break;
    case 'Delivered':
      badgeClass += " bg-emerald-600";
      break;
    default:
      badgeClass += " bg-gray-600";
  }
  
  return <span className={badgeClass}>{status}</span>;
};
