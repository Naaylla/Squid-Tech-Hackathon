import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';
import api from '../api';

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const handleCaptchaChange = (value) => {
        console.log(value);
        setCaptchaValue(value);
    };

    async function submit(e) {
        e.preventDefault();
        setSubmitted(true);

        try {
            const response = await axios.post("http://localhost:8000/auth/login", {
                email: email,
                password: password,
            });
            console.log('response', response);

            if (response.status === 200) {
                setErrorMessage('');
                const userId = response.data.user.id_user;
                sessionStorage.setItem('ss_user_id', userId);
                navigate("/home", { state: { id: email } });
            } else {
                setErrorMessage(response.data.message || "Login failed");
            }
        } catch (e) {
            const errorResponse = e.response?.data?.message || "An error occurred";
            setErrorMessage(errorResponse);
            console.log(e);
        } finally {
            setSubmitted(false);
        }
    }

    return (
        <div className="flex flex-col items-center w-full">
            <form onSubmit={submit} className="flex flex-col items-center justify-center w-full lg:px-2 md:px-2 sm:px-22 mt-2">
                <div className="mb-2 w-full">
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className={`py-2 px-4 w-full border-b border-gray-300 bg-white ${submitted && !errorMessage && !emailRegex.test(email) ? 'border-red-500' : ''}`}
                        required
                    />
                </div>
                <div className="mb-2 w-full">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="py-2 px-4 border-b border-gray-300 w-full bg-white"
                        required
                    />
                </div>
                <div className="text-red-500 text-bold text-sm mt-1 mb-2">
                    {submitted && !errorMessage && !emailRegex.test(email) && (
                        <p>Veuillez entrer une adresse email valide.</p>
                    )}
                </div>
                <div className='h-4 flex items-center justify-center'>
                    {errorMessage && (
                        <p className="text-red-500 text-bold text-sm flex-shrink-0">{errorMessage}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className={`py-2 w-full mt-4 border-2 border-BlueBorder text-darkBlue rounded bg-white hover:bg-[#021d49] cursor-pointer hover:text-white transition ease-in duration-300 ${submitted ? 'opacity-50 pointer-events-none' : ''}`}
                    disabled={submitted}
                >
                    {submitted ? 'Connexion en cours...' : 'Connexion'}
                </button>
            </form>
        </div>
    );
}

export default Form;