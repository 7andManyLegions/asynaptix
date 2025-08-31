
"use client";

import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarRail,
  SidebarInset,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { SidebarNav } from './sidebar-nav';
import { AppHeader } from './header';
import { Bot, Wrench, Package, Shield, LayoutGrid, LifeBuoy, BookOpen, ShieldCheck, Info } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '../ui/sidebar';
import { useAuth } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (pathname === '/login') {
    return <main>{children}</main>;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-semibold font-headline">Asynaptix</h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-2 flex flex-col gap-4">
            <SidebarMenu>
                <SidebarMenuItem>
                    <Link href="/getting-started" passHref>
                        <SidebarMenuButton size="sm" tooltip="Getting Started">
                            <LifeBuoy />
                            <span>Getting Started</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <Link href="#" passHref>
                        <SidebarMenuButton size="sm" tooltip="Resources">
                            <BookOpen />
                            <span>Resources</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <Link href="#" passHref>
                        <SidebarMenuButton size="sm" tooltip="Policies">
                            <ShieldCheck />
                            <span>Policies</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <Link href="#" passHref>
                        <SidebarMenuButton size="sm" tooltip="About Us">
                            <Info />
                            <span>About Us</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarRail />
      <SidebarInset>
        <AppHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
