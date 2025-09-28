'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'home' },
    { href: '/experience', label: 'experience' },
    { href: '/blog', label: 'notes' },
  ];

  return (
    <nav className="fixed top-5 right-5 z-50">
      <div className="bg-transparent px-0 py-0">
        <div className="flex items-center space-x-4 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-0 py-0 font-medium tracking-tight ${
                pathname === item.href ? 'text-space-cadet' : 'text-ultra-violet hover:text-space-cadet'
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