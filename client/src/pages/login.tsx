import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoImage from "@assets/Gemini_Generated_Image_gg73flgg73flgg73_1762001408809.png";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 from-primary to-primary/80 text-[#ffffff] bg-[#92bfb4]" />
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
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-muted-foreground mt-2">Sign in to your Expense Wise account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                data-testid="input-email"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-sm text-primary hover:underline"
                  data-testid="link-forgot-password"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                data-testid="input-password"
              />
            </div>
            <Button type="submit" className="w-full" data-testid="button-login">
              Sign In
            </Button>
          </form>

          <div className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <a href="/register" className="text-primary hover:underline" data-testid="link-register">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
