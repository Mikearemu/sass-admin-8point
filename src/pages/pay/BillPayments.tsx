import { useState } from "react";
import { Search, Plus, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { KPICard } from "@/components/KPICard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const billCategories = [
  { id: "electricity", name: "Electricity", icon: "⚡", providers: ["NEPA", "PHCN", "Eko Electric"] },
  { id: "water", name: "Water Bills", icon: "💧", providers: ["Lagos Water", "Federal Water"] },
  { id: "cable", name: "Cable TV", icon: "📺", providers: ["DSTV", "GOTV", "Startimes"] },
  { id: "internet", name: "Internet/Data", icon: "🌐", providers: ["MTN", "Airtel", "Glo", "9Mobile"] },
  { id: "airtime", name: "Airtime", icon: "📱", providers: ["MTN", "Airtel", "Glo", "9Mobile"] },
  { id: "education", name: "Education", icon: "🎓", providers: ["WAEC", "JAMB", "NECO"] },
  { id: "insurance", name: "Insurance", icon: "🛡️", providers: ["AXA", "Leadway", "Aiico"] },
  { id: "social", name: "Social Media Boost", icon: "📈", providers: ["Instagram", "Facebook", "Twitter"] },
  { id: "transport", name: "Transport/Tickets", icon: "🚌", providers: ["Flight", "Bus", "Train"] },
  { id: "hotel", name: "Hotel Booking", icon: "🏨", providers: ["Hotels.ng", "Booking.com"] },
];

const recentPayments = [
  { id: "1", category: "Electricity", provider: "NEPA", amount: 5000, reference: "ELEC-001", status: "completed", date: "2024-01-15" },
  { id: "2", category: "Cable TV", provider: "DSTV", amount: 3500, reference: "DSTV-002", status: "completed", date: "2024-01-14" },
  { id: "3", category: "Internet/Data", provider: "MTN", amount: 2000, reference: "DATA-003", status: "pending", date: "2024-01-14" },
  { id: "4", category: "Airtime", provider: "Airtel", amount: 1000, reference: "AIR-004", status: "completed", date: "2024-01-13" },
  { id: "5", category: "Water Bills", provider: "Lagos Water", amount: 3000, reference: "WATER-005", status: "failed", date: "2024-01-13" },
];

const BillPayments = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    provider: "",
    accountNumber: "",
    amount: "",
    phone: "",
  });

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
    setFormData({
      provider: "",
      accountNumber: "",
      amount: "",
      phone: "",
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Payment Initiated",
      description: `Your ${selectedCategory?.name} payment is being processed.`,
    });
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">Bill Payments</h1>
          <p className="text-muted-foreground font-quicksand mt-2">
            Pay your bills quickly and securely
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Total Paid"
          value="45,890"
          subtitle="This month"
          icon={CheckCircle2}
          trend={{ value: "12.5%", isPositive: true }}
          className="border-l-4 border-l-success animate-scale-in"
        />
        <KPICard
          title="Pending"
          value="2,340"
          subtitle="Processing"
          icon={Clock}
          className="border-l-4 border-l-warning animate-scale-in"
        />
        <KPICard
          title="Failed"
          value="1,200"
          subtitle="Requires retry"
          icon={XCircle}
          className="border-l-4 border-l-destructive animate-scale-in"
        />
      </div>

      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList>
          <TabsTrigger value="categories">Bill Categories</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {billCategories.map((category) => (
              <Card
                key={category.id}
                className="p-6 hover:shadow-lg transition-all cursor-pointer animate-scale-in"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="text-center space-y-2">
                  <div className="text-4xl">{category.icon}</div>
                  <p className="font-montserrat font-medium text-sm">{category.name}</p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search payments..." className="pl-9" />
            </div>
          </Card>

          <div className="space-y-4">
            {recentPayments.map((payment) => (
              <Card key={payment.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-montserrat font-medium">{payment.category}</p>
                      <Badge variant="outline">{payment.provider}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground font-quicksand">
                      {payment.reference} • {payment.date}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-montserrat font-bold">{payment.amount.toFixed(2)}</p>
                    <Badge
                      variant={
                        payment.status === "completed"
                          ? "default"
                          : payment.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Payment Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-dela">
              {selectedCategory?.icon} {selectedCategory?.name}
            </DialogTitle>
            <DialogDescription className="font-quicksand">
              Enter payment details below
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <Select
                value={formData.provider}
                onValueChange={(value) => setFormData({ ...formData, provider: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  {selectedCategory?.providers.map((provider: string) => (
                    <SelectItem key={provider} value={provider}>
                      {provider}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account/Meter Number</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                placeholder="Enter account number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="08012345678"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₦)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Pay Now</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BillPayments;
