import { Download, TrendingUp, DollarSign, ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KPICard } from "@/components/KPICard";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const salesData = [
  { date: "Mon", sales: 4200, transactions: 45 },
  { date: "Tue", sales: 5100, transactions: 58 },
  { date: "Wed", sales: 4800, transactions: 52 },
  { date: "Thu", sales: 6200, transactions: 67 },
  { date: "Fri", sales: 7100, transactions: 78 },
  { date: "Sat", sales: 8300, transactions: 89 },
  { date: "Sun", sales: 6900, transactions: 73 },
];

const topProducts = [
  { name: "Premium Coffee", sales: 145, revenue: 1885.55 },
  { name: "Croissant", sales: 128, revenue: 638.72 },
  { name: "Fresh Juice", sales: 98, revenue: 685.02 },
  { name: "Sandwich", sales: 87, revenue: 869.13 },
  { name: "Chocolate Cake", sales: 56, revenue: 1399.44 },
];

const Reports = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">POS Reports</h1>
          <p className="text-muted-foreground font-quicksand">
            Analyze sales performance and trends
          </p>
        </div>
        <Button variant="classic" className="font-montserrat">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Weekly Sales"
          value="$42,600"
          subtitle="Last 7 days"
          icon={DollarSign}
          trend={{ value: "18.5%", isPositive: true }}
          className="border-l-4 border-l-success animate-scale-in"
        />
        <KPICard
          title="Total Transactions"
          value="462"
          subtitle="This week"
          icon={ShoppingCart}
          trend={{ value: "12%", isPositive: true }}
          className="animate-scale-in"
        />
        <KPICard
          title="Average Sale"
          value="$92.21"
          subtitle="Per transaction"
          icon={TrendingUp}
          trend={{ value: "5.3%", isPositive: true }}
          className="animate-scale-in"
        />
      </div>

       {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 animate-fade-in">
          <p className="text-sm text-muted-foreground font-quicksand mb-2">Best Day</p>
          <p className="text-2xl font-dela text-foreground">Saturday</p>
          <p className="text-sm text-success font-montserrat mt-1">$8,300 sales</p>
        </Card>
        <Card className="p-6 animate-fade-in">
          <p className="text-sm text-muted-foreground font-quicksand mb-2">Peak Hour</p>
          <p className="text-2xl font-dela text-foreground">2-4 PM</p>
          <p className="text-sm text-primary font-montserrat mt-1">35% of daily sales</p>
        </Card>
        <Card className="p-6 animate-fade-in">
          <p className="text-sm text-muted-foreground font-quicksand mb-2">Top Category</p>
          <p className="text-2xl font-dela text-foreground">Beverages</p>
          <p className="text-sm text-success font-montserrat mt-1">45% of revenue</p>
        </Card>
        <Card className="p-6 animate-fade-in">
          <p className="text-sm text-muted-foreground font-quicksand mb-2">Growth Rate</p>
          <p className="text-2xl font-dela text-success">+18.5%</p>
          <p className="text-sm text-muted-foreground font-montserrat mt-1">vs last week</p>
        </Card>
      </div>

      {/* Sales Trend Chart */}
      <Card className="p-6 animate-slide-in-left">
        <h2 className="text-2xl font-dela text-foreground mb-6">Weekly Sales Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={3} name="Sales ($)" />
            <Line type="monotone" dataKey="transactions" stroke="hsl(var(--secondary))" strokeWidth={3} name="Transactions" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Top Products */}
      <Card className="p-6 animate-slide-in-right">
        <h2 className="text-2xl font-dela text-foreground mb-6">Top Selling Products</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topProducts}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
            <Legend />
            <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Revenue ($)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

     
    </div>
  );
};

export default Reports;
