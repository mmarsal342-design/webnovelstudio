"use client";

import { AuthProvider } from "../contexts/AuthContext";
import { HydrationProvider } from "../contexts/HydrationProvider";
import { LanguageProvider } from "../contexts/LanguageContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <HydrationProvider>
      <AuthProvider>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </AuthProvider>
    </HydrationProvider>
  );
}

  return (
    <HydrationProvider>
      <AuthProvider>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </AuthProvider>
    </HydrationProvider>
  );
}
