import React, { useState, useEffect } from "react";
import axios from "axios";

const GoogleMeetWidget = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [events, setEvents] = useState([]);

  // Fetch calendar events when authenticated
  useEffect(() => {
    const fetchEvents = async () => {
      if (authenticated) {
        try {
          const response = await axios.get(
            "http://localhost:4000/google/calendar/events"
          );
          setEvents(response.data);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      }
    };

    fetchEvents();
  }, [authenticated]);

  // Handle Google authentication
  const handleAuth = () => {
    const authWindow = window.open(
      "http://localhost:4000/google/auth/google",
      "_blank",
      "width=500,height=600"
    );

    const authListener = (event) => {
      if (event.data === "authenticated") {
        setAuthenticated(true);
        window.removeEventListener("message", authListener);
      }
    };

    window.addEventListener("message", authListener);
  };

  return (
    <div className="google-meet-widget p-4 ml-16 w-96 bg-white shadow-xl rounded-3xl">
      <h2 className="text-xl font-bold mb-2 text-blue-500">Upcoming Events</h2>
      {!authenticated && (
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleAuth}
        >
          Authenticate with Google
        </button>
      )}
      {authenticated && (
        <ul className="mt-4">
          {events.length > 0 ? (
            events.map((event) => (
              <li key={event.id} className="mb-2">
                <p className="font-semibold text-black">{event.summary}</p>
                {event.hangoutLink && (
                  <a
                    className="text-blue-500 underline"
                    href={event.hangoutLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Google Meet
                  </a>
                )}
                <p className="text-gray-600">
                  {new Date(event.start.dateTime).toLocaleString()}
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No upcoming events.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default GoogleMeetWidget;
