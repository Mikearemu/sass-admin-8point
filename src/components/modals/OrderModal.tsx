import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Truck, CheckCircle } from "lucide-react";

interface OrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order?: any;
}

export const OrderModal = ({ open, onOpenChange, order }: OrderModalProps) => {
  if (!order) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle className="h-5 w-5 text-success" />;
      case "shipped": return <Truck className="h-5 w-5 text-primary" />;
      default: return <Package className="h-5 w-5 text-warning" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-dela text-2xl">Order Details</DialogTitle>
          <DialogDescription className="font-quicksand">Order #{order.id}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon(order.status)}
              <Badge variant={order.status === "delivered" ? "default" : "secondary"}>
                {order.status}
              </Badge>
            </div>
            <span className="text-sm text-muted-foreground">{order.date}</span>
          </div>
          <Separator />
          <div className="space-y-2">
            <h3 className="font-montserrat font-semibold">Customer Information</h3>
            <p className="text-sm font-quicksand">{order.customer}</p>
            <p className="text-sm text-muted-foreground">{order.email || "customer@example.com"}</p>
          </div>
          <Separator />
          <div className="space-y-2">
            <h3 className="font-montserrat font-semibold">Order Items</h3>
            <div className="space-y-1">
              <p className="text-sm font-quicksand">{order.items} items</p>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="font-montserrat font-semibold">Total Amount</span>
            <span className="text-2xl font-dela">${order.amount.toFixed(2)}</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button>Update Status</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};