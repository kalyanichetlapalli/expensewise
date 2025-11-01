import { useState } from "react";
import { Plus, Edit2, Trash2, ShoppingBag, Coffee, Car, Home, Heart, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

const iconOptions = [
  { name: "Shopping", icon: ShoppingBag },
  { name: "Coffee", icon: Coffee },
  { name: "Car", icon: Car },
  { name: "Home", icon: Home },
  { name: "Heart", icon: Heart },
  { name: "Smartphone", icon: Smartphone },
];

const colorOptions = [
  { name: "Blue", value: "hsl(var(--chart-1))" },
  { name: "Green", value: "hsl(var(--chart-2))" },
  { name: "Yellow", value: "hsl(var(--chart-3))" },
  { name: "Emerald", value: "hsl(var(--chart-4))" },
  { name: "Pink", value: "hsl(var(--chart-5))" },
];

//todo: remove mock data
const initialCategories = [
  { id: 1, name: "Food & Dining", icon: "Coffee", color: "hsl(var(--chart-1))" },
  { id: 2, name: "Transportation", icon: "Car", color: "hsl(var(--chart-2))" },
  { id: 3, name: "Shopping", icon: "Shopping", color: "hsl(var(--chart-3))" },
  { id: 4, name: "Entertainment", icon: "Heart", color: "hsl(var(--chart-4))" },
  { id: 5, name: "Bills", icon: "Home", color: "hsl(var(--chart-5))" },
];

export default function Categories() {
  const [categories, setCategories] = useState(initialCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", icon: "Shopping", color: colorOptions[0].value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id ? { ...cat, ...formData } : cat
      ));
      console.log('Category updated:', formData);
    } else {
      const newCategory = { id: Date.now(), ...formData };
      setCategories([...categories, newCategory]);
      console.log('Category created:', formData);
    }
    setIsDialogOpen(false);
    setEditingCategory(null);
    setFormData({ name: "", icon: "Shopping", color: colorOptions[0].value });
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setFormData({ name: category.name, icon: category.icon, color: category.color });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
    console.log('Category deleted:', id);
  };

  const getIcon = (iconName: string) => {
    const iconOption = iconOptions.find(opt => opt.name === iconName);
    return iconOption ? iconOption.icon : ShoppingBag;
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Categories</h1>
          <p className="text-muted-foreground">Manage your expense categories</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingCategory(null);
                setFormData({ name: "", icon: "Shopping", color: colorOptions[0].value });
              }}
              data-testid="button-add-category"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
              <DialogDescription>
                {editingCategory ? 'Update the category details below.' : 'Create a new expense category.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Groceries"
                    required
                    data-testid="input-category-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="icon">Icon</Label>
                  <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                    <SelectTrigger id="icon" data-testid="select-icon">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => (
                        <SelectItem key={option.name} value={option.name}>
                          <div className="flex items-center gap-2">
                            <option.icon className="w-4 h-4" />
                            {option.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                    <SelectTrigger id="color" data-testid="select-color">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: option.value }} />
                            {option.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" data-testid="button-save-category">
                  {editingCategory ? 'Update' : 'Create'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => {
          const Icon = getIcon(category.icon);
          return (
            <Card key={category.id} className="group relative overflow-visible hover-elevate">
              <CardContent className="p-6 text-center">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: category.color }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-medium text-sm" data-testid={`text-category-${category.id}`}>{category.name}</p>
                <div className="flex items-center justify-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEdit(category)}
                    data-testid={`button-edit-${category.id}`}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(category.id)}
                    data-testid={`button-delete-${category.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
