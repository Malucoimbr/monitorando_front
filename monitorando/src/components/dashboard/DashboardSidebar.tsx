import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { UserRole, SidebarItem } from "@/types";
import {
  BookOpen,
  Calendar,
  ChevronRight,
  GraduationCap,
  HelpCircle,
  Home,
  LayoutGrid,
  LogOut,
  MessageSquare,
  School,
  Settings,
  Users,
  Gauge,
  ClipboardList,
  FileText,
  History,
  UserCheck,
  ListChecks,
  PlusCircle,
  Backpack,
  User,
  ListFilter,
  Bell,
  Activity,
  Building2,
  FolderPlus,
  PenSquare,
  FolderX,
  UserPlus,
  UserMinus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface DashboardSidebarProps {
  userRole: UserRole;
}

export function DashboardSidebar({ userRole }: DashboardSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const studentMenuItems: SidebarItem[] = [
    {
      title: "Início",
      icon: Home,
      path: "/dashboard/student",
      role: ["STUDENT"],
    },
    {
      title: "Minhas Turmas",
      icon: BookOpen,
      path: "/dashboard/student/classes",
      role: ["STUDENT"],
    },
    {
      title: "Monitores Disponíveis",
      icon: School,
      path: "/dashboard/student/monitors",
      role: ["STUDENT"],
    },
    {
      title: "Minhas Dúvidas",
      icon: HelpCircle,
      path: "/dashboard/student/questions",
      role: ["STUDENT"],
      badge: 2,
    },
    {
      title: "Agenda",
      icon: Calendar,
      path: "/dashboard/student/schedule",
      role: ["STUDENT"],
    },
    {
      title: "Histórico de Atendimentos",
      icon: History,
      path: "/dashboard/student/history",
      role: ["STUDENT"],
    },
    {
      title: "Trocar Visualização",
      icon: LayoutGrid,
      path: "/dashboard/monitor",
      role: ["STUDENT"],
      badge: "Monitor",
    },
  ];

  const monitorMenuItems: SidebarItem[] = [
    {
      title: "Início",
      icon: Home,
      path: "/dashboard/monitor",
      role: ["monitor"],
    },
    {
      title: "Dúvidas",
      icon: HelpCircle,
      path: "/dashboard/monitor/questions",
      role: ["monitor"],
      badge: 5,
    },
    {
      title: "Agenda",
      icon: Calendar,
      path: "/dashboard/monitor/schedule",
      role: ["monitor"],
    },
    {
      title: "Feedbacks Recebidos",
      icon: Gauge,
      path: "/dashboard/monitor/feedbacks",
      role: ["monitor"],
    },
    {
      title: "Trocar Visualização",
      icon: LayoutGrid,
      path: "/dashboard/student",
      role: ["monitor"],
      badge: "Aluno",
    },
  ];

  const professorMenuItems: SidebarItem[] = [
    {
      title: "Início",
      icon: Home,
      path: "/dashboard/professor",
      role: ["professor"],
    },
    {
      title: "Turmas",
      icon: BookOpen,
      path: "/dashboard/professor/classes",
      role: ["professor"],
    },
    {
      title: "Agenda",
      icon: Calendar,
      path: "/dashboard/professor/schedule",
      role: ["professor"],
    },
    {
      title: "Feedbacks",
      icon: Gauge,
      path: "/dashboard/professor/feedbacks",
      role: ["professor"],
    },
  ];

  const communMenuItems: SidebarItem[] = [
    {
      title: "Configurações",
      icon: Settings,
      path: "/dashboard/settings",
      role: ["STUDENT", "professor", "monitor"],
    },
  ];

  const getMenuItems = () => {
    switch (userRole) {
      case "STUDENT":
        return studentMenuItems;
      case "monitor":
        return monitorMenuItems;
      case "professor":
        return professorMenuItems;
      default:
        return [];
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const userRoleLabel = () => {
    switch (userRole) {
      case "STUDENT":
        return "Aluno";
      case "monitor":
        return "Monitor";
      case "professor":
        return "Professor";
      default:
        return "";
    }
  };

  const userRoleIcon = () => {
    switch (userRole) {
      case "STUDENT":
        return <GraduationCap className='h-4 w-4' />;
      case "monitor":
        return <School className='h-4 w-4' />;
      case "professor":
        return <BookOpen className='h-4 w-4' />;
      default:
        return null;
    }
  };

  const handleMenuItemClick = (path: string) => {
    if (path.startsWith("/dashboard")) {
      navigate(path);
    } else {
      toast({
        title: "Funcionalidade em desenvolvimento",
        description: "Esta área será implementada em breve.",
        variant: "default",
      });
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Você saiu com sucesso do sistema.",
      variant: "default",
    });
    navigate("/role-selection");
  };

  return (
    <Sidebar>
      <SidebarHeader className='flex items-center px-4'>
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <Logo />
        </div>
        <Badge
          variant='outline'
          className='ml-2 flex items-center gap-1 text-xs'
        >
          {userRoleIcon()}
          {userRoleLabel()}
        </Badge>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {getMenuItems().map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    isActive={isActive(item.path)}
                    onClick={() => handleMenuItemClick(item.path)}
                  >
                    <div className='flex items-center w-full'>
                      <item.icon className='mr-2 h-4 w-4' />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant='default'
                          className='ml-auto bg-monitorando-500'
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Comunicação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {communMenuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    isActive={isActive(item.path)}
                    onClick={() => handleMenuItemClick(item.path)}
                  >
                    <div className='flex items-center w-full'>
                      <item.icon className='mr-2 h-4 w-4' />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant='default'
                          className='ml-auto bg-monitorando-500'
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className='px-3 py-2'>
          <button
            onClick={handleLogout}
            className='flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-muted-foreground rounded-md transition-colors hover:text-foreground hover:bg-accent'
          >
            <div className='flex items-center'>
              <LogOut className='mr-2 h-4 w-4' />
              <span>Logout</span>
            </div>
            <ChevronRight className='h-4 w-4' />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
