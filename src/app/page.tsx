"use client";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic import AppContent - ONLY render on client, skip SSR completely
const AppContent = dynamic(() => import('./AppContent'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-slate-900"></div>,
});

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900"></div>}>
      <AppContent />
    </Suspense>
  );
}
