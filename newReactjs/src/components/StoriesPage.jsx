import react from 'react';
import back from '../assets/img/stories/back.png'
import next from '../assets/img/stories/next.png'
import dp1 from '../assets/img/stories/dp1.jpg'
import dp2 from '../assets/img/stories/dp2.jpg'
import dp3 from '../assets/img/stories/dp3.jpg'
import dp4 from '../assets/img/stories/dp4.jpg'
import dp5 from '../assets/img/stories/dp5.jpg'
import story1 from '../assets/img/stories/story1.jpg'
import story2 from '../assets/img/stories/story2.jpg'
import story3 from '../assets/img/stories/story3.jpg'
import send from '../assets/img/stories/send.png'

export default function StoriesPage() {
  return (
    <div className="flex h-[93vh] flex-col sm:flex-row">
      <div className="sm:border-r sm:border-gray-300 flex sm:flex-2 flex-col sm:px-6 sm:py-6 p-2 lg:flex-1 mt-5 sm:mt-0">
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
            {/* dynamic this div  */}
            <div className="w-25 sm:min-w-full flex items-center gap-x-3 sm:mb-1 cursor-pointer sm:hover:bg-gray-100 p-1 px-2 rounded flex-col sm:flex-row text-center sm:text-left">
              <img src={dp1} alt="" className="w-[60px] h-[60px] rounded-full border-2 border-[#2B6EA0] p-[2px] flex-shrink-0" />
              <div className="w-full overflow-hidden">
                <p className="font-medium truncate max-w-[140px] sm:max-w-[200px]">zeel_vaghasiya28</p>
                <p className="text-xs text-gray-500 truncate max-w-[100px] sm:max-w-[160px]">20 min ago</p>
              </div>
            </div>
            <div className="w-25 sm:min-w-full flex items-center gap-x-3 sm:mb-1 cursor-pointer sm:hover:bg-gray-100 p-1 px-2 rounded flex-col sm:flex-row text-center sm:text-left">
              <img src={dp2} alt="" className="w-[60px] h-[60px] rounded-full border-2 border-[#2B6EA0] p-[2px] flex-shrink-0" />
              <div className="w-full overflow-hidden">
                <p className="font-medium truncate max-w-[140px] sm:max-w-[200px]">zeel_vaghasiya28</p>
                <p className="text-xs text-gray-500 truncate max-w-[100px] sm:max-w-[160px]">20 min ago</p>
              </div>
            </div>
            <div className="w-25 sm:min-w-full flex items-center gap-x-3 sm:mb-1 cursor-pointer sm:hover:bg-gray-100 p-1 px-2 rounded flex-col sm:flex-row text-center sm:text-left">
              <img src={dp3} alt="" className="w-[60px] h-[60px] rounded-full border-2 border-[#2B6EA0] p-[2px] flex-shrink-0" />
              <div className="w-full overflow-hidden">
                <p className="font-medium truncate max-w-[140px] sm:max-w-[200px]">zeel_vaghasiya28</p>
                <p className="text-xs text-gray-500 truncate max-w-[100px] sm:max-w-[160px]">20 min ago</p>
              </div>
            </div>
            <div className="w-25 sm:min-w-full flex items-center gap-x-3 sm:mb-1 cursor-pointer sm:hover:bg-gray-100 p-1 px-2 rounded flex-col sm:flex-row text-center sm:text-left">
              <img src={dp4} alt="" className="w-[60px] h-[60px] rounded-full border-2 border-[#2B6EA0] p-[2px] flex-shrink-0" />
              <div className="w-full overflow-hidden">
                <p className="font-medium truncate max-w-[140px] sm:max-w-[200px]">zeel_vaghasiya28</p>
                <p className="text-xs text-gray-500 truncate max-w-[100px] sm:max-w-[160px]">20 min ago</p>
              </div>
            </div>
            <div className="w-25 sm:min-w-full flex items-center gap-x-3 sm:mb-1 cursor-pointer sm:hover:bg-gray-100 p-1 px-2 rounded flex-col sm:flex-row text-center sm:text-left">
              <img src={dp5} alt="" className="w-[60px] h-[60px] rounded-full border-2 border-[#2B6EA0] p-[2px] flex-shrink-0" />
              <div className="w-full overflow-hidden">
                <p className="font-medium truncate max-w-[140px] sm:max-w-[200px]">zeel_vaghasiya28</p>
                <p className="text-xs text-gray-500 truncate max-w-[100px] sm:max-w-[160px]">20 min ago</p>
              </div>
            </div>
            <div className="w-25 sm:min-w-full flex items-center gap-x-3 sm:mb-1 cursor-pointer sm:hover:bg-gray-100 p-1 px-2 rounded flex-col sm:flex-row text-center sm:text-left">
              <img src={dp1} alt="" className="w-[60px] h-[60px] rounded-full border-2 border-[#2B6EA0] p-[2px] flex-shrink-0" />
              <div className="w-full overflow-hidden">
                <p className="font-medium truncate max-w-[140px] sm:max-w-[200px]">zeel_vaghasiya28</p>
                <p className="text-xs text-gray-500 truncate max-w-[100px] sm:max-w-[160px]">20 min ago</p>
              </div>
            </div>
            <div className="w-25 sm:min-w-full flex items-center gap-x-3 sm:mb-1 cursor-pointer sm:hover:bg-gray-100 p-1 px-2 rounded flex-col sm:flex-row text-center sm:text-left">
              <img src={dp2} alt="" className="w-[60px] h-[60px] rounded-full border-2 border-[#2B6EA0] p-[2px] flex-shrink-0" />
              <div className="w-full overflow-hidden">
                <p className="font-medium truncate max-w-[140px] sm:max-w-[200px]">zeel_vaghasiya28</p>
                <p className="text-xs text-gray-500 truncate max-w-[100px] sm:max-w-[160px]">20 min ago</p>
              </div>
            </div>
            <div className="w-25 sm:min-w-full flex items-center gap-x-3 sm:mb-1 cursor-pointer sm:hover:bg-gray-100 p-1 px-2 rounded flex-col sm:flex-row text-center sm:text-left">
              <img src={dp3} alt="" className="w-[60px] h-[60px] rounded-full border-2 border-[#2B6EA0] p-[2px] flex-shrink-0" />
              <div className="w-full overflow-hidden">
                <p className="font-medium truncate max-w-[140px] sm:max-w-[200px]">zeel_vaghasiya28</p>
                <p className="text-xs text-gray-500 truncate max-w-[100px] sm:max-w-[160px]">20 min ago</p>
              </div>
            </div>
            <div className="w-25 sm:min-w-full flex items-center gap-x-3 sm:mb-1 cursor-pointer sm:hover:bg-gray-100 p-1 px-2 rounded flex-col sm:flex-row text-center sm:text-left">
              <img src={dp4} alt="" className="w-[60px] h-[60px] rounded-full border-2 border-[#2B6EA0] p-[2px] flex-shrink-0" />
              <div className="w-full overflow-hidden">
                <p className="font-medium truncate max-w-[140px] sm:max-w-[200px]">zeel_vaghasiya28</p>
                <p className="text-xs text-gray-500 truncate max-w-[100px] sm:max-w-[160px]">20 min ago</p>
              </div>
            </div>
            <div className="w-25 sm:min-w-full flex items-center gap-x-3 sm:mb-1 cursor-pointer sm:hover:bg-gray-100 p-1 px-2 rounded flex-col sm:flex-row text-center sm:text-left">
              <img src={dp5} alt="" className="w-[60px] h-[60px] rounded-full border-2 border-[#2B6EA0] p-[2px] flex-shrink-0" />
              <div className="w-full overflow-hidden">
                <p className="font-medium truncate max-w-[140px] sm:max-w-[200px]">zeel_vaghasiya28</p>
                <p className="text-xs text-gray-500 truncate max-w-[100px] sm:max-w-[160px]">20 min ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex-3 flex justify-center items-center gap-5 flex-4 relative sm:bg-[#f6f6f6] px-0 md:px-5">
        <div className="rounded-xl w-[25%] h-[45%] relative cursor-pointer hidden lg:block">
          <div className="story-gradient"></div>
          <img src={story1} alt="prev" className="rounded-xl w-full h-full object-cover" />
          <img src={back} className='w-10 h-10 rounded-full bg-white p-[1.5px] absolute cursor-pointer top-1/2 -left-5 transform -translate-y-1/2' />
          <div className="absolute bottom-2 left-2 text-white text-xs font-semibold">xyz_101</div>
        </div>

        <div className="relative w-[90%] h-[92%] rounded-xl shadow-xl m-1 md:w-[410px] md:h-[85%]">
          <img src={back} className='w-10 h-10 rounded-full bg-white p-[1.5px] absolute cursor-pointer top-1/2 -left-5 transform -translate-y-1/2 block lg:hidden' />
          <img src={next} className='w-10 h-10 rounded-full bg-white p-[1.5px] absolute cursor-pointer top-1/2 -right-5 transform -translate-y-1/2 block lg:hidden' />
          <img src={story2} alt="current" className="w-full h-full object-cover rounded-xl" />
          <div className="gradientBgStory absolute top-0 left-0 w-full flex justify-between items-center p-4">
            <div className="flex items-center gap-x-3">
              <img src={dp2} alt="user" className="w-12 h-12 rounded-full border border-white" />
              <div>
                <p className="text-white font-medium">zeel_vaghasiya28</p>
                <p className="text-xs text-gray-300">2 hours ago</p>
              </div>
            </div>
            <div className="text-white text-2xl cursor-pointer">•••</div>
          </div>
          <div className="gradientBgStoryBottom absolute bottom-0 w-full p-4 flex justify-between gap-x-2">
            <input type="text" placeholder="Write a reply" className="flex-1 px-4 py-2 rounded-2xl bg-[#00000077] text-white text-sm outline-none" />
            <div className="w-10 h-10 bg-[#00000077] p-2 rounded-full">
              <img src={send} alt="send" className='w-10'/>
            </div>
          </div>
        </div>

        <div className="w-[25%] h-[45%] rounded-xl relative group cursor-pointer hidden lg:block">
          <div className="story-gradient"></div>
          <img src={story3} alt="next" className="w-full h-full rounded-xl object-cover" />
          <img src={next} className='w-10 h-10 rounded-full bg-white p-[1.5px] absolute cursor-pointer top-1/2 -right-5 transform -translate-y-1/2' />
          <div className="absolute bottom-2 left-2 text-white text-xs font-semibold">abc_505</div>
        </div>
      </div>
    </div>
  );
}
