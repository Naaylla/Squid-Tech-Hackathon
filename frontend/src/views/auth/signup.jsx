import React from "react";
import { Link } from 'react-router-dom';
import SignupForm from "../../components/SignupForm";
import { TERipple } from "tw-elements-react";
import treeIcon from "../../assets/tree.svg";


export default function Signup() {
    return (
        <div className="relative flex w-full min-h-screen items-center justify-center  bg-gradient-to-r from-darkBlue to-indigo-500 overflow-hidden">
            <img src={treeIcon} className="absolute -bottom-40 -right-60 h-10/11 w-2/3 z-0 opacity-10 animate-wiggle-slow" />
            <div className="lg:w-customWidth2 md:w-96 w-96 z-10 my-12 rounded-3xl shadow-md bg-white overflow-hidden px-6 pt-5 pb-10 flex flex-col items-center justify-center space-y-2 ">
                <h1 className="text-center font-bold text-black text-3xl">Inscris-toi !</h1>
                <p className="font-normal text-lg text-center">
                    <span className="opacity-60 text-black text-base">Vous avez déjà un compte ? </span>
                    <Link to="/login" className="text-black font-semibold text-base hover:underline">
                        Connexion
                    </Link>
                </p>
                <SignupForm />

            </div>
        </div>



    );
}
