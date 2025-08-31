import { Badge } from '@/components/ui/badge';
import type { SecurityRating } from '@/lib/data';
import { ShieldCheck, ShieldAlert, Shield, Verified } from 'lucide-react';

interface SecurityBadgeProps {
  rating: SecurityRating;
  showText?: boolean;
}

const ratingConfig = {
  trusted: {
    icon: ShieldCheck,
    text: 'Trusted',
    className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-300 dark:border-green-700',
  },
  verified: {
    icon: Verified,
    text: 'Verified',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-300 dark:border-blue-700',
  },
  scanned: {
    icon: Shield,
    text: 'Scanned',
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700',
  },
  none: {
    icon: ShieldAlert,
    text: 'Unverified',
    className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-300 dark:border-red-700',
  },
};

export function SecurityBadge({ rating, showText = false }: SecurityBadgeProps) {
  if (rating === 'none' && !showText) return null;
  const config = ratingConfig[rating];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={`gap-1.5 ${config.className}`}>
      <Icon className="h-3.5 w-3.5" />
      {showText && <span>{config.text}</span>}
    </Badge>
  );
}
