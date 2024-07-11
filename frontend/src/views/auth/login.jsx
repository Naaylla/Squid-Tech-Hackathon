import React from "react";
import { Link } from 'react-router-dom';
import LoginForm from "../../components/LoginForm";
import { TERipple } from "tw-elements-react";
import treeIcon from "../../assets/tree.svg";
import "../../index.css"

export default function Login() {
    return (
        <div className="relative flex w-full h-screen items-center justify-center bg-gradient-to-r from-darkBlue to-indigo-500 overflow-hidden">
            <img src={treeIcon} className="absolute -bottom-40 -left-40 h-10/11 w-2/3 z-0 opacity-10 animate-wiggle-slow" />
            <div className="lg:w-customWidth md:w-96 w-96 z-10 my-12 rounded-3xl shadow-md bg-white overflow-hidden px-6 pt-5 pb-10 flex flex-col items-center justify-center space-y-3">
                <h1 className="text-center font-bold text-black text-3xl">Bienvenue !</h1>
                <p className="font-normal text-lg text-center">
                    <span className="opacity-60 text-black text-base">Vous n’avez pas de compte ? </span>
                    <Link to="/signup" className="text-black font-semibold text-base hover:underline">
                        S’inscrire
                    </Link>
                </p>
                <LoginForm />
                <p className="text-xs py-3"><a href="/reset-password">Mot de passe oublié ?</a></p>
                <div className="my-4 w-full flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-xs text-center">
                        Ou continuer avec
                    </p>
                </div>
                <div className="w-full flex justify-center items-center">
                    <TERipple rippleColor="light" className="cursor-pointer w-3/4">
                        <a
                            className="flex w-full items-center justify-center rounded bg-white px-7 pb-2.5 pt-3 text-center text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-gray-200 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-gray-200 focus:outline-none focus:ring-0 active:bg-gray-300 dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            style={{ backgroundColor: "#ffffff", color: "#000000" }}
                            href="#!"
                            role="button"
                        >
                            <svg className="mr-2 h-3.5 w-3.5"
                                width="15px" height="15px" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" /></svg>
                            Continuez avec Google
                        </a>
                    </TERipple>
                </div>
            </div>
        </div>
    );
}
