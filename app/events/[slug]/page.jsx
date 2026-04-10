import { eventsData } from "../../../src/data/events";
import { notFound } from "next/navigation";
import Link from "next/link";
import "../events.css";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = eventsData.find((e) => e.slug === slug);
  if (!event) return { title: "Not Found" };
  return { title: `${event.name} | Registration`, description: `Register for ${event.name}` };
}

export default async function EventRegistrationPage({ params }) {
  const { slug } = await params;
  const event = eventsData.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  // safe name identifier
  const safeEventName = event.name.toLowerCase().replace(/[^a-z0-9]/g, "-");

  return (
    <div className="events-container">
      <Link href="/events" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", alignSelf: "center", marginBottom: "2rem", fontSize: "1.2rem", width: "90%", maxWidth: "800px" }}>
        &larr; Back to Events
      </Link>
      <h1 className="events-title" style={{ fontSize: "clamp(2rem, 4vw, 4rem)", textAlign: "center" }}>{event.name} Registration</h1>
      
      <form className="events-form-wrapper" action="#" style={{ maxWidth: "800px", width: "90%", margin: "0 auto" }}>
        <div className="event-card" style={{ cursor: "default", transform: "none" }}>
          <div className="event-header">
            <h3 className="event-name">{event.name}</h3>
            <span className="event-time">{event.time}</span>
          </div>

          <div className="event-inputs-group">
            {Array.from({ length: event.participants }).map((_, i) => (
              <div key={i} className="participant-block">
                <h4 className="participant-label">Participant {i + 1}</h4>
                
                <input
                  type="text"
                  name={`${safeEventName}-p${i + 1}-name`}
                  placeholder="Name"
                  className="participant-input"
                  required
                />
                
                <input
                  type="text"
                  name={`${safeEventName}-p${i + 1}-class`}
                  placeholder="Class"
                  className="participant-input"
                  required
                />
                
                <input
                  type="tel"
                  name={`${safeEventName}-p${i + 1}-contact`}
                  placeholder="Contact Number"
                  className="participant-input"
                  required
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
