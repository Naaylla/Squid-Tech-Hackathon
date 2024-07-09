import React from "react";
import { Link } from 'react-router-dom';
import Form from "../../components/FormLogin";

export default function Login() {
    return (
        <div className="flex w-full h-screen items-center justify-center">
            <div className="lg:w-2/5 md:w-96 w-96 mt-12 rounded-3xl shadow-md bg-white overflow-hidden p-8 flex flex-col items-center justify-center space-y-8 border-2 border-neutral-400 border-opacity-50">
                <h1 className="text-center font-bold text-black text-3xl">Bienvenue !</h1>
                <p className="font-normal text-lg text-center">
                    <span className="opacity-60 text-black text-base">Vous n’avez pas de compte ? </span>
                    <Link to="/signup" className="text-black font-semibold text-base hover:underline">
                        S’inscrire
                    </Link>
                </p>
                <Form />
            </div>
        </div>
    );
}
