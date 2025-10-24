import { useState } from "react";
import { Plus, Play, Pause, Edit, Trash2, Zap, Edit2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AutomationModal } from "@/components/modals/AutomationModal";
import { toast } from "@/hooks/use-toast";

const automations = [
  { 
    id: "1", 
    name: "Welcome Email Sequence", 
    trigger: "New User Signup", 
    actions: 3, 
    status: "active",
    description: "Sends a series of welcome emails to new users"
  },
  { 
    id: "2", 
    name: "Abandoned Cart Recovery", 
    trigger: "Cart Inactive > 1 hour", 
    actions: 2, 
    status: "active",
    description: "Sends reminder emails for abandoned shopping carts"
  },
  { 
    id: "3", 
    name: "Invoice Auto-Generation", 
    trigger: "Order Completed", 
    actions: 4, 
    status: "active",
    description: "Automatically generates and sends invoices"
  },
  { 
    id: "4", 
    name: "Low Stock Alert", 
    trigger: "Stock < 10 units", 
    actions: 2, 
    status: "paused",
    description: "Notifies admin when inventory is low"
  },
  { 
    id: "5", 
    name: "Customer Feedback Request", 
    trigger: "Order Delivered", 
    actions: 1, 
    status: "active",
    description: "Requests feedback from customers after delivery"
  },
];

const Automations = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedAutomation, setSelectedAutomation] = useState<any>(null);

  const handleEdit = (automation: any) => {
    setModalMode("edit");
    setSelectedAutomation(automation);
    setModalOpen(true);
  };

  const handleToggle = (automation: any) => {
    toast({
      title: automation.status === "active" ? "Automation Paused" : "Automation Activated",
      description: `${automation.name} is now ${automation.status === "active" ? "paused" : "active"}`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">AI Automations</h1>
          <p className="text-muted-foreground font-quicksand mt-2">
            Set up automated workflows to streamline your operations
          </p>
        </div>
        <Button className="font-montserrat" onClick={() => { setModalMode("add"); setSelectedAutomation(null); setModalOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Create Automation
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 animate-scale-in">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-quicksand">Total Automations</p>
              <p className="text-3xl font-dela text-foreground">{automations.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 animate-scale-in">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
              <Play className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-quicksand">Active</p>
              <p className="text-3xl font-dela text-success">
                {automations.filter(a => a.status === "active").length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6 animate-scale-in">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
              <Pause className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-quicksand">Paused</p>
              <p className="text-3xl font-dela text-warning">
                {automations.filter(a => a.status === "paused").length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Automations List */}
      <div className="space-y-4">
        {automations.map((automation) => (
          <Card key={automation.id} className="p-6 animate-slide-in-left hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-dela text-foreground">{automation.name}</h3>
                  <Badge variant={automation.status === "active" ? "default" : "secondary"}>
                    {automation.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground font-quicksand mb-3">
                  {automation.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground font-quicksand">Trigger:</span>
                    <Badge variant="outline">{automation.trigger}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground font-quicksand">Actions:</span>
                    <span className="font-montserrat font-semibold">{automation.actions}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={automation.status === "active"} onCheckedChange={() => handleToggle(automation)} />
                <Button size="sm" variant="outline" onClick={() => handleEdit(automation)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Popular Templates */}
      <Card className="p-6 animate-fade-in">
        <h2 className="text-2xl font-dela text-foreground mb-4">Popular Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "Email Marketing Sequence", category: "Marketing" },
            { name: "Lead Scoring", category: "Sales" },
            { name: "Data Backup", category: "System" },
            { name: "Social Media Posting", category: "Marketing" },
          ].map((template, index) => (
            <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-montserrat font-semibold">{template.name}</p>
                  <p className="text-sm text-muted-foreground font-quicksand">{template.category}</p>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <AutomationModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode={modalMode}
        automation={selectedAutomation}
      />
    </div>
  );
};

export default Automations;
