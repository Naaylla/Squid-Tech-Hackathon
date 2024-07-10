import React, { useRef, useEffect } from "react";

const PostsToggle = ({ posts, onClose }) => {
    const toggleRef = useRef(null);

    // Function to handle clicks outside the toggle
    const handleClickOutside = (event) => {
        if (toggleRef.current && !toggleRef.current.contains(event.target)) {
            onClose();
        }
    };

    // Effect to add event listener when component mounts
    useEffect(() => {
        // Add event listener on mount
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up event listener on unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div ref={toggleRef} className="bg-teal-700 p-8 w-full rounded-lg border-2 border-teal-700 max-w-3xl  relative">
        <h2 className="text-3xl text-white font-bold mb-4">Toutes les publications</h2>
        <button
            className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-teal-700 text-white hover:bg-teal-600"
            onClick={onClose}
        >
            X
        </button>
        <div className="m-2 p-8 bg-white border-2 border-teal-700 overflow-y-auto" style={{ maxHeight: "65vh" }}>
            <div className="space-y-4">
                {posts.map((post) => (
                    <div key={post.id_publication} className="border p-4 rounded-lg">
                        <p className="font-semibold">{post.textarea_publication}</p>
                        <p className="text-gray-600 text-sm">{post.date_time_publication}</p>
                        <div className="flex justify-end">
                        <div className="more-details"> Voir la publication</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
</div>

    );
};

export default PostsToggle;
