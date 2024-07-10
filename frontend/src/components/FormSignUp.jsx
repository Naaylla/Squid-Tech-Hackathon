import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../utils/apiConfig'

function Form() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [captchaValue, setCaptchaValue] = useState(null);

    async function submit(e) {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", {
                username: email,
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

    return (
        <div className="flex flex-col items-center w-full">
            <form onSubmit={submit} className="flex flex-col items-center justify-center w-full lg:px-6 md:px-2 sm:px-22">
                <div className="mb-4 w-full">
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="py-3 px-4 w-full border border-gray-300 rounded bg-white rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4 w-full">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="py-3 px-4 border border-gray-300 rounded w-full bg-white rounded-lg"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="py-3 w-full border text-white border-gray-300 rounded bg-sky-500 hover:bg-sky-700 mt-5 rounded-lg"
                >
                    Connexion
                </button>
            </form>
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>
    );
}

export default Form;
