
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
    const { toast } = useToast();
    const { theme, setTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSaveChanges = () => {
        toast({
            title: 'Settings Saved',
            description: 'Your preferences have been updated.',
        });
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Settings</h1>
                <p className="text-muted-foreground mt-2">
                    Customize your application experience and preferences.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Manage how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive updates about your agents and account activity.</p>
                        </div>
                        <Switch id="email-notifications" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label htmlFor="in-app-notifications" className="font-medium">In-App Notifications</Label>
                            <p className="text-sm text-muted-foreground">Get notified directly within the application.</p>
                        </div>
                        <Switch id="in-app-notifications" defaultChecked />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of the application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="theme-select">Theme</Label>
                        {isMounted && (
                          <Select value={theme} onValueChange={setTheme}>
                              <SelectTrigger id="theme-select">
                                  <SelectValue placeholder="Select theme" />
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="light">Light</SelectItem>
                                  <SelectItem value="dark">Dark</SelectItem>
                                  <SelectItem value="system">System</SelectItem>
                              </SelectContent>
                          </Select>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSaveChanges}>
                        <Save className="mr-2 h-4 w-4"/>
                        Save Changes
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
