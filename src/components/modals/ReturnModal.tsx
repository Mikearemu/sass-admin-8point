import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ReturnModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnData?: any;
}

export const ReturnModal = ({ open, onOpenChange, returnData }: ReturnModalProps) => {
  const { toast } = useToast();
  const isView = !!returnData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: isView ? "Return Updated" : "Return Processed",
      description: `Return has been ${isView ? "updated" : "processed"} successfully.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-dela">
            {isView ? "Return Details" : "Process Return"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="transactionId">Transaction ID</Label>
            <Input
              id="transactionId"
              defaultValue={returnData?.transactionId}
              placeholder="TXN-XXX"
              disabled={isView}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customer">Customer Name</Label>
            <Input
              id="customer"
              defaultValue={returnData?.customer}
              disabled={isView}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="product">Product</Label>
            <Input
              id="product"
              defaultValue={returnData?.product}
              disabled={isView}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                defaultValue={returnData?.quantity}
                disabled={isView}
                min="1"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Refund Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                defaultValue={returnData?.amount}
                disabled={isView}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Return Reason</Label>
            <Textarea
              id="reason"
              defaultValue={returnData?.reason}
              disabled={isView}
              rows={3}
              required
            />
          </div>
          {isView && (
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={returnData?.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {isView ? "Close" : "Cancel"}
            </Button>
            {!isView && (
              <Button type="submit">
                Process Return
              </Button>
            )}
            {isView && returnData?.status === "pending" && (
              <>
                <Button type="button" variant="destructive">
                  Reject
                </Button>
                <Button type="submit">
                  Approve
                </Button>
              </>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
