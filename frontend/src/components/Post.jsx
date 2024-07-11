import React, { useState } from 'react';
import Comment from '../components/Comment';
import LikeButton from '../components/UI/LikeButton';

const Post = ({ post }) => {
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState(post.comments);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const newCommentObject = {
            id: `comment${comments.length + 1}`,
            author: {
                id: 'user1',  // REPLACE HERE WITH BACK END connection
                name: 'John Doe',
                avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            },
            content: newComment,
            timestamp: new Date().toISOString(),
        };
        setComments([...comments, newCommentObject]);
        setNewComment('');
    };

    return (
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-4">
            <div className="p-4">
                <div className="flex items-center">
                    <img src={post.author.avatar} alt="Author Avatar" className="w-10 h-10 rounded-full mr-2" />
                    <div>
                        <h3 className="font-bold">{post.author.name}</h3>
                        <p className="text-sm text-gray-600">{new Date(post.timestamp).toLocaleString()}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-gray-800">{post.content}</p>
                    {post.image && (
                        <img src={post.image} alt="Post" className="mt-4 rounded-lg" />
                    )}
                </div>
                <div className="mt-4 flex flex-row justify-between">
                    <button onClick={() => setShowCommentForm(!showCommentForm)} className="ml-2 text-sm text-gray-600 hover:text-blue-500 focus:outline-none">
                        {showCommentForm ? 'Close Comments' : 'Comment'}
                    </button>
                    <LikeButton likes={post.likes} />
                </div>
            </div>
            {showCommentForm && (
                <form className="p-4 bg-gray-100" onSubmit={handleCommentSubmit}>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full px-3 py-2 bg-white border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Write a comment..."
                        rows="2"
                    ></textarea>
                    <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
                        Post Comment
                    </button>
                </form>
            )}
            <div className="bg-gray-100 p-4">
                {comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
};

export default Post;
