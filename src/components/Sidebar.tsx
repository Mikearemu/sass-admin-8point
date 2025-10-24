import { NavLink } from "react-router-dom";
import {
  ShoppingCart,
  CreditCard,
  Wallet,
  GraduationCap,
  Store,
  Brain,
  MessageSquare,
  LayoutDashboard,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Receipt,
  BarChart3,
  Users,
  Package,
  BookOpen,
  ClipboardList,
  Sparkles,
  MessagesSquare,
  Shield,
  Crown,
  Grid3x3,
  PackageOpen,
  Percent,
  Building2,
  RotateCcw,
  History,
  Layers,
  FileText,
  Facebook,
  LogOut as SignOut,
  CreditCard as PaymentIcon,
  Briefcase,
  Target,
  Send,
  Filter,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { useState } from "react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  // 🏠 MAIN
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Plans", url: "/plans", icon: Crown },

  // 🚀 MODULES
  {
    title: "Wallet",
    url: "/wallet",
    icon: CreditCard,
    submenu: [
      { title: "Balance", url: "/wallet", icon: Wallet },
      { title: "Transactions", url: "/pay", icon: Receipt },
      { title: "Invoices", url: "/pay/invoices", icon: ClipboardList },
      { title: "Bill Payments", url: "/pay/bill-payments", icon: FileText },
      
    ],
  },
  {
    title: "POS",
    url: "/pos",
    icon: ShoppingCart,
    submenu: [
      { title: "Sales", url: "/pos", icon: Receipt },
      { title: "Sales History", url: "/pos/sales-history", icon: History },
      { title: "Returns", url: "/pos/returns", icon: RotateCcw },
      { title: "Discounts", url: "/pos/discounts", icon: Percent },
      { title: "Products", url: "/pos/products", icon: Package },
      { title: "Product Types", url: "/pos/product-types", icon: Layers },
      { title: "Categories", url: "/pos/categories", icon: Grid3x3 },
      { title: "Inventory", url: "/pos/inventory", icon: PackageOpen },
      { title: "Purchases", url: "/pos/purchases", icon: PackageOpen },
      { title: "Customers", url: "/pos/customers", icon: Users },
      { title: "Suppliers", url: "/pos/suppliers", icon: Building2 },
      { title: "Reports", url: "/pos/reports", icon: BarChart3 },
    ],
  },
  {
    title: "E-Commerce",
    url: "/store",
    icon: Store,
    submenu: [
      { title: "Products", url: "/store", icon: Package },
      { title: "Orders", url: "/store/orders", icon: ShoppingCart },
      { title: "Analytics", url: "/store/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "LMS",
    url: "/lms",
    icon: GraduationCap,
    submenu: [
      { title: "Courses", url: "/lms", icon: BookOpen },
      { title: "Students", url: "/lms/students", icon: Users },
      { title: "Progress", url: "/lms/progress", icon: BarChart3 },
    ],
  },
  {
    title: "AI",
    url: "/ai",
    icon: Brain,
    submenu: [
      { title: "Insights", url: "/ai", icon: Sparkles },
      { title: "Automations", url: "/ai/automations", icon: Settings },
    ],
  },
  {
    title: "Chat",
    url: "/chat",
    icon: MessageSquare,
    submenu: [
      { title: "Messages", url: "/chat", icon: MessagesSquare },
      { title: "Channels", url: "/chat/channels", icon: MessageSquare },
    ],
  },
  {
    title: "CRM",
    url: "/marketing",
    icon: Target,
    submenu: [
      { title: "Campaigns", url: "/marketing", icon: Send },
      { title: "Leads", url: "/marketing/leads", icon: Users },
      { title: "Funnels", url: "/marketing/funnels", icon: Filter },
      { title: "Analytics", url: "/marketing/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Accounting",
    url: "/accounting",
    icon: Briefcase,
    submenu: [
      { title: "Invoices", url: "/accounting", icon: ClipboardList },
      { title: "Payroll", url: "/accounting/payroll", icon: DollarSign },
      { title: "Expenses", url: "/accounting/expenses", icon: Receipt },
      { title: "Reports", url: "/accounting/reports", icon: BarChart3 },
    ],
  },

  // ⚙️ SETTINGS
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    submenu: [
      { title: "General", url: "/settings", icon: Settings },
      { title: "Users & Roles", url: "/settings/users", icon: Users },
      { title: "Security", url: "/settings/security", icon: Shield },
      { title: "Integrations", url: "/settings/integrations", icon: Facebook },
      {
        title: "Payment Gateways",
        url: "/settings/payment-gateways",
        icon: PaymentIcon,
      },
    ],
  },
];


export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const toggleMenu = (title: string) => {
    setOpenMenu((prev) => (prev === title ? null : title));
  };

  const isOpen = !collapsed;

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      onToggle(); // collapse sidebar on mobile
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in"
          onClick={onToggle}
        />
      )}

      <aside
        className={cn(
          "bg-sidebar text-sidebar-foreground overflow-x-hidden border-r h-full max-h-[calc(100vh-1rem)] lg:m-2 rounded-[25px] border-sidebar-border transition-all duration-300 flex flex-col",
          "w-64 md:w-64",
          collapsed && "md:w-16 rounded-[30px]",
          "fixed md:relative z-50 top-0 left-0 bottom-0",
          collapsed ? "-translate-x-full" : "p-5 translate-x-0 m-2",
          "md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center w-full justify-center">
              <img
                src="/images/logo.png"
                alt="8Point Logo"
                className="w-[90px] text-center"
              />
            </div>

            // <h1 className="font-dela text-xl text-sidebar-primary">8Point</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>
       

        {/* Scrollable menu section */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.url}>
                {item.submenu && !collapsed ? (
                  <Collapsible
                    open={openMenu === item.title}
                    onOpenChange={() => toggleMenu(item.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <button
                        className={cn(
                          "w-full flex items-center mb-2 justify-between gap-3 px-3 py-2.5 rounded-[8px] font-montserrat text-sm transition-all duration-200",
                          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          <span>{item.title}</span>
                        </div>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            openMenu === item.title && "transform rotate-180"
                          )}
                        />
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-1 space-y-1 animate-accordion-down">
                      {item.submenu.map((subItem) => (
                        <NavLink
                          key={subItem.url}
                          to={subItem.url}
                          onClick={handleLinkClick}
                          end
                          className={({ isActive }) =>
                            cn(
                              "flex items-center gap-3 px-3 py-2 ml-8 rounded-[8px] font-montserrat text-sm transition-all duration-200",
                              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                              isActive
                                ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold"
                                : "text-sidebar-foreground"
                            )
                          }
                        >
                          <subItem.icon className="h-4 w-4 flex-shrink-0" />
                          <span>{subItem.title}</span>
                        </NavLink>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <NavLink
                    to={item.url}
                    end={item.url === "/"}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-[8px] font-montserrat text-sm transition-all duration-200",
                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold"
                          : "text-sidebar-foreground"
                      )
                    }
                    title={collapsed ? item.title : undefined}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && <span>{item.title}</span>}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Fixed Signout button */}
        <div className="p-4 border-t border-sidebar-border overflow-hidden mt-auto">
          <NavLink
            to="/signout"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-[8px] font-montserrat text-sm transition-all duration-200 w-full justify-start",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold"
                  : "text-sidebar-foreground"
              )
            }
          >
            <SignOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </NavLink>
        </div>
      </aside>
    </>
  );
};
