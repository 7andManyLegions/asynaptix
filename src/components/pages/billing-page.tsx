
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FileText, CreditCard, Download, ShieldCheck } from 'lucide-react';
import { Badge } from '../ui/badge';
import Image from 'next/image';

export default function BillingPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Billing & Subscriptions</h1>
                <p className="text-muted-foreground mt-2">
                    Manage your subscription, payment methods, and view your billing history.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Current Plan</CardTitle>
                        <CardDescription>You are currently on the Free plan.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-bold">Pro Plan</h3>
                                    <p className="text-muted-foreground font-semibold text-2xl">$29<span className="text-sm font-normal">/month</span></p>
                                    <p className="text-muted-foreground text-sm mt-1">Unlock advanced features and priority support.</p>
                                </div>
                                <Button size="lg">Upgrade to Pro</Button>
                            </CardContent>
                       </Card>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Payment Method</CardTitle>
                        <CardDescription>Your primary payment method.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 rounded-md border p-4">
                            <CreditCard className="h-8 w-8 text-muted-foreground" />
                            <div>
                                <p className="font-medium">No payment method</p>
                                <p className="text-sm text-muted-foreground">Add a card to get started.</p>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full">Add Payment Method</Button>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>Your past invoices and payment details.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="text-center py-10 text-muted-foreground">
                        <FileText className="h-12 w-12 mx-auto mb-2" />
                        <p>No billing history yet.</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                     <CardTitle>Payment Security</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                    <ShieldCheck className="h-10 w-10 text-green-500" />
                    <div>
                        <p className="font-medium">Powered by Stripe Connect</p>
                        <p className="text-sm text-muted-foreground">We partner with Stripe for simplified, secure, and compliant payment processing for our marketplace. Your financial data is encrypted and handled by a PCI-certified auditor.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
