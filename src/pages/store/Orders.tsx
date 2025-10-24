import { useState } from "react";
import { Search, Filter, Eye, Truck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { KPICard } from "@/components/KPICard";
import { ShoppingCart, Clock, CheckCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderModal } from "@/components/modals/OrderModal";

const orders = [
  { id: "ORD-1047", date: "2024-01-15", customer: "John Doe", items: 3, total: 450.0, status: "delivered" },
  { id: "ORD-1046", date: "2024-01-15", customer: "Jane Smith", items: 2, total: 285.0, status: "processing" },
  { id: "ORD-1045", date: "2024-01-14", customer: "Bob Johnson", items: 5, total: 720.5, status: "shipped" },
  { id: "ORD-1044", date: "2024-01-14", customer: "Alice Brown", items: 1, total: 890.0, status: "delivered" },
  { id: "ORD-1043", date: "2024-01-13", customer: "Charlie Davis", items: 4, total: 565.0, status: "processing" },
  { id: "ORD-1042", date: "2024-01-13", customer: "Eva Wilson", items: 2, total: 320.0, status: "shipped" },
];

const Orders = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const totalOrders = orders.length;
  const processingOrders = orders.filter(o => o.status === "processing").length;
  const deliveredOrders = orders.filter(o => o.status === "delivered").length;

  const handleView = (order: any) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">Orders</h1>
          <p className="text-muted-foreground font-quicksand mt-2">
            Manage customer orders and shipments
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Total Orders"
          value={totalOrders.toString()}
          subtitle="This week"
          icon={ShoppingCart}
          className="animate-scale-in"
        />
        <KPICard
          title="Processing"
          value={processingOrders.toString()}
          subtitle="Awaiting fulfillment"
          icon={Clock}
          className="border-l-4 border-l-warning animate-scale-in"
        />
        <KPICard
          title="Delivered"
          value={deliveredOrders.toString()}
          subtitle="Successfully completed"
          icon={CheckCircle}
          className="border-l-4 border-l-success animate-scale-in"
        />
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search orders by ID or customer..." className="pl-9" />
          </div>
          <Button variant="outline" className="font-montserrat">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="animate-slide-in-left">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-dela text-foreground">All Orders</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-montserrat">Order ID</TableHead>
              <TableHead className="font-montserrat">Date</TableHead>
              <TableHead className="font-montserrat">Customer</TableHead>
              <TableHead className="font-montserrat">Items</TableHead>
              <TableHead className="font-montserrat">Total</TableHead>
              <TableHead className="font-montserrat">Status</TableHead>
              <TableHead className="font-montserrat">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-montserrat font-medium">{order.id}</TableCell>
                <TableCell className="font-quicksand">{order.date}</TableCell>
                <TableCell className="font-quicksand">{order.customer}</TableCell>
                <TableCell className="font-montserrat">{order.items}</TableCell>
                <TableCell className="font-montserrat">${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "delivered"
                        ? "default"
                        : order.status === "shipped"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleView(order)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <OrderModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        order={selectedOrder}
      />
    </div>
  );
};

export default Orders;
