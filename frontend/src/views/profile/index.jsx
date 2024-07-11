import React, { useState } from "react";
import FormUser from "../../components/UserForm";
import Navbar from "../../components/Navbar";
import PostsToggle from "../../components/PostsToggle"; // Import the PostsToggle component

const Profile = () => {
    // Mocked user data
    const [userData, setUserData] = useState({
        firstName: "John",
        lastName: "Doe",
        date_signin: "2024-07-08 12:48:48",
        email: "john.doe@example.fr",
        phoneNumber: "0678987656",
        country: "France",
        gender: "Homme",
        address: "123 Rue Picard, Paris, France"
    });

    // Mocked list of publications
    const [publications, setPublications] = useState([
        { id_publication: 1, textarea_publication: "My first post!", date_time_publication: "2024-07-08 10:00:00" },
        { id_publication: 2, textarea_publication: "Another interesting post.", date_time_publication: "2024-07-08 12:00:00" },
        { id_publication: 3, textarea_publication: "Yet another insightful post.", date_time_publication: "2024-07-08 14:00:00" },
        { id_publication: 4, textarea_publication: "A new post added dynamically.", date_time_publication: "2024-07-09 09:00:00" },
        { id_publication: 5, textarea_publication: "One more post for the list.", date_time_publication: "2024-07-09 10:00:00" },
        { id_publication: 6, textarea_publication: "And Another.", date_time_publication: "2024-07-09 11:00:00" },
        { id_publication: 7, textarea_publication: "And Another again.", date_time_publication: "2024-07-09 12:00:00" },
    ]);

    // State to manage showing more posts
    const [showMorePosts, setShowMorePosts] = useState(false);

    // Function to toggle showing more posts
    const toggleShowMorePosts = () => {
        setShowMorePosts(!showMorePosts);
    };

    // Function to close the posts toggle
    const closePostsToggle = () => {
        setShowMorePosts(false);
    };

    // Function to get the last three posts (date-wise)
    const getLastThreePosts = () => {
        return publications.slice(-3).reverse(); // Reverse to display latest first
    };

    return (
        <>
            <div className="border">
                <Navbar />
            </div>
            <div className="flex flex-col items-start justify-center min-h-screen mx-auto p-4 w-full xl:w-2/3">
                {/* Profile Header */}
                <div className="w-full mb-6">
                    {/* Cover pic */}
                    <div className="bg-teal-900 h-32 w-full -mb-8 rounded-lg shadow-md"></div>
                    {/* Profile picture */}
                    <div className="flex items-center z-40 grid grid-rows-2 grid-flow-col">
                        <div className="h-20 w-20 bg-teal-100 rounded-full shadow-md ml-8"></div>
                        <div className="mt-5">
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
                        <div className="rounded-lg bg-white border border-gray-300 shadow-md p-4">
                            <span className="font-semibold text-teal-800 border-b border-teal-800 inline-block mb-2">
                                Badges
                            </span>
                        </div>

                        <div className="rounded-lg bg-white border border-gray-300 shadow-md p-4">
                            <span className="font-semibold text-teal-800 border-b border-teal-800 inline-block mb-2">
                                Contribution
                            </span>
                        </div>

                        <div className="rounded-lg bg-white border border-gray-300 shadow-md p-4">
                            <span className="font-semibold text-teal-800 border-b border-teal-800 inline-block mb-2">
                                Mes posts
                            </span>
                            <ul>
                                {getLastThreePosts().map(publication => (
                                    <li key={publication.id_publication} className="mb-2">
                                        <div className="font-semibold">
                                            {publication.textarea_publication}
                                        </div>
                                        <div className="text-gray-600 text-sm">
                                            {publication.date_time_publication}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            {publications.length > 3 && (
                                <button
                                    className="mt-2 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                                    onClick={toggleShowMorePosts}
                                >
                                    Montrer plus
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Personal information with FormUser */}
                <div className="w-full bg-white overflow-hidden p-2 flex flex-col items-start space-y-8 mt-4">
                    <span className="font-bold text-teal-800 border-b border-teal-800 border-gray-500 inline-block">
                        Informations personnelles
                    </span>
                    {/* Pass formData and setFormData to FormUser */}
                    <FormUser initialData={userData} updateUserData={setUserData} />
                </div>
            </div>

            {/* Show more posts toggle */}
            {showMorePosts && (
                <PostsToggle posts={publications.slice().reverse()} onClose={closePostsToggle} />
            )}
        </>
    );
};

export default Profile;
