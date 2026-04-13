"use client";
import React from "react";

export default function ClientForm({ event, slug }) {
  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Local Data for", event.name, ":", data);
    
    
    localStorage.setItem(`registration-${slug}`, JSON.stringify({
        event: event.name,
        participantsData: data
    }));
    alert(`Registration data for ${event.name} saved locally! It has been successfully transferred.`);
  };

  return (
    <form className="event-card" onSubmit={handleRegister} style={{ width: '100%' }}>
      <div className="event-inputs-group">
        {Array.from({ length: event.participants }).map((_, i) => (
          <div key={i} className="participant-block">
            <h4 className="participant-label">Participant {i + 1}</h4>

            <input
              type="text"
              name={`${slug}-p${i + 1}-name`}
              placeholder="Name"
              className="participant-input"
              required
            />

            <input
              type="text"
              name={`${slug}-p${i + 1}-class`}
              placeholder="Class"
              className="participant-input"
              required
            />

            <input
              type="tel"
              name={`${slug}-p${i + 1}-contact`}
              placeholder="Contact Number"
              className="participant-input"
              required
            />
          </div>
        ))}
      </div>

      <div className="event-card-actions">
        <button type="submit" className="event-register-btn" style={{ width: '100%' }}>
          Register for {event.name}
        </button>
      </div>
    </form>
  );
}
