// src/components/PostCreation.jsx

import React, { useState } from 'react';
import { FiImage } from 'react-icons/fi'; // Importer une icône d'image depuis react-icons

const PostCreation = () => {
    const [content, setContent] = useState('');

    const handlePostSubmit = (e) => {
        e.preventDefault();
        // ICI CONNEXION AU BACK END
        console.log('Nouveau post soumis :', { content });
        setContent('');
    };

    return (
        <div className="w-full max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-4">
            <form className="p-4" onSubmit={handlePostSubmit}>
                <div className="mb-4 flex items-center">

                    <input
                        id="postImage"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            // Handle image upload if needed
                        }}
                    />
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-3 py-2 border bg-white rounded-md border-b border-black"
                        placeholder="À Quoi tu penses? Poste une publication !"
                        rows="4"
                    ></textarea>
                </div>
                <div className='flex flex-row justify-between'>
                    <label htmlFor="postImage" className="flex items-center justify-between text-sm font-medium text-gray-700 cursor-pointer">
                        <FiImage className="w-6 h-6 mr-2" /> Ajouter une Image
                    </label>

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostCreation;
