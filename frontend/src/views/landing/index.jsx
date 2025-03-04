import React from "react";
import treeIcon from "../../assets/tree.svg";
import onepercentPlanetLogo from "../../assets/One_Percent_for_the_Planet_logo.webp";
import ecoventureLogo from "../../assets/ecoventura.png";
import CustomButton from "../../components/UI/CustomButton";

import Hands from "../../assets/handholdingseed.png";
import "../../index.css";

export default function LandingPage() {
    return (
        <div className="flex flex-col w-screen h-screen">
            
            <div className="w-full h-16 bg-white flex justify-between items-center lg:px-16 md:px-16 px-8 z-20">
                <h1 className="text-4xl font-bold text-darkBlue">Tree</h1>
                <div>
                    <CustomButton href="/login" text="Se connecter" imageSrc={treeIcon} />
                </div>
            </div>
            <div className="relative w-full h-[75vh] bg-[#f1f0f6] py-12 space-y-4 flex flex-col lg:px-16 md:px-16 px-8 z-10">
                <img src={Hands} className="absolute h-full object-contain -top-10 right-40 animate-wiggle-slow z-0" />

                <h1 className="text-4xl p-5 text-darkBlue font-bold leading-tight ">
                    Protégeons notre planète,<br className="hidden md:inline" /> dès aujourd'hui.
                </h1>
                <p className="text-lg mt-8 p-3 text-gray-700 ">
                    Le premier réseau social dédié aux amoureux de la nature et à un avenir durable.
                </p>
                <div className="flex flex-row items-center space-x-4 pl-3">
                  
                    <p className="text-darkBlue font-bold text-sm">« 4.5/5 Une communauté engagée pour un avenir durable. »</p>
                </div>
                <div>
                    <CustomButton href="/signup" text="Commencer ici" className="lg:px-28 text-center" />
                </div>
                <div className="mt-8  flex flex-col items-start">
                    <div className="flex flex-col items-center">
                        <p className="text-xs text-darkBlue">Inscription gratuite, sans engagement</p>
                        <p className="text-xs text-gray-700">Découvrez des projets écologiques près de chez vous</p>
                    </div>
                </div>
            </div>
            <div className="bg-[#021d49] flex-grow flex items-center justify-center z-10">
                <div className="flex flex-row items-center space-x-20">
                    <img src={onepercentPlanetLogo} alt="" className="h-15 object-contain" />
                    <img src={ecoventureLogo} className="h-16 object-contain" />
                    <img src="//xplorermaps.com/cdn/shop/files/WebsiteLogoHeader_XplorerMaps.png?v=1675979048" className="h-14 object-contain" />
                    <img src="https://www.cifor-icraf.org/wp-content/themes/cifor-icraf/assets/images/logo/CIFOR-ICRAF-logo.svg" alt="" className="h-16 object-contain" />
                    <img src="https://ecosummit.net/wp-content/uploads/2024/01/eit.png" alt="" className="h-16 object-contain" />
                </div>
            </div>
        </div>
    );
}
