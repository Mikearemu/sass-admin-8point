import { useState } from "react";
import {
  Search,
  Eye,
  Receipt,
  DollarSign,
  TrendingUp,
  Calendar,
  File,
} from "lucide-react";
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

const sales = [
  {
    id: "TXN-001",
    date: "2025-10-12 14:30",
    customer: "John Smith",
    items: 3,
    total: 45.5,
    payment: "card",
    status: "completed",
  },
  {
    id: "TXN-002",
    date: "2025-10-12 14:15",
    customer: "Sarah Johnson",
    items: 2,
    total: 28.99,
    payment: "cash",
    status: "completed",
  },
  {
    id: "TXN-003",
    date: "2025-10-12 14:00",
    customer: "Mike Brown",
    items: 5,
    total: 67.8,
    payment: "card",
    status: "completed",
  },
  {
    id: "TXN-004",
    date: "2025-10-12 13:45",
    customer: "Emily Davis",
    items: 1,
    total: 12.99,
    payment: "card",
    status: "refunded",
  },
  {
    id: "TXN-005",
    date: "2025-10-12 13:30",
    customer: "David Wilson",
    items: 4,
    total: 52.4,
    payment: "cash",
    status: "completed",
  },
  {
    id: "TXN-006",
    date: "2025-10-12 13:15",
    customer: "Guest",
    items: 2,
    total: 19.99,
    payment: "card",
    status: "completed",
  },
  {
    id: "TXN-007",
    date: "2025-10-12 13:00",
    customer: "Anna Lee",
    items: 3,
    total: 38.75,
    payment: "cash",
    status: "completed",
  },
  {
    id: "TXN-008",
    date: "2025-10-12 12:45",
    customer: "Tom Clark",
    items: 1,
    total: 8.99,
    payment: "card",
    status: "completed",
  },
];

const SalesHistory = () => {
  const [selectedSale, setSelectedSale] = useState<any>(null);

  const totalSales = sales.reduce((sum, s) => sum + s.total, 0);
  const completedSales = sales.filter((s) => s.status === "completed").length;
  const avgSale = totalSales / sales.length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">Sales History</h1>
          <p className="text-muted-foreground font-quicksand ">
            View and manage past transactions
          </p>
        </div>

        <Button variant="classic" className="font-montserrat">
          <File />
          Export Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          title="Total Sales"
          value={`$${totalSales.toFixed(2)}`}
          subtitle="Today's revenue"
          icon={DollarSign}
          className="animate-scale-in"
        />
        <KPICard
          title="Transactions"
          value={completedSales.toString()}
          subtitle="Completed sales"
          icon={Receipt}
          className="animate-scale-in"
        />
        <KPICard
          title="Average Sale"
          value={`$${avgSale.toFixed(2)}`}
          subtitle="Per transaction"
          icon={TrendingUp}
          className="animate-scale-in"
        />
        <KPICard
          title="Items Sold"
          value={sales.reduce((sum, s) => sum + s.items, 0).toString()}
          subtitle="Total products"
          icon={Calendar}
          className="animate-scale-in"
        />
      </div>

      {/* Search & Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by transaction ID or customer..."
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="font-montserrat">
              Today
            </Button>
            <Button variant="outline" className="font-montserrat">
              This Week
            </Button>
            <Button variant="outline" className="font-montserrat">
              This Month
            </Button>
            <Button variant="outline" className="font-montserrat">
              Date Range
            </Button>
          </div>
        </div>
      </Card>

      {/* Sales Table */}
      <Card className="animate-slide-in-left">
       
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-montserrat">Transaction ID</TableHead>
              <TableHead className="font-montserrat">Date & Time</TableHead>
              <TableHead className="font-montserrat">Customer</TableHead>
              <TableHead className="font-montserrat">Items</TableHead>
              <TableHead className="font-montserrat">Total</TableHead>
              <TableHead className="font-montserrat">Payment</TableHead>
              <TableHead className="font-montserrat">Status</TableHead>
              <TableHead className="font-montserrat">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((sale) => (
              <TableRow
                key={sale.id}
                className="hover:bg-muted/50 transition-colors"
              >
                <TableCell className="font-montserrat font-medium">
                  {sale.id}
                </TableCell>
                <TableCell className="font-quicksand text-muted-foreground">
                  {sale.date}
                </TableCell>
                <TableCell className="font-montserrat">
                  {sale.customer}
                </TableCell>
                <TableCell className="font-montserrat">{sale.items}</TableCell>
                <TableCell className="font-montserrat font-bold">
                  ${sale.total.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {sale.payment}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      sale.status === "completed" ? "default" : "destructive"
                    }
                  >
                    {sale.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedSale(sale)}
                  >
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

export default SalesHistory;
