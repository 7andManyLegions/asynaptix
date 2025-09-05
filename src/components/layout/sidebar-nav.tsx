
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { LayoutGrid, Wrench, Package, Link2, CaseUpper, FolderKanban, KeyRound, TrendingUp, Inbox } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const navItems = [
  { href: '/discover', label: 'Discover', icon: LayoutGrid, auth: false },
  { href: '/requests', label: 'Requests', icon: Inbox, auth: false },
  { href: '/marketplace', label: 'Tools & Plugins', icon: CaseUpper, auth: false },
  { href: '/build', label: 'Agent Builder', icon: Wrench, auth: false },
  { href: '/link-agents', label: 'Link Agents', icon: Link2, auth: true },
  { href: '/my-agents', label: 'My Agents', icon: FolderKanban, auth: true },
  { href: '/entrepreneurs', label: 'Entrepreneurs', icon: TrendingUp, auth: true },
  { href: '/api-keys', label: 'API Keys', icon: KeyRound, auth: true },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        // With simulated auth, we can just treat the user as always logged in.
        // The original logic is kept here but commented for easy restoration.
        // const isAuthProtected = item.auth;
        // const isDisabled = isAuthProtected && !user && !loading;
        const isDisabled = false;

        const button = (
          <SidebarMenuButton
            isActive={!isDisabled && pathname.startsWith(item.href) && (item.href !== '/' || pathname === '/')}
            tooltip={item.label}
            disabled={isDisabled}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </SidebarMenuButton>
        );

        return (
          <SidebarMenuItem key={item.href}>
            {isDisabled ? (
              <div className="cursor-not-allowed">{button}</div>
            ) : (
              <Link href={item.href} passHref>
                {button}
              </Link>
            )}
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
