import { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye, Filter } from "lucide-react";
import { CloudDownload } from 'lucide-react';
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
import { ProductModal } from "@/components/modals/ProductModal";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";

const products = [
  {
    id: "1",
    name: "Premium Coffee",
    upc: "87346987634",
    price: 12.99,
    category: "Beverages",
    stock: 45,
    sku: "BEV-001",
  },
  {
    id: "2",
    name: "Organic Tea",
    upc: "87346987634",
    price: 8.99,
    category: "Beverages",
    stock: 5,
    sku: "BEV-002",
  },
  {
    id: "3",
    name: "Chocolate Cake",
    upc: "87346987634",
    price: 24.99,
    category: "Desserts",
    stock: 12,
    sku: "DES-001",
  },
];

const Products = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleAdd = () => {
    setModalMode("add");
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleEdit = (product: any) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleView = (product: any) => {
    setModalMode("view");
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleDelete = (product: any) => {
    setSelectedProduct(product);
    setDeleteOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">
            Product Management
          </h1>
          <p className="text-muted-foreground font-quicksand">
            Manage your product catalog and inventory
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="font-montserrat"
            onClick={handleAdd}
          >
            <CloudDownload className="h-4 w-4 " />
            Import Product
          </Button>
          <Button
            variant="classic"
            className="font-montserrat"
            onClick={handleAdd}
          >
            <Plus className="h-4 w-4 " />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1  md:grid-cols-4 gap-4">
        <Card className="p-6 animate-scale-in">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-quicksand">
              Total Products
            </p>
            <p className="text-3xl font-dela font-semibold text-foreground">
              {products.length}
            </p>
          </div>
        </Card>
        <Card className="p-6 animate-scale-in">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-quicksand">
              Low Stock
            </p>
            <p className="text-3xl font-dela font-semibold text-warning">
              {products.filter((p) => p.stock < 10).length}
            </p>
          </div>
        </Card>
        <Card className="p-6 animate-scale-in">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-quicksand">
              Categories
            </p>
            <p className="text-3xl font-dela font-semibold text-foreground">
              5
            </p>
          </div>
        </Card>
        <Card className="p-6 animate-scale-in">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-quicksand">
              Total Value
            </p>
            <p className="text-3xl font-dela font-semibold text-success">
              $12.4K
            </p>
          </div>
        </Card>
      </div>

      {/* Search */}
     
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products by name, code, category or SKU..." className="pl-9" />
          </div>
          <Button variant="outline" className="font-montserrat">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </Card>

      {/* Products Table */}
      <Card className="animate-slide-in-left">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-montserrat">SKU</TableHead>
              <TableHead className="font-montserrat">Product Name</TableHead>
              <TableHead className="font-montserrat">Upc Code</TableHead>
              <TableHead className="font-montserrat">Category</TableHead>
              <TableHead className="font-montserrat">Price</TableHead>
              <TableHead className="font-montserrat">Stock</TableHead>
              <TableHead className="font-montserrat">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                className="hover:bg-muted/50 transition-colors"
              >
                <TableCell className="font-montserrat text-muted-foreground">
                  {product.sku}
                </TableCell>
                <TableCell className="font-montserrat font-medium">
                  {product.name}
                </TableCell>
                <TableCell className="font-montserrat font-medium">
                  {product.upc}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{product.category}</Badge>
                </TableCell>
                <TableCell className="font-montserrat">
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-montserrat">{product.stock}</span>
                    {product.stock < 10 && (
                      <Badge variant="destructive" className="text-xs">
                        Low
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleView(product)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => handleDelete(product)}
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

      <ProductModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode={modalMode}
        product={selectedProduct}
      />

      <DeleteConfirmModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => {
          console.log("Delete product:", selectedProduct);
          setDeleteOpen(false);
        }}
        title="Delete Product"
        description={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default Products;
