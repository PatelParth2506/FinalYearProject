import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import herat from '../assets/heart.png';
import heratfill from '../assets/heartFill.png';

function getUserPosts() {
    const { userID, postID } = useParams();
    const [posts, setPosts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const userRes = await axios.get(`/api/user/getuser/${userID}`);
                setUser(userRes.data.data);

                const postRes = await axios.get(`/api/post/getuserAllpost/${userID}`);
                const userPosts = postRes.data.data;
                setPosts(userPosts);

                const index = userPosts.findIndex((p) => p._id === postID);
                setCurrentIndex(index !== -1 ? index : 0);
            } catch (err) {
                console.log(err);
            }
        };
        fetchdata();
    }, [userID, postID]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown') {
                setCurrentIndex((prev) => Math.min(posts.length - 1, prev + 1));
            } else if (e.key === 'ArrowUp') {
                setCurrentIndex((prev) => Math.max(0, prev - 1));
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [posts]);

    const toggleLike = async (postid) => {
        const like = await axios.post(`/api/post/likepost/${postid}`, {}, {
            withCredentials: true
        });
        setPosts((prev) =>
            prev.map((p) => (p._id === postid ? like.data.data : p))
        );
    };

    const currentPost = posts[currentIndex];

    if (!currentPost) return <div className="text-center text-xl py-10">Loading...</div>;

    const hasLiked = currentPost.likes.includes(user._id);

    return (
        <div className="w-full h-screen flex items-center justify-center bg-black text-white relative">
            <div className="w-full max-w-md h-full flex flex-col items-center justify-center p-4">
                <img src={currentPost.photo} alt="post" className="w-full h-auto rounded-lg" />
                <p className="mt-2 text-white text-center">{currentPost.description}</p>
                <div className="flex items-center justify-center gap-x-2 mt-2">
                    <img
                        src={hasLiked ? heratfill : herat}
                        onClick={() => toggleLike(currentPost._id)}
                        alt="heart"
                        className="cursor-pointer w-6 h-6"
                    />
                    <p className="text-white text-sm">{currentPost.likes.length}</p>
                </div>
            </div>
        </div>
    );
}

export default getUserPosts;
