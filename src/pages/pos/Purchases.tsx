import { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye, Package, Receipt, ShoppingCart } from "lucide-react";
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
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";

const purchases = [
  { id: "1", supplier: "Coffee Imports Ltd", product: "Arabica Beans", qty: 100, cost: "$450", date: "2025-10-10", status: "completed" },
  { id: "2", supplier: "Fresh Bakery Supplies", product: "Flour Pack (25kg)", qty: 50, cost: "$220", date: "2025-10-12", status: "pending" },
  { id: "3", supplier: "Organic Foods Co", product: "Coconut Milk", qty: 80, cost: "$300", date: "2025-10-13", status: "completed" },
  { id: "4", supplier: "Beverage Distributors Inc", product: "Bottled Water", qty: 200, cost: "$150", date: "2025-10-09", status: "cancelled" },
  { id: "5", supplier: "Dessert Wholesale", product: "Chocolate Bars", qty: 120, cost: "$180", date: "2025-10-15", status: "completed" },
];

const Purchases = () => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<any>(null);

  const handleAdd = () => {
    console.log("Add new purchase");
  };

  const handleEdit = (purchase: any) => {
    console.log("Edit purchase:", purchase);
  };

  const handleView = (purchase: any) => {
    console.log("View purchase:", purchase);
  };

  const handleDelete = (purchase: any) => {
    setSelectedPurchase(purchase);
    setDeleteOpen(true);
  };

  const totalOrders = purchases.length;
  const completedOrders = purchases.filter((p) => p.status === "completed").length;
  const pendingOrders = purchases.filter((p) => p.status === "pending").length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">Purchase Management</h1>
          <p className="text-muted-foreground font-quicksand">
            Track and manage all product purchase orders
          </p>
        </div>
        <Button variant="classic" className="font-montserrat" onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          New Purchase
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Total Purchases"
          value={totalOrders.toString()}
          subtitle="All time orders"
          icon={ShoppingCart}
          className="animate-scale-in"
        />
        <KPICard
          title="Completed Purchases"
          value={completedOrders.toString()}
          subtitle="Successfully received"
          icon={Receipt}
          className="animate-scale-in"
        />
        <KPICard
          title="Pending Purchases"
          value={pendingOrders.toString()}
          subtitle="Awaiting delivery"
          icon={Package}
          className="animate-scale-in"
        />
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by product or supplier..." className="pl-9" />
        </div>
      </Card>

      {/* Purchases Table */}
      <Card className="animate-slide-in-left">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-montserrat">Supplier</TableHead>
              <TableHead className="font-montserrat">Product</TableHead>
              <TableHead className="font-montserrat">Quantity</TableHead>
              <TableHead className="font-montserrat">Cost</TableHead>
              <TableHead className="font-montserrat">Date</TableHead>
              <TableHead className="font-montserrat">Status</TableHead>
              <TableHead className="font-montserrat">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={purchase.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-montserrat font-medium">{purchase.supplier}</TableCell>
                <TableCell className="font-montserrat">{purchase.product}</TableCell>
                <TableCell className="font-montserrat">{purchase.qty}</TableCell>
                <TableCell className="font-montserrat">{purchase.cost}</TableCell>
                <TableCell className="font-quicksand text-muted-foreground">{purchase.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      purchase.status === "completed"
                        ? "default"
                        : purchase.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {purchase.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleView(purchase)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(purchase)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => handleDelete(purchase)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Delete Modal */}
      <DeleteConfirmModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => {
          console.log("Delete purchase:", selectedPurchase);
          setDeleteOpen(false);
        }}
        title="Delete Purchase Record"
        description={`Are you sure you want to delete this purchase from "${selectedPurchase?.supplier}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default Purchases;
