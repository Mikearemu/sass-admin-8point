import { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye, Mail, Phone } from "lucide-react";
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
import { CustomerModal } from "@/components/modals/CustomerModal";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";
import { Users } from "lucide-react";

const customers = [
  { id: "1", name: "John Smith", email: "john@example.com", phone: "+1234567890", totalSpent: 1245.50, visits: 12, status: "vip" },
  { id: "2", name: "Sarah Johnson", email: "sarah@example.com", phone: "+1234567891", totalSpent: 890.25, visits: 8, status: "regular" },
  { id: "3", name: "Mike Brown", email: "mike@example.com", phone: "+1234567892", totalSpent: 456.80, visits: 5, status: "regular" },
  { id: "4", name: "Emily Davis", email: "emily@example.com", phone: "+1234567893", totalSpent: 2100.00, visits: 18, status: "vip" },
  { id: "5", name: "David Wilson", email: "david@example.com", phone: "+1234567894", totalSpent: 125.50, visits: 2, status: "new" },
];

const Customers = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleAdd = () => {
    setModalMode("add");
    setSelectedCustomer(null);
    setModalOpen(true);
  };

  const handleEdit = (customer: any) => {
    setModalMode("edit");
    setSelectedCustomer(customer);
    setModalOpen(true);
  };

  const handleView = (customer: any) => {
    setModalMode("view");
    setSelectedCustomer(customer);
    setModalOpen(true);
  };

  const handleDelete = (customer: any) => {
    setSelectedCustomer(customer);
    setDeleteOpen(true);
  };

  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const vipCustomers = customers.filter(c => c.status === "vip").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">Customer Management</h1>
          <p className="text-muted-foreground font-quicksand">
            Manage customer profiles and loyalty
          </p>
        </div>
        <Button className="font-montserrat" onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          title="Total Customers"
          value={customers.length.toString()}
          subtitle="Registered customers"
          icon={Users}
          className="animate-scale-in"
        />
        <KPICard
          title="VIP Customers"
          value={vipCustomers.toString()}
          subtitle="Premium members"
          icon={Users}
          className="border-l-4 border-l-primary animate-scale-in"
        />
        <KPICard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          subtitle="From all customers"
          icon={Users}
          className="animate-scale-in"
        />
        <KPICard
          title="Avg. per Customer"
          value={`$${(totalRevenue / customers.length).toFixed(2)}`}
          subtitle="Average spending"
          icon={Users}
          className="animate-scale-in"
        />
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, email or phone..." className="pl-9" />
        </div>
      </Card>

      {/* Customers Table */}
      <Card className="animate-slide-in-left">
       
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-montserrat">Name</TableHead>
              <TableHead className="font-montserrat">Contact</TableHead>
              <TableHead className="font-montserrat">Total Spent</TableHead>
              <TableHead className="font-montserrat">Visits</TableHead>
              <TableHead className="font-montserrat">Status</TableHead>
              <TableHead className="font-montserrat">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-montserrat font-medium">{customer.name}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span className="font-quicksand text-muted-foreground">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span className="font-quicksand text-muted-foreground">{customer.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-montserrat">${customer.totalSpent.toFixed(2)}</TableCell>
                <TableCell className="font-montserrat">{customer.visits}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      customer.status === "vip"
                        ? "default"
                        : customer.status === "regular"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleView(customer)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(customer)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(customer)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <CustomerModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode={modalMode}
        customer={selectedCustomer}
      />
      
      <DeleteConfirmModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => {
          console.log("Delete customer:", selectedCustomer);
          setDeleteOpen(false);
        }}
        title="Delete Customer"
        description={`Are you sure you want to delete "${selectedCustomer?.name}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default Customers;
