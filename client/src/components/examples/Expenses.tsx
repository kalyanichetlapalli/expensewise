import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import Expenses from "@/pages/expenses";

export default function ExpensesExample() {
  return (
    <TooltipProvider>
      <Expenses />
      <Toaster />
    </TooltipProvider>
  );
}
