import React, { useState } from 'react';
import Post from './Post';
import Uploaded from './Uploaded';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import hello from '../assets/hello.png'
import star from '../assets/star.png'

function Home() {
    const [user, setUser] = useState({});
    const { userID } = useParams();
    const [postText, setPostText] = useState('');

    useEffect(() => {
        console.log(user);
        
        const fetchdata = async () => {
            const res = await axios.get('/api/user/getUserProfile', {
                withCredentials: true,
            });
            setUser(res.data.data);
        };
        fetchdata();
    }, []);
    
    return (
        <>
            <div className="bg-gradient-to-tr from-[#e0e7ff] via-[#fcf3f3] to-[#dbeafe] min-h-screen w-full px-1 sm:px-6 lg:px-12 py-5">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                    <div className="lg:col-span-8 space-y-5 xl:mx-5">
                        <div className="bg-white/70 rounded-2xl px-6 py-5">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2B6EA0] flex gap-3 items-center">Welcome to ConnectMe <img src={hello} alt="hello" className='w-12 h-12' /></h1>
                            <p className="text-gray-600 mt-2 text-md sm:text-lg">Share moments, inspire friends, and stay connected.</p>
                        </div>

                        <div className="bg-white/90 shadow-md rounded-2xl p-6 block sm:hidden">
                            <h3 className="text-lg font-medium text-[#2B6EA0] mb-2">Explore Tags</h3>
                            <div className="flex flex-wrap gap-3">
                                {['#Design', '#Ideas', '#Inspire', '#DevTalk', '#React', '#Mindset'].map(tag => (
                                    <span key={tag} onClick={() => setPostText((prev) => prev + ' ' + tag)} className="bg-[#dbeafe] text-[#1e40af] px-3 py-1 rounded-full text-sm font-semibold cursor-pointer hover:bg-[#bfdbfe] transition">{tag}</span>
                                ))}
                            </div>
                        </div>

                        {!userID && (<Post user={user} postText={postText} setPostText={setPostText} />)}

                        <div className="w-full h-[1.5px] bg-[#3c7daf]"></div>

                        <div className="h-fit rounded-xl bg-white pb-5">
                            <h2 className="text-xl font-semibold text-[#2B6EA0] pt-5 pl-5 flex items-center gap-2"> Trending Moments <img src={star} alt="star" className='w-8 h-8' /></h2>
                            <Uploaded user={user} />
                        </div>
                    </div>

                    <div className="lg:col-span-4 hidden sm:block">
                        <div className="sticky top-6 space-y-3">
                            <div className="bg-white/80 backdrop-blur-xl shadow-md rounded-2xl p-6 space-y-3 text-sm text-gray-700">
                                <h3 className="text-lg font-bold text-[#2B6EA0]">📊 Your Engagement</h3>
                                <div className="flex justify-between">
                                    <span>Posts:</span><span>12</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Followers:</span><span>248</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Likes Received:</span><span>1.3k</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Comments:</span><span>315</span>
                                </div>
                            </div>

                            <div className="bg-white/90 shadow-md rounded-2xl p-6">
                                <h3 className="text-lg font-medium text-[#2B6EA0] mb-2">Explore Tags</h3>
                                <div className="flex flex-wrap gap-3">
                                    {['#Design', '#Ideas', '#Inspire', '#DevTalk', '#React', '#Mindset'].map(tag => (
                                        <span key={tag} onClick={() => setPostText((prev) => prev + ' ' + tag)} className="bg-[#dbeafe] text-[#22557b] px-3 py-1 rounded-full text-sm font-semibold cursor-pointer hover:bg-[#bfdbfe] transition">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;