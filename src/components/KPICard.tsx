import { LucideIcon } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
  onClick?: () => void;
}

export const KPICard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
  onClick,
}: KPICardProps) => {
  return (
    <Card
      className={cn(
        "p-6 hover:shadow-lg transition-all bg-sidebar  duration-300 cursor-pointer group border-2 hover:border-primary/50",
        "animate-fade-in",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-montserrat text-gray-200 mb-2">
            {title}
          </p>
          <h3 className="text-3xl font-dela font-semibold text-sidebar-foreground mb-1">
            {value}
          </h3>
          {subtitle && ( 
            <p className="text-xs font-quicksand text-gray-200">
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={cn(
                  "text-sm font-montserrat font-medium",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}
              >
                {trend.isPositive ? "↑" : "↓"} {trend.value}
              </span>
              <span className="text-xs text-gray-200">vs last period</span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          <div className="h-12 w-12 backdrop-blur-sm rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>
    </Card>
  );
};
