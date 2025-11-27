import { Switch, Route, useLocation } from "wouter";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { queryClient, setAccessTokenGetter } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { AppSidebar } from "@/components/app-sidebar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Dashboard from "@/pages/dashboard";
import Categories from "@/pages/categories";
import Budgets from "@/pages/budgets";
import Expenses from "@/pages/expenses";
import Income from "@/pages/income";
import Settings from "@/pages/settings";
import Login from "@/pages/login";
import Register from "@/pages/register";
import NotFound from "@/pages/not-found";

function AuthRouter() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
}

function MainRouter() {
  return (
    <ProtectedRoute>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/categories" component={Categories} />
        <Route path="/budgets" component={Budgets} />
        <Route path="/expenses" component={Expenses} />
        <Route path="/income" component={Income} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </ProtectedRoute>
  );
}

function AppContent() {
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const [location] = useLocation();
  const isAuthPage = location === "/login" || location === "/register";

  // Set up the access token getter for API calls
  useEffect(() => {
    setAccessTokenGetter(getAccessTokenSilently);
  }, [getAccessTokenSilently]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  if (isAuthPage) {
    return <AuthRouter />;
  }

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-auto">
            <MainRouter />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AppContent />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
