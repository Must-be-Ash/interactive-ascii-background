'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavigationDock() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '12px',
          backgroundColor: '#1A1A1A',
          border: '1px solid #333333',
          borderRadius: '12px',
          padding: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          pointerEvents: 'auto',
        }}
      >
        <Link
          href="/"
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: pathname === '/' ? '#FFFFFF' : '#888888',
            backgroundColor: pathname === '/' ? '#333333' : 'transparent',
            transition: 'all 0.2s ease',
            fontSize: '14px',
            fontWeight: '500',
            fontFamily: 'monospace',
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
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: pathname === '/genesis' ? '#FFFFFF' : '#888888',
            backgroundColor: pathname === '/genesis' ? '#333333' : 'transparent',
            transition: 'all 0.2s ease',
            fontSize: '14px',
            fontWeight: '500',
            fontFamily: 'monospace',
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
