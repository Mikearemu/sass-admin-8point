import { Card } from "@/components/ui/card";
import { KPICard } from "@/components/KPICard";
import { TrendingUp, DollarSign, ShoppingBag, Users } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const salesData = [
  { month: "Jan", sales: 12400, orders: 145 },
  { month: "Feb", sales: 15800, orders: 178 },
  { month: "Mar", sales: 14200, orders: 162 },
  { month: "Apr", sales: 18900, orders: 201 },
  { month: "May", sales: 21500, orders: 234 },
  { month: "Jun", sales: 19800, orders: 215 },
];

const categoryData = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 28 },
  { name: "Home & Garden", value: 22 },
  { name: "Sports", value: 15 },
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--success))", "hsl(var(--warning))", "hsl(var(--secondary))"];

const Analytics = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-dela text-foreground">Store Analytics</h1>
        <p className="text-muted-foreground font-quicksand mt-2">
          Track sales performance and customer insights
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value="$102,600"
          subtitle="Last 6 months"
          icon={DollarSign}
          trend={{ value: "23.5%", isPositive: true }}
          className="border-l-4 border-l-success animate-scale-in"
        />
        <KPICard
          title="Total Orders"
          value="1,135"
          subtitle="Last 6 months"
          icon={ShoppingBag}
          trend={{ value: "18%", isPositive: true }}
          className="animate-scale-in"
        />
        <KPICard
          title="Avg Order Value"
          value="$90.40"
          subtitle="Per order"
          icon={TrendingUp}
          trend={{ value: "5.2%", isPositive: true }}
          className="animate-scale-in"
        />
        <KPICard
          title="Customers"
          value="892"
          subtitle="Active buyers"
          icon={Users}
          className="animate-scale-in"
        />
      </div>

      {/* Sales Trend Chart */}
      <Card className="p-6 animate-slide-in-left">
        <h2 className="text-2xl font-dela text-foreground mb-6">Sales & Orders Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
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
            <Line type="monotone" dataKey="orders" stroke="hsl(var(--success))" strokeWidth={3} name="Orders" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card className="p-6 animate-slide-in-right">
          <h2 className="text-2xl font-dela text-foreground mb-6">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Products */}
        <Card className="p-6 animate-fade-in">
          <h2 className="text-2xl font-dela text-foreground mb-6">Top Selling Products</h2>
          <div className="space-y-4">
            {[
              { name: "Wireless Headphones", sales: 345, revenue: 34500 },
              { name: "Smart Watch", sales: 289, revenue: 43350 },
              { name: "Laptop Stand", sales: 234, revenue: 11700 },
              { name: "USB-C Hub", sales: 198, revenue: 9900 },
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-montserrat font-semibold">{product.name}</p>
                  <p className="text-sm text-muted-foreground font-quicksand">
                    {product.sales} units sold
                  </p>
                </div>
                <p className="text-xl font-dela text-primary">${product.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
