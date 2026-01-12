'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'home' },
    { href: '/experience', label: 'experience' },
    { href: '/projects', label: 'projects' },
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
              className={`px-3 py-1.5 rounded-md font-medium tracking-tight transition-all duration-200 ${pathname === item.href
                  ? 'text-isabelline bg-ultra-violet/30'
                  : 'text-pale-dogwood hover:text-isabelline hover:bg-ultra-violet/20'
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