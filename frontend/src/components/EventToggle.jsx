// EventToggle.js

import React, { useRef, useEffect } from "react";

const EventToggle = ({ event, onClose, userId }) => {
    const toggleRef = useRef(null);

    // Function to handle clicks outside the toggle
    const handleClickOutside = (event) => {
        if (toggleRef.current && !toggleRef.current.contains(event.target)) {
            onClose();
        }
    };

    // Effect to add event listener when component mounts
    useEffect(() => {
        // Add event listener on mount
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up event listener on unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div ref={toggleRef} className="bg-teal-700 p-8 w-full rounded-lg border-2 border-teal-700 max-w-3xl relative">
                <h2 className="text-3xl text-white font-bold mb-4">{event.title_event}</h2>
                <div className="m-2 p-8 bg-white border-2 border-teal-700 overflow-y-auto rounded-lg" style={{ maxHeight: "65vh" }}>
                    <div className="space-y-4">
                        <p className="text-gray-800 mb-4">Description : <p className="text-black">{event.description_event}</p></p>
                        <p className="text-gray-800 mb-4">Adresse :<p className="text-black">{event.adresse_event}</p></p>
                        <p className="text-black mb-4">
                            <p className="text-gray-800">Date de début:</p> {new Date(event.date_time_debut_event).toLocaleDateString()}<br />
                            <p className="text-gray-800">Date de fin:</p> {new Date(event.date_time_fin_event).toLocaleDateString()}
                        </p>
                        <p className="text-teal-700 mb-4">Max participants: {event.max_user}</p>
                    </div>
                    <div className="mt-5 right-4">
                    {event.id_user_creator === userId ? (
                        <button className="bg-teal-100 text-teal-800 py-2 px-4 rounded" disabled>Vous êtes l'organisateur</button>
                    ) : (
                        <button className="classic-button">Participer</button>
                    )}
                </div></div>
                <button
                    className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-teal-700 text-white hover:bg-teal-600"
                    onClick={onClose}
                >
                    <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default EventToggle;
