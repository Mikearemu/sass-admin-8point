import { useState } from "react";
import { Plus, Search, Edit, Trash2, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";

const productTypes = [
  { id: "1", name: "Service", hasIMEI: false, trackInventory: false, requiresExpiry: false, active: true },
  { id: "2", name: "Restaurant", hasIMEI: false, trackInventory: true, requiresExpiry: true, active: true },
  { id: "3", name: "Electronics", hasIMEI: true, trackInventory: true, requiresExpiry: false, active: true },
  { id: "4", name: "Cosmetics", hasIMEI: false, trackInventory: true, requiresExpiry: true, active: true },
  { id: "5", name: "Pharmacy", hasIMEI: false, trackInventory: true, requiresExpiry: true, active: true },
  { id: "6", name: "Mobile Devices", hasIMEI: true, trackInventory: true, requiresExpiry: false, active: true },
  { id: "7", name: "Accessories", hasIMEI: false, trackInventory: true, requiresExpiry: false, active: true },
];

const ProductTypes = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedType, setSelectedType] = useState<any>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    hasIMEI: false,
    trackInventory: true,
    requiresExpiry: false,
    customFields: "",
  });

  const handleAdd = () => {
    setModalMode("add");
    setFormData({
      name: "",
      description: "",
      hasIMEI: false,
      trackInventory: true,
      requiresExpiry: false,
      customFields: "",
    });
    setModalOpen(true);
  };

  const handleEdit = (type: any) => {
    setModalMode("edit");
    setSelectedType(type);
    setFormData({
      name: type.name,
      description: "",
      hasIMEI: type.hasIMEI,
      trackInventory: type.trackInventory,
      requiresExpiry: type.requiresExpiry,
      customFields: "",
    });
    setModalOpen(true);
  };

  const handleDelete = (type: any) => {
    setSelectedType(type);
    setDeleteOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: modalMode === "add" ? "Product Type Added" : "Product Type Updated",
      description: `${formData.name} has been ${modalMode === "add" ? "added" : "updated"} successfully.`,
    });
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">Product Types</h1>
          <p className="text-muted-foreground font-quicksand">
            Customize product types for your business needs
          </p>
        </div>
        <Button variant="classic" className="font-montserrat" onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product Type
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 animate-scale-in">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-quicksand">Total Types</p>
            <p className="text-3xl font-dela text-foreground">{productTypes.length}</p>
          </div>
        </Card>
        <Card className="p-6 animate-scale-in">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-quicksand">IMEI Tracked</p>
            <p className="text-3xl font-dela text-primary">
              {productTypes.filter(t => t.hasIMEI).length}
            </p>
          </div>
        </Card>
        <Card className="p-6 animate-scale-in">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-quicksand">Expiry Tracked</p>
            <p className="text-3xl font-dela text-warning">
              {productTypes.filter(t => t.requiresExpiry).length}
            </p>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search product types..." className="pl-9" />
        </div>
      </Card>

      {/* Product Types Table */}
      <Card className="animate-slide-in-left">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-montserrat">Type Name</TableHead>
              <TableHead className="font-montserrat">IMEI Tracking</TableHead>
              <TableHead className="font-montserrat">Inventory</TableHead>
              <TableHead className="font-montserrat">Expiry Date</TableHead>
              <TableHead className="font-montserrat">Status</TableHead>
              <TableHead className="font-montserrat">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productTypes.map((type) => (
              <TableRow key={type.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-montserrat font-medium">{type.name}</TableCell>
                <TableCell>
                  <Badge variant={type.hasIMEI ? "default" : "secondary"}>
                    {type.hasIMEI ? "Yes" : "No"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={type.trackInventory ? "default" : "secondary"}>
                    {type.trackInventory ? "Tracked" : "Not Tracked"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={type.requiresExpiry ? "destructive" : "secondary"}>
                    {type.requiresExpiry ? "Required" : "Not Required"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={type.active ? "default" : "secondary"}>
                    {type.active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(type)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(type)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-dela">
              {modalMode === "add" ? "Add New Product Type" : "Edit Product Type"}
            </DialogTitle>
            <DialogDescription className="font-quicksand">
              Configure product type settings and custom fields
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Type Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Electronics, Services"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe this product type..."
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>IMEI/Serial Number Tracking</Label>
                  <p className="text-sm text-muted-foreground">Track unique identifiers for each product</p>
                </div>
                <Switch
                  checked={formData.hasIMEI}
                  onCheckedChange={(checked) => setFormData({ ...formData, hasIMEI: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Inventory Tracking</Label>
                  <p className="text-sm text-muted-foreground">Monitor stock levels</p>
                </div>
                <Switch
                  checked={formData.trackInventory}
                  onCheckedChange={(checked) => setFormData({ ...formData, trackInventory: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Expiry Date Required</Label>
                  <p className="text-sm text-muted-foreground">Track product expiration dates</p>
                </div>
                <Switch
                  checked={formData.requiresExpiry}
                  onCheckedChange={(checked) => setFormData({ ...formData, requiresExpiry: checked })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customFields">Custom Fields (JSON)</Label>
              <Textarea
                id="customFields"
                value={formData.customFields}
                onChange={(e) => setFormData({ ...formData, customFields: e.target.value })}
                placeholder='{"warranty": "text", "color": "select"}'
              />
              <p className="text-xs text-muted-foreground">Define custom fields for this product type</p>
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {modalMode === "add" ? "Add Type" : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <DeleteConfirmModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => {
          toast({
            title: "Product Type Deleted",
            description: `${selectedType?.name} has been deleted.`,
          });
          setDeleteOpen(false);
        }}
        title="Delete Product Type"
        description={`Are you sure you want to delete "${selectedType?.name}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default ProductTypes;
