import { useState } from "react";
import { Plus, Search, Edit, Trash2, Percent, Tag } from "lucide-react";
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
import { DiscountModal } from "@/components/modals/DiscountModal";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";

const discounts = [
  { id: "1", name: "Summer Sale", code: "SUMMER25", type: "percentage", value: 25, minPurchase: 50, uses: 45, maxUses: 100, startDate: "2025-10-01", endDate: "2025-10-31", status: "active" },
  { id: "2", name: "New Customer", code: "WELCOME10", type: "percentage", value: 10, minPurchase: 0, uses: 120, maxUses: null, startDate: "2025-01-01", endDate: null, status: "active" },
  { id: "3", name: "$5 Off", code: "SAVE5", type: "fixed", value: 5, minPurchase: 25, uses: 78, maxUses: 200, startDate: "2025-10-01", endDate: "2025-10-15", status: "active" },
  { id: "4", name: "VIP Discount", code: "VIP20", type: "percentage", value: 20, minPurchase: 100, uses: 32, maxUses: 50, startDate: "2025-09-01", endDate: "2025-12-31", status: "active" },
  { id: "5", name: "Weekend Special", code: "WEEKEND15", type: "percentage", value: 15, minPurchase: 30, uses: 156, maxUses: 300, startDate: "2025-10-01", endDate: "2025-10-31", status: "expired" },
];

const Discounts = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedDiscount, setSelectedDiscount] = useState<any>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleAdd = () => {
    setModalMode("add");
    setSelectedDiscount(null);
    setModalOpen(true);
  };

  const handleEdit = (discount: any) => {
    setModalMode("edit");
    setSelectedDiscount(discount);
    setModalOpen(true);
  };

  const handleDelete = (discount: any) => {
    setSelectedDiscount(discount);
    setDeleteOpen(true);
  };

  const activeDiscounts = discounts.filter(d => d.status === "active").length;
  const totalUses = discounts.reduce((sum, d) => sum + d.uses, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">Discounts & Promotions</h1>
          <p className="text-muted-foreground font-quicksand">
            Manage discount codes and promotional offers
          </p>
        </div>
        <Button variant="classic" className="font-montserrat" onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Create Discount
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Active Discounts"
          value={activeDiscounts.toString()}
          subtitle="Currently available"
          icon={Tag}
          className="animate-scale-in"
        />
        <KPICard
          title="Total Uses"
          value={totalUses.toString()}
          subtitle="Times redeemed"
          icon={Percent}
          className="animate-scale-in"
        />
        <KPICard
          title="All Promotions"
          value={discounts.length.toString()}
          subtitle="Total created"
          icon={Tag}
          className="animate-scale-in"
        />
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or code..." className="pl-9" />
        </div>
      </Card>

      {/* Discounts Table */}
      <Card className="animate-slide-in-left">
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-montserrat">Name</TableHead>
              <TableHead className="font-montserrat">Code</TableHead>
              <TableHead className="font-montserrat">Type</TableHead>
              <TableHead className="font-montserrat">Value</TableHead>
              <TableHead className="font-montserrat">Min. Purchase</TableHead>
              <TableHead className="font-montserrat">Uses</TableHead>
              <TableHead className="font-montserrat">Status</TableHead>
              <TableHead className="font-montserrat">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {discounts.map((discount) => (
              <TableRow key={discount.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-montserrat font-medium">{discount.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono">{discount.code}</Badge>
                </TableCell>
                <TableCell className="font-quicksand capitalize">{discount.type}</TableCell>
                <TableCell className="font-montserrat">
                  {discount.type === "percentage" ? `${discount.value}%` : `$${discount.value}`}
                </TableCell>
                <TableCell className="font-montserrat">${discount.minPurchase}</TableCell>
                <TableCell className="font-montserrat">
                  {discount.uses}{discount.maxUses ? `/${discount.maxUses}` : ""}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={discount.status === "active" ? "default" : "secondary"}
                  >
                    {discount.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(discount)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(discount)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <DiscountModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode={modalMode}
        discount={selectedDiscount}
      />
      
      <DeleteConfirmModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => {
          console.log("Delete discount:", selectedDiscount);
          setDeleteOpen(false);
        }}
        title="Delete Discount"
        description={`Are you sure you want to delete "${selectedDiscount?.name}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default Discounts;
