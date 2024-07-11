import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';

function SignupForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        if (name === 'username') setUsername(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    async function submit(e) {
        e.preventDefault();
        setSubmitted(true);

        try {
            const response = await axios.post("http://localhost:5000/auth/signup", {
                username: username,
                email: email,
                password: password,
                recaptchaToken: captchaValue
            });

            if (response.data.success) {
                setErrorMessage('');
                setTimeout(() => {
                    navigate("/home", { state: { id: email } });
                }, 2000);
            } else {
                setErrorMessage(response.data.message || "Échec de l'inscription");
            }
        } catch (e) {
            const errorResponse = e.response?.data?.message || "Une erreur s'est produite";
            setErrorMessage(errorResponse);
            console.log(e);
        } finally {
            setSubmitted(false); // Reset submitted state after request completes
        }
    }

    return (
        <div className="flex flex-col items-center w-full">
            <form onSubmit={submit} className="flex flex-col items-center justify-center w-full lg:px-2 md:px-2 sm:px-22 mt-2">
                <div className="mb-2 w-full">
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleInputChange}
                        placeholder="Nom d'utilisateur"
                        className="py-2 px-4 w-full border-b border-gray-300 bg-white"
                        required
                    />
                </div>
                <div className="mb-2 w-full">
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className={`py-2 px-4 w-full border-b border-gray-300 bg-white ${submitted && !errorMessage && emailRegex.test(email) ? 'border-green-500' : ''}`}
                        required
                    />
                </div>
                <div className="mb-2 w-full">
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                        placeholder="Mot de passe"
                        className="py-2 px-4 border-b border-gray-300 w-full bg-white"
                        required
                    />
                </div>

                <div className='h-4 mt-1 flex items-center justify-center'>
                    {errorMessage && (
                        <p className="text-red-500 text-bold text-sm flex-shrink-0">{errorMessage}</p>
                    )}
                </div>

                <ReCAPTCHA
                    sitekey="6LcG_woqAAAAAKbNYsIw3-QtnbW3aZnTN5n6XOSW"
                    onChange={handleCaptchaChange}
                    className="mt-4"
                />

                <button
                    type="submit"
                    className={`py-2 w-full mt-4 border border-2 border-BlueBorder text-darkBlue rounded bg-white hover:bg-[#021d49] cursor-pointer hover:text-white transition ease-in duration-300 ${submitted || !captchaValue ? 'opacity-50 pointer-events-none' : ''}`}
                    disabled={submitted || !captchaValue}
                >
                    {submitted ? 'Inscription en cours...' : 'S\'inscrire'}
                </button>
            </form>
        </div>
    );
}

export default SignupForm;
