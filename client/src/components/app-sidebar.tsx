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
import logoImage from "@assets/Gemini_Generated_Image_gg73flgg73flgg73_1762001408809.png";

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
        <div className="flex items-center gap-3">
          <img 
            src={logoImage} 
            alt="Expense Wise Logo" 
            className="w-10 h-10 object-contain"
            data-testid="img-logo"
          />
          <div className="flex flex-col">
            <span className="text-lg font-semibold">Expense Wise</span>
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
