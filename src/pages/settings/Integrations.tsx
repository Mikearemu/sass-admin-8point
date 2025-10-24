import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Facebook, Instagram, Send } from "lucide-react";

const integrations = [
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    icon: MessageCircle,
    color: "text-green-600",
    description: "Connect WhatsApp Business API for customer communication",
    fields: [
      { name: "phoneNumberId", label: "Phone Number ID", placeholder: "Enter phone number ID" },
      { name: "accessToken", label: "Access Token", placeholder: "Enter access token", type: "password" },
      { name: "webhookUrl", label: "Webhook URL", placeholder: "https://your-domain.com/webhook" },
    ],
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    color: "text-blue-600",
    description: "Integrate Facebook for marketing and customer engagement",
    fields: [
      { name: "appId", label: "App ID", placeholder: "Enter Facebook App ID" },
      { name: "appSecret", label: "App Secret", placeholder: "Enter app secret", type: "password" },
      { name: "pageAccessToken", label: "Page Access Token", placeholder: "Enter page access token", type: "password" },
    ],
  },
  {
    id: "instagram",
    name: "Instagram Business",
    icon: Instagram,
    color: "text-pink-600",
    description: "Connect Instagram for social commerce and promotions",
    fields: [
      { name: "businessAccountId", label: "Business Account ID", placeholder: "Enter account ID" },
      { name: "accessToken", label: "Access Token", placeholder: "Enter access token", type: "password" },
    ],
  },
  {
    id: "telegram",
    name: "Telegram Bot",
    icon: Send,
    color: "text-blue-500",
    description: "Set up Telegram bot for automated customer support",
    fields: [
      { name: "botToken", label: "Bot Token", placeholder: "Enter bot token", type: "password" },
      { name: "chatId", label: "Default Chat ID", placeholder: "Enter chat ID" },
    ],
  },
];

const Integrations = () => {
  const { toast } = useToast();
  const [activeIntegrations, setActiveIntegrations] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<Record<string, Record<string, string>>>({});

  const handleToggle = (id: string) => {
    setActiveIntegrations({ ...activeIntegrations, [id]: !activeIntegrations[id] });
  };

  const handleSave = (id: string) => {
    toast({
      title: "Integration Saved",
      description: `${integrations.find(i => i.id === id)?.name} settings have been saved.`,
    });
  };

  const handleFieldChange = (integrationId: string, fieldName: string, value: string) => {
    setFormData({
      ...formData,
      [integrationId]: {
        ...formData[integrationId],
        [fieldName]: value,
      },
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-dela text-foreground">Social Media Integrations</h1>
        <p className="text-muted-foreground font-quicksand mt-2">
          Connect your social media accounts and communication channels
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          return (
            <Card key={integration.id} className="p-6 space-y-4 animate-scale-in">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg bg-muted ${integration.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold">{integration.name}</h3>
                    <p className="text-sm text-muted-foreground font-quicksand">
                      {integration.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {activeIntegrations[integration.id] && (
                    <Badge variant="default">Active</Badge>
                  )}
                  <Switch
                    checked={activeIntegrations[integration.id] || false}
                    onCheckedChange={() => handleToggle(integration.id)}
                  />
                </div>
              </div>

              {activeIntegrations[integration.id] && (
                <div className="space-y-4 pt-4 border-t">
                  {integration.fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <Label htmlFor={`${integration.id}-${field.name}`}>{field.label}</Label>
                      <Input
                        id={`${integration.id}-${field.name}`}
                        type={field.type || "text"}
                        placeholder={field.placeholder}
                        value={formData[integration.id]?.[field.name] || ""}
                        onChange={(e) =>
                          handleFieldChange(integration.id, field.name, e.target.value)
                        }
                      />
                    </div>
                  ))}
                  <Button
                    className="w-full"
                    onClick={() => handleSave(integration.id)}
                  >
                    Save Configuration
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <Card className="p-6">
        <h3 className="font-montserrat font-semibold mb-4">Integration Guide</h3>
        <div className="space-y-2 text-sm text-muted-foreground font-quicksand">
          <p>• <strong>WhatsApp:</strong> Get credentials from Meta Business Suite</p>
          <p>• <strong>Facebook:</strong> Create an app at developers.facebook.com</p>
          <p>• <strong>Instagram:</strong> Connect through Facebook Business account</p>
          <p>• <strong>Telegram:</strong> Create a bot via @BotFather on Telegram</p>
        </div>
      </Card>
    </div>
  );
};

export default Integrations;
