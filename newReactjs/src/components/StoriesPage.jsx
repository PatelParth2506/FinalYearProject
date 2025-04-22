import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import back from "../assets/img/stories/back.png";
import next from "../assets/img/stories/next.png";
import dp1 from "../assets/img/stories/dp1.jpg";
import send from '../assets/send.png'
import edit from '../assets/edit.png'
import del from '../assets/delete.png'
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export default function StoriesPage() {
  const [storiesData, setStoriesData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);
  const [currentUserStory, setCurrentUserStory] = useState({});
  const [CurrentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get("/api/story/getFollowingStory");
      console.log(res.data.data);
      setStoriesData(res.data.data);
      const currentuser = await axios.get("/api/story/getCurrentUserStory", {
        withCredentials: true
      })
      setCurrentUserStory(currentuser.data.data);
      const userdetail = await axios.get(`/api/user/getUserProfile`, {
        withCredentials: true
      })
      setCurrentUser(userdetail.data.data)
      console.log(currentuser.data.data);
      setLoading(false)
    };
    fetchdata();
    console.log(currentUserStory)
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

  const lastSwipeTimeRef = useRef(0)
  const MIN_SWIPE_DELAY = 300

  const handleManualSwipe = (direction) => {
    if (lastSwipeTimeRef.current < MIN_SWIPE_DELAY) return;
    clearInterval(intervalRef.current);
    direction === "next" ? setCurrentIndex((prevIndex) => (prevIndex + 1) % storiesData.length)
      : setCurrentIndex((prevIndex) => (prevIndex - 1 + storiesData.length) % storiesData.length);

    setTimeout(() => {
      startAutoPlay()
    }, 200)
  };

  const handleDeleteStory = async () => {
    console.log("Deleting Story", currentUserStory[0])
    const res = await axios.delete(`/api/story/deleteStory/${currentUserStory[0]._id}`, {
      withCredentials: true
    })
    const filter = storiesData.filter(s => s._id !== currentUserStory[0]._id)
    setCurrentUserStory(null)
    setStoriesData(filter)
  }

  const uploadstory = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageURL = URL.createObjectURL(file)
      const formdata = new FormData();
      formdata.append("photo", file);
      const res = await axios.post("/api/story/createStory", formdata, {
        withCredentials: true,
      });
      console.log(res)
      setCurrentUserStory(res.data.data)
      setStoriesData([res.data.data, ...storiesData])
      setCurrentIndex(0)
    }
  };


  return (
    <div className="flex h-[93vh] flex-col sm:flex-row pb-10 mb-10 sm:mb-0 sm:pb-0">
      {/* left sidebar */}
      <div className="sm:border-r sm:border-gray-300 flex sm:flex-[2] flex-col sm:px-6 sm:py-6 p-2 lg:flex-1 mt-2 sm:mt-0">
        <div className="hidden sm:block">
          <h2 className="text-4xl font-semibold mb-3 text-[#2B6EA0]">Stories</h2>
          <div className="flex gap-x-2">
            <button className="text-[13px] border border-gray-400 text-gray-500 hover:bg-gray-100 px-4 py-1 rounded-full">Settings</button>
            <button className="text-[13px] border border-gray-400 text-gray-500 hover:bg-gray-100 px-4 py-1 rounded-full">Archive</button>
          </div>
          <div className="h-[0.5px] bg-gray-500 my-4"></div>
        </div>

        <div className="flex flex-row sm:flex-col overflow-hidden">
          <p className="text-[15px] text-gray-900 font-semibold mb-2 hidden sm:block">Your story</p>
          <div className="min-w-[120px] flex items-center justify-between gap-x-3 sm:mb-1 sm:hover:bg-gray-100 p-1 px-2 rounded flex-col sm:flex-row">
            <div className="w-full flex items-center gap-x-3 flex-col sm:flex-row text-center sm:text-left">
              <img src={CurrentUser?.profilePhoto} alt="" className="w-[60px] h-[60px] rounded-full object-cover border-2 border-[#2B6EA0] p-[2px]" />
              <div className="w-full overflow-hidden">
                <p className="font-medium truncate text-[#1d4f75] max-w-[140px] sm:max-w-[200px]">{CurrentUser?.username}</p>
                <p className="text-xs text-gray-500 truncate max-w-[100px] sm:max-w-[160px] hidden sm:block">Add your story</p>
              </div>
            </div>
            <div className="">
              {currentUserStory && currentUserStory[0] ? (
                <img src={del} alt="delete" className="cursor-pointer w-6 h-6" onClick={handleDeleteStory} title="Delete Story" />
              ) : (
                <>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <img src={edit} alt="edit" title="Add Story" />
                  </label>
                  <input type="file" id="file-upload" accept="image/*" className="hidden" onChange={uploadstory} />
                </>
              )}
            </div>
          </div>

          <p className="text-[15px] text-gray-900 font-semibold mb-2 hidden sm:block">All stories</p>
          {loading ? (
            <div className="flex justify-center items-center sm:mt-[60px]">
              <h1 className='font-semibold text-gray-500 text-xl text-center'>
                Loading stories...
              </h1>
            </div>
          ) : storiesData.length ?
            <div className="overFlow overflow-auto h-full flex items-center sm:items-start flex-row sm:flex-col">
              {/* dynamic this div  */}
              {storiesData.map((story, index) => (
                <div key={story._id} className={`min-w-[88px] sm:min-w-full flex items-center gap-x-3 sm:mb-1 cursor-pointer p-1 px-2 rounded flex-col sm:flex-row text-center sm:text-left transition-all duration-200 ${currentIndex === index ? 'sm:bg-[#e5f3ff] sm:border-l-4 sm:border-[#2B6EA0]' : 'hover:bg-gray-100'}`} onClick={() => setCurrentIndex(index)}>
                  <img src={story.owner?.profilePhoto || dp1} alt="" className="w-[60px] h-[60px] sm:w-[65px] sm:h-[65px] object-cover rounded-full border-2 border-[#2B6EA0] p-[2px] flex-shrink-0" />
                  <div className="w-full overflow-hidden">
                    <p className="font-medium truncate">{story.owner?.username || "Unknown User"}</p>
                    <p className="text-xs text-gray-500 truncate">{dayjs(story.createdAt).fromNow()}</p>
                  </div>
                </div>
              ))}
            </div>
            :
            <div className="flex justify-center items-center sm:mt-[60px]">
              <h1 className='font-bold text-[#2B6EA0] text-xl text-center'>No stories yet. Start the conversation!</h1>
            </div>
          }
        </div>
      </div>

      <div className="mx-4 mb-5 mt-2 block sm:hidden"><hr className='text-[#2B6EA0]' /></div>

      {/* story side*/}
      <div className="md:flex-[3] flex justify-center items-center gap-5 flex-[4] relative sm:bg-gradient-to-tr from-[#e3e8fb] via-[#fcf3f3] to-[#dbeafe] px-0 md:px-5">
        {loading ? (
          <div className="flex justify-center items-center sm:mt-[60px]">
            <h1 className='font-semibold text-gray-400 text-xl text-center'>
              Loading stories...
            </h1>
          </div>
        ) : storiesData.length ?
          <>
            {/* previous */}
            {storiesData.length >= 3 ?
              <div className="rounded-xl w-[25%] h-[45%] relative cursor-pointer hidden lg:block">
                <div className="story-gradient"></div>
                <img src={storiesData[(currentIndex - 1 + storiesData.length) % storiesData.length]?.photo} alt="prev" className="rounded-xl w-full h-full object-cover" />
                <img src={back} className='w-10 h-10 rounded-full bg-white p-[1.5px] absolute cursor-pointer top-1/2 -left-5 transform -translate-y-1/2' onClick={() => handleManualSwipe('prev')} />
                <div className="absolute bottom-2 left-2 text-white text-xs font-semibold">{storiesData[(currentIndex - 1 + storiesData.length) % storiesData.length]?.owner.username}</div>
              </div>
              :
              <div className="rounded-xl w-[25%] h-[45%] relative cursor-pointer hidden lg:block">
                <div className="w-full h-full flex justify-center items-center rounded-2xl bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100">
                </div>
              </div>
            }

            {/* current */}
            <div className="relative w-[90%] h-[70vh] rounded-xl shadow-xl m-1 md:w-[410px] md:h-[85%]">
              <img src={back} className='w-10 h-10 rounded-full bg-white p-[1.5px] absolute cursor-pointer top-1/2 -left-5 transform -translate-y-1/2 block lg:hidden' onClick={() => handleManualSwipe('prev')} />
              <img src={next} className='w-10 h-10 rounded-full bg-white p-[1.5px] absolute cursor-pointer top-1/2 -right-5 transform -translate-y-1/2 block lg:hidden' onClick={() => handleManualSwipe('next')} />
              <img src={storiesData[currentIndex]?.photo} alt="current" className="w-full h-full object-cover rounded-xl" />
              <div className="gradientBgStory absolute top-0 left-0 w-full flex justify-between items-center p-4">
                <div className="flex items-center gap-x-3">
                  <img src={storiesData[currentIndex]?.owner.profilePhoto} alt="user" className="w-12 h-12 rounded-full border border-white" />
                  <div>
                    <p className="text-white font-medium">{storiesData[currentIndex]?.owner.username}</p>
                    <p className="text-xs text-gray-200">{dayjs(storiesData[currentIndex]?.createdAt).fromNow()}</p>
                  </div>
                </div>
                <div className="text-white text-2xl cursor-pointer">•••</div>
              </div>
              <div className="gradientBgStoryBottom absolute bottom-0 w-full p-4 flex justify-between gap-x-2">
                <input type="text" placeholder="Write a reply" className="flex-1 px-4 py-2 rounded-2xl bg-[#00000077] text-white text-sm outline-none" />
                <div className="w-10 h-10 bg-[#00000077] p-2 rounded-full">
                  <img src={send} alt="send" className='w-9' />
                </div>
              </div>
            </div>

            {/* next */}
            {storiesData.length >= 2 ?
              <div className="w-[25%] h-[45%] rounded-xl relative group cursor-pointer hidden lg:block">
                <div className="story-gradient"></div>
                <img src={storiesData[(currentIndex + 1) % storiesData.length]?.photo} alt="next" className="w-full h-full rounded-xl object-cover" />
                <img src={next} className='w-10 h-10 rounded-full bg-white p-[1.5px] absolute cursor-pointer top-1/2 -right-5 transform -translate-y-1/2' onClick={() => handleManualSwipe('next')} />
                <div className="absolute bottom-2 left-2 text-white text-xs font-semibold">{storiesData[(currentIndex + 1) % storiesData.length]?.owner.username}</div>
              </div>
              :
              <div className="rounded-xl w-[25%] h-[45%] relative cursor-pointer hidden lg:block">
                <div className="w-full h-full flex justify-center items-center rounded-2xl bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100">
                </div>
              </div>
            }
          </>
          :
          <div className="flex justify-center items-center">
            <h1 className='font-bold text-[#2B6EA0] text-2xl text-center'>No stories yet. Start the conversation!</h1>
          </div>
        }
      </div>
    </div>
  );
}

