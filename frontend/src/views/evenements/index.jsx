// Evenements.js

import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Chat from "../../components/Chat";
import EventToggle from "../../components/EventToggle"; // Import EventToggle component

const Evenements = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const ss_user_id = sessionStorage.getItem("ss_user_id");
        setUserId(Number(ss_user_id));

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

    const handleToggle = (event) => {
        setSelectedEvent(event);
    };

    const handleCloseToggle = () => {
        setSelectedEvent(null);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="border">
                <Navbar />
            </div>
            <Chat></Chat>
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="mt-20 mr-5 ml-5">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Left column for heading */}
                        <h1 className="text-3xl font-bold text-teal-800 mb-8">Évènements</h1>

                        {/* Right column for button */}
                        <div className="flex justify-end mb-4">
                            <button className="classic-button">
                                Créer un évènement
                            </button>
                        </div>
                    </div>

                    {/* Event Cards Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div key={event.id_event} className="bg-white rounded-lg overflow-hidden shadow-md">
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{event.title_event}</h2>
                                    <p className="text-gray-600 mb-4">
                                        {new Date(event.date_time_debut_event).toLocaleDateString()} - {new Date(event.date_time_fin_event).toLocaleDateString()}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-teal-600 font-bold">Max participants: {event.max_user}</span>
                                        <div className="more-details" onClick={() => handleToggle(event)}>
                                            → Plus d'informations
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Render EventToggle if selectedEvent is not null */}
            {selectedEvent && (
                <EventToggle event={selectedEvent} onClose={handleCloseToggle} userId={userId} />
            )}
        </div>
    );
};

export default Evenements;
