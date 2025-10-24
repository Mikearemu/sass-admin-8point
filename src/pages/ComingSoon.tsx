import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";

const ComingSoon = () => {
  const location = useLocation();
  const moduleName = location.pathname.slice(1).toUpperCase() || "MODULE";

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="max-w-md w-full p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Construction className="h-10 w-10 text-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-dela text-foreground">{moduleName} Module</h1>
          <p className="text-muted-foreground font-quicksand">
            This module is currently under development. Check back soon for updates!
          </p>
        </div>

        <Button
          variant="outline"
          className="font-montserrat"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </Card>
    </div>
  );
};

export default ComingSoon;
