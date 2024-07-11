import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset previous error message and submission status
        setErrorMessage('');
        setSubmitted(true);

        // Email format validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            setErrorMessage('Veuillez entrer une adresse email.');
            setSubmitted(false); // Reset submitted state
            return;
        }

        if (!emailRegex.test(email)) {
            setErrorMessage('Veuillez entrer une adresse email valide.');
            setSubmitted(false); // Reset submitted state
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const json = await response.json();

            if (json.success) {
                navigate('/verify-code', { state: { email } });
            } else {
                setErrorMessage(json.message);
            }
        } catch (error) {
            setErrorMessage('Une erreur s\'est produite. Veuillez réessayer.');
        } finally {
            setSubmitted(false); // Reset submitted state regardless of success or error
        }
    };

    return (
        <div className='w-full'>
            <form method="POST" onSubmit={handleSubmit} className='flex flex-col justify-center items-center space-y-6'>
                <div className="w-full flex flex-col items-center">
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`py-2 pl-2 pr-24 border-b border-gray-300 bg-white ${submitted && !errorMessage && 'border-green-500'}`}
                        required
                    />
                    <div className='h-2 mt-3 flex items-center justify-center'>
                        {errorMessage && (
                            <p className="text-red-500 text-bold text-sm flex-shrink-0">{errorMessage}</p>
                        )}
                    </div>
                </div>
                <button
                    type="submit"
                    className={`text-white bg-[#ff4700] hover:bg-[#e64500] font-medium rounded-lg text-sm px-14 py-4 text-center inline-flex items-center justify-center transition ease-in duration-300 min-w-[329.267px] ${submitted && 'opacity-50 pointer-events-none'}`}
                    disabled={submitted}
                >
                    {submitted ? 'Envoi en cours...' : 'Envoyer l\'Email de réinitialisation'}
                </button>


            </form>
        </div>
    );
};

export default ResetPasswordForm;