import "./events.css";
// yes this is the main thing welcome debarpon 
export const metadata = {
  title: "Events | Xcelsior",
  description: "Register for events",
};

export default function EventsPage() {
  const eventsOnline = [
    { name: "Video Editing", time: "Online", participants: 1 },
  ];

  const eventsDay1 = [
    { name: "Quiz", time: "2:30 PM", participants: 3 },
    { name: "Robotics", time: "2:30 PM", participants: 2 },
    { name: "Sudoku(6-8)", time: "2:30 PM", participants: 2 },
    { name: "Graph Art", time: "2:30 PM", participants: 2 },
    { name: "HTML & CSS", time: "2:30 PM", participants: 2 },
    { name: "Debate", time: "2:15 PM", participants: 2 },
    { name: "FIFA", time: "2:30 PM", participants: 2 },
  ];

  const eventsDay2 = [
    { name: "Treasure Hunt", time: "9:30 AM", participants: 2 },
    { name: "Hackathon", time: "9:00 AM", participants: 2 },
    { name: "Competitive Coding", time: "9:00 AM", participants: 2 },
    { name: "Shark Tank", time: "12:15 PM", participants: 2 },
    { name: "Math Relay", time: "12:00 PM", participants: 4 },
    { name: "Debate Finals", time: "12:30 PM", participants: 3 },
    { name: "Game Jam", time: "11:00 AM", participants: 2 },
    { name: "Competitive Maths", time: "2:00 PM", participants: 2 },
    { name: "Data Detectives", time: "2:00 PM", participants: 1 },
  ];

  return (
    <div className="events-container">
      <h1 className="events-title">Events</h1>

      <form className="events-form-wrapper" action="#">

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

        <div className="submit-container">
          <button type="submit" className="final-register-btn">
            Submit Registration
          </button>
        </div>
      </form>
    </div>
  );
}// lemme know if u cant understand this ill tell u what i have done
// this is to transfer all the local data together i havent connected it to backend  

function EventCard({ event }) {
  // safe name identifier im using 
  const safeEventName = event.name.toLowerCase().replace(/[^a-z0-9]/g, "-");

  return (
    <div className="event-card">
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
            />

            <input
              type="text"
              name={`${safeEventName}-p${i + 1}-class`}
              placeholder="Class"
              className="participant-input"
            />

            <input
              type="tel"
              name={`${safeEventName}-p${i + 1}-contact`}
              placeholder="Contact Number"
              className="participant-input"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
