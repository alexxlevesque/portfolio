'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/experience', label: 'Experience' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/book-reviews', label: 'Book Reviews' },
  ];

  return (
    <nav className="fixed top-6 right-6 z-50">
      <div className="bg-white/80 dark:bg-navy-800/80 backdrop-blur-lg rounded-full border border-navy-200 dark:border-navy-700 px-4 py-2 shadow-lg transition-all duration-500 ease-in-out">
        <div className="flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                pathname === item.href
                  ? 'bg-blue-600 text-white'
                  : 'text-navy-700 dark:text-blue-200 hover:bg-navy-100 dark:hover:bg-navy-700 hover:text-navy-900 dark:hover:text-blue-100'
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