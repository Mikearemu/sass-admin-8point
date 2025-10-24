import { useState } from "react";
import { Plus, Search, Eye, RotateCcw, DollarSign, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { KPICard } from "@/components/KPICard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReturnModal } from "@/components/modals/ReturnModal";

const returns = [
  { id: "RET-001", transactionId: "TXN-245", date: "2025-10-12", customer: "John Smith", product: "Premium Coffee", quantity: 2, amount: 25.98, reason: "Damaged product", status: "completed" },
  { id: "RET-002", transactionId: "TXN-198", date: "2025-10-11", customer: "Sarah Johnson", product: "Chocolate Cake", quantity: 1, amount: 24.99, reason: "Wrong item", status: "completed" },
  { id: "RET-003", transactionId: "TXN-234", date: "2025-10-11", customer: "Mike Brown", product: "Fresh Juice", quantity: 3, amount: 20.97, reason: "Quality issue", status: "pending" },
  { id: "RET-004", transactionId: "TXN-189", date: "2025-10-10", customer: "Emily Davis", product: "Croissant", quantity: 4, amount: 19.96, reason: "Customer changed mind", status: "completed" },
  { id: "RET-005", transactionId: "TXN-156", date: "2025-10-09", customer: "David Wilson", product: "Salad Bowl", quantity: 1, amount: 11.99, reason: "Allergic reaction", status: "rejected" },
];

const Returns = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState<any>(null);

  const handleAddReturn = () => {
    setSelectedReturn(null);
    setModalOpen(true);
  };

  const handleViewReturn = (returnItem: any) => {
    setSelectedReturn(returnItem);
    setModalOpen(true);
  };

  const totalReturns = returns.reduce((sum, r) => sum + r.amount, 0);
  const pendingReturns = returns.filter(r => r.status === "pending").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">Returns & Refunds</h1>
          <p className="text-muted-foreground font-quicksand">
            Manage product returns and customer refunds
          </p>
        </div>
        <Button variant="classic" className="font-montserrat" onClick={handleAddReturn}>
          <Plus className="h-4 w-4 mr-2" />
          Process Return
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          title="Total Returns"
          value={returns.length.toString()}
          subtitle="All time"
          icon={RotateCcw}
          className="animate-scale-in"
        />
        <KPICard
          title="Pending Returns"
          value={pendingReturns.toString()}
          subtitle="Awaiting approval"
          icon={RotateCcw}
          className="border-l-4 border-l-warning animate-scale-in"
        />
        <KPICard
          title="Refund Amount"
          value={`$${totalReturns.toFixed(2)}`}
          subtitle="Total refunded"
          icon={DollarSign}
          className="animate-scale-in"
        />
        <KPICard
          title="Return Rate"
          value="2.3%"
          subtitle="Of total sales"
          icon={TrendingDown}
          className="animate-scale-in"
        />
      </div>

      {/* Search & Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by return ID or transaction..." className="pl-9" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="font-montserrat">
              All
            </Button>
            <Button variant="outline" className="font-montserrat">
              Pending
            </Button>
            <Button variant="outline" className="font-montserrat">
              Completed
            </Button>
          </div>
        </div>
      </Card>

      {/* Returns Table */}
      <Card className="animate-slide-in-left">
       
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-montserrat">Return ID</TableHead>
              <TableHead className="font-montserrat">Transaction</TableHead>
              <TableHead className="font-montserrat">Date</TableHead>
              <TableHead className="font-montserrat">Customer</TableHead>
              <TableHead className="font-montserrat">Product</TableHead>
              <TableHead className="font-montserrat">Qty</TableHead>
              <TableHead className="font-montserrat">Amount</TableHead>
              <TableHead className="font-montserrat">Reason</TableHead>
              <TableHead className="font-montserrat">Status</TableHead>
              <TableHead className="font-montserrat">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {returns.map((returnItem) => (
              <TableRow key={returnItem.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-montserrat font-medium">{returnItem.id}</TableCell>
                <TableCell className="font-quicksand text-muted-foreground">{returnItem.transactionId}</TableCell>
                <TableCell className="font-quicksand text-muted-foreground">{returnItem.date}</TableCell>
                <TableCell className="font-montserrat">{returnItem.customer}</TableCell>
                <TableCell className="font-montserrat">{returnItem.product}</TableCell>
                <TableCell className="font-montserrat">{returnItem.quantity}</TableCell>
                <TableCell className="font-montserrat font-bold">${returnItem.amount.toFixed(2)}</TableCell>
                <TableCell className="font-quicksand text-sm">{returnItem.reason}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      returnItem.status === "completed"
                        ? "default"
                        : returnItem.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {returnItem.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost" onClick={() => handleViewReturn(returnItem)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <ReturnModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        returnData={selectedReturn}
      />
    </div>
  );
};

export default Returns;
