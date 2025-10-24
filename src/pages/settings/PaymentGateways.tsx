import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, DollarSign, Wallet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const paymentGateways = [
  {
    id: "paystack",
    name: "Paystack",
    icon: Wallet,
    color: "text-blue-600",
    description: "Accept payments across Africa",
    fields: [
      { name: "publicKey", label: "Public Key", placeholder: "pk_test_...", type: "text" },
      { name: "secretKey", label: "Secret Key", placeholder: "sk_test_...", type: "password" },
    ],
    testMode: true,
  },
  {
    id: "flutterwave",
    name: "Flutterwave",
    icon: CreditCard,
    color: "text-orange-600",
    description: "Global payment solutions for Africa",
    fields: [
      { name: "publicKey", label: "Public Key", placeholder: "FLWPUBK_TEST-...", type: "text" },
      { name: "secretKey", label: "Secret Key", placeholder: "FLWSECK_TEST-...", type: "password" },
      { name: "encryptionKey", label: "Encryption Key", placeholder: "FLWSECK_TEST...", type: "password" },
    ],
    testMode: true,
  },
  {
    id: "stripe",
    name: "Stripe",
    icon: DollarSign,
    color: "text-purple-600",
    description: "International payment processing",
    fields: [
      { name: "publishableKey", label: "Publishable Key", placeholder: "pk_test_...", type: "text" },
      { name: "secretKey", label: "Secret Key", placeholder: "sk_test_...", type: "password" },
      { name: "webhookSecret", label: "Webhook Secret", placeholder: "whsec_...", type: "password" },
    ],
    testMode: true,
  },
];

const PaymentGateways = () => {
  const { toast } = useToast();
  const [activeGateways, setActiveGateways] = useState<Record<string, boolean>>({});
  const [testMode, setTestMode] = useState<Record<string, boolean>>({
    paystack: true,
    flutterwave: true,
    stripe: true,
  });
  const [formData, setFormData] = useState<Record<string, Record<string, string>>>({});

  const handleToggle = (id: string) => {
    setActiveGateways({ ...activeGateways, [id]: !activeGateways[id] });
  };

  const handleTestModeToggle = (id: string) => {
    setTestMode({ ...testMode, [id]: !testMode[id] });
    toast({
      title: testMode[id] ? "Live Mode Enabled" : "Test Mode Enabled",
      description: `${paymentGateways.find(g => g.id === id)?.name} is now in ${testMode[id] ? "live" : "test"} mode.`,
    });
  };

  const handleSave = (id: string) => {
    toast({
      title: "Gateway Settings Saved",
      description: `${paymentGateways.find(g => g.id === id)?.name} configuration has been updated.`,
    });
  };

  const handleFieldChange = (gatewayId: string, fieldName: string, value: string) => {
    setFormData({
      ...formData,
      [gatewayId]: {
        ...formData[gatewayId],
        [fieldName]: value,
      },
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-dela text-foreground">Payment Gateways</h1>
        <p className="text-muted-foreground font-quicksand mt-2">
          Configure payment processors for your business
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground font-quicksand">Active Gateways</p>
          <p className="text-3xl font-dela text-foreground mt-2">
            {Object.values(activeGateways).filter(Boolean).length}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground font-quicksand">Test Mode</p>
          <p className="text-3xl font-dela text-warning mt-2">
            {Object.values(testMode).filter(Boolean).length}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground font-quicksand">Live Mode</p>
          <p className="text-3xl font-dela text-success mt-2">
            {Object.values(testMode).filter(v => !v).length}
          </p>
        </Card>
      </div>

      {/* Gateway Cards */}
      <div className="space-y-6">
        {paymentGateways.map((gateway) => {
          const Icon = gateway.icon;
          return (
            <Card key={gateway.id} className="p-6 space-y-4 animate-scale-in">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg bg-muted ${gateway.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-lg">{gateway.name}</h3>
                    <p className="text-sm text-muted-foreground font-quicksand">
                      {gateway.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {activeGateways[gateway.id] && (
                    <Badge variant="default">Active</Badge>
                  )}
                  {testMode[gateway.id] && (
                    <Badge variant="secondary">Test Mode</Badge>
                  )}
                  <Switch
                    checked={activeGateways[gateway.id] || false}
                    onCheckedChange={() => handleToggle(gateway.id)}
                  />
                </div>
              </div>

              {activeGateways[gateway.id] && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-montserrat font-medium">Test Mode</p>
                      <p className="text-xs text-muted-foreground">Use test credentials for development</p>
                    </div>
                    <Switch
                      checked={testMode[gateway.id] || false}
                      onCheckedChange={() => handleTestModeToggle(gateway.id)}
                    />
                  </div>

                  {gateway.fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <Label htmlFor={`${gateway.id}-${field.name}`}>{field.label}</Label>
                      <Input
                        id={`${gateway.id}-${field.name}`}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[gateway.id]?.[field.name] || ""}
                        onChange={(e) =>
                          handleFieldChange(gateway.id, field.name, e.target.value)
                        }
                      />
                    </div>
                  ))}

                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => handleSave(gateway.id)}
                    >
                      Save Configuration
                    </Button>
                    <Button variant="outline">Test Connection</Button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Documentation */}
      <Card className="p-6">
        <h3 className="font-montserrat font-semibold mb-4">Setup Guide</h3>
        <div className="space-y-3 text-sm text-muted-foreground font-quicksand">
          <div>
            <strong className="text-foreground">Paystack:</strong>
            <p>1. Sign up at paystack.com</p>
            <p>2. Get your API keys from Settings → API Keys & Webhooks</p>
            <p>3. Use test keys for development (pk_test_ / sk_test_)</p>
          </div>
          <div>
            <strong className="text-foreground">Flutterwave:</strong>
            <p>1. Create account at flutterwave.com</p>
            <p>2. Navigate to Settings → API to get your keys</p>
            <p>3. Enable required payment methods in your dashboard</p>
          </div>
          <div>
            <strong className="text-foreground">Stripe:</strong>
            <p>1. Register at stripe.com</p>
            <p>2. Get API keys from Developers → API keys</p>
            <p>3. Set up webhooks for payment notifications</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentGateways;
