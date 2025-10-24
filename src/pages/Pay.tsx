import { Search, Filter, Download, Plus, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { KPICard } from "@/components/KPICard";
import { DollarSign, Clock, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const transactions = [
  { id: "TXN-1247", date: "2024-01-15", customer: "John Doe", amount: 450.0, status: "completed" },
  { id: "TXN-1246", date: "2024-01-15", customer: "Jane Smith", amount: 285.0, status: "completed" },
  { id: "TXN-1245", date: "2024-01-14", customer: "Bob Johnson", amount: 120.5, status: "pending" },
  { id: "TXN-1244", date: "2024-01-14", customer: "Alice Brown", amount: 890.0, status: "completed" },
  { id: "TXN-1243", date: "2024-01-13", customer: "Charlie Davis", amount: 65.0, status: "failed" },
];

const Pay = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">Payment Processing</h1>
          <p className="text-muted-foreground font-quicksand mt-2">
            Manage transactions and invoices
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-montserrat">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="font-montserrat">
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Total Processed"
          value="$45,890"
          subtitle="This month"
          icon={DollarSign}
          trend={{ value: "15.2%", isPositive: true }}
          className="border-l-4 border-l-success animate-scale-in"
        />
        <KPICard
          title="Pending Payments"
          value="$2,340"
          subtitle="Awaiting confirmation"
          icon={Clock}
          className="border-l-4 border-l-warning animate-scale-in"
        />
        <KPICard
          title="Failed Transactions"
          value="5"
          subtitle="Requires attention"
          icon={XCircle}
          className="border-l-4 border-l-destructive animate-scale-in"
        />
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search transactions..." className="pl-9" />
          </div>
          <Button variant="outline" className="font-montserrat">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </Card>

      {/* Transactions Table */}
      <Card className="animate-slide-in-left">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-montserrat">Transaction ID</TableHead>
              <TableHead className="font-montserrat">Date</TableHead>
              <TableHead className="font-montserrat">Customer</TableHead>
              <TableHead className="font-montserrat">Amount</TableHead>
              <TableHead className="font-montserrat">Status</TableHead>
              <TableHead className="font-montserrat">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((txn) => (
              <TableRow key={txn.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-montserrat font-medium">{txn.id}</TableCell>
                <TableCell className="font-quicksand">{txn.date}</TableCell>
                <TableCell className="font-quicksand">{txn.customer}</TableCell>
                <TableCell className="font-montserrat">${txn.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      txn.status === "completed"
                        ? "default"
                        : txn.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {txn.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Pay;
