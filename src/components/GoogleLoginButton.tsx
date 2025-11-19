"use client";

import { useAuth } from "../contexts/AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function GoogleLoginButton() {
  const { user, signOut } = useAuth();

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  // Kalau SUDAH LOGIN
  if (user) {
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
            hover: { background: "#ff5252" }
          }}
          onClick={signOut}
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
