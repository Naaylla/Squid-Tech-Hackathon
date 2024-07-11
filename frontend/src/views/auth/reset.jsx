import React from "react";
import ResetPasswordForm from "../../components/ResetPasswordForm"
import { Link } from 'react-router-dom';

export default function Reset() {
    return (
        <div className="flex w-full min-h-screen items-center justify-center">
            <div className="lg:w-2/5 md:w-96 w-96 mt-12 mb-12 rounded-3xl shadow-md bg-white overflow-hidden p-8 flex flex-col items-center justify-center space-y-6 border-2 border-neutral-400 border-opacity-50"
            >
                <h1 className="text-center font-bold text-black text-3xl">Mot de passe oublié ?</h1>
                <p className="text-bold text-basic text-center text-black opacity-50">
                    Entrez l'adresse e-mail que vous avez utilisée pour créer votre compte.
                    Nous vous enverrons un e-mail de réinitialisation de mot de passe.
                </p>
                <ResetPasswordForm>
                </ResetPasswordForm>
                <Link to="/login" className="text-black font-semibold text-base hover:underline">
                    Retour à la connexion.
                </Link>
            </div>
        </div>
    );
}