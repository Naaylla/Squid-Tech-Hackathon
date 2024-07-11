import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Chat from "../../components/Chat";

const NewEvent = () => {
    const [formData, setFormData] = useState({
        title_event: '',
        date_time_debut_event: '',
        date_time_fin_event: '',
        description_event: '',
        adresse_event: '',
        max_user: 0,
        status_event: 'indisponible'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/event/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Handle successful form submission (e.g., redirect, show a success message, etc.)
            } else {
                // Handle error response
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="border">
                <Navbar />
            </div>
            <Chat />
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="mt-20 mr-5 ml-5">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 m-20">
                        <div className="field-set">
                            <label htmlFor="title_event">Nom de l'évènement</label>
                            <input
                                type="text"
                                name="title_event"
                                id="title_event"
                                value={formData.title_event}
                                onChange={handleChange}
                                className="field-content w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="field-set">
                            <label htmlFor="date_time_debut_event">Début de l'évènement</label>
                            <input
                                type="datetime-local"
                                name="date_time_debut_event"
                                id="date_time_debut_event"
                                value={formData.date_time_debut_event}
                                onChange={handleChange}
                                className="field-content w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="field-set">
                            <label htmlFor="date_time_fin_event">Fin de l'évènement </label>
                            <input
                                type="datetime-local"
                                name="date_time_fin_event"
                                id="date_time_fin_event"
                                value={formData.date_time_fin_event}
                                onChange={handleChange}
                                className="field-content w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="field-set">
                            <label htmlFor="description_event">Description</label>
                            <textarea
                                name="description_event"
                                id="description_event"
                                value={formData.description_event}
                                onChange={handleChange}
                                className="field-content w-full p-2 border rounded"
                                required
                            ></textarea>
                        </div>
                        <div className="field-set">
                            <label htmlFor="adresse_event">Addresse</label>
                            <input
                                type="text"
                                name="adresse_event"
                                id="adresse_event"
                                value={formData.adresse_event}
                                onChange={handleChange}
                                className="field-content w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="field-set">
                            <label htmlFor="max_user">Maximum des  participants</label>
                            <input
                                type="number"
                                name="max_user"
                                id="max_user"
                                value={formData.max_user}
                                onChange={handleChange}
                                className="field-content w-full p-2 border rounded"
                                required
                            />
                        </div>
                        
                        
                            <button type="submit" className="classic-button w-full py-2">
                                Submit
                            </button>
                        
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewEvent;
