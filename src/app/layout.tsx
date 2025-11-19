"use client";

import { AuthProvider } from "../contexts/AuthContext";
import { HydrationProvider } from "../contexts/HydrationProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <HydrationProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </HydrationProvider>
  );
}
