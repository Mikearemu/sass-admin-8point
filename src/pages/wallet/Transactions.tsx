import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft } from "lucide-react";
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

const transactions = [
  { id: "TXN-8947", type: "credit", description: "Client Payment", amount: 1500.0, date: "2024-01-15 14:30", balance: 12450.0, category: "income" },
  { id: "TXN-8946", type: "debit", description: "Office Supplies", amount: -250.0, date: "2024-01-15 10:15", balance: 10950.0, category: "expense" },
  { id: "TXN-8945", type: "credit", description: "Product Sale", amount: 890.0, date: "2024-01-14 16:45", balance: 11200.0, category: "income" },
  { id: "TXN-8944", type: "debit", description: "Software Subscription", amount: -99.0, date: "2024-01-14 09:00", balance: 10310.0, category: "expense" },
  { id: "TXN-8943", type: "credit", description: "Refund", amount: 150.0, date: "2024-01-13 13:20", balance: 10409.0, category: "refund" },
  { id: "TXN-8942", type: "debit", description: "Marketing Campaign", amount: -500.0, date: "2024-01-13 11:00", balance: 10259.0, category: "expense" },
  { id: "TXN-8941", type: "credit", description: "Service Fee", amount: 2200.0, date: "2024-01-12 15:30", balance: 10759.0, category: "income" },
];

const Transactions = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">Transaction History</h1>
          <p className="text-muted-foreground font-quicksand mt-2">
            View and manage all your transactions
          </p>
        </div>
        <Button variant="outline" className="font-montserrat">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 animate-scale-in">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground font-quicksand">Total Income</p>
            <ArrowDownLeft className="h-5 w-5 text-success" />
          </div>
          <p className="text-3xl font-dela text-success">
            $4,740.00
          </p>
        </Card>
        <Card className="p-6 animate-scale-in">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground font-quicksand">Total Expenses</p>
            <ArrowUpRight className="h-5 w-5 text-destructive" />
          </div>
          <p className="text-3xl font-dela text-destructive">
            $849.00
          </p>
        </Card>
        <Card className="p-6 animate-scale-in">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground font-quicksand">Net Change</p>
          </div>
          <p className="text-3xl font-dela text-success">
            +$3,891.00
          </p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search transactions..." className="pl-9" />
          </div>
          <Button variant="outline" className="font-montserrat">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </Card>

      {/* Transactions Table */}
      <Card className="animate-slide-in-left">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-montserrat">Transaction ID</TableHead>
              <TableHead className="font-montserrat">Date & Time</TableHead>
              <TableHead className="font-montserrat">Description</TableHead>
              <TableHead className="font-montserrat">Category</TableHead>
              <TableHead className="font-montserrat">Amount</TableHead>
              <TableHead className="font-montserrat">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((txn) => (
              <TableRow key={txn.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-montserrat font-medium">{txn.id}</TableCell>
                <TableCell className="font-quicksand text-muted-foreground">{txn.date}</TableCell>
                <TableCell className="font-quicksand">{txn.description}</TableCell>
                <TableCell>
                  <Badge variant="outline">{txn.category}</Badge>
                </TableCell>
                <TableCell className={`font-montserrat font-semibold ${txn.type === "credit" ? "text-success" : "text-destructive"}`}>
                  {txn.type === "credit" ? "+" : ""}${Math.abs(txn.amount).toFixed(2)}
                </TableCell>
                <TableCell className="font-montserrat">${txn.balance.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Transactions;
