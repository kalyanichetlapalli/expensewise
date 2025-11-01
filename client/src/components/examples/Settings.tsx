import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "../theme-provider";
import Settings from "@/pages/settings";

export default function SettingsExample() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <Settings />
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}
