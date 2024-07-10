import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

const Evenements = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8000/event"); //use localhost:8000/event
        if (response.ok) {
          const data = await response.json();
          setEvents(data.events);
        } else {
          throw new Error("Echec fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mt-20 mb-8">Évènements à venir</h1>
        
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
                  {event.date_time_debut_event} - {event.date_time_fin_event}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-teal-600 font-bold">Max participants: {event.max_user}</span>
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-500">
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Evenements;
