'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'home' },
    { href: '/projects', label: 'projects' },
    { href: '/library', label: 'library' },
    { href: '/music', label: 'music' },
  ];

  return (
    <nav className="absolute top-5 left-5 z-50">
      <div className="bg-transparent px-0 py-0">
        <div className="flex items-center space-x-4 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 rounded-md font-medium tracking-tight transition-all duration-200 ${pathname === item.href
                ? 'text-white bg-steel_blue shadow-md shadow-steel_blue/20'
                : 'text-space_cadet/70 hover:text-steel_blue hover:bg-steel_blue/5'
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