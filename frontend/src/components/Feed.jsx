import React from 'react';
import PostCreation from './PostCreation';
import Post from './Post';
import EventCreation from './EventCreation';
import { dummyPosts } from '../dummydata';
import { dummyEvents } from '../dummyEvents';


const Feed = () => {
    return (
        <div className="flex flex-col items-center">
            <PostCreation />
            {dummyPosts.map(post => (
                <Post key={post.id} post={post} />
            ))}

        </div>
    );
};

export default Feed;
