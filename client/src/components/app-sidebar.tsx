import {
  LayoutDashboard,
  FolderOpen,
  Wallet,
  PlusCircle,
  TrendingUp,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import { useLocation } from "wouter";
import { useAuth0 } from '@auth0/auth0-react';
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
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  const { user, logout } = useAuth0();

  const handleLogout = () => {
    logout({ 
      logoutParams: {
        returnTo: window.location.origin 
      }
    });
  };

  const getUserInitials = () => {
    if (!user?.name && !user?.email) return 'U';
    const displayName = user?.name || user?.email || 'User';
    const names = displayName.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return displayName[0].toUpperCase();
  };

  const getDisplayName = () => {
    if (user?.name) return user.name;
    if (user?.email) {
      // Extract text before @ from email
      return user.email.split('@')[0];
    }
    return 'User';
  };

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
      <SidebarFooter className="p-4 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-accent transition-colors">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.picture} alt={getDisplayName()} />
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium truncate">{getDisplayName()}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{getDisplayName()}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} data-testid="button-logout">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
