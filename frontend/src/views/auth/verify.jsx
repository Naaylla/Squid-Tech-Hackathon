import React, { useState } from "react";
import { Link } from 'react-router-dom';

export default function Verify() {
    const [code, setCode] = useState(new Array(6).fill(""));

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setCode([...code.map((d, idx) => (idx === index ? element.value : d))]);

   
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = () => {
        const enteredCode = code.join('');
        console.log("Entered code:", enteredCode);
    };

    return (
        <div className="flex w-full min-h-screen items-center justify-center">
            <div className="lg:w-2/5 md:w-96 w-96 mt-12 mb-12 rounded-3xl shadow-md bg-white overflow-hidden p-8 flex flex-col items-center justify-center space-y-6 border-2 border-neutral-400 border-opacity-50">
                <h1 className="text-center font-bold text-black text-3xl">Une dernière étape !</h1>
                <p className="text-bold text-basic text-center text-black opacity-50">
                    Entrez le code à 6 chiffres que vous avez reçu sur 
                    votre boite mail.
                </p>
                <div className="flex space-x-2">
                    {code.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            className="w-12 h-12 text-center bg-white border-2 border-gray-300 rounded-md"
                            value={data}
                            onChange={e => handleChange(e.target, index)}
                            onFocus={e => e.target.select()}
                        />
                    ))}
                </div>
                <button
                    onClick={handleSubmit}
                    className="w-full py-2 mt-4 text-white bg-black rounded-md"
                >
                    Continuer
                </button>
                <Link to="/login" className="text-sm text-black opacity-50 mt-4">
                    Retour à la connexion
                </Link>
            </div>
        </div>
    );
}
