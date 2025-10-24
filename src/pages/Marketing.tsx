import { Button } from "@/components/ui/button";
import { Send, Users, Filter, BarChart3 } from "lucide-react";

const Marketing = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Marketing & CRM</h1>
          <p className="text-muted-foreground">
            Manage your campaigns, leads, and funnels.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">View Analytics</Button>
          <Button>New Campaign</Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 border rounded-lg">
          <Send className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-semibold">Campaigns</h3>
          <p className="text-muted-foreground">Manage your marketing campaigns</p>
        </div>
        <div className="p-6 border rounded-lg">
          <Users className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-semibold">Leads</h3>
          <p className="text-muted-foreground">View and manage your leads</p>
        </div>
        <div className="p-6 border rounded-lg">
          <Filter className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-semibold">Funnels</h3>
          <p className="text-muted-foreground">Create and manage sales funnels</p>
        </div>
        <div className="p-6 border rounded-lg">
          <BarChart3 className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-semibold">Analytics</h3>
          <p className="text-muted-foreground">Track your marketing performance</p>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
