"use client";

import { useState } from "react";
import { login } from "../actions/auth";

export default function LoginPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.target);
    const res = await login(formData);
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a0a0a', color: 'white' }}>
      <form onSubmit={handleSubmit} style={{ padding: '2rem', background: '#1a1a1a', borderRadius: '10px', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Login</h2>
        {error && <div style={{ color: '#ff6b6b', marginBottom: '1rem', background: '#2a1215', padding: '10px', borderRadius: '5px' }}>{error}</div>}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
          <input type="text" name="username" required style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: '1px solid #333', background: '#0a0a0a', color: 'white' }} />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
          <input type="password" name="password" required style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: '1px solid #333', background: '#0a0a0a', color: 'white' }} />
        </div>
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: 'none', background: '#eab308', color: 'black', fontWeight: 'bold', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
