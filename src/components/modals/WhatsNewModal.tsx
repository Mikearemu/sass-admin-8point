import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Target, Briefcase } from "lucide-react";

interface WhatsNewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsNewModal = ({ isOpen, onClose }: WhatsNewModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>What's New at 8Point</DialogTitle>
          <DialogDescription>
            We've added two new modules to help you grow your business.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Target className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold">Marketing & CRM</h3>
              <p className="text-sm text-muted-foreground">
                Manage campaigns, leads, and funnels.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Briefcase className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold">Accounting & Business Ops</h3>
              <p className="text-sm text-muted-foreground">
                Manage invoices, payroll, and expenses.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
