import "./events.css";
import EventCard from "./EventCard";
// yes this is the main thing welcome debarpon 
export const metadata = {
  title: "Events | Xcelsior",
  description: "Register for events",
};

import { eventsOnline, eventsDay1, eventsDay2 } from "./data";
import Link from "next/link";
import { logout } from "../actions/auth";
export default function EventsPage() {

  return (
    <div className="events-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="events-title" style={{ margin: 0 }}>Events</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/portal" style={{ color: '#eab308', textDecoration: 'none', fontWeight: 'bold' }}>My Registrations</Link>
          <form action={logout}>
            <button type="submit" style={{ background: 'transparent', color: '#ff6b6b', border: '1px solid #ff6b6b', padding: '0.4rem 0.8rem', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
          </form>
        </div>
      </div>

      <div className="events-form-wrapper">

        {/* Online Events */}
        <div className="day-section">
          <h2 className="day-title">Online Events</h2>
          <div className="events-grid">
            {eventsOnline.map((event, idx) => (
              <EventCard key={`online-${idx}`} event={event} />
            ))}
          </div>
        </div>

        {/* Day 1 */}
        <div className="day-section">
          <h2 className="day-title">Day 1</h2>
          <div className="events-grid">
            {eventsDay1.map((event, idx) => (
              <EventCard key={`day1-${idx}`} event={event} />
            ))}
          </div>
        </div>

        {/* Day 2 */}
        <div className="day-section">
          <h2 className="day-title">Day 2</h2>
          <div className="events-grid">
            {eventsDay2.map((event, idx) => (
              <EventCard key={`day2-${idx}`} event={event} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}// lemme know if u cant understand this ill tell u what i have done
// this is to transfer all the local data together i havent connected it to backend  

