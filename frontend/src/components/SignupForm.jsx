import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

function SignupForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        country: '',
        city: '',
        phone: '',
        gender: '',
        birthDate: '',
        recaptchaToken: '', // Include recaptchaToken in formData
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    // Email format validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    async function submit(e) {
        e.preventDefault();
        setSubmitted(true);

        try {
            const response = await axios.post("http://localhost:5000/users/add", {
                ...formData,
                recaptchaToken: captchaValue,
            });

            if (response.data.success) {
                setErrorMessage('');
                setTimeout(() => {
                    navigate("/home", { state: { id: formData.email } });
                }, 2000);
            } else {
                setErrorMessage(response.data.message || "Échec de l'inscription");
            }
        } catch (e) {
            const errorResponse = e.response?.data?.message || "Une erreur s'est produite";
            setErrorMessage(errorResponse);
            console.log(e);
        } finally {
            setSubmitted(false);
        }
    }

    return (
        <div className="flex flex-col items-center w-full max-w-2xl p-4 bg-white rounded-lg">
            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <h2 className="col-span-2 text-2xl text-black font-semibold mt-4">Informations de Compte</h2>
                <div className="col-span-2">
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Nom d'utilisateur"
                        className="py-2 px-4 w-full border-b border-gray-300 bg-white"
                        required
                    />
                </div>

                <div className="col-span-2">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className={`py-2 px-4 w-full border-b border-gray-300 bg-white ${submitted && !errorMessage && emailRegex.test(formData.email) ? 'border-green-500' : ''}`}
                        required
                    />
                </div>

                <div className="col-span-2">
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Mot de passe"
                        className="py-2 px-4 w-full border-b border-gray-300 bg-white"
                        required
                    />
                </div>

                <h2 className="col-span-2 text-2xl font-semibold text-black mt-4">Informations Personnelles</h2>
                <div>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Prénom"
                        className="py-2 px-4 w-full border-b border-gray-300 bg-white"
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Nom de famille"
                        className="py-2 px-4 w-full border-b border-gray-300 bg-white"
                        required
                    />
                </div>
                <div>
                    <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        className="py-2 px-4 w-full border-b border-gray-300 bg-white"
                        required
                    />
                </div>
                <div>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="py-2 px-4 w-full border-b border-gray-300 bg-white"
                        required
                    >
                        <option value="">Sélectionnez votre sexe</option>
                        <option value="male">Homme</option>
                        <option value="female">Femme</option>
                    </select>
                </div>

                <h2 className="col-span-2 text-2xl font-semibold text-black mt-4">Informations de Contact</h2>
                <div className="col-span-2">
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Téléphone"
                        className="py-2 px-4 w-full border-b border-gray-300 bg-white"
                        required
                    />
                </div>

                <h2 className="col-span-2 text-2xl font-semibold mt-4 text-black">Localisation</h2>
                <div>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="Pays"
                        className="py-2 px-4 w-full border-b border-gray-300 bg-white"
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Commune"
                        className="py-2 px-4 w-full border-b border-gray-300 bg-white"
                        required
                    />
                </div>

                <div className="col-span-2 mt-4 flex justify-center">
                    <ReCAPTCHA
                        sitekey="6LcG_woqAAAAAKbNYsIw3-QtnbW3aZnTN5n6XOSW"
                        onChange={handleCaptchaChange}
                        className="mt-4"
                    />
                </div>

                <div className="col-span-2 mt-4">
                    <button
                        type="submit"
                        className={`py-2 w-full border border-2 border-blue-500 text-blue-500 rounded-md bg-white hover:bg-blue-500 hover:text-white transition ease-in duration-300 ${submitted || !captchaValue ? 'opacity-50 pointer-events-none' : ''}`}
                        disabled={submitted || !captchaValue}
                    >
                        {submitted ? 'Inscription en cours...' : 'S\'inscrire'}
                    </button>
                </div>

                {errorMessage && (
                    <div className="col-span-2 mt-2">
                        <p className="text-red-500 font-bold text-sm">{errorMessage}</p>
                    </div>
                )}
            </form>
        </div>
    );
}

export default SignupForm;
