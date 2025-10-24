import { Plus, Search, Edit, Trash2 } from "lucide-react";
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

const categories = [
  { id: "1",  name: "Beverages",     products: 45, status: "active",   color: "#3B82F6" }, // Blue
  { id: "2",  name: "Food",          products: 78, status: "active",   color: "#10B981" }, // Green
  { id: "3",  name: "Desserts",      products: 23, status: "active",   color: "#F59E0B" }, // Amber
  { id: "4",  name: "Snacks",        products: 34, status: "active",   color: "#EF4444" }, // Red
  { id: "5",  name: "Specials",      products: 12, status: "inactive", color: "#8B5CF6" }, // Violet
  { id: "6",  name: "Frozen Foods",  products: 29, status: "active",   color: "#06B6D4" }, // Cyan
  { id: "7",  name: "Dairy",         products: 41, status: "active",   color: "#F97316" }, // Orange
  { id: "8",  name: "Bakery",        products: 27, status: "active",   color: "#EAB308" }, // Yellow
  { id: "9",  name: "Meat & Poultry",products: 19, status: "inactive", color: "#DC2626" }, // Dark Red
  { id: "10", name: "Seafood",       products: 15, status: "active",   color: "#0EA5E9" }, // Sky Blue
  { id: "11", name: "Produce",       products: 52, status: "active",   color: "#16A34A" }, // Emerald
  { id: "12", name: "Condiments",    products: 22, status: "active",   color: "#A855F7" }, // Purple
];


const Categories = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">Product Categories</h1>
          <p className="text-muted-foreground font-quicksand">
            Organize your products into categories
          </p>
        </div>
        <Button variant="classic" className="font-montserrat">
          <Plus className="h-4 w-4 mr-2" />
          New Category
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search categories..." className="pl-9" />
        </div>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Card key={cat.id} className="p-6 animate-scale-in hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: cat.color + "20" }}
              >
                <div 
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: cat.color }}
                />
              </div>
              <Badge variant={cat.status === "active" ? "default" : "secondary"}>
                {cat.status}
              </Badge>
            </div>
            <h3 className="text-xl font-dela text-foreground mb-2">{cat.name}</h3>
            <p className="text-sm text-muted-foreground font-quicksand mb-4">
              {cat.products} products
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button size="sm" variant="ghost">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

     
    </div>
  );
};

export default Categories;
