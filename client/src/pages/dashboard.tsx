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
  { category: "Food & Dining", monthlyBudget: 1000, yearlyBudget: 500, monthlySpent: 750, yearlySpent: 100 },
  { category: "Transportation", monthlyBudget: 500, yearlyBudget: 0, monthlySpent: 320, yearlySpent: 0 },
  { category: "Shopping", monthlyBudget: 600, yearlyBudget: 1000, monthlySpent: 400, yearlySpent: 1200 },
  { category: "Bills", monthlyBudget: 600, yearlyBudget: 1500, monthlySpent: 750, yearlySpent: 1800 },
  { category: "Entertainment", monthlyBudget: 400, yearlyBudget: 0, monthlySpent: 250, yearlySpent: 0 },
];

export default function Dashboard() {
  //todo: remove mock functionality
  const totalIncome = 12500;
  const totalExpenses = 7800;
  const remainingBudget = totalIncome - totalExpenses;

  const overBudgetCategories = budgetData.filter(item => {
    const monthlyOver = item.monthlyBudget > 0 && item.monthlySpent > item.monthlyBudget;
    const yearlyOver = item.yearlyBudget > 0 && item.yearlySpent > item.yearlyBudget;
    return monthlyOver || yearlyOver;
  });
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
              const monthlyOver = item.monthlyBudget > 0 && item.monthlySpent > item.monthlyBudget;
              const yearlyOver = item.yearlyBudget > 0 && item.yearlySpent > item.yearlyBudget;
              
              return (
                <div 
                  key={item.category} 
                  className="p-4 rounded-lg border border-destructive/20 bg-card space-y-4"
                  data-testid={`alert-${item.category.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <h4 className="font-semibold text-lg">{item.category}</h4>
                  </div>
                  
                  {monthlyOver && (
                    <div className="space-y-2 p-3 rounded-md bg-destructive/5 border border-destructive/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="default" className="text-xs">Monthly</Badge>
                          <span className="text-sm font-medium">Budget Exceeded</span>
                        </div>
                        <span className="text-xs text-destructive font-medium">
                          {((item.monthlySpent / item.monthlyBudget) * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Spent: ${item.monthlySpent.toFixed(2)} / ${item.monthlyBudget.toFixed(2)}
                        </span>
                        <span className="font-bold text-destructive">
                          Over by ${(item.monthlySpent - item.monthlyBudget).toFixed(2)}
                        </span>
                      </div>
                      <Progress 
                        value={Math.min((item.monthlySpent / item.monthlyBudget) * 100, 100)} 
                        className="h-2"
                      />
                    </div>
                  )}
                  
                  {yearlyOver && (
                    <div className="space-y-2 p-3 rounded-md bg-destructive/5 border border-destructive/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">Yearly</Badge>
                          <span className="text-sm font-medium">Budget Exceeded</span>
                        </div>
                        <span className="text-xs text-destructive font-medium">
                          {((item.yearlySpent / item.yearlyBudget) * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Spent: ${item.yearlySpent.toFixed(2)} / ${item.yearlyBudget.toFixed(2)}
                        </span>
                        <span className="font-bold text-destructive">
                          Over by ${(item.yearlySpent - item.yearlyBudget).toFixed(2)}
                        </span>
                      </div>
                      <Progress 
                        value={Math.min((item.yearlySpent / item.yearlyBudget) * 100, 100)} 
                        className="h-2"
                      />
                    </div>
                  )}
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
