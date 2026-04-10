import Link from "next/link";
import { eventsData } from "../../src/data/events";
import "./events.css";

// yes this is the main thing welcome debarpon 
export const metadata = {
  title: "Events | Xcelsior",
  description: "Register for events",
};

export default function EventsDirectory() {
  const onlineEvents = eventsData.filter((e) => e.day === 0);
  const day1Events = eventsData.filter((e) => e.day === 1);
  const day2Events = eventsData.filter((e) => e.day === 2);

  return (
    <div className="events-container">
      <h1 className="events-title">Events</h1>

      <div className="events-form-wrapper">
        
        {/* Online Events */}
        <div className="day-section">
          <h2 className="day-title">Online Events</h2>
          <div className="events-grid">
            {onlineEvents.map((event) => (
              <EventLinkCard key={event.slug} event={event} />
            ))}
          </div>
        </div>

        {/* Day 1 */}
        <div className="day-section">
          <h2 className="day-title">Day 1</h2>
          <div className="events-grid">
            {day1Events.map((event) => (
              <EventLinkCard key={event.slug} event={event} />
            ))}
          </div>
        </div>

        {/* Day 2 */}
        <div className="day-section">
          <h2 className="day-title">Day 2</h2>
          <div className="events-grid">
            {day2Events.map((event) => (
              <EventLinkCard key={event.slug} event={event} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}// lemme know if u cant understand this ill tell u what i have done
// this is to transfer all the local data together i havent connected it to backend  

function EventLinkCard({ event }) {
  return (
    <Link href={`/events/${event.slug}`} style={{ textDecoration: "none" }}>
      <div className="event-card" style={{ height: "100%", cursor: "pointer" }}>
        <div className="event-header" style={{ borderBottom: "none", paddingBottom: 0 }}>
          <h3 className="event-name">{event.name}</h3>
          <span className="event-time">{event.time}</span>
        </div>
      </div>
    </Link>
  );
}
