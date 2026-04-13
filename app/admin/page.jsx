"use client";

import { useState } from "react";
import { createAccount, logout } from "../actions/auth";

export default function AdminPage() {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const formData = new FormData(e.target);
    const res = await createAccount(formData);
    if (res?.error) setError(res.error);
    if (res?.success) {
      setSuccess(res.success);
      e.target.reset();
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '4rem 2rem', backgroundColor: '#0a0a0a', color: 'white' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#1a1a1a', padding: '2rem', borderRadius: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2>Admin Dashboard</h2>
          <button onClick={() => logout()} style={{ background: 'transparent', color: '#ff6b6b', border: '1px solid #ff6b6b', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
        </div>
        
        <h3>Create Event Account</h3>
        <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Create usernames and passwords for schools to login and register.</p>

        <form onSubmit={handleSubmit}>
          {error && <div style={{ color: '#ff6b6b', marginBottom: '1rem', background: '#2a1215', padding: '10px', borderRadius: '5px' }}>{error}</div>}
          {success && <div style={{ color: '#4ade80', marginBottom: '1rem', background: '#122a18', padding: '10px', borderRadius: '5px' }}>{success}</div>}
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>School Username</label>
            <input type="text" name="username" required style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: '1px solid #333', background: '#0a0a0a', color: 'white' }} />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input type="text" name="password" required style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: '1px solid #333', background: '#0a0a0a', color: 'white' }} />
          </div>
          
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem', borderRadius: '5px', border: 'none', background: '#eab308', color: 'black', fontWeight: 'bold', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
