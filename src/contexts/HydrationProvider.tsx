"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Hydration Context untuk track kapan client sudah siap
const HydrationContext = createContext<boolean>(false);

export function HydrationProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <HydrationContext.Provider value={hydrated}>
      {children}
    </HydrationContext.Provider>
  );
}

export function useHydrated() {
  return useContext(HydrationContext);
}