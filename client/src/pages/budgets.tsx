import { useState } from "react";
import { Plus, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//todo: remove mock data
const initialBudgets = [
  { id: 1, category: "Food & Dining", monthlyBudget: 1000, yearlyBudget: 500, monthlySpent: 750, yearlySpent: 100 },
  { id: 2, category: "Transportation", monthlyBudget: 500, yearlyBudget: 0, monthlySpent: 320, yearlySpent: 0 },
  { id: 3, category: "Shopping", monthlyBudget: 600, yearlyBudget: 1000, monthlySpent: 400, yearlySpent: 1200 },
  { id: 4, category: "Entertainment", monthlyBudget: 400, yearlyBudget: 0, monthlySpent: 250, yearlySpent: 0 },
  { id: 5, category: "Bills", monthlyBudget: 600, yearlyBudget: 1500, monthlySpent: 750, yearlySpent: 1800 },
];

//todo: remove mock data
const categories = ["Food & Dining", "Transportation", "Shopping", "Entertainment", "Bills", "Health"];

export default function Budgets() {
  const [budgets, setBudgets] = useState(initialBudgets);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<any>(null);
  const [formData, setFormData] = useState({ category: "", monthlyBudget: "", yearlyBudget: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const monthlyAmount = parseFloat(formData.monthlyBudget) || 0;
    const yearlyAmount = parseFloat(formData.yearlyBudget) || 0;
    if (editingBudget) {
      setBudgets(budgets.map(b =>
        b.id === editingBudget.id ? { 
          ...b, 
          category: formData.category, 
          monthlyBudget: monthlyAmount, 
          yearlyBudget: yearlyAmount,
          monthlySpent: b.monthlySpent || 0,
          yearlySpent: b.yearlySpent || 0
        } : b
      ));
      console.log('Budget updated:', formData);
    } else {
      const newBudget = { 
        id: Date.now(), 
        category: formData.category, 
        monthlyBudget: monthlyAmount, 
        yearlyBudget: yearlyAmount, 
        monthlySpent: 0,
        yearlySpent: 0
      };
      setBudgets([...budgets, newBudget]);
      console.log('Budget created:', formData);
    }
    setIsDialogOpen(false);
    setEditingBudget(null);
    setFormData({ category: "", monthlyBudget: "", yearlyBudget: "" });
  };

  const handleEdit = (budget: any) => {
    setEditingBudget(budget);
    setFormData({ 
      category: budget.category, 
      monthlyBudget: budget.monthlyBudget.toString(), 
      yearlyBudget: budget.yearlyBudget.toString() 
    });
    setIsDialogOpen(true);
  };


  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Budgets</h1>
          <p className="text-muted-foreground">Set and track your spending limits</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingBudget(null);
                setFormData({ category: "", monthlyBudget: "", yearlyBudget: "" });
              }}
              data-testid="button-add-budget"
            >
              <Plus className="w-4 h-4 mr-2" />
              Set Budget
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingBudget ? 'Edit Budget' : 'Set New Budget'}</DialogTitle>
              <DialogDescription>
                {editingBudget ? 'Update the budget limit for this category.' : 'Set a spending limit for a category.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger id="category" data-testid="select-category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyBudget">Monthly Budget ($)</Label>
                  <Input
                    id="monthlyBudget"
                    type="number"
                    step="0.01"
                    value={formData.monthlyBudget}
                    onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
                    placeholder="1000.00"
                    data-testid="input-monthly-budget"
                  />
                  <p className="text-xs text-muted-foreground">Set limit for monthly recurring expenses</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearlyBudget">Yearly Budget ($)</Label>
                  <Input
                    id="yearlyBudget"
                    type="number"
                    step="0.01"
                    value={formData.yearlyBudget}
                    onChange={(e) => setFormData({ ...formData, yearlyBudget: e.target.value })}
                    placeholder="500.00"
                    data-testid="input-yearly-budget"
                  />
                  <p className="text-xs text-muted-foreground">Set limit for yearly recurring expenses</p>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" data-testid="button-save-budget">
                  {editingBudget ? 'Update' : 'Set Budget'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {budgets.map((budget) => {
          const hasMonthlyBudget = budget.monthlyBudget > 0;
          const hasYearlyBudget = budget.yearlyBudget > 0;
          const monthlyPercentage = hasMonthlyBudget ? (budget.monthlySpent / budget.monthlyBudget) * 100 : 0;
          const yearlyPercentage = hasYearlyBudget ? (budget.yearlySpent / budget.yearlyBudget) * 100 : 0;
          const monthlyRemaining = budget.monthlyBudget - budget.monthlySpent;
          const yearlyRemaining = budget.yearlyBudget - budget.yearlySpent;
          
          return (
            <Card key={budget.id} className="overflow-visible">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-lg">{budget.category}</CardTitle>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEdit(budget)}
                    data-testid={`button-edit-budget-${budget.id}`}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {hasMonthlyBudget && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Monthly Budget</span>
                      {monthlyPercentage >= 100 && (
                        <span className="text-xs text-destructive font-medium">Exceeded!</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        ${budget.monthlySpent.toFixed(2)} of ${budget.monthlyBudget.toFixed(2)}
                      </span>
                      <span className={`font-semibold ${monthlyRemaining < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {monthlyRemaining >= 0 ? `$${monthlyRemaining.toFixed(2)} left` : `$${Math.abs(monthlyRemaining).toFixed(2)} over`}
                      </span>
                    </div>
                    <Progress value={Math.min(monthlyPercentage, 100)} className="h-2" />
                  </div>
                )}
                
                {hasYearlyBudget && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Yearly Budget</span>
                      {yearlyPercentage >= 100 && (
                        <span className="text-xs text-destructive font-medium">Exceeded!</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        ${budget.yearlySpent.toFixed(2)} of ${budget.yearlyBudget.toFixed(2)}
                      </span>
                      <span className={`font-semibold ${yearlyRemaining < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {yearlyRemaining >= 0 ? `$${yearlyRemaining.toFixed(2)} left` : `$${Math.abs(yearlyRemaining).toFixed(2)} over`}
                      </span>
                    </div>
                    <Progress value={Math.min(yearlyPercentage, 100)} className="h-2" />
                  </div>
                )}
                
                {!hasMonthlyBudget && !hasYearlyBudget && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No budget set. Click edit to add monthly or yearly budgets.
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
