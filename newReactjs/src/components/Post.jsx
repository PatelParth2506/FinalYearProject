import React, { useState } from 'react';
import gallery from '../assets/gallery.png'
import axios from 'axios';

function Post({ user }) {
    const [bio, setBio] = useState('');
    const [image, setImage] = useState(null); 
    const [previewImage, setPreviewImage] = useState(''); 
    const [message, setMessage] = useState(''); 

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file); 
        setPreviewImage(URL.createObjectURL(file));
    };

    const createPost = async () => {
        if (!bio || !image) {
            setMessage('Both bio and image are required!');
            return;
        }

        const formData = new FormData();
        formData.append('description', bio); 
        formData.append('photo', image); 

        try {
            const res = await axios.post('/api/post/createpost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true, 
            });

            setMessage('Post created successfully!');
            setBio(''); 
            setImage(null);
            setPreviewImage('');
        } catch (error) {
            console.error('Error creating post:', error);
            setMessage('Failed to create post. Please try again.');
        }
    };

    return (
        <div className="loginForm bg-white p-4 rounded-xl font-sans">
            <div className="flex items-center gap-x-3">
                <img src={user.profilePhoto ?? "userPro.png"} alt="User Profile" className="w-10 h-10 rounded-full" />
                <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full bg-white border border-gray-300 rounded-full px-4 py-2 outline-none"
                />
            </div>

            <div className="flex mt-3">
                {previewImage && <img src={previewImage} alt="Selected" className="w-24 h-24 rounded" />}
            </div>

            <div className="flex items-center justify-between mt-3 px-2">
                <div className="flex space-x-4 text-gray-500">
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <img src={gallery} alt="gallery" className="w-5 h-5" />
                    </label>
                    <input
                        type="file"
                        id="file-upload"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </div>

                <button className="bg-blue-500 text-white text-[16px] px-8 py-2 rounded-2xl" onClick={createPost}>
                    Post
                </button>
            </div>

            {message && <p className="mt-3 text-center text-sm text-gray-600">{message}</p>}
        </div>
    );
}

export default Post;