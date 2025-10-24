import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface DiscountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  discount?: any;
}

export const DiscountModal = ({ open, onOpenChange, mode, discount }: DiscountModalProps) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: mode === "add" ? "Discount Created" : "Discount Updated",
      description: `Discount has been ${mode === "add" ? "created" : "updated"} successfully.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-dela">
            {mode === "add" ? "Create New Discount" : "Edit Discount"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Discount Name</Label>
            <Input
              id="name"
              defaultValue={discount?.name}
              placeholder="e.g., Summer Sale"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="code">Discount Code</Label>
            <Input
              id="code"
              defaultValue={discount?.code}
              placeholder="e.g., SUMMER25"
              className="font-mono"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Discount Type</Label>
              <Select defaultValue={discount?.type || "percentage"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                type="number"
                defaultValue={discount?.value}
                placeholder="25"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="minPurchase">Minimum Purchase</Label>
            <Input
              id="minPurchase"
              type="number"
              defaultValue={discount?.minPurchase}
              placeholder="0"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                defaultValue={discount?.startDate}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                defaultValue={discount?.endDate}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxUses">Maximum Uses (Optional)</Label>
            <Input
              id="maxUses"
              type="number"
              defaultValue={discount?.maxUses}
              placeholder="Leave empty for unlimited"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === "add" ? "Create Discount" : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
