import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';
import api from '../utils/apiConfig';

function Form() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); // Add state for username
    const [errorMessage, setErrorMessage] = useState('');
    const [captchaValue, setCaptchaValue] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            const response = await api.post("/auth/signup", {
                username: username, // Pass username to API call
                email: email,
                password: password,
                recaptchaToken: captchaValue
            });
            console.log(response);
            navigate("/home", { state: { id: email } });

        } catch (e) {
            setErrorMessage(e.response.data.message);
            console.log(e);
        }
    }

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
        console.log(value);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <form onSubmit={submit} className="flex flex-col items-center justify-center w-full lg:px-2 md:px-2 sm:px-22">
                <div className="mb-2 w-full">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="py-2 px-4 w-full border-b border-gray-300 bg-white"
                        required
                    />
                </div>
                <div className="mb-2 w-full">
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="py-2 px-4 w-full border-b border-gray-300 bg-white"
                        required
                    />
                </div>
                <div className="mb-2 w-full">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="py-2 px-4 border-b border-gray-300  w-full bg-white"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="py-2 w-full mt-4 border border-2 border-BlueBorder text-darkBlue rounded bg-white hover:bg-[#021d49]  mt-5 cursor-pointer hover:text-white"
                >
                    S'inscrire
                </button>
                <ReCAPTCHA
                    sitekey="6LcG_woqAAAAAKbNYsIw3-QtnbW3aZnTN5n6XOSW"
                    onChange={handleCaptchaChange}
                    className="mt-4"
                />
            </form>
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>
    );
}

export default Form;
