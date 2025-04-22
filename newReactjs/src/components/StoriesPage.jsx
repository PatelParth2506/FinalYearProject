import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import back from "../assets/img/stories/back.png";
import next from "../assets/img/stories/next.png";
import dp1 from "../assets/img/stories/dp1.jpg";
import send from '../assets/send.png'


export default function StoriesPage() {
    const [storiesData, setStoriesData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentUserStory, setCurrentUserStory] = useState(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        const fetchdata = async () => {
                const res = await axios.get("/api/story/getFollowingStory");
                console.log(res.data.data);
                setStoriesData(res.data.data);
                const currentuser=await axios.get("/api/story/getCurrentUserStory",{
                    withCredentials:true
                })
                setCurrentUserStory(currentuser.data.data);
                console.log(currentuser.data.data);
        };
        fetchdata();
    }, []);

    useEffect(() => {
        startAutoPlay();
        return () => clearInterval(intervalRef.current);
    }, [currentIndex]);

    const startAutoPlay = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            nextStory();
        }, 5000);
    };

    const nextStory = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % storiesData.length);
    };

    const prevStory = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + storiesData.length) % storiesData.length);
    };

    const handleManualSwipe = (direction) => {
        clearInterval(intervalRef.current);
        direction === "next" ? nextStory() : prevStory();
        startAutoPlay();
    };

    const uploadstory = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        try {
            const formData = new FormData();
            formData.append("photo", file);
    
            const res = await axios.post("/api/story/createStory", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
    
            console.log("Story uploaded:", res.data);
            // Optional: Refresh stories after upload
            window.location.reload();
        } catch (err) {
            console.error("Failed to upload story:", err);
        }
    };
    
    if (storiesData.length === 0) {
        return (
            <div className="flex h-[93vh] flex-col sm:flex-row font-sans">
                {/* Sidebar */}
                <div className="sm:border-r sm:border-gray-300 flex sm:flex-[2] flex-col sm:px-6 sm:py-6 p-2 lg:flex-[1] mt-5 sm:mt-0">
                    <div className="hidden sm:block">
                        <h2 className="text-4xl font-semibold mb-3 text-gray-900">Stories</h2>
                        <div className="flex gap-x-2">
                            <button className="text-[13px] border border-gray-400 text-gray-500 hover:bg-gray-100 px-4 py-1 rounded-full">Settings</button>
                            <button className="text-[13px] border border-gray-400 text-gray-500 hover:bg-gray-100 px-4 py-1 rounded-full">Archive</button>
                        </div>
                        <div className="h-[0.5px] bg-gray-500 my-4"></div>
                    </div>
    
                    {/* Add Story Option */}
                    <div className="flex flex-col items-center justify-center mt-10 gap-4">
                        <img src={dp1} alt="profile" className="w-[60px] h-[60px] rounded-full border-2 border-[#2B6EA0] p-[2px]" />
                        <p className="text-base text-gray-800 font-semibold">You haven't posted a story yet</p>
                        <button
    onClick={() => document.getElementById("storyUploadInput").click()}
    className="text-sm bg-[#2B6EA0] text-white px-4 py-2 rounded-full hover:bg-[#1e4d74] transition-all duration-200"
>
    + Add Story
</button>
<input
    type="file"
    accept="image/*"
    id="storyUploadInput"
    onChange={uploadstory}
    className="hidden"
/>

                    </div>
                </div>
    
                {/* Main content area */}
                <div className="flex-1 flex items-center justify-center">
                    <h1 className="text-2xl font-semibold text-gray-800">No stories available</h1>
                </div>
            </div>
        );
    }
    

    return (
        <div className="flex h-[93vh] flex-col sm:flex-row font-sans">
            {/* left sidebar */}
            <div className="sm:border-r sm:border-gray-300 flex sm:flex-[2] flex-col sm:px-6 sm:py-6 p-2 lg:flex-[1] mt-5 sm:mt-0">
                <div className="hidden sm:block">
                    <h2 className="text-4xl font-semibold mb-3 text-gray-900">Stories</h2>
                    <div className="flex gap-x-2">
                        <button className="text-[13px] border border-gray-400 text-gray-500 hover:bg-gray-100 px-4 py-1 rounded-full">Settings</button>
                        <button className="text-[13px] border border-gray-400 text-gray-500 hover:bg-gray-100 px-4 py-1 rounded-full">Archive</button>
                    </div>
                    <div className="h-[0.5px] bg-gray-500 my-4"></div>
                </div>

                <div className="flex flex-row sm:flex-col overflow-hidden">
                    <p className="text-[15px] text-gray-900 font-semibold mb-2 hidden sm:block">Your story</p>
                    <div className="min-w-30 flex items-center gap-x-3 sm:mb-1 cursor-pointer sm:hover:bg-gray-100 p-1 px-2 rounded flex-col sm:flex-row text-center sm:text-left">
                        <img src={dp1} alt="" className="w-[60px] h-[60px] rounded-full border-2 border-[#2B6EA0] p-[2px] flex-shrink-0" />
                        <div className="w-full overflow-hidden">
                            <p className="font-medium truncate max-w-[140px] sm:max-w-[200px]">Ben Goro</p>
                            <p className="text-xs text-gray-500 truncate max-w-[100px] sm:max-w-[160px]">Added 20h ago</p>
                        </div>
                    </div>
                    <p className="text-[15px] text-gray-900 font-semibold mb-2 hidden sm:block">Followed stories</p>
                    <div className="overFlow overflow-auto h-full flex items-center sm:items-start flex-row sm:flex-col">
                        {storiesData.map((story, index) => (
                            <div
                                key={story._id}
                                className="w-[100px] sm:min-w-full flex items-center gap-x-3 sm:mb-1 cursor-pointer sm:hover:bg-gray-100 p-1 px-2 rounded flex-col sm:flex-row text-center sm:text-left"
                                onClick={() => setCurrentIndex(index)}
                            >
                                <img
                                    src={story.owner?.profilePhoto || dp1}
                                    alt=""
                                    className="w-[60px] h-[60px] rounded-full border-2 border-[#2B6EA0] p-0.5 flex-shrink-0"
                                />
                                <div className="w-full overflow-hidden">
                                    <p className="font-medium truncate max-w-[140px] sm:max-w-[200px]">
                                        {story.owner?.username || "Unknown User"}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate max-w-[100px] sm:max-w-[160px]">
                                        {new Date(story.createdAt).toLocaleString([],{hour:'2-digit',minute:'2-digit'})}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* story side*/}
            <div className="md:flex-[3] flex justify-center items-center gap-5 flex-[4] relative sm:bg-[#f6f6f6] px-0 md:px-5">
                {/* previous */}
                <div className="rounded-xl w-[25%] h-[45%] relative cursor-pointer hidden lg:block">
                    <div className="story-gradient"></div>
                    <img src={storiesData[(currentIndex - 1 + storiesData.length) % storiesData.length]?.photo} alt="prev" className="rounded-xl w-full h-full object-cover" />
                    <img src={back} className='w-10 h-10 rounded-full bg-white p-[1.5px] absolute cursor-pointer top-1/2 -left-5 transform -translate-y-1/2' onClick={() => handleManualSwipe('prev')} />
                    <div className="absolute bottom-2 left-2 text-white text-xs font-semibold">{storiesData[(currentIndex - 1 + storiesData.length) % storiesData.length]?.owner.username}</div>
                </div>

                {/* current */}
                <div className="relative w-[90%] h-[92%] rounded-xl shadow-xl m-1 md:w-[410px] md:h-[85%]">
                    <img src={back} className='w-10 h-10 rounded-full bg-white p-[1.5px] absolute cursor-pointer top-1/2 -left-5 transform -translate-y-1/2 block lg:hidden' onClick={() => handleManualSwipe('prev')} />
                    <img src={next} className='w-10 h-10 rounded-full bg-white p-[1.5px] absolute cursor-pointer top-1/2 -right-5 transform -translate-y-1/2 block lg:hidden' onClick={() => handleManualSwipe('next')} />
                    <img src={storiesData[currentIndex]?.photo} alt="current" className="w-full h-full object-cover rounded-xl" />
                    <div className="gradientBgStory absolute top-0 left-0 w-full flex justify-between items-center p-4">
                        <div className="flex items-center gap-x-3">
                            <img src={storiesData[currentIndex]?.owner.profilePhoto} alt="user" className="w-12 h-12 rounded-full border border-white" />
                            <div>
                                <p className="text-white font-medium">{storiesData[currentIndex]?.owner.username}</p>
                                <p className="text-xs text-gray-300">{storiesData[currentIndex]?.createdAt}</p>
                            </div>
                        </div>
                        <div className="text-white text-2xl cursor-pointer">•••</div>
                    </div>
                    <div className="gradientBgStoryBottom absolute bottom-0 w-full p-4 flex justify-between gap-x-2">
                        <input type="text" placeholder="Write a reply" className="flex-1 px-4 py-2 rounded-2xl bg-[#00000077] text-white text-sm outline-none" />
                        <div className="w-10 h-10 bg-[#00000077] p-2 rounded-full">
                            <img src={send} alt="send" className='w-10' />
                        </div>
                    </div>
                </div>

                {/* next */}
                <div className="w-[25%] h-[45%] rounded-xl relative group cursor-pointer hidden lg:block">
                    <div className="story-gradient"></div>
                    <img src={storiesData[(currentIndex + 1) % storiesData.length]?.photo} alt="next" className="w-full h-full rounded-xl object-cover" />
                    <img src={next} className='w-10 h-10 rounded-full bg-white p-[1.5px] absolute cursor-pointer top-1/2 -right-5 transform -translate-y-1/2' onClick={() => handleManualSwipe('next')} />
                    <div className="absolute bottom-2 left-2 text-white text-xs font-semibold">{storiesData[(currentIndex + 1) % storiesData.length]?.owner.username}</div>
                </div>
            </div>
        </div>
    );
}

