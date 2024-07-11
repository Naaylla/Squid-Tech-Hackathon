// PostsToggle.js
import React from "react";

const PostsToggle = ({ posts, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 w-full max-w-3xl">
                <h2 className="text-xl font-bold mb-4">More Posts</h2>
                <div className="m-10 overflow-y-auto" style={{ maxHeight: "60vh" }}>
                <div className="space-y-4">
                    {posts.map(post => (
                        <div key={post.id_publication} className="border p-4 rounded-lg">
                            <p className="font-semibold">{post.textarea_publication}</p>
                            <p className="text-gray-600 text-sm">{post.date_time_publication}</p>
                        </div>
                    ))}
                </div>
                </div>
                <button
                    className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default PostsToggle;