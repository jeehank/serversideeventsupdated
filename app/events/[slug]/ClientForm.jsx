"use client";
import React, { useState } from "react";
import { registerEvent } from "../../actions/events";

export default function ClientForm({ event }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.target);
    const response = await registerEvent(formData);
    
    if (response?.error) {
      setError(response.error);
      setLoading(false);
    }
  };

  return (
    <form className="event-card" onSubmit={handleRegister} style={{ width: '100%' }}>
      <input type="hidden" name="eventName" value={event.name} />
      <input type="hidden" name="numParticipants" value={event.participants} />
      
      {error && <div style={{ color: '#ff6b6b', marginBottom: '1rem', background: '#2a1215', padding: '10px', borderRadius: '5px' }}>{error}</div>}

      <div className="event-inputs-group">
        {Array.from({ length: event.participants }).map((_, i) => (
          <div key={i} className="participant-block">
            <h4 className="participant-label">Participant {i + 1}</h4>

            <input
              type="text"
              name={`p${i + 1}-name`}
              placeholder="Name"
              className="participant-input"
              required
            />

            <input
              type="text"
              name={`p${i + 1}-class`}
              placeholder="Class"
              className="participant-input"
              required
            />

            <input
              type="tel"
              name={`p${i + 1}-contact`}
              placeholder="Contact Number"
              className="participant-input"
              required
            />
          </div>
        ))}
      </div>

      <div className="event-card-actions">
        <button type="submit" className="event-register-btn" disabled={loading} style={{ width: '100%', opacity: loading ? 0.7 : 1 }}>
          {loading ? "Registering..." : `Register for ${event.name}`}
        </button>
      </div>
    </form>
  );
}
