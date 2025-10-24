import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import POS from "./pages/POS";
import Pay from "./pages/Pay";
import Wallet from "./pages/Wallet";
import LMS from "./pages/LMS";
import Store from "./pages/Store";
import AI from "./pages/AI";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import Plans from "./pages/Plans";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";
import POSProducts from "./pages/pos/Products";
import POSReports from "./pages/pos/Reports";
import POSCategories from "./pages/pos/Categories";
import POSInventory from "./pages/pos/Inventory";
import POSCustomers from "./pages/pos/Customers";
import POSSalesHistory from "./pages/pos/SalesHistory";
import POSDiscounts from "./pages/pos/Discounts";
import POSSuppliers from "./pages/pos/Suppliers";
import POSPurchases from "./pages/pos/Purchases";
import POSReturns from "./pages/pos/Returns";
import POSProductTypes from "./pages/pos/ProductTypes";
import PayInvoices from "./pages/pay/Invoices";
import PayBillPayments from "./pages/pay/BillPayments";
import WalletTransactions from "./pages/wallet/Transactions";
import LMSStudents from "./pages/lms/Students";
import LMSProgress from "./pages/lms/Progress";
import StoreOrders from "./pages/store/Orders";
import StoreAnalytics from "./pages/store/Analytics";
import AIAutomations from "./pages/ai/Automations";
import ChatChannels from "./pages/chat/Channels";
import SettingsUsers from "./pages/settings/Users";
import SettingsSecurity from "./pages/settings/Security";
import SettingsIntegrations from "./pages/settings/Integrations";
import SettingsPaymentGateways from "./pages/settings/PaymentGateways";
import Marketing from "./pages/Marketing";
import Accounting from "./pages/Accounting";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pos" element={<POS />} />
            <Route path="/pos/products" element={<POSProducts />} />
            <Route path="/pos/reports" element={<POSReports />} />
            <Route path="/pos/categories" element={<POSCategories />} />
            <Route path="/pos/inventory" element={<POSInventory />} />
            <Route path="/pos/customers" element={<POSCustomers />} />
            <Route path="/pos/sales-history" element={<POSSalesHistory />} />
            <Route path="/pos/discounts" element={<POSDiscounts />} />
            <Route path="/pos/suppliers" element={<POSSuppliers />} />
            <Route path="/pos/purchases" element={<POSPurchases />} />
            <Route path="/pos/returns" element={<POSReturns />} />
            <Route path="/pos/product-types" element={<POSProductTypes />} />
            <Route path="/pay" element={<Pay />} />
            <Route path="/pay/invoices" element={<PayInvoices />} />
            <Route path="/pay/bill-payments" element={<PayBillPayments />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/wallet/transactions" element={<WalletTransactions />} />
            <Route path="/lms" element={<LMS />} />
            <Route path="/lms/students" element={<LMSStudents />} />
            <Route path="/lms/progress" element={<LMSProgress />} />
            <Route path="/store" element={<Store />} />
            <Route path="/store/orders" element={<StoreOrders />} />
            <Route path="/store/analytics" element={<StoreAnalytics />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/ai/automations" element={<AIAutomations />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/channels" element={<ChatChannels />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/users" element={<SettingsUsers />} />
            <Route path="/settings/security" element={<SettingsSecurity />} />
            <Route path="/settings/integrations" element={<SettingsIntegrations />} />
            <Route path="/settings/payment-gateways" element={<SettingsPaymentGateways />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/accounting" element={<Accounting />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
