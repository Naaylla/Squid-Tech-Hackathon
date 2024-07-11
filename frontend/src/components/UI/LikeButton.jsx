// src/components/LikeButton.jsx

import React, { useState } from 'react';

const LikeButton = ({ likes }) => {
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
        // Handle like/unlike logic (e.g., update likes count)
    };

    return (
        <div className="flex items-center">
            <button onClick={handleLike} className={`text-sm px-2 py-1 rounded-full border ${liked ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {liked ? 'Unlike' : 'Like'} ({likes})
            </button>
        </div>
    );
};

export default LikeButton;
