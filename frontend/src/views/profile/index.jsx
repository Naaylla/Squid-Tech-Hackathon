import React, { useState, useEffect } from "react";
import FormUser from "../../components/UserForm";
import Navbar from "../../components/Navbar";
import PostsToggle from "../../components/PostsToggle";
import axios from "axios";
import "../../index.css";
import Chat from "../../components/Chat";

const Profile = () => {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        country: "",
        commune: "",
        phoneNumber: "",
        gender: "",
        birthDate: "",
        registrationDate: ""
    });

    const [publications, setPublications] = useState([]);
    const [showMorePosts, setShowMorePosts] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = sessionStorage.getItem("ss_user_id");
                if (!userId) {
                    throw new Error("User ID not found in sessionStorage");
                }

                // Fetch user data
                const userDataResponse = await axios.get(`http://localhost:8000/user/${userId}`);
                if (!userDataResponse.data || !userDataResponse.data.data) {
                    throw new Error("User data not found");
                }
                const userDataFromApi = userDataResponse.data.data[0]; // Assuming data is an array

                // Format the birthDate to "yyyy-MM-dd"
                const formattedBirthDate = new Date(userDataFromApi.date_naissance_user).toISOString().split("T")[0];

                //Format the formattedBirthDate to "dd/MM/yyyy"
                const finalFormattedBirthDate = formattedBirthDate.split('-').reverse().join('/');

                setUserData({
                    firstName: userDataFromApi.firstname_user || "",
                    lastName: userDataFromApi.lastname_user || "",
                    email: userDataFromApi.email_user || "",
                    username: userDataFromApi.username_user || "",
                    country: userDataFromApi.pays_user || "",
                    commune: userDataFromApi.commune_user || "",
                    phoneNumber: userDataFromApi.telephone_user || "",
                    gender: userDataFromApi.gender_user || "",
                    birthDate: finalFormattedBirthDate || "",
                    registrationDate: userDataFromApi.date_time_inscription_user || ""
                });

                // Fetch publications based on userId
                const publicationsResponse = await axios.get(`http://localhost:8000/publication/user/${userId}`);
                if (!Array.isArray(publicationsResponse.data.data)) {
                    throw new Error("Publications data is not an array");
                }
                setPublications(publicationsResponse.data.data);

            } catch (error) {
                console.error("Error fetching user data:", error);
                // Handle error as needed (e.g., redirect to login page)
            }
        };

        fetchUserData();
    }, []);

    const toggleShowMorePosts = () => {
        setShowMorePosts(!showMorePosts);
    };

    const closePostsToggle = () => {
        setShowMorePosts(false);
    };

    const getLastThreePosts = () => {
        if (publications.length === 0) {
            return [{ id_publication: 0, textarea_publication: "Pas de publications pour le moment", date_time_publication: "" }];
        }
        return publications.slice(-3).reverse();
    };

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        const truncatedText = text.substr(0, maxLength);
        return `${truncatedText.substr(0, truncatedText.lastIndexOf(" "))}...`;
    };

    const formatDate = (isoDate) => {
        const options = { hour: "numeric", minute: "numeric", day: "numeric", month: "long", year: "numeric" };
        return new Date(isoDate).toLocaleDateString("fr-FR", options);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append("file", file);

            // Example endpoint for uploading the file
            const uploadResponse = await axios.post("http://localhost:8000/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            console.log("File uploaded successfully:", uploadResponse.data);
            // Optionally, update user data or perform any other actions upon successful upload
        } catch (error) {
            console.error("Error uploading file:", error);
            // Handle error as needed
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="border">
                <Navbar />
            </div>
            <Chat></Chat>
            <div className="flex flex-col items-start justify-center min-h-screen mx-auto p-4 w-full xl:w-2/3">
                <div className="mt-20 mr-5 ml-5">
                    {/* Profile Header */}
                    <div className="w-full mb-6 relative">
                        {/* Cover pic */}
                        <div className="bg-teal-900 h-32 w-full -mb-8 rounded-lg shadow-md">
                            {/* Upload button for cover pic */}
                            <label
                                htmlFor="coverPicUpload"
                                className="absolute right-4 bottom-4 bg-white rounded-full p-2 cursor-pointer"
                            >
                                <svg
                                    className="w-6 h-6 text-teal-800"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M12 4v16m8-8H4"></path>
                                </svg>
                                <input
                                    id="coverPicUpload"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />
                            </label>
                        </div>
                        {/* Profile picture */}
                        <div className="flex items-center z-10 grid grid-rows-2 grid-flow-col mt-4">
                            <div className="h-20 w-20 bg-teal-100 rounded-full shadow-md ml-8 relative">
                                {/* Upload button for profile pic */}
                                <label
                                    htmlFor="profilePicUpload"
                                    className="absolute right-0 bottom-0 bg-white rounded-full p-2 cursor-pointer"
                                >
                                    <svg
                                        className="w-6 h-6 text-teal-800"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M12 4v16m8-8H4"></path>
                                    </svg>
                                    <input
                                        id="profilePicUpload"
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileUpload}
                                    />
                                </label>
                            </div>
                            <div className="mt-5 ml-4">
                                {/* User info */}
                                <div className="font-bold text-xl text-black">
                                    {userData.firstName} {userData.lastName.charAt(0)}.
                                </div>
                                <div className="text-gray-600">{userData.country}</div>
                            </div>
                        </div>
                    </div>

                    {/* Badges, contributions, and posts */}
                    <div className="mx-8">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-0 w-full">
                            <div className="profile-box">
                                <span className="profile-box-title">Badges</span>
                                {/* Display badges or relevant user details */}
                            </div>

                            <div className="profile-box">
                                <span className="profile-box-title">Contribution</span>
                                {/* Display contributions or relevant user details */}
                            </div>

                            <div className="profile-box">
                                <span className="profile-box-title">Mes posts</span>
                                {getLastThreePosts().map((publication) => (
                                    <ul key={publication.id_publication}>
                                        <li className="mb-2">
                                            <div className="font-semibold">
                                                {publication.textarea_publication === "Pas de publications pour le moment"
                                                    ? publication.textarea_publication
                                                    : truncateText(publication.textarea_publication, 50)}
                                            </div>
                                            <div className="text-gray-600 text-sm">
                                                {formatDate(publication.date_time_publication)}
                                            </div>
                                        </li>
                                    </ul>
                                ))}
                                <div className="flex justify-end">
                                    {publications.length > 3 && (
                                        <div className="more-details" onClick={toggleShowMorePosts}>
                                            → Tous vos posts
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Personal information with FormUser */}
                    <div className="w-full bg-white overflow-hidden p-2 flex flex-col items-start space-y-8 mt-4">
                        <span className="font-bold text-teal-800 border-b border-teal-800 border-gray-500 inline-block">
                            Informations personnelles
                        </span>
                        <FormUser initialData={userData} updateUserData={setUserData} />
                    </div>
                </div>

                {/* Show more posts toggle */}
                {showMorePosts && (
                    <PostsToggle posts={publications.slice().reverse()} onClose={closePostsToggle} />
                )}
            </div>
            
        </div>
    );
};

export default Profile;
