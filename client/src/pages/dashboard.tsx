import { DollarSign, TrendingUp, TrendingDown, Wallet, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

//todo: remove mock data
const monthlyData = [
  { month: "Jan", amount: 2400 },
  { month: "Feb", amount: 1398 },
  { month: "Mar", amount: 3800 },
  { month: "Apr", amount: 3908 },
  { month: "May", amount: 4800 },
  { month: "Jun", amount: 3800 },
];

//todo: remove mock data
const categoryData = [
  { name: "Food & Dining", value: 2400, color: "hsl(var(--chart-1))" },
  { name: "Transportation", value: 1200, color: "hsl(var(--chart-2))" },
  { name: "Shopping", value: 1800, color: "hsl(var(--chart-3))" },
  { name: "Entertainment", value: 900, color: "hsl(var(--chart-4))" },
  { name: "Bills", value: 1500, color: "hsl(var(--chart-5))" },
];

//todo: remove mock data
const recentExpenses = [
  { id: 1, category: "Food & Dining", description: "Grocery shopping", amount: 125.50, date: "2024-11-01", type: "Card" },
  { id: 2, category: "Transportation", description: "Gas station", amount: 45.00, date: "2024-11-01", type: "Cash" },
  { id: 3, category: "Shopping", description: "Amazon order", amount: 89.99, date: "2024-10-31", type: "Card" },
  { id: 4, category: "Entertainment", description: "Movie tickets", amount: 32.00, date: "2024-10-30", type: "Card" },
  { id: 5, category: "Bills", description: "Internet bill", amount: 79.99, date: "2024-10-29", type: "Card" },
];

//todo: remove mock data - budget tracking
const budgetData = [
  { category: "Food & Dining", budget: 1000, spent: 750, monthlyExpense: 650, yearlyExpense: 100 },
  { category: "Transportation", budget: 500, spent: 320, monthlyExpense: 320, yearlyExpense: 0 },
  { category: "Shopping", budget: 800, spent: 1200, monthlyExpense: 400, yearlyExpense: 800 },
  { category: "Bills", budget: 1500, spent: 1650, monthlyExpense: 450, yearlyExpense: 1200 },
  { category: "Entertainment", budget: 400, spent: 250, monthlyExpense: 250, yearlyExpense: 0 },
];

export default function Dashboard() {
  //todo: remove mock functionality
  const totalIncome = 12500;
  const totalExpenses = 7800;
  const remainingBudget = totalIncome - totalExpenses;

  const overBudgetCategories = budgetData.filter(item => item.spent > item.budget);
  const hasOverBudgetItems = overBudgetCategories.length > 0;

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your financial activity</p>
      </div>

      {hasOverBudgetItems && (
        <Card className="border-destructive bg-destructive/5" data-testid="card-budget-alerts">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle className="text-destructive">Budget Alerts</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              The following categories have exceeded their budget limits:
            </p>
            {overBudgetCategories.map((item) => {
              const percentage = (item.spent / item.budget) * 100;
              const overspent = item.spent - item.budget;
              return (
                <div 
                  key={item.category} 
                  className="p-4 rounded-lg border border-destructive/20 bg-card space-y-3"
                  data-testid={`alert-${item.category.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div>
                        <h4 className="font-semibold">{item.category}</h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          {item.monthlyExpense > 0 && (
                            <Badge variant="default" className="text-xs">
                              Monthly: ${item.monthlyExpense}
                            </Badge>
                          )}
                          {item.yearlyExpense > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              Yearly: ${item.yearlyExpense}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        Budget: ${item.budget}
                      </div>
                      <div className="text-lg font-bold text-destructive">
                        Over by ${overspent.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Spent: ${item.spent.toFixed(2)}</span>
                      <span className="text-destructive font-medium">{percentage.toFixed(0)}%</span>
                    </div>
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className="h-2"
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/income">
          <Card className="cursor-pointer hover-elevate active-elevate-2" data-testid="card-total-income">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold font-mono" data-testid="text-total-income">
                ${totalIncome.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-chart-2" />
                <span>+12.5% from last month</span>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/expenses">
          <Card className="cursor-pointer hover-elevate active-elevate-2" data-testid="card-total-expenses">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold font-mono" data-testid="text-total-expenses">
                ${totalExpenses.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <TrendingDown className="h-3 w-3 text-destructive" />
                <span>+8.2% from last month</span>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold font-mono" data-testid="text-remaining-budget">
              ${remainingBudget.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <span>{((remainingBudget / totalIncome) * 100).toFixed(1)}% of income</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.375rem",
                  }}
                />
                <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.375rem",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border hover-elevate"
                data-testid={`expense-item-${expense.id}`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{expense.description}</span>
                    <Badge variant="outline" className="text-xs">
                      {expense.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{expense.date}</span>
                    <span>•</span>
                    <span>{expense.type}</span>
                  </div>
                </div>
                <div className="text-xl font-bold font-mono">
                  ${expense.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
