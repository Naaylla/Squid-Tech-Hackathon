import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

const Evenements = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8000/event");
        if (response.ok) {
          const data = await response.json();
          setEvents(data.data); // Update state with array of events from data.data
        } else {
          throw new Error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const isEventOngoing = (event) => {
    const now = new Date();
    const start = new Date(event.date_time_debut_event);
    const end = new Date(event.date_time_fin_event);
    return now >= start && now <= end;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mt-20 mr-5 ml-5">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 justify-start">Évènements</h1>
          <div className="justify-end mb-4">
            <button className="justify-end mb-4 classic-button">
              Créer un évènement
            </button>
          </div>

          {/* Event Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id_event} className="bg-white rounded-lg overflow-hidden shadow-md">
                <img
                  src={`https://via.placeholder.com/400x200?text=${encodeURIComponent(event.title_event)}`}
                  alt={event.title_event}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{event.title_event}</h2>
                  <p className="text-gray-600 mb-4">
                    {new Date(event.date_time_debut_event).toLocaleDateString()} - {new Date(event.date_time_fin_event).toLocaleDateString()}
                  </p>
                  {event.status_event === "DATE EXPIRÉE" && (
                    <span className="text-red-600 font-bold mb-2 block">Évènement fini</span>
                  )}
                  {isEventOngoing(event) && (
                    <span className="text-green-600 font-bold mb-2 block">En cours</span>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-teal-600 font-bold">Max participants: {event.max_user}</span>
                    <div className="more-details">
                      {/* onClick: if token in session storage, redirection a la page de l'event, sinon Utiliser routes axios.get_event */}
                      → Plus d'informations
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evenements;
