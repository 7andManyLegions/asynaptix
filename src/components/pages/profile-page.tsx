
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Save, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
    const { toast } = useToast();

    const handleSaveChanges = () => {
        toast({
            title: 'Profile Updated',
            description: 'Your profile information has been saved.',
        });
    };
    
    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight font-headline">My Profile</h1>
                <p className="text-muted-foreground mt-2">
                    Manage your personal information and account settings.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your photo and personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src="https://picsum.photos/100/100" alt="@user" data-ai-hint="person face" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <Button size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                                <Camera className="h-4 w-4" />
                                <span className="sr-only">Change photo</span>
                            </Button>
                        </div>
                        <div className="flex-1 space-y-1">
                            <h2 className="text-xl font-semibold">User Name</h2>
                            <p className="text-sm text-muted-foreground">user@example.com</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="full-name">Full Name</Label>
                            <Input id="full-name" defaultValue="User Name" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" defaultValue="user@example.com" disabled />
                            <p className="text-xs text-muted-foreground">Your email is used for login and cannot be changed.</p>
                        </div>
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
