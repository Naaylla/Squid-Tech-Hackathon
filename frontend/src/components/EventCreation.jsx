import React from 'react';
import { FiCheckCircle, FiShare2, FiUserPlus } from 'react-icons/fi'; // Import FiUserPlus for joining event

const EventCreation = ({ date, eventName, attendees, available }) => {
    return (
        <div className="max-w-xl bg-white rounded-lg shadow-md p-4 mb-4 flex items-start">
            <div className="flex flex-col items-center mr-4">
                <div className="bg-blue-500 text-white rounded-full px-3 py-1 mb-2">
                    {date}
                </div>
                <div className="text-center">{eventName}</div>
                <div className="flex items-center mt-2">
                    <FiCheckCircle className="text-green-500 mr-1" />
                    {attendees} participants
                </div>
                <div className="mt-2">
                    {available ? 'Événement disponible' : 'Événement non disponible'}
                </div>
            </div>
            <div className="ml-auto flex flex-col items-end">
                <button className="bg-blue-500 text-white px-3 py-2 mb-2 flex items-center justify-center w-full ">
                    <FiShare2 className="mr-2" />
                    Partager cet événement
                </button>
                <button className="bg-green-500 text-white px-3 py-2 flex items-center justify-center w-full">
                    <FiUserPlus className="mr-2" />
                    Rejoindre cet événement
                </button>
            </div>
        </div>
    );
};

export default EventCreation;
