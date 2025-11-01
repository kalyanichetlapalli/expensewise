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
  { id: 1, category: "Food & Dining", budget: 1000, spent: 750 },
  { id: 2, category: "Transportation", budget: 500, spent: 320 },
  { id: 3, category: "Shopping", budget: 800, spent: 890 },
  { id: 4, category: "Entertainment", budget: 400, spent: 250 },
  { id: 5, category: "Bills", budget: 1500, spent: 1500 },
];

//todo: remove mock data
const categories = ["Food & Dining", "Transportation", "Shopping", "Entertainment", "Bills", "Health"];

export default function Budgets() {
  const [budgets, setBudgets] = useState(initialBudgets);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<any>(null);
  const [formData, setFormData] = useState({ category: "", budget: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const budgetAmount = parseFloat(formData.budget);
    if (editingBudget) {
      setBudgets(budgets.map(b =>
        b.id === editingBudget.id ? { ...b, category: formData.category, budget: budgetAmount } : b
      ));
      console.log('Budget updated:', formData);
    } else {
      const newBudget = { id: Date.now(), category: formData.category, budget: budgetAmount, spent: 0 };
      setBudgets([...budgets, newBudget]);
      console.log('Budget created:', formData);
    }
    setIsDialogOpen(false);
    setEditingBudget(null);
    setFormData({ category: "", budget: "" });
  };

  const handleEdit = (budget: any) => {
    setEditingBudget(budget);
    setFormData({ category: budget.category, budget: budget.budget.toString() });
    setIsDialogOpen(true);
  };

  const getProgressColor = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 100) return "bg-destructive";
    if (percentage >= 80) return "bg-chart-3";
    return "bg-chart-2";
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
                setFormData({ category: "", budget: "" });
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
                  <Label htmlFor="budget">Budget Amount ($)</Label>
                  <Input
                    id="budget"
                    type="number"
                    step="0.01"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="1000.00"
                    required
                    data-testid="input-budget-amount"
                  />
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
          const percentage = (budget.spent / budget.budget) * 100;
          const remaining = budget.budget - budget.spent;
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
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    ${budget.spent.toFixed(2)} of ${budget.budget.toFixed(2)}
                  </span>
                  <span className={`font-semibold ${remaining < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {remaining >= 0 ? `$${remaining.toFixed(2)} left` : `$${Math.abs(remaining).toFixed(2)} over`}
                  </span>
                </div>
                <div className="space-y-2">
                  <Progress value={Math.min(percentage, 100)} className="h-3" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{percentage.toFixed(1)}% used</span>
                    {percentage >= 100 && (
                      <span className="text-destructive font-medium">Budget exceeded!</span>
                    )}
                    {percentage >= 80 && percentage < 100 && (
                      <span className="text-chart-3 font-medium">Approaching limit</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
