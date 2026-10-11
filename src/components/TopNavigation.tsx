'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', numeral: 'I' },
    { href: '/projects', label: 'Projects', numeral: 'II' },
    { href: '/library', label: 'Notes', numeral: 'III' },
  ];

  return (
    <nav className="flex flex-wrap items-baseline gap-x-6 gap-y-2 plate-label">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={pathname === item.href ? 'page' : undefined}
          className={`px-1 transition-colors duration-150 ${pathname === item.href
            ? 'bg-ink-yellow/80'
            : 'hover:bg-ink-yellow/50'
            }`}
        >
          <span className="text-ink-rose">{item.numeral}.</span> {item.label}
        </Link>
      ))}
    </nav>
  );
} 