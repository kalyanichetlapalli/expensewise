import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import logoImage from "@assets/Gemini_Generated_Image_gg73flgg73flgg73_1762001408809.png";

export default function Login() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      setLocation('/');
    }
  }, [isAuthenticated, setLocation]);

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

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 from-primary to-primary/80 text-[#92bfb4] bg-[#ffffff]" />
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-8">
            <img 
              src={logoImage} 
              alt="Expense Wise Logo" 
              className="w-48 h-48 object-contain"
              data-testid="img-logo-large"
            />
          </div>
          <p className="text-xl text-primary-foreground/90 max-w-md">
            Take control of your finances. Track expenses, manage budgets, and achieve your financial goals.
          </p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <div className="flex lg:hidden justify-center mb-6">
              <img 
                src={logoImage} 
                alt="Expense Wise Logo" 
                className="w-16 h-16 object-contain"
                data-testid="img-logo-mobile"
              />
            </div>
            <h2 className="text-3xl font-bold">Welcome to Expense Wise</h2>
            <p className="text-muted-foreground mt-2">Sign in to manage your finances</p>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={() => loginWithRedirect()} 
              className="w-full"
              size="lg"
              data-testid="button-login"
            >
              Sign In with Auth0
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <Button 
              onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } })} 
              variant="outline"
              className="w-full"
              size="lg"
              data-testid="button-signup"
            >
              Create New Account
            </Button>
          </div>

          <div className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <a 
              href="/register" 
              className="text-primary hover:underline" 
              data-testid="link-register"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
