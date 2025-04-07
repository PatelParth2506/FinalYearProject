import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import back from "../assets/img/stories/back.png";
import next from "../assets/img/stories/next.png";
import dp1 from "../assets/img/stories/dp1.jpg";

export default function StoriesPage() {
    const [storiesData, setStoriesData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.get("/api/story/getFollowingStory");
                console.log(res.data.data);
                setStoriesData(res.data.data);
            } catch (error) {
                console.error("Error fetching stories:", error);
            }
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

    return (
        <div className="flex h-[93vh] flex-col sm:flex-row font-sans">
            {/* Left Sidebar */}
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

            <div className="md:flex-[3] flex justify-center items-center gap-5 flex-[4] relative sm:bg-[#f6f6f6] px-0 md:px-5">
                {storiesData[currentIndex] && (
                    <div className="relative w-[90%] h-[92%] rounded-xl shadow-xl m-1 md:w-[410px] md:h-[85%]">
                        <img
                            src={storiesData[currentIndex].photo}
                            alt="current"
                            className="w-full h-full object-cover rounded-xl"
                        />
                        <div className="gradientBgStory absolute top-0 left-0 w-full flex justify-between items-center p-4">
                            <div className="flex items-center gap-x-3">
                                <img
                                    src={storiesData[currentIndex].owner?.profilePhoto || dp1}
                                    alt="user"
                                    className="w-12 h-12 rounded-full border border-white"
                                />
                                <div>
                                    <p className="text-white font-medium">
                                        {storiesData[currentIndex].owner?.username || "Unknown User"}
                                    </p>
                                    <p className="text-xs text-gray-300">
                                        {new Date(storiesData[currentIndex].createdAt).toLocaleString([],{hour:'2-digit',minute:'2-digit'})}
                                    </p>
                                </div>
                            </div>
                            <div className="text-white text-2xl cursor-pointer">•••</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}