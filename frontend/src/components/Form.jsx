import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Form() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/", {
                email,
                password
            });

            if (response.data.status === "success") {
                navigate("/home", { state: { id: email } });
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (e) {
            setErrorMessage("An error occurred. Please try again.");
            console.log(e);
        }
    }

    return (
        <div className="flex flex-col items-center w-full">
            <form onSubmit={submit} className="flex flex-col items-center justify-center w-full lg:px-6 md:px-8 sm:px-22">
                <div className="mb-4 w-full ">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="py-4 px-4 w-full border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4 w-full">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="py-4 px-4 border border-gray-300 rounded w-full "
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="py-4 w-full border border-gray-300 rounded "
                >
                    Connexion
                </button>
            </form>
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>
    );
}

export default Form;
