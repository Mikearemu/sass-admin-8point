import { NavLink } from "react-router-dom";
import {
  CreditCard,
  LayoutDashboard,
  Settings,
  Users,
  Building2,
  Key,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut as SignOut,
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
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Tenants", url: "/admin/tenants", icon: Building2 },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Plans & Billing", url: "/admin/plans", icon: CreditCard },
  { title: "API Keys", url: "/admin/api", icon: Key },
  { title: "Settings", url: "/admin/settings", icon: Settings },
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
