import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut as fbSignOut } from "firebase/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signOut: () => fbSignOut(auth) }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
