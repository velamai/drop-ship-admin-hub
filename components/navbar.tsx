import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, User, MapPin, Home } from "lucide-react";

interface NavbarProps {
  activePage: string;
}

export function Navbar({ activePage }: NavbarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
      active: activePage === "dashboard",
    },
    {
      name: "Orders",
      href: "/orders",
      icon: Package,
      active: activePage === "orders",
    },
    {
      name: "Addresses",
      href: "/addresses",
      icon: MapPin,
      active: activePage === "addresses",
    },
    {
      name: "Account",
      href: "/account",
      icon: User,
      active: activePage === "account",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#e2e2e2] bg-white">
      <div className="container mx-auto max-w-6xl px-4 py-3 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="text-xl font-bold text-[#3f3f3f]">
            Dropship Hub
          </Link>

          <div className="hidden md:block">
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium ${item.active ? "bg-[#9a3bd9] text-white" : "text-[#3f3f3f] hover:bg-[#9a3bd9]/10"}`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 block border-t border-[#e2e2e2] bg-white md:hidden">
        <div className="flex justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center px-3 py-2 text-xs ${item.active ? "text-[#9a3bd9]" : "text-[#3f3f3f]"}`}
            >
              <item.icon className="mb-1 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
