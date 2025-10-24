import {
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Plus,
  Download,
  Eye,
  EyeOff,
} from "lucide-react";
import { Landmark } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

const transactions = [
  {
    id: "1",
    type: "credit",
    description: "Payment received - Order #1247",
    amount: 450.0,
    date: "2024-01-15 14:30",
    balance: 48290,
  },
  {
    id: "2",
    type: "debit",
    description: "Withdrawal to bank account",
    amount: -2000.0,
    date: "2024-01-15 10:15",
    balance: 47840,
  },
  {
    id: "3",
    type: "credit",
    description: "Payment received - Order #1246",
    amount: 285.0,
    date: "2024-01-14 16:45",
    balance: 49840,
  },
  {
    id: "4",
    type: "debit",
    description: "Platform fee",
    amount: -15.5,
    date: "2024-01-14 09:00",
    balance: 49555,
  },
  {
    id: "5",
    type: "credit",
    description: "Refund processed",
    amount: 120.0,
    date: "2024-01-13 11:20",
    balance: 49570.5,
  },
];

const Wallet = () => {
  const [showBalance, setShowBalance] = useState(false);

  const toggleBalance = () => setShowBalance((prev) => !prev);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">Wallet</h1>
          <p className="text-muted-foreground font-quicksand ">
            Manage your balance and transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="classic" className="font-montserrat">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Balance Card */}
        <div className="col-span-12 md:col-span-8">
          <Card className="relative overflow-hidden bg-sidebar text-primary-foreground shadow-md hover:shadow-xl transition-all duration-300 p-8 rounded-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex  justify-center items-center">
                    <p className="text-sm opacity-90 font-quicksand tracking-wide">
                      Available Balance
                    </p>
                    <Button
                      variant="link"
                      size="icon"
                      className="p-0"
                      onClick={toggleBalance}
                    >
                      {showBalance ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                  <h2 className="text-4xl font-semibold font-dela mt-2">
                    {showBalance ? "$7,290.00" : "*********"}
                  </h2>
                </div>
                <div className="bg-primary-foreground/10 p-4 rounded-full">
                  <CreditCard className="h-12 w-12 text-primary-foreground/80" />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 flex-wrap ">
                <Button
                  variant="default"
                  className="flex-1 font-montserrat shadow-sm hover:shadow-md"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Money
                </Button>
                <Button
                  variant="default"
                  className="flex-1 font-montserrat shadow-sm hover:shadow-md"
                >
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Transfer
                </Button>
                <Button
                  variant="default"
                  className="flex-1 font-montserrat shadow-sm hover:shadow-md"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Withdraw
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
          {[
            {
              icon: <Landmark  className="h-6 w-6 text-success" />,
              title: "Link Bank",
              desc: "Connect your account",
              bg: "bg-success/10",
              animate: "animate-slide-in-left",
            },
            {
              icon: <CreditCard className="h-6 w-6 text-primary" />,
              title: "View Cards",
              desc: "Manage payment methods",
              bg: "bg-primary/10",
              animate: "animate-scale-in",
            },
          ].map((item, i) => (
            <Card
              key={i}
              className={`p-6 hover:shadow-lg transition-all duration-300 cursor-pointer rounded-2xl ${item.animate}`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center ${item.bg}`}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <Card className="animate-fade-in">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-montserrat">Date & Time</TableHead>
              <TableHead className="font-montserrat">Description</TableHead>
              <TableHead className="font-montserrat">Type</TableHead>
              <TableHead className="font-montserrat text-right">
                Amount
              </TableHead>
              <TableHead className="font-montserrat text-right">
                Balance
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((txn) => (
              <TableRow
                key={txn.id}
                className="hover:bg-muted/50 transition-colors"
              >
                <TableCell className="font-quicksand">{txn.date}</TableCell>
                <TableCell className="font-quicksand">
                  {txn.description}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={txn.type === "credit" ? "default" : "secondary"}
                  >
                    {txn.type === "credit" ? (
                      <ArrowDownLeft className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    )}
                    {txn.type}
                  </Badge>
                </TableCell>
                <TableCell
                  className={`font-montserrat font-semibold text-right ${
                    txn.type === "credit" ? "text-success" : "text-destructive"
                  }`}
                >
                  {txn.amount > 0 ? "+" : ""}${txn.amount.toFixed(2)}
                </TableCell>
                <TableCell className="font-montserrat text-right">
                  ${txn.balance.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Wallet;
