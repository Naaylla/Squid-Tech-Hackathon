import React, { useState } from "react";
import FormUser from "../../components/FormUser";
import Navbar from "../../components/Navbar";

const Profile = () => {
    // fetch ici les données de l'utilisateur connecté :))
    const [userData, setUserData] = useState({
        firstName: "John",
        lastName: "Doe",
        date_signin:"2024-07-08 12:48:48",
        email: "john.doe@example.fr",
        phoneNumber: "0678987656",
        country: "France",
        gender: "Homme",
        address: "123 Rue Picard, Paris, France"
    });

    const handleUpdateUserData = (updatedData) => {
        setUserData(updatedData);
        console.log("Données utilisateur mises à jour :", updatedData);
    };

    return (
        <>
            <div className="border">
                <Navbar></Navbar>
            </div>
        <div className="flex flex-col items-start justify-center min-h-screen mx-auto p-4 w-full xl:w-2/3">
            {/* Profile Header */}
            <div className="w-full  mb-6">
                {/* cover pic */}
                <div className="bg-teal-900 h-32 w-full -mb-8 rounded-lg shadow-md"></div>
                {/* pfp */}
                <div className="flex items-center z-40 grid grid-rows-2 grid-flow-col">
                    <div className="h-20 w-20 bg-teal-100 rounded-full shadow-md ml-8"></div>
                    <div className="mt-5">
                        {/* Utilisation des infos user */}
                        <div className="font-bold text-xl text-black">{userData.firstName} {userData.lastName.charAt(0)}.</div>
                        <div className="text-gray-600">{userData.country}</div>
                    </div>
                </div>
             </div>

            {/*badges, contributions, et posts */}
            <div className="mx-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-0 w-full">
                    <div className="rounded-lg bg-white border border-gray-300 shadow-md p-4">
                        <span className="font-semibold text-teal-800 border-b border-teal-800 inline-block mb-2">Badges</span>
                    </div>

                    <div className="rounded-lg bg-white border border-gray-300 shadow-md p-4">
                        <span className="font-semibold text-teal-800 border-b border-teal-800 inline-block mb-2">Contribution</span>
                    </div>

                    <div className="rounded-lg bg-white border border-gray-300 shadow-md p-4">
                        <span className="font-semibold text-teal-800 border-b border-teal-800 inline-block mb-2">Mes posts</span>
                    </div>
                </div>
            </div>

            {/* Informations personnelles avec FormUser */}
            <div className="w-full bg-white overflow-hidden p-2 flex flex-col items-start space-y-8 mt-4">
                <span className="font-bold text-teal-800 border-b border-teal-800 border-gray-500 inline-block">Informations personnelles</span>
                {/* Passer formData et setFormData à FormUser */}
                <FormUser initialData={userData} updateUserData={handleUpdateUserData} />
            </div>
        </div>
        </>
    );
};

export default Profile;
