import { Save, User, Bell, Shield, Palette, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-dela text-foreground">Settings</h1>
        <p className="text-muted-foreground font-quicksand mt-2">
          Manage your account and application preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7">
          <TabsTrigger value="general" className="font-montserrat text-xs lg:text-sm">
            <Globe className="h-4 w-4 mr-0 lg:mr-2" />
            <span className="p-2 lg:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="font-montserrat text-xs lg:text-sm">
            <User className="h-4 w-4 mr-0 lg:mr-2" />
            <span className="p-2 lg:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="font-montserrat text-xs lg:text-sm">
            <Bell className="h-4 w-4 mr-0 lg:mr-2" />
            <span className="p-2 lg:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="font-montserrat text-xs lg:text-sm">
            <Shield className="h-4 w-4 mr-0 lg:mr-2" />
            <span className="p-2 lg:inline">Security</span>
          </TabsTrigger>
         
          <TabsTrigger value="preferences" className="font-montserrat text-xs lg:text-sm">
            <Save className="h-4 w-4 mr-0 lg:mr-2" />
            <span className="p-2 lg:inline">Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="modules" className="font-montserrat text-xs lg:text-sm">
            <User className="h-4 w-4 mr-0 lg:mr-2" />
            <span className="p-2 lg:inline">Modules</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6 animate-fade-in">
          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-dela text-foreground mb-4">
                General Settings
              </h2>
              <p className="text-muted-foreground font-quicksand">
                Configure basic application settings
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="font-montserrat">
                  Company Name
                </Label>
                <Input id="company" defaultValue="8Point" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-montserrat">
                  Contact Email
                </Label>
                <Input id="email" type="email" defaultValue="admin@8point.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone" className="font-montserrat">
                  Timezone
                </Label>
                <Input id="timezone" defaultValue="UTC-5 (Eastern Time)" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language" className="font-montserrat">
                  Language
                </Label>
                <Input id="language" defaultValue="English" />
              </div>
            </div>

            <Button className="font-montserrat">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </Card>
        </TabsContent>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6 animate-fade-in">
          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-dela text-foreground mb-4">
                Profile Information
              </h2>
              <p className="text-muted-foreground font-quicksand">
                Update your personal information
              </p>
            </div>

            <Separator />

            <div className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center">
                <User className="h-12 w-12 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="font-montserrat">
                  Upload Photo
                </Button>
                <p className="text-sm text-muted-foreground font-quicksand">
                  JPG, PNG or GIF. Max size 2MB
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="font-montserrat">
                    First Name
                  </Label>
                  <Input id="firstName" defaultValue="Admin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="font-montserrat">
                    Last Name
                  </Label>
                  <Input id="lastName" defaultValue="User" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="font-montserrat">
                  Role
                </Label>
                <div className="flex gap-2">
                  <Input id="role" defaultValue="Administrator" disabled />
                  <Badge variant="default">Admin</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="font-montserrat">
                  Bio
                </Label>
                <Input id="bio" defaultValue="System administrator" />
              </div>
            </div>

            <Button className="font-montserrat">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6 animate-fade-in">
          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-dela text-foreground mb-4">
                Notification Preferences
              </h2>
              <p className="text-muted-foreground font-quicksand">
                Choose what notifications you want to receive
              </p>
            </div>

            <Separator />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-montserrat font-medium text-foreground">
                    Email Notifications
                  </p>
                  <p className="text-sm text-muted-foreground font-quicksand">
                    Receive email updates about your account
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-montserrat font-medium text-foreground">
                    Sales Notifications
                  </p>
                  <p className="text-sm text-muted-foreground font-quicksand">
                    Get notified when new sales are made
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-montserrat font-medium text-foreground">
                    Low Stock Alerts
                  </p>
                  <p className="text-sm text-muted-foreground font-quicksand">
                    Alert when inventory is running low
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-montserrat font-medium text-foreground">
                    Chat Messages
                  </p>
                  <p className="text-sm text-muted-foreground font-quicksand">
                    Notifications for new chat messages
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-montserrat font-medium text-foreground">
                    Marketing Updates
                  </p>
                  <p className="text-sm text-muted-foreground font-quicksand">
                    Receive tips and product updates
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6 animate-fade-in">
          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-dela text-foreground mb-4">
                Security Settings
              </h2>
              <p className="text-muted-foreground font-quicksand">
                Manage your password and security preferences
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="font-montserrat">
                  Current Password
                </Label>
                <Input id="currentPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="font-montserrat">
                  New Password
                </Label>
                <Input id="newPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="font-montserrat">
                  Confirm New Password
                </Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </div>

            <Button className="font-montserrat">
              Update Password
            </Button>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-montserrat font-medium text-foreground">
                    Two-Factor Authentication
                  </p>
                  <p className="text-sm text-muted-foreground font-quicksand">
                    Add an extra layer of security
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-montserrat font-medium text-foreground">
                    Session Timeout
                  </p>
                  <p className="text-sm text-muted-foreground font-quicksand">
                    Auto logout after inactivity
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

      

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6 animate-fade-in">
          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-dela text-foreground mb-4">
                User Preferences
              </h2>
              <p className="text-muted-foreground font-quicksand">
                Customize your dashboard experience
              </p>
            </div>

            <Separator />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-montserrat font-medium text-foreground">
                    Show Dashboard Tips
                  </p>
                  <p className="text-sm text-muted-foreground font-quicksand">
                    Display helpful tooltips throughout the app
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-montserrat font-medium text-foreground">
                    Auto-Save Forms
                  </p>
                  <p className="text-sm text-muted-foreground font-quicksand">
                    Automatically save draft changes
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-montserrat font-medium text-foreground">
                    Sound Effects
                  </p>
                  <p className="text-sm text-muted-foreground font-quicksand">
                    Play sounds for notifications and actions
                  </p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="defaultView" className="font-montserrat">
                  Default Home View
                </Label>
                <Input id="defaultView" defaultValue="Dashboard" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="itemsPerPage" className="font-montserrat">
                  Items Per Page
                </Label>
                <Input id="itemsPerPage" type="number" defaultValue="25" />
              </div>
            </div>

            <Button className="font-montserrat">
              <Save className="h-4 w-4 mr-2" />
              Save Preferences
            </Button>
          </Card>
        </TabsContent>

        {/* Modules & Permissions Tab */}
        <TabsContent value="modules" className="space-y-6 animate-fade-in">
          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-dela text-foreground mb-4">
                Module Settings
              </h2>
              <p className="text-muted-foreground font-quicksand">
                Enable or disable modules and manage user permissions
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-montserrat font-semibold text-lg">Active Modules</h3>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-montserrat font-medium text-foreground">POS</p>
                    <p className="text-sm text-muted-foreground">Point of Sale system</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-montserrat font-medium text-foreground">Pay</p>
                    <p className="text-sm text-muted-foreground">Payment processing</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-montserrat font-medium text-foreground">Wallet</p>
                    <p className="text-sm text-muted-foreground">Balance management</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-montserrat font-medium text-foreground">LMS</p>
                    <p className="text-sm text-muted-foreground">Learning management</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-montserrat font-medium text-foreground">Store</p>
                    <p className="text-sm text-muted-foreground">Digital storefront</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-montserrat font-medium text-foreground">AI</p>
                    <p className="text-sm text-muted-foreground">Insights & automation</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-montserrat font-medium text-foreground">Chat</p>
                    <p className="text-sm text-muted-foreground">Team messaging</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-montserrat font-semibold text-lg">User Permissions</h3>
              <p className="text-sm text-muted-foreground font-quicksand">
                Define role-based access controls for each module
              </p>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4 font-montserrat">Role</th>
                      <th className="text-center p-4 font-montserrat">View</th>
                      <th className="text-center p-4 font-montserrat">Edit</th>
                      <th className="text-center p-4 font-montserrat">Delete</th>
                      <th className="text-center p-4 font-montserrat">Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-4 font-montserrat">Administrator</td>
                      <td className="text-center p-4"><Badge>✓</Badge></td>
                      <td className="text-center p-4"><Badge>✓</Badge></td>
                      <td className="text-center p-4"><Badge>✓</Badge></td>
                      <td className="text-center p-4"><Badge>✓</Badge></td>
                    </tr>
                    <tr>
                      <td className="p-4 font-montserrat">Manager</td>
                      <td className="text-center p-4"><Badge>✓</Badge></td>
                      <td className="text-center p-4"><Badge>✓</Badge></td>
                      <td className="text-center p-4"><Badge variant="secondary">-</Badge></td>
                      <td className="text-center p-4"><Badge variant="secondary">-</Badge></td>
                    </tr>
                    <tr>
                      <td className="p-4 font-montserrat">Staff</td>
                      <td className="text-center p-4"><Badge>✓</Badge></td>
                      <td className="text-center p-4"><Badge variant="secondary">-</Badge></td>
                      <td className="text-center p-4"><Badge variant="secondary">-</Badge></td>
                      <td className="text-center p-4"><Badge variant="secondary">-</Badge></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Button variant="outline" className="font-montserrat">
                <User className="h-4 w-4 mr-2" />
                Add New Role
              </Button>
            </div>

            <Button className="font-montserrat">
              <Save className="h-4 w-4 mr-2" />
              Save Module Settings
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
