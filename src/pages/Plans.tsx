"use client";

import { useState } from "react";
import { Check, Crown, Zap, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Plans = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      monthly: 8000,
      yearly: 80000,
      description: "Ideal for freelancers and startups exploring automation and CRM tools.",
      icon: Zap,
      color: "text-primary",
      bgColor: "bg-primary/10",
      features: [
        "Access to 3 modules (Workspace, CRM, Communication)",
        "Up to 5 users",
        "Email & in-app notifications",
        "Basic analytics dashboard",
        "Task and project management tools",
        "1GB cloud workspace storage",
        "Community support",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      monthly: 25000,
      yearly: 250000,
      description: "Perfect for small and mid-size teams ready to automate workflows and scale.",
      icon: Crown,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      features: [
        "Access to all 8 modules",
        "Unlimited projects & tasks",
        "Up to 20 users",
        "Advanced analytics & reports",
        "AI-powered business insights",
        "Marketing automation tools",
        "Custom integrations (Slack, Gmail, etc.)",
        "Priority email & chat support",
      ],
      cta: "Upgrade Now",
      popular: true,
    },
    {
      name: "Enterprise",
      monthly: 75000,
      yearly: 750000,
      description: "For organizations needing complete control, scalability, and support.",
      icon: Rocket,
      color: "text-success",
      bgColor: "bg-success/10",
      features: [
        "Everything in Professional",
        "Unlimited users",
        "Dedicated AI workspace assistant",
        "Custom API & webhook integration",
        "Advanced access control & permissions",
        "White-label branding options",
        "Dedicated success manager",
        "24/7 phone & chat support",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge className="font-montserrat">Pricing Plans</Badge>
        <h1 className="text-2xl font-dela text-foreground">
          Choose the Right Plan for Your Business
        </h1>
        <p className="text-normal text-muted-foreground font-quicksand">
          Whether you're just starting or scaling, 8Point grows with you.
          Switch between monthly and yearly plans anytime.
        </p>

        {/* Toggle between Monthly and Yearly */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <Label
            htmlFor="billing-toggle"
            className={`text-sm font-montserrat ${
              !isYearly ? "text-primary font-semibold" : "text-muted-foreground"
            }`}
          >
            Monthly
          </Label>
          <Switch
            id="billing-toggle"
            checked={isYearly}
            onCheckedChange={setIsYearly}
          />
          <Label
            htmlFor="billing-toggle"
            className={`text-sm font-montserrat flex items-center gap-1 ${
              isYearly ? "text-primary font-semibold" : "text-muted-foreground"
            }`}
          >
            Yearly <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Save 20%</span>
          </Label>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          const price = isYearly ? plan.yearly : plan.monthly;
          const period = isYearly ? "/year" : "/month";

          return (
            <Card
              key={plan.name}
              className={`p-8 relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                plan.popular
                  ? "border-2 border-primary scale-105 animate-scale-in"
                  : "hover:scale-105 animate-fade-in"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-montserrat font-semibold rounded-bl-lg">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                {/* Icon & Name */}
                <div className="space-y-4">
                  <div
                    className={`h-16 w-16 rounded-2xl ${plan.bgColor} flex items-center justify-center`}
                  >
                    <Icon className={`h-8 w-8 ${plan.color}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-dela text-foreground">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground font-quicksand mt-2">
                      {plan.description}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-dela text-foreground">
                    ₦{price.toLocaleString()}
                  </span>
                  <span className="text-lg text-muted-foreground font-montserrat pb-2">
                    {period}
                  </span>
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full py-6 text-lg font-montserrat ${
                    plan.popular ? "bg-primary hover:bg-primary/90" : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>

                {/* Features List */}
                <div className="space-y-4 pt-6 border-t">
                  <p className="font-montserrat font-semibold text-foreground">
                    What’s included:
                  </p>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-quicksand text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Plans;
