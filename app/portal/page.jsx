import { getUserRegistrations } from "../actions/events";
import { logout } from "../actions/auth";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default async function PortalPage() {
  const { data: registrations, error } = await getUserRegistrations();

  // Group by event name
  const grouped = registrations?.reduce((acc, curr) => {
    if (!acc[curr.event_name]) {
      acc[curr.event_name] = [];
    }
    acc[curr.event_name].push(curr);
    return acc;
  }, {}) || {};

  return (
    <div style={{ minHeight: '100vh', padding: '4rem 2rem', backgroundColor: '#0a0a0a', color: 'white' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2>Your Registrations portal</h2>
          <div>
            <Link href="/events" style={{ marginRight: '1rem', color: '#eab308', textDecoration: 'none' }}>Events Calendar</Link>
            <form action={logout} style={{ display: 'inline' }}>
              <button type="submit" style={{ background: 'transparent', color: '#ff6b6b', border: '1px solid #ff6b6b', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
            </form>
          </div>
        </div>

        {error && <div style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</div>}

        {Object.keys(grouped).length === 0 ? (
          <div style={{ background: '#1a1a1a', padding: '3rem', borderRadius: '10px', textAlign: 'center' }}>
            <p style={{ color: '#888', marginBottom: '1rem' }}>You haven't registered for any events yet.</p>
            <Link href="/events" style={{ color: 'white', background: '#eab308', padding: '0.75rem 1.5rem', borderRadius: '5px', textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>Register Now</Link>
          </div>
        ) : (
          Object.keys(grouped).map(eventName => (
            <div key={eventName} style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ color: '#eab308', margin: 0 }}>{eventName}</h3>
                <Link href={`/events/${eventName.toLowerCase().replace(/[^a-z0-9]/g, "-")}`} style={{ color: '#888', fontSize: '0.9rem', textDecoration: 'underline' }}>
                  Edit/Re-register
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {grouped[eventName].map((p, idx) => (
                  <div key={idx} style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '5px', border: '1px solid #333' }}>
                    <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>{p.participant_name}</p>
                    <p style={{ margin: '0 0 0.2rem 0', fontSize: '0.9rem', color: '#aaa' }}>Class: {p.participant_class}</p>
                    <p style={{ margin: '0', fontSize: '0.9rem', color: '#aaa' }}>Contact: {p.participant_contact}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
