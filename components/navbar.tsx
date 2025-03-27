"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, MapPin, User, LayoutDashboard } from "lucide-react";

interface NavbarProps {
  activePage: "dashboard" | "orders" | "addresses" | "account";
}

export function Navbar({ activePage }: NavbarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      id: "dashboard",
    },
    {
      name: "Orders",
      href: "/orders",
      icon: Package,
      id: "orders",
    },
    {
      name: "Addresses",
      href: "/addresses",
      icon: MapPin,
      id: "addresses",
    },
    {
      name: "Account",
      href: "/account",
      icon: User,
      id: "account",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[#e2e2e2] bg-white">
      <div className="container mx-auto max-w-6xl px-4 py-3 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="text-xl font-bold text-[#3f3f3f]">
            Dropship Hub
          </Link>

          <div className="hidden md:block">
            <ul className="flex items-center space-x-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`flex items-center text-sm ${activePage === item.id ? "text-[#9c4cd2]" : "text-[#3f3f3f] hover:text-[#9c4cd2]"}`}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="block md:hidden">
            <div className="fixed bottom-0 left-0 right-0 border-t border-[#e2e2e2] bg-white">
              <ul className="flex items-center justify-around px-4 py-3">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className={`flex flex-col items-center text-xs ${activePage === item.id ? "text-[#9c4cd2]" : "text-[#3f3f3f]"}`}
                    >
                      <item.icon className="mb-1 h-5 w-5" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
