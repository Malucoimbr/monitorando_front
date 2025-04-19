
import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { UserRole } from "@/types";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: UserRole;
  title?: string;
}

export function DashboardLayout({ children, userRole, title }: DashboardLayoutProps) {
  const mockUser = {
    name: "João Silva",
    email: "joao.silva@email.com",
    avatar: ""
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar userRole={userRole} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader title={title} user={mockUser} />
          <DashboardContent>
            {children}
          </DashboardContent>
        </div>
      </div>
    </SidebarProvider>
  );
}
