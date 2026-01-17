'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavigationDock() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-4 md:p-5 pointer-events-none"
    >
      <div
        className="flex gap-2 md:gap-3 bg-[#1A1A1A] border border-[#333333] rounded-xl p-2 shadow-[0_4px_12px_rgba(0,0,0,0.3)] pointer-events-auto"
      >
        <Link
          href="/"
          className="px-4 py-2 md:px-5 md:py-2.5 rounded-lg no-underline transition-all text-sm md:text-base font-medium font-mono"
          style={{
            color: pathname === '/' ? '#FFFFFF' : '#888888',
            backgroundColor: pathname === '/' ? '#333333' : 'transparent',
          }}
          onMouseEnter={(e) => {
            if (pathname !== '/') {
              e.currentTarget.style.backgroundColor = '#2A2A2A';
              e.currentTarget.style.color = '#CCCCCC';
            }
          }}
          onMouseLeave={(e) => {
            if (pathname !== '/') {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#888888';
            }
          }}
        >
          CDP
        </Link>
        <Link
          href="/genesis"
          className="px-4 py-2 md:px-5 md:py-2.5 rounded-lg no-underline transition-all text-sm md:text-base font-medium font-mono"
          style={{
            color: pathname === '/genesis' ? '#FFFFFF' : '#888888',
            backgroundColor: pathname === '/genesis' ? '#333333' : 'transparent',
          }}
          onMouseEnter={(e) => {
            if (pathname !== '/genesis') {
              e.currentTarget.style.backgroundColor = '#2A2A2A';
              e.currentTarget.style.color = '#CCCCCC';
            }
          }}
          onMouseLeave={(e) => {
            if (pathname !== '/genesis') {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#888888';
            }
          }}
        >
          BTC
        </Link>
      </div>
    </nav>
  );
}
