"use client";
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../../src/css/Registration.css';

import { login } from "../actions/auth";

export default function Registration() {
  const cardRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const btn = document.querySelector('.btn-magnetic');
    if (!btn) return;

    const hoverHandler = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        duration: 0.3,
        x: x * 0.3,
        y: y * 0.3,
        ease: 'power3.out',
      });
    };

    const leaveHandler = () => {
      gsap.to(btn, {
        duration: 0.5,
        x: 0,
        y: 0,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    btn.addEventListener('mousemove', hoverHandler);
    btn.addEventListener('mouseleave', leaveHandler);
    
    return () => {
      btn.removeEventListener('mousemove', hoverHandler);
      btn.removeEventListener('mouseleave', leaveHandler);
    };
  }, []);

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
    <section id="registration" className="reg-section">
      <div className="reg-container" ref={cardRef}>
        <div className="glass-card">
          <div className="card-header">
            <h3>SYSTEM ACCESS</h3>
            <p>Enter credentials to register</p>
          </div>
          {error && <div style={{ color: '#ff6b6b', background: '#2a1215', padding: '10px', borderRadius: '5px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
          <form className="reg-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="text" name="username" id="username" placeholder=" " required />
              <label htmlFor="username">USERNAME</label>
            </div>
            <div className="input-group">
              <input type="password" name="password" id="password" placeholder=" " required />
              <label htmlFor="password">PASSWORD</label>
            </div>
            <button type="submit" className="btn-magnetic" disabled={loading} style={{ position: 'relative', overflow: 'hidden' }}>
              <span style={{ opacity: loading ? 0 : 1 }}>ACCESS TERMINAL</span>
              {loading && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader" style={{ animation: 'spin 1s linear infinite' }}>
                    <line x1="12" y1="2" x2="12" y2="6"></line>
                    <line x1="12" y1="18" x2="12" y2="22"></line>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                    <line x1="2" y1="12" x2="6" y2="12"></line>
                    <line x1="18" y1="12" x2="22" y2="12"></line>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                  </svg>
                  <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
