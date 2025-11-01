import { useState } from "react";
import { User, Lock, DollarSign, Mail, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";

const currencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD"];

export default function Settings() {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [currency, setCurrency] = useState("USD");
  const [connectedEmails, setConnectedEmails] = useState<Array<{ provider: string; email: string; connected: boolean }>>([
    { provider: "Gmail", email: "", connected: false },
    { provider: "Outlook", email: "", connected: false },
  ]);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', profileData);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    console.log('Password changed');
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
    setPasswordData({ current: "", new: "", confirm: "" });
  };

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
    console.log('Currency changed to:', value);
    toast({
      title: "Currency Updated",
      description: `Currency preference set to ${value}.`,
    });
  };

  const handleEmailConnect = (provider: string) => {
    console.log(`Connecting to ${provider}...`);
    const emailAddress = prompt(`Enter your ${provider} email address:`);
    if (emailAddress) {
      setConnectedEmails(connectedEmails.map(item =>
        item.provider === provider
          ? { ...item, email: emailAddress, connected: true }
          : item
      ));
      toast({
        title: "Email Connected",
        description: `Successfully connected ${emailAddress} (${provider})`,
      });
    }
  };

  const handleEmailDisconnect = (provider: string) => {
    setConnectedEmails(connectedEmails.map(item =>
      item.provider === provider
        ? { ...item, email: "", connected: false }
        : item
    ));
    console.log(`Disconnected ${provider}`);
    toast({
      title: "Email Disconnected",
      description: `${provider} account has been disconnected.`,
    });
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="max-w-3xl space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <CardTitle>Profile Information</CardTitle>
            </div>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  data-testid="input-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  data-testid="input-email"
                />
              </div>
              <Button type="submit" data-testid="button-update-profile">
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              <CardTitle>Change Password</CardTitle>
            </div>
            <CardDescription>Update your password to keep your account secure</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={passwordData.current}
                  onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                  data-testid="input-current-password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={passwordData.new}
                  onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                  data-testid="input-new-password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwordData.confirm}
                  onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                  data-testid="input-confirm-password"
                />
              </div>
              <Button type="submit" data-testid="button-change-password">
                Change Password
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              <CardTitle>Currency Preferences</CardTitle>
            </div>
            <CardDescription>Select your preferred currency for displaying amounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="currency">Default Currency</Label>
              <Select value={currency} onValueChange={handleCurrencyChange}>
                <SelectTrigger id="currency" data-testid="select-currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((curr) => (
                    <SelectItem key={curr} value={curr}>
                      {curr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <CardTitle>Email Account Connections</CardTitle>
            </div>
            <CardDescription>Connect your email accounts to sync and manage expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {connectedEmails.map((emailAccount) => (
                <div
                  key={emailAccount.provider}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{emailAccount.provider}</p>
                        {emailAccount.connected && (
                          <Badge variant="outline" className="gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Connected
                          </Badge>
                        )}
                      </div>
                      {emailAccount.connected && emailAccount.email && (
                        <p className="text-sm text-muted-foreground">{emailAccount.email}</p>
                      )}
                      {!emailAccount.connected && (
                        <p className="text-sm text-muted-foreground">
                          Not connected
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    {emailAccount.connected ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEmailDisconnect(emailAccount.provider)}
                        data-testid={`button-disconnect-${emailAccount.provider.toLowerCase()}`}
                      >
                        Disconnect
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleEmailConnect(emailAccount.provider)}
                        data-testid={`button-connect-${emailAccount.provider.toLowerCase()}`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the app looks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
              </div>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
