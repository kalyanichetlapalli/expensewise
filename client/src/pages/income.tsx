import { useState } from "react";
import { Plus, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

//todo: remove mock data
const incomeSources = ["Salary", "Freelance", "Investment", "Business", "Rental", "Gift", "Other"];

type Income = {
  id: string;
  source: string;
  amount: number;
  date: string;
};

const mockIncomes: Income[] = [
  { id: "1", source: "Salary", amount: 5000, date: "2024-11-01" },
  { id: "2", source: "Freelance", amount: 1500, date: "2024-11-10" },
  { id: "3", source: "Investment", amount: 300, date: "2024-10-25" },
  { id: "4", source: "Business", amount: 2000, date: "2024-10-15" },
];

export default function Income() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
  });
  const [incomes] = useState<Income[]>(mockIncomes);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSource, setFilterSource] = useState("all");
  const [filterPeriod, setFilterPeriod] = useState("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Income added:', formData);
    toast({
      title: "Income Recorded",
      description: `$${formData.amount} from ${formData.source}`,
    });
    setFormData({
      source: "",
      amount: "",
      date: new Date().toISOString().split('T')[0],
    });
    setIsDialogOpen(false);
  };

  const filteredIncomes = incomes.filter((income) => {
    const matchesSource = filterSource === "all" || income.source === filterSource;
    const matchesSearch = income.source.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesPeriod = true;
    if (filterPeriod !== "all") {
      const incomeDate = new Date(income.date);
      const now = new Date();
      
      if (filterPeriod === "month") {
        matchesPeriod = incomeDate.getMonth() === now.getMonth() && 
                       incomeDate.getFullYear() === now.getFullYear();
      } else if (filterPeriod === "quarter") {
        const currentQuarter = Math.floor(now.getMonth() / 3);
        const incomeQuarter = Math.floor(incomeDate.getMonth() / 3);
        matchesPeriod = incomeQuarter === currentQuarter && 
                       incomeDate.getFullYear() === now.getFullYear();
      } else if (filterPeriod === "year") {
        matchesPeriod = incomeDate.getFullYear() === now.getFullYear();
      }
    }
    
    return matchesSource && matchesSearch && matchesPeriod;
  });

  const totalIncome = filteredIncomes.reduce((sum, income) => sum + income.amount, 0);

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Income</h1>
          <p className="text-muted-foreground">Track your income sources</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-open-add-income">
              <Plus className="w-4 h-4 mr-2" />
              Add Income
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Income</DialogTitle>
              <DialogDescription>
                Record a new income transaction
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="source">Source of Income *</Label>
                  <Select
                    value={formData.source}
                    onValueChange={(value) => setFormData({ ...formData, source: value })}
                    required
                  >
                    <SelectTrigger id="source" data-testid="select-income-source">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      {incomeSources.map((source) => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount ($) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="0.00"
                    required
                    data-testid="input-income-amount"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date Received *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    data-testid="input-income-date"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
                <Button type="submit" data-testid="button-add-income">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Income
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>Income History</CardTitle>
            <div className="text-2xl font-bold text-primary">
              ${totalIncome.toFixed(2)}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by source..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-income"
              />
            </div>

            <Select value={filterSource} onValueChange={setFilterSource}>
              <SelectTrigger className="w-full md:w-48" data-testid="select-filter-source">
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                {incomeSources.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterPeriod} onValueChange={setFilterPeriod}>
              <SelectTrigger className="w-full md:w-48" data-testid="select-filter-period">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIncomes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                      No income records found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredIncomes.map((income) => (
                    <TableRow key={income.id} data-testid={`row-income-${income.id}`}>
                      <TableCell className="font-medium">{income.source}</TableCell>
                      <TableCell className="text-primary font-semibold">
                        ${income.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>{new Date(income.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
