import { Sparkles, TrendingUp, AlertCircle, Settings, Play, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const insights = [
  { title: "Sales Forecast", value: "↑ 15% next month", description: "Based on current trends", type: "positive" },
  { title: "Stock Alert", value: "10 items low", description: "Restock recommended", type: "warning" },
  { title: "Customer Trend", value: "Peak hours 2-4 PM", description: "Optimize staffing", type: "info" },
  { title: "Revenue Opportunity", value: "$2,400", description: "Upsell potential identified", type: "positive" },
];

const automations = [
  { id: "1", name: "Monthly Sales Report", description: "Email report to stakeholders", active: true },
  { id: "2", name: "Low Stock Alerts", description: "Notify when inventory is low", active: true },
  { id: "3", name: "Customer Follow-ups", description: "Auto-send thank you emails", active: false },
  { id: "4", name: "Price Optimization", description: "Adjust prices based on demand", active: true },
];

const AI = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">AI Insights & Automation</h1>
          <p className="text-muted-foreground font-quicksand mt-2">
            Leverage AI to optimize your business
          </p>
        </div>
        <Button variant="outline" className="font-montserrat">
          <Settings className="h-4 w-4 mr-2" />
          Configure AI
        </Button>
      </div>

      {/* AI Query Panel */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 animate-scale-in">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-dela text-foreground">Ask AI Anything</h2>
          </div>
          <div className="flex gap-3">
            <Input
              placeholder="e.g., 'Show me last quarter's revenue' or 'What are my top products?'"
              className="flex-1"
            />
            <Button className="font-montserrat">
              <Sparkles className="h-4 w-4 mr-2" />
              Ask
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              Sales trends
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              Customer insights
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              Inventory forecast
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              Revenue optimization
            </Badge>
          </div>
        </div>
      </Card>

      {/* Insights Grid */}
      <div>
        <h2 className="text-2xl font-dela text-foreground mb-4">AI-Powered Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {insights.map((insight, index) => (
            <Card
              key={index}
              className={`p-6 animate-fade-in border-l-4 ${
                insight.type === "positive"
                  ? "border-l-success"
                  : insight.type === "warning"
                  ? "border-l-warning"
                  : "border-l-primary"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-montserrat font-semibold text-foreground">
                    {insight.title}
                  </h3>
                  {insight.type === "positive" ? (
                    <TrendingUp className="h-5 w-5 text-success" />
                  ) : insight.type === "warning" ? (
                    <AlertCircle className="h-5 w-5 text-warning" />
                  ) : (
                    <BarChart3 className="h-5 w-5 text-primary" />
                  )}
                </div>
                <p className="text-2xl font-dela text-foreground">{insight.value}</p>
                <p className="text-sm text-muted-foreground font-quicksand">
                  {insight.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Forecast Chart */}
      <Card className="p-6 animate-slide-in-left">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-dela text-foreground">Sales Forecast</h2>
            <Button variant="outline" size="sm" className="font-montserrat">
              <Settings className="h-4 w-4 mr-2" />
              Adjust Parameters
            </Button>
          </div>
          <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground font-quicksand">
                AI-generated forecast chart would appear here
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-sm text-muted-foreground font-quicksand">Predicted Growth</p>
              <p className="text-2xl font-dela text-success">+18.5%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground font-quicksand">Confidence Level</p>
              <p className="text-2xl font-dela text-primary">87%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground font-quicksand">Peak Month</p>
              <p className="text-2xl font-dela text-foreground">March</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Automations */}
      <Card className="animate-slide-in-right">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-dela text-foreground">Automations</h2>
        </div>
        <div className="divide-y">
          {automations.map((automation) => (
            <div key={automation.id} className="p-6 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-montserrat font-semibold text-foreground">
                      {automation.name}
                    </h3>
                    <Badge variant={automation.active ? "default" : "secondary"}>
                      {automation.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground font-quicksand mt-1">
                    {automation.description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button size="sm" variant="outline" className="font-montserrat">
                    <Play className="h-4 w-4 mr-2" />
                    Run Now
                  </Button>
                  <Switch checked={automation.active} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AI;
