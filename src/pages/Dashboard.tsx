import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  Package,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingCart,
  Store,
  GraduationCap,
  Brain,
  MessageSquare,
  Target,
  Briefcase,
  ArrowLeftRight,
} from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { Button } from "@/components/ui/button";
import { ModuleCard } from "@/components/ModuleCard";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { SlidersHorizontal } from "lucide-react";
const modules = [
  {
    icon: CreditCard,
    title: "Smart Payments & Wallet",
    description: "Multi-currency transactions, settlements, and APIs.",
    modulePath: "/pay",
    cta: "Open Wallet",
  },
  {
    icon: ShoppingCart,
    title: "POS & Retail Suite",
    description: "Cloud POS, billing, and real-time inventory management.",
    modulePath: "/pos",
    cta: "Open Pos",
  },
  {
    icon: Store,
    title: "E-Commerce & Marketplace",
    description: "Store builder, digital sales, and multi-vendor management.",
    modulePath: "/store",
    cta: "Open Store",
  },
  {
    icon: GraduationCap,
    title: "Learning & Skill Exchange",
    description: "Online courses, certifications, and community learning.",
    modulePath: "/lms",
    cta: "Open LMS",
  },
  {
    icon: Brain,
    title: "AI & Automation Hub",
    description: "Design, content, analytics, and workflow automation.",
    modulePath: "/ai",
    cta: "Open AI",
  },
  {
    icon: MessageSquare,
    title: "Communication & Collaboration",
    description: "Chat, voice, video, and internal team communication.",
    modulePath: "/chat",
    cta: "Open Message",
  },
  {
    icon: Target,
    title: "Marketing & CRM Suite",
    description: "Campaign automation, leads, funnels, and customer analytics.",
    modulePath: "/marketing",
    cta: "Open CRM",
  },
  {
    icon: Briefcase,
    title: "Accounting & Business Ops",
    description: "Invoices, payroll, expenses, and financial reporting.",
    modulePath: "/accounting",
    cta: "Open Accounting",
  },
  {
    icon: SlidersHorizontal,
    title: "Settings",
    description: "Control Your Modules and other Settings.",
    modulePath: "/settings",
    cta: "Open Settings",
  },
];
const salesData = [
  { month: "Jan", sales: 4200, revenue: 8400, orders: 145 },
  { month: "Feb", sales: 5100, revenue: 10200, orders: 178 },
  { month: "Mar", sales: 4800, revenue: 9600, orders: 167 },
  { month: "Apr", sales: 6200, revenue: 12400, orders: 215 },
  { month: "May", sales: 7100, revenue: 14200, orders: 247 },
  { month: "Jun", sales: 8300, revenue: 16600, orders: 289 },
];

const categoryData = [
  { name: "Beverages", value: 45, color: "hsl(var(--primary))" },
  { name: "Food", value: 30, color: "hsl(var(--secondary))" },
  { name: "Desserts", value: 15, color: "hsl(var(--success))" },
  { name: "Others", value: 10, color: "hsl(var(--warning))" },
];

const revenueData = [
  { day: "Mon", amount: 2400 },
  { day: "Tue", amount: 3200 },
  { day: "Wed", amount: 2800 },
  { day: "Thu", amount: 4100 },
  { day: "Fri", amount: 5200 },
  { day: "Sat", amount: 4800 },
  { day: "Sun", amount: 3900 },
];

const greetings = {
  morning: [
    "☀️ Morning, sunshine! Ready for something amazing today?",
    "🌞 Good morning! Let’s make today count.",
    "☕ Morning! Hope you’ve had your coffee already!",
  ],
  afternoon: [
    "🌤 Good afternoon! You’re doing great.",
    "😎 Afternoon vibes — you’ve earned a little break.",
    "🌞 Hope your afternoon’s as awesome as you are!",
  ],
  evening: [
    "🌙 Good evening! Relax, you’ve earned it.",
    "✨ Evening, friend! Hope your day went well.",
    "😴 Time to unwind — you’ve had a full day!",
  ],
};

const hours = new Date().getHours();
let greetingList =
  hours < 12
    ? greetings.morning
    : hours < 18
    ? greetings.afternoon
    : greetings.evening;

const greeting = greetingList[Math.floor(Math.random() * greetingList.length)];

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-1xl  text-foreground mb-2">Dashboard</h1>
          <h2 className="text-2xl font-dela font-semibold">{greeting}</h2>
          <p className="text-muted-foreground font-quicksand">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="classic" className="font-montserrat">
            Download Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-col-1 gap-4">
        <div className="col-span-12  md:col-span-8 grid grid-cols-1 gap-4">
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <KPICard
              title="Today's Sales"
              value="$12,450"
              subtitle="Based on 145 transactions"
              icon={ArrowLeftRight}
              trend={{ value: "12.5%", isPositive: true }}
              className="border-l-4  border-l-primary"
            />
            <KPICard
              title="Total Orders"
              value="145"
              subtitle="24 pending fulfillment"
              icon={ShoppingBag}
              trend={{ value: "8.2%", isPositive: true }}
            />
            <KPICard
              title="Active Student"
              value="2,847"
              subtitle="Online in last 24h"
              icon={Users}
              trend={{ value: "3.1%", isPositive: false }}
            />
            <KPICard
              title="Wallet Balance"
              value="$48,290"
              subtitle="Available for withdrawal"
              icon={CreditCard}
              className="border-l-4 border-l-secondary"
            />
            <KPICard
              title="Revenue Growth"
              value="+23.5%"
              subtitle="Compared to last month"
              icon={TrendingUp}
            />
            <KPICard
              title="Low Stock Items"
              value="12"
              subtitle="Needs restocking"
              icon={Package}
              className="border-l-4 border-l-warning"
            />
          </div>
          {/* Module Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module, index) => (
              <ModuleCard
                key={index}
                icon={module.icon}
                title={module.title}
                description={module.description}
                modulePath={module.modulePath}
                cta={module.cta}
              />
            ))}
          </div>

          {/* Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
            {/* Revenue Trend */}
            <Card className="p-6 animate-slide-in-left">
              <h2 className="text-xl font-dela text-foreground mb-6">
                Revenue Trend
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    name="Revenue ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Sales & Orders */}
            <Card className="p-6 animate-slide-in-right">
              <h2 className="text-xl font-dela text-foreground mb-6">
                Sales & Orders
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stackId="1"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.6}
                    name="Sales ($)"
                  />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stackId="2"
                    stroke="hsl(var(--secondary))"
                    fill="hsl(var(--secondary))"
                    fillOpacity={0.6}
                    name="Orders"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-dela text-foreground mb-4">
              Recent Activity
            </h2>
            <Card className="divide-y">
              {[
                {
                  action: "New sale completed",
                  detail: "Order #1247 - $285.00",
                  time: "2 minutes ago",
                  icon: ArrowUpRight,
                  color: "text-success",
                },
                {
                  action: "Product added",
                  detail: "Premium Coffee Beans",
                  time: "15 minutes ago",
                  icon: Package,
                  color: "text-primary",
                },
                {
                  action: "Payment received",
                  detail: "Invoice #INV-342",
                  time: "1 hour ago",
                  icon: DollarSign,
                  color: "text-success",
                },
                {
                  action: "Course completed",
                  detail: "Sarah Johnson finished 'Advanced Sales'",
                  time: "2 hours ago",
                  icon: TrendingUp,
                  color: "text-primary",
                },
                {
                  action: "Low stock alert",
                  detail: "Organic Tea - 5 units remaining",
                  time: "3 hours ago",
                  icon: ArrowDownRight,
                  color: "text-warning",
                },
              ].map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={index}
                    className="p-4 hover:bg-muted/50 transition-colors animate-fade-in"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className={`h-10 w-10 rounded-full bg-muted flex items-center justify-center ${activity.color}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-montserrat font-medium text-foreground">
                            {activity.action}
                          </p>
                          <p className="text-sm text-muted-foreground font-quicksand">
                            {activity.detail}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground font-quicksand whitespace-nowrap">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </Card>
          </div>
          <div>
            <h2 className="text-xl font-dela text-foreground mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-primary/50">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <ShoppingBag className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-montserrat font-semibold text-foreground">
                    New Sale
                  </h3>
                  <p className="text-sm text-muted-foreground font-quicksand">
                    Start a POS transaction
                  </p>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-primary/50">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <CreditCard className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <h3 className="font-montserrat font-semibold text-foreground">
                    Send Invoice
                  </h3>
                  <p className="text-sm text-muted-foreground font-quicksand">
                    Create payment request
                  </p>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-primary/50">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Package className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-montserrat font-semibold text-foreground">
                    Add Product
                  </h3>
                  <p className="text-sm text-muted-foreground font-quicksand">
                    Expand your catalog
                  </p>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-primary/50">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-colors">
                    <TrendingUp className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="font-montserrat font-semibold text-foreground">
                    View Analytics
                  </h3>
                  <p className="text-sm text-muted-foreground font-quicksand">
                    Deep dive into data
                  </p>
                </div>
              </Card>
            </div>
          </div>
          <div>
            <Card className="p-6 animate-fade-in">
              <h2 className="text-xl font-dela text-foreground mb-6">
                Top Selling Products
              </h2>
              <div className="space-y-4">
                {[
                  { name: "Wireless Headphones", sales: 345, revenue: 34500 },
                  { name: "Smart Watch", sales: 289, revenue: 43350 },
                  { name: "Laptop Stand", sales: 234, revenue: 11700 },
                  { name: "USB-C Hub", sales: 198, revenue: 9900 },
                ].map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-montserrat text-sm font-semibold">
                        {product.name}
                      </p>
                      <p className="text-sm text-primary font-quicksand">
                        {product.sales} units sold
                      </p>
                    </div>
                    <p className="text-sm font-dela font-semibold">
                      ${product.revenue.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
            <Card className="p-6 bg-sidebar  hover:shadow-lg transition-all text-center cursor-pointer group border-2 hover:border-primary/50">
              <h2 className="text-xl font-dela font-semibold text-sidebar-foreground mb-4 ">
                Need Support?
              </h2>
              <p className="text-xm text-gray-200 font-quicksand pb-6">
                If you need help, feel free to reach out to our support team.
              </p>
              <Button className="font-montserrat bg-primary text-primary-foreground hover:bg-primary/90">
                Contact Support
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
