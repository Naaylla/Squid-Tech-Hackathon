import React from "react";
import { Link } from 'react-router-dom';
import Form from "../../components/Form";

export default function Login() {
    return (
        <div className="flex w-full h-screen items-center justify-center">
            <div className="lg:w-2/4 md:w-6/12 rounded-lg shadow-md bg-white overflow-hidden p-8 flex flex-col items-center justify-center space-y-8 border-2 border-sky-500">
                <h1 className="text-center font-bold text-4xl">Bienvenue !</h1>
                <p className="font-light text-lg text-center">
                    <span className="opacity-60">Vous n'avez pas de compte ? </span>
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        S'inscrire
                    </Link>
                </p>
                <Form />
            </div>
        </div>
    );
}
