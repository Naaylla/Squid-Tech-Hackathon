import React from "react";

export default function Reset() {
    return (
        <div className="flex w-full min-h-screen items-center justify-center">
            <div className="lg:w-2/5 md:w-96 w-96 mt-12 mb-12 rounded-3xl shadow-md bg-white overflow-hidden p-8 flex flex-col items-center justify-center space-y-8 border-2 border-neutral-400 border-opacity-50">
                <h1 className="text-center font-bold text-black text-3xl">Mot de passe oublié ?</h1>
                <p className="font-normal text-lg text-center">
                    Entrez l'adresse e-mail que vous avez utilisée pour créer votre compte.
                    Nous vous enverrons un e-mail de réinitialisation de mot de passe.
                </p>
                <p className="text-xs"><a href="">Mot de passe oublié ?</a></p>
                <div className="my-4 w-full flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-xs text-center">
                        Ou continuer avec
                    </p>
                </div>

            </div>
        </div>
    );
}
