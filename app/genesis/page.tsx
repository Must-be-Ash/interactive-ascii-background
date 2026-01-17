'use client';

import { GenesisBlockBackground } from '@/components/GenesisBlockBackground';
import { NavigationDock } from '@/components/NavigationDock';

export default function GenesisPage() {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        backgroundColor: '#0A0A0A',
        minHeight: '100vh',
        width: '100%'
      }}
    >
      <NavigationDock />
      <GenesisBlockBackground />

      <main className="w-full max-w-6xl mx-auto px-6" style={{ position: 'relative', zIndex: 10 }}>
      </main>
    </div>
  );
}
