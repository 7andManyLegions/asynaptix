'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { LayoutGrid, Wrench, Package, Link2, CaseUpper, FolderKanban, KeyRound } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Discover', icon: LayoutGrid },
  { href: '/marketplace', label: 'Tools & Plugins', icon: CaseUpper },
  { href: '/build', label: 'Agent Builder', icon: Wrench },
  { href: '/link-agents', label: 'Link Agents', icon: Link2 },
  { href: '/my-agents', label: 'My Agents', icon: FolderKanban },
  { href: '/api-keys', label: 'API Keys', icon: KeyRound },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref>
            <SidebarMenuButton
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
