import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { Footer } from "./Footer";
import { WhatsNewModal } from "./modals/WhatsNewModal";

export const DashboardLayout = () => {
  // On mobile, sidebar starts collapsed (closed)
  // On desktop, sidebar starts expanded (open)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [isWhatsNewModalOpen, setIsWhatsNewModalOpen] = useState(true);

  useEffect(() => {
    // Check if desktop on mount
    const isDesktop = window.innerWidth >= 768;
    setSidebarCollapsed(!isDesktop);
  }, []);

  return (
    <div className="h-screen overflow-hidden flex w-full bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 bg-transparent flex flex-col min-w-0">
        <main className="flex-1 h-screen p-4 md:p-6 lg:p-2 overflow-x-hidden">
          <TopBar  onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)} />
          <Outlet />
          <Footer />
        </main>
      </div>

      {/* <WhatsNewModal isOpen={isWhatsNewModalOpen} onClose={() => setIsWhatsNewModalOpen(false)} /> */}
    </div>
  );
};
