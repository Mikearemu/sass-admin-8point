import { useState } from "react";
import { Plus, Search, Download, Send, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { KPICard } from "@/components/KPICard";
import { DollarSign, FileText, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceModal } from "@/components/modals/InvoiceModal";
import { toast } from "@/hooks/use-toast";

const invoices = [
  { id: "INV-2024-001", date: "2024-01-15", client: "Acme Corp", amount: 2500.0, status: "paid", dueDate: "2024-01-30" },
  { id: "INV-2024-002", date: "2024-01-14", client: "Tech Solutions", amount: 1850.0, status: "pending", dueDate: "2024-01-29" },
  { id: "INV-2024-003", date: "2024-01-13", client: "Global Industries", amount: 3200.0, status: "overdue", dueDate: "2024-01-10" },
  { id: "INV-2024-004", date: "2024-01-12", client: "StartUp Inc", amount: 1200.0, status: "paid", dueDate: "2024-01-27" },
  { id: "INV-2024-005", date: "2024-01-11", client: "Enterprise Co", amount: 4500.0, status: "pending", dueDate: "2024-01-26" },
];

const Invoices = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidInvoices = invoices.filter(i => i.status === "paid").length;
  const overdueInvoices = invoices.filter(i => i.status === "overdue").length;

  const handleView = (invoice: any) => {
    setModalMode("view");
    setSelectedInvoice(invoice);
    setModalOpen(true);
  };

  const handleSend = (invoice: any) => {
    toast({
      title: "Invoice Sent",
      description: `Invoice ${invoice.id} has been sent to ${invoice.client}`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">Invoices</h1>
          <p className="text-muted-foreground font-quicksand mt-2">
            Create and manage invoices
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-montserrat">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="font-montserrat" onClick={() => { setModalMode("add"); setSelectedInvoice(null); setModalOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Total Invoiced"
          value={`$${totalInvoiced.toLocaleString()}`}
          subtitle="This month"
          icon={DollarSign}
          className="border-l-4 border-l-primary animate-scale-in"
        />
        <KPICard
          title="Paid Invoices"
          value={paidInvoices.toString()}
          subtitle={`${Math.round((paidInvoices / invoices.length) * 100)}% collection rate`}
          icon={FileText}
          className="border-l-4 border-l-success animate-scale-in"
        />
        <KPICard
          title="Overdue"
          value={overdueInvoices.toString()}
          subtitle="Requires follow-up"
          icon={Clock}
          className="border-l-4 border-l-destructive animate-scale-in"
        />
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search invoices by ID or client..." className="pl-9" />
        </div>
      </Card>

      {/* Invoices Table */}
      <Card className="animate-slide-in-left">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-dela text-foreground">All Invoices</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-montserrat">Invoice ID</TableHead>
              <TableHead className="font-montserrat">Date</TableHead>
              <TableHead className="font-montserrat">Client</TableHead>
              <TableHead className="font-montserrat">Amount</TableHead>
              <TableHead className="font-montserrat">Due Date</TableHead>
              <TableHead className="font-montserrat">Status</TableHead>
              <TableHead className="font-montserrat">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-montserrat font-medium">{invoice.id}</TableCell>
                <TableCell className="font-quicksand">{invoice.date}</TableCell>
                <TableCell className="font-quicksand">{invoice.client}</TableCell>
                <TableCell className="font-montserrat">${invoice.amount.toFixed(2)}</TableCell>
                <TableCell className="font-quicksand">{invoice.dueDate}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      invoice.status === "paid"
                        ? "default"
                        : invoice.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleView(invoice)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleSend(invoice)}>
                      <Send className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <InvoiceModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode={modalMode}
        invoice={selectedInvoice}
      />
    </div>
  );
};

export default Invoices;
