import { Plus, Search, AlertTriangle, Package } from "lucide-react";
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

const inventory = [
  { id: "1", product: "Premium Coffee", upc:"6743834686", sku: "BEV-001", stock: 150, reorder: 50, status: "in-stock" },
  { id: "2", product: "Croissant", upc:"6743834686", sku: "FOD-001", stock: 25, reorder: 30, status: "low-stock" },
  { id: "3", product: "Fresh Juice", upc:"6743834686", sku: "BEV-002", stock: 80, reorder: 40, status: "in-stock" },
  { id: "4", product: "Sandwich", upc:"6743834686", sku: "FOD-002", stock: 5, reorder: 20, status: "critical" },
  { id: "5", product: "Chocolate Cake", upc:"6743834686", sku: "DST-001", stock: 45, reorder: 25, status: "in-stock" },
];

const Inventory = () => {
  const lowStockItems = inventory.filter(i => i.status !== "in-stock").length;
  const totalValue = inventory.reduce((sum, i) => sum + (i.stock * 10), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground font-quicksand mt-2">
            Track stock levels and manage reorders
          </p>
        </div>
        <Button variant="classic" className="font-montserrat">
          <Plus className="h-4 w-4 mr-2" />
          Stock Adjustment
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Total Items"
          value={inventory.length.toString()}
          subtitle="Products tracked"
          icon={Package}
          className="animate-scale-in"
        />
        <KPICard
          title="Low Stock Alerts"
          value={lowStockItems.toString()}
          subtitle="Requires attention"
          icon={AlertTriangle}
          className="border-l-4 border-l-warning animate-scale-in"
        />
        <KPICard
          title="Inventory Value"
          value={`$${totalValue.toLocaleString()}`}
          subtitle="Total stock value"
          icon={Package}
          className="animate-scale-in"
        />
      </div>

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products by name, code, category or SKU..." className="pl-9" />
        </div>
      </Card>

      {/* Inventory Table */}
      <Card className="animate-slide-in-left">
       
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-montserrat">Product Name</TableHead>
              <TableHead className="font-montserrat">UPC Code</TableHead>
              <TableHead className="font-montserrat">SKU</TableHead>
              <TableHead className="font-montserrat">Stock</TableHead>
              <TableHead className="font-montserrat">Reorder Level</TableHead>
              <TableHead className="font-montserrat">Status</TableHead>
              <TableHead className="font-montserrat">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-montserrat font-medium">{item.product}</TableCell>
                <TableCell className="font-montserrat font-medium">{item.upc}</TableCell>
                <TableCell className="font-quicksand text-muted-foreground">{item.sku}</TableCell>
                <TableCell className="font-montserrat">{item.stock}</TableCell>
                <TableCell className="font-montserrat">{item.reorder}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === "in-stock"
                        ? "default"
                        : item.status === "low-stock"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    Adjust
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

export default Inventory;
