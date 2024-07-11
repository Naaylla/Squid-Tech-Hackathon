// src/components/Comment.jsx

import React from 'react';

const Comment = ({ comment }) => {
    return (
        <div className="flex items-center mb-2">
            <img src={comment.author.avatar} alt="Comment Author Avatar" className="w-8 h-8 rounded-full mr-2" />
            <div>
                <h4 className="font-semibold">{comment.author.name}</h4>
                <p className="text-gray-600 text-sm">{comment.content}</p>
                <p className="text-gray-500 text-xs">{new Date(comment.timestamp).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default Comment;
