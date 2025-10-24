import { LucideIcon } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface ModuleCardProps {
  title: string;
  modulePath: string;
  description?: string;
  icon: LucideIcon;
  className?: string;
  onClick?: () => void;
  cta?: string;
}

export const ModuleCard = ({
  title,
  description,
  modulePath,
  icon: Icon,
  className,
  onClick,
  cta,
}: ModuleCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    else navigate(modulePath);
  };

  return (
    <Card
      onClick={handleClick}
      className={cn(
        "p-6  border border-primary/50 rounded-2xl ",
        "hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
      )}
    >
      <div className="flex flex-col justify-between h-full space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/20">
              <Icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
            </div>
            <h3 className="text-normal leading-2 font-dela text-foreground">
              {title}
            </h3>
          </div>

         
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground font-montserrat leading-snug">
            {description}
          </p>
        )}

        {/* CTA */}
        {cta && (
          <Button
            variant="classic"
            className="w-fit mt-2 font-montserrat group-hover:bg-primary/90 transition-all"
          >
            {cta}
          </Button>
        )}
      </div>
    </Card>
  );
};
