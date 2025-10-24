import { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye, Building2, Package } from "lucide-react";
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
import { SupplierModal } from "@/components/modals/SupplierModal";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";

const suppliers = [
  { id: "1", name: "Coffee Imports Ltd", contact: "James Wilson", email: "james@coffeeimports.com", phone: "+1234567890", products: 15, totalOrders: 45, lastOrder: "2025-10-10", status: "active" },
  { id: "2", name: "Fresh Bakery Supplies", contact: "Maria Garcia", email: "maria@freshbakery.com", phone: "+1234567891", products: 8, totalOrders: 32, lastOrder: "2025-10-11", status: "active" },
  { id: "3", name: "Beverage Distributors Inc", contact: "Robert Chen", email: "robert@beveragedist.com", phone: "+1234567892", products: 22, totalOrders: 67, lastOrder: "2025-10-09", status: "active" },
  { id: "4", name: "Organic Foods Co", contact: "Lisa Anderson", email: "lisa@organicfoods.com", phone: "+1234567893", products: 12, totalOrders: 28, lastOrder: "2025-09-30", status: "inactive" },
  { id: "5", name: "Dessert Wholesale", contact: "Tom Brown", email: "tom@dessertwholesale.com", phone: "+1234567894", products: 10, totalOrders: 19, lastOrder: "2025-10-12", status: "active" },
];

const Suppliers = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleAdd = () => {
    setModalMode("add");
    setSelectedSupplier(null);
    setModalOpen(true);
  };

  const handleEdit = (supplier: any) => {
    setModalMode("edit");
    setSelectedSupplier(supplier);
    setModalOpen(true);
  };

  const handleView = (supplier: any) => {
    setModalMode("view");
    setSelectedSupplier(supplier);
    setModalOpen(true);
  };

  const handleDelete = (supplier: any) => {
    setSelectedSupplier(supplier);
    setDeleteOpen(true);
  };

  const activeSuppliers = suppliers.filter(s => s.status === "active").length;
  const totalProducts = suppliers.reduce((sum, s) => sum + s.products, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">Supplier Management</h1>
          <p className="text-muted-foreground font-quicksand ">
            Manage supplier relationships and orders
          </p>
        </div>
        <Button variant="classic" className="font-montserrat" onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Active Suppliers"
          value={activeSuppliers.toString()}
          subtitle="Currently working with"
          icon={Building2}
          className="animate-scale-in"
        />
        <KPICard
          title="Total Suppliers"
          value={suppliers.length.toString()}
          subtitle="In database"
          icon={Building2}
          className="animate-scale-in"
        />
        <KPICard
          title="Products Supplied"
          value={totalProducts.toString()}
          subtitle="Unique products"
          icon={Package}
          className="animate-scale-in"
        />
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by supplier name or contact..." className="pl-9" />
        </div>
      </Card>

      {/* Suppliers Table */}
      <Card className="animate-slide-in-left">
       
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-montserrat">Supplier Name</TableHead>
              <TableHead className="font-montserrat">Contact Person</TableHead>
              <TableHead className="font-montserrat">Email</TableHead>
              <TableHead className="font-montserrat">Products</TableHead>
              <TableHead className="font-montserrat">Total Orders</TableHead>
              <TableHead className="font-montserrat">Last Order</TableHead>
              <TableHead className="font-montserrat">Status</TableHead>
              <TableHead className="font-montserrat">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-montserrat font-medium">{supplier.name}</TableCell>
                <TableCell className="font-montserrat">{supplier.contact}</TableCell>
                <TableCell className="font-quicksand text-muted-foreground">{supplier.email}</TableCell>
                <TableCell className="font-montserrat">{supplier.products}</TableCell>
                <TableCell className="font-montserrat">{supplier.totalOrders}</TableCell>
                <TableCell className="font-quicksand text-muted-foreground">{supplier.lastOrder}</TableCell>
                <TableCell>
                  <Badge
                    variant={supplier.status === "active" ? "default" : "secondary"}
                  >
                    {supplier.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleView(supplier)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(supplier)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(supplier)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <SupplierModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode={modalMode}
        supplier={selectedSupplier}
      />
      
      <DeleteConfirmModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => {
          console.log("Delete supplier:", selectedSupplier);
          setDeleteOpen(false);
        }}
        title="Delete Supplier"
        description={`Are you sure you want to delete "${selectedSupplier?.name}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default Suppliers;
