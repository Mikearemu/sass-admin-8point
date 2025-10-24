import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Rabbit,LayoutDashboard,Ban   } from 'lucide-react';
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-sidebar items-center text-sidebar-foreground justify-center">
      <div className="text-center">
         {/* <Ban  className="w-[200px] h-[200px] mx-auto" /> */}
        <h1 className="mb-4 text-4xl font-dela font-bold">Error 404</h1>
        <p className="mb-4 text-xl text-gray-200">Oops! Page not found</p>
        <Button variant="default"  onClick={() => navigate("/")}  >
          <LayoutDashboard className="h-5 w-5" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
