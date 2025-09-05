
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
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { SidebarNav } from './sidebar-nav';
import { AppHeader } from './header';
import { Bot, Wrench, Package, Shield, LayoutGrid, LifeBuoy, BookOpen, ShieldCheck, Info, ChevronsLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useAuth } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useSidebar } from '@/components/ui/sidebar';

function SidebarCollapseButton() {
    const { setOpen, open } = useSidebar();
    return (
        <Button
            variant="ghost"
            size="icon"
            className="w-full justify-center text-sidebar-foreground/70 hover:text-sidebar-foreground"
            onClick={() => setOpen(!open)}
        >
            <ChevronsLeft className={`h-5 w-5 transition-transform duration-300 ${!open ? 'rotate-180' : ''}`} />
        </Button>
    )
}


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
          <Link href="/" className="flex items-center gap-2.5">
          <Image
              src="/images/logo.svg"
              alt="Asynaptix Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <div className="flex flex-col">
                <h1 className="text-xl font-bold font-headline tracking-tight">Asynaptix</h1>
                <p className="text-xs text-muted-foreground">Agentic AI Ecosystem</p>
            </div>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-2 flex flex-col gap-2">
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
            <div className="border-t border-sidebar-border -mx-2 my-2" />
            <SidebarCollapseButton />
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
