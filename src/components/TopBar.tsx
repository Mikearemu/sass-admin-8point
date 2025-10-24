import { Bell, Menu, User, Moon, Sun, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { useState, useEffect } from "react";

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar = ({ onMenuClick }: TopBarProps) => {
  const [notificationCount] = useState(3);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setTheme(isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <>
      <header
        className="
    sticky top-0  z-40
    mx-auto
    flex items-center justify-between
    h-16 mb-5
    w-[350px]
     max-w-[calc(100vw-1rem)] mx-auto
    rounded-[30px] border-0 md:border-0 bg-card
    px-4
     bg-transparent
   backdrop-blur-md
    transition-colors duration-300
  "
      >
        {/* Left: Mobile menu + Logo */}
        <div className="flex items-center gap-4 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="font-dela text-xl text-foreground md:hidden">
            8Point
          </h1>
        </div>

        {/* Right: Theme Toggle + Notifications + User */}
        <div className="flex items-center  m-4 gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSearch}
            className="transition-transform hidden md:flex hover:scale-110"
          >
            <Search />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="transition-transform hover:scale-110"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-warning text-warning-foreground"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-popover">
              <DropdownMenuLabel className="font-montserrat">
                Notifications
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium font-montserrat">
                  New sale completed
                </span>
                <span className="text-xs text-muted-foreground">
                  Order #123 - $450.00 • 2h ago
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium font-montserrat">
                  Low stock alert
                </span>
                <span className="text-xs text-muted-foreground">
                  10 products need restocking • 3h ago
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium font-montserrat">
                  New chat message
                </span>
                <span className="text-xs text-muted-foreground">
                  Support team mentioned you • 5h ago
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-primary font-montserrat">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center p-2 gap-2 rounded-full hover:bg-muted transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <img
                    src="/images/uploads/image.png"
                    alt="8Point Logo"
                    className="w-[90px] text-primary-foreground text-center"
                  />
                </div>
                <span className="font-medium text-sm text-foreground hidden sm:inline-block">
                  Stackmike
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 bg-popover border border-border rounded-lg shadow-md"
            >
              <DropdownMenuLabel className="font-montserrat">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    Admin User
                  </p>
                  <p className="text-xs text-muted-foreground">
                    admin@8point.com
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="font-montserrat cursor-pointer hover:bg-muted transition-colors">
                My Profile
              </DropdownMenuItem>

              <DropdownMenuItem className="font-montserrat cursor-pointer hover:bg-muted transition-colors">
                Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="font-montserrat text-destructive hover:text-destructive-foreground cursor-pointer transition-colors">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      {/* Search Bar */}
      <div
        className={`fixed bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl px-4 transition-all duration-300 ease-in-out ${
          showSearch
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="relative bg-sidebar p-3 rounded-[30px]  shadow-lg">
          <Search className="absolute  left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-sidebar-foreground" />
          <Input
            placeholder="Search anything..."
            className="pl-9 w-full bg-transparent border-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sidebar-foreground"
          />
        </div>
      </div>
    </>
  );
};
