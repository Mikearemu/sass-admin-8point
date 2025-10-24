import { Shield, Key, Lock, AlertTriangle, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const securitySettings = [
  { id: "2fa", title: "Two-Factor Authentication", description: "Add an extra layer of security", enabled: true, icon: Shield },
  { id: "sessions", title: "Session Management", description: "Monitor active sessions", enabled: true, icon: Key },
  { id: "password", title: "Password Policy", description: "Enforce strong passwords", enabled: true, icon: Lock },
  { id: "alerts", title: "Security Alerts", description: "Get notified of suspicious activity", enabled: false, icon: AlertTriangle },
];

const recentActivity = [
  { event: "Login from new device", location: "New York, US", time: "2 hours ago", status: "verified" },
  { event: "Password changed", location: "San Francisco, US", time: "1 day ago", status: "success" },
  { event: "Failed login attempt", location: "Unknown", time: "2 days ago", status: "warning" },
  { event: "2FA enabled", location: "New York, US", time: "1 week ago", status: "success" },
];

const Security = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-dela text-foreground">Security Settings</h1>
        <p className="text-muted-foreground font-quicksand mt-2">
          Manage your account security and privacy
        </p>
      </div>

      {/* Security Score */}
      <Card className="p-6 animate-scale-in bg-gradient-to-br from-success/5 to-success/10 border-success/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-dela text-foreground mb-2">Security Score</h2>
            <p className="text-muted-foreground font-quicksand">Your account is well protected</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center mb-2">
              <span className="text-3xl font-dela text-success">85%</span>
            </div>
            <Badge variant="default">Good</Badge>
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6 animate-slide-in-left">
        <h2 className="text-2xl font-dela text-foreground mb-6">Security Features</h2>
        <div className="space-y-4">
          {securitySettings.map((setting) => (
            <div key={setting.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <setting.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold">{setting.title}</h3>
                  <p className="text-sm text-muted-foreground font-quicksand">{setting.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={setting.enabled} />
                <Button size="sm" variant="outline">
                  Configure
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6 animate-slide-in-right">
        <h2 className="text-2xl font-dela text-foreground mb-6">Recent Security Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start justify-between p-4 border border-border rounded-lg">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.status === "success" ? "bg-success/20" :
                  activity.status === "warning" ? "bg-warning/20" :
                  "bg-primary/20"
                }`}>
                  {activity.status === "success" || activity.status === "verified" ? (
                    <CheckCircle className={`h-4 w-4 ${activity.status === "success" ? "text-success" : "text-primary"}`} />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  )}
                </div>
                <div>
                  <p className="font-montserrat font-medium">{activity.event}</p>
                  <p className="text-sm text-muted-foreground font-quicksand">{activity.location}</p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground font-quicksand">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Password Change */}
      <Card className="p-6 animate-fade-in">
        <h2 className="text-2xl font-dela text-foreground mb-6">Change Password</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="text-sm font-montserrat font-medium">Current Password</label>
            <input type="password" className="w-full mt-1 px-3 py-2 border border-border rounded-lg" />
          </div>
          <div>
            <label className="text-sm font-montserrat font-medium">New Password</label>
            <input type="password" className="w-full mt-1 px-3 py-2 border border-border rounded-lg" />
          </div>
          <div>
            <label className="text-sm font-montserrat font-medium">Confirm New Password</label>
            <input type="password" className="w-full mt-1 px-3 py-2 border border-border rounded-lg" />
          </div>
          <Button className="font-montserrat">Update Password</Button>
        </div>
      </Card>
    </div>
  );
};

export default Security;
