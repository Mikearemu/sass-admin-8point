import { Button } from "@/components/ui/button";
import { ClipboardList, DollarSign, Receipt, BarChart3 } from "lucide-react";

const Accounting = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Accounting & Business Operations</h1>
          <p className="text-muted-foreground">
            Manage your invoices, payroll, and expenses.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">View Reports</Button>
          <Button>Add Invoice</Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 border rounded-lg">
          <ClipboardList className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-semibold">Invoices</h3>
          <p className="text-muted-foreground">Manage your invoices</p>
        </div>
        <div className="p-6 border rounded-lg">
          <DollarSign className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-semibold">Payroll</h3>
          <p className="text-muted-foreground">Manage your payroll</p>
        </div>
        <div className="p-6 border rounded-lg">
          <Receipt className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-semibold">Expenses</h3>
          <p className="text-muted-foreground">Track your expenses</p>
        </div>
        <div className="p-6 border rounded-lg">
          <BarChart3 className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-semibold">Reports</h3>
          <p className="text-muted-foreground">View your financial reports</p>
        </div>
      </div>
    </div>
  );
};

export default Accounting;
