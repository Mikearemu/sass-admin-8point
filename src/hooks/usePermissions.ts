import { useState } from "react";

// Mock user plans
const USER_PLANS = {
  free: ["/", "/plans", "/pos", "/store"],
  business: [
    "/",
    "/plans",
    "/pos",
    "/store",
    "/pay",
    "/wallet",
    "/lms",
    "/ai",
    "/chat",
    "/marketing",
  ],
  enterprise: ["*"],
};

export const usePermissions = () => {
  const [userPlan] = useState<"free" | "business" | "enterprise">("business");

  const hasAccess = (path: string) => {
    if (USER_PLANS[userPlan].includes("*")) {
      return true;
    }
    return USER_PLANS[userPlan].includes(path);
  };

  return { hasAccess, userPlan };
};
