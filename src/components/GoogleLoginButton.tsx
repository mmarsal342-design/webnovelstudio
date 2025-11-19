"use client";

import { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function GoogleLoginButton() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [signOutFn, setSignOutFn] = useState<any>(null);

  useEffect(() => {
    // Get auth data only after mount
    const authContext = useAuth();
    setUser(authContext.user);
    setSignOutFn(() => authContext.signOut);
    setMounted(true);
  }, []);

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  // Don't render ANYTHING until mounted
  if (!mounted) return null;

  // Kalau SUDAH LOGIN
  if (user && user?.displayName) {
    return (
      <div style={{ textAlign: "center", margin: 16 }}>
        <div style={{ color: "white", marginBottom: 12 }}>
          <p>Welcome, <strong>{user.displayName}</strong>!</p>
          <p style={{ fontSize: "12px", color: "#aaa" }}>{user.email}</p>
        </div>

        <button
          style={{
            background: "#ff6b6b",
            color: "white",
            border: "none",
            borderRadius: 6,
            padding: "8px 16px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => signOutFn?.()}
        >
          🚪 Logout
        </button>
      </div>
    );
  }

  // Kalau BELUM LOGIN - tampilkan tombol sign in
  return (
    <button
      style={{
        background: "#fff",
        color: "#333",
        border: "1px solid #999",
        borderRadius: 6,
        padding: "8px 16px",
        margin: 16,
        fontWeight: "bold",
        cursor: "pointer",
      }}
      onClick={signIn}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        alt="Google"
        style={{ width: 20, verticalAlign: "middle", marginRight: 8 }}
      />
      Sign in with Google
    </button>
  );
}