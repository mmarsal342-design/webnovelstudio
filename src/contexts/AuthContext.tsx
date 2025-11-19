import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut as fbSignOut } from "firebase/auth";
import { User } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading false after initial check
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (isMounted) {
        setUser(currentUser);
        setLoading(false);
      }
    });
    
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []); // Empty dependency array - run once!

  const value: AuthContextType = {
    user,
    signOut: () => fbSignOut(auth),
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}