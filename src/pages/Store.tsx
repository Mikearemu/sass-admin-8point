import { Plus, Search, Package, ShoppingCart, BarChart3, Edit, AlertTriangle } from "lucide-react";
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

const products = [
  { id: "1", name: "Premium Coffee Beans", category: "Beverages", price: 24.99, stock: 45, sales: 128 },
  { id: "2", name: "Organic Green Tea", category: "Beverages", price: 18.99, stock: 5, sales: 89 },
  { id: "3", name: "Artisan Chocolate", category: "Snacks", price: 12.99, stock: 67, sales: 234 },
  { id: "4", name: "Fresh Croissants", category: "Bakery", price: 8.99, stock: 0, sales: 456 },
];

const Store = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">Store Management</h1>
          <p className="text-muted-foreground font-quicksand mt-2">
            Manage products, inventory, and orders
          </p>
        </div>
        <Button className="font-montserrat">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Total Products"
          value="148"
          subtitle="Across all categories"
          icon={Package}
          className="border-l-4 border-l-primary animate-scale-in"
        />
        <KPICard
          title="Low Stock Items"
          value="12"
          subtitle="Need restocking"
          icon={AlertTriangle}
          className="border-l-4 border-l-warning animate-scale-in"
        />
        <KPICard
          title="Total Orders"
          value="1,247"
          subtitle="This month"
          icon={ShoppingCart}
          trend={{ value: "23%", isPositive: true }}
          className="animate-scale-in"
        />
      </div>

      {/* Search & Actions */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-9" />
          </div>
          <Button variant="outline" className="font-montserrat">
            Filter by Category
          </Button>
          <Button variant="outline" className="font-montserrat">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      </Card>

      {/* Products Table */}
      <Card className="animate-slide-in-left">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-dela text-foreground">Product Catalog</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-montserrat">Product Name</TableHead>
              <TableHead className="font-montserrat">Category</TableHead>
              <TableHead className="font-montserrat">Price</TableHead>
              <TableHead className="font-montserrat">Stock</TableHead>
              <TableHead className="font-montserrat">Sales</TableHead>
              <TableHead className="font-montserrat">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-montserrat font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{product.category}</Badge>
                </TableCell>
                <TableCell className="font-montserrat">${product.price}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-montserrat">{product.stock}</span>
                    {product.stock === 0 && (
                      <Badge variant="destructive" className="text-xs">
                        Out of stock
                      </Badge>
                    )}
                    {product.stock > 0 && product.stock < 10 && (
                      <Badge variant="secondary" className="text-xs bg-warning text-warning-foreground">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Low
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-montserrat">{product.sales} sold</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {(product.stock === 0 || product.stock < 10) && (
                      <Button size="sm" variant="outline" className="text-xs">
                        Restock
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 animate-fade-in">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-quicksand">Today's Sales</p>
            <p className="text-3xl font-dela text-foreground">$2,847</p>
            <p className="text-sm text-success font-montserrat">↑ 12.5% from yesterday</p>
          </div>
        </Card>

        <Card className="p-6 animate-fade-in">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-quicksand">Pending Orders</p>
            <p className="text-3xl font-dela text-foreground">24</p>
            <p className="text-sm font-montserrat text-muted-foreground">Awaiting fulfillment</p>
          </div>
        </Card>

        <Card className="p-6 animate-fade-in">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-quicksand">Top Product</p>
            <p className="text-xl font-montserrat font-semibold text-foreground">Fresh Croissants</p>
            <p className="text-sm text-primary font-montserrat">456 sales this month</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Store;
