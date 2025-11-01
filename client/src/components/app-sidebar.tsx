import {
  LayoutDashboard,
  FolderOpen,
  Wallet,
  PlusCircle,
  TrendingUp,
  Settings,
} from "lucide-react";
import { useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: FolderOpen,
  },
  {
    title: "Budgets",
    url: "/budgets",
    icon: Wallet,
  },
  {
    title: "Expenses",
    url: "/expenses",
    icon: PlusCircle,
  },
  {
    title: "Income",
    url: "/income",
    icon: TrendingUp,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-6 border-b">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
            <Wallet className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">Expense Tracker</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`link-${item.title.toLowerCase().replace(' ', '-')}`}
                  >
                    <a href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
