'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/library', label: 'Notes' },
  ];

  return (
    <nav className="absolute top-5 left-5 z-50">
      <div className="bg-transparent px-0 py-0">
        <div className="flex items-center space-x-2 font-mono text-sm font-bold uppercase tracking-wider">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 transition-colors duration-150 ${pathname === item.href
                ? 'text-paper bg-ink-blue shadow-plate-sm'
                : 'text-ink-blue hover:bg-ink-yellow'
                }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
} 