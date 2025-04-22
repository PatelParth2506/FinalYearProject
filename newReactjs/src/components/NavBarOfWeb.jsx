// import React, { useState } from 'react';
// import instagram from '../assets/img/stories/instagram.png';
// import notification from '../assets/img/stories/notification.png';
// import search from '../assets/img/stories/search.png';
// import chat from '../assets/img/stories/chat.png';
// import avatar from '../assets/img/stories/avatar.jpg';

// function NavBarOfWeb({ toggleMenu }) {
//   const [showSearch, setShowSearch] = useState(false);

//   return (
//     <div className="top-0 z-10 w-full h-[7vh] sticky bg-white shadow-md shadow-[#56a1c41d] flex justify-center px-3">
//       <nav className="w-full bg-white p-2 flex justify-between items-center px-[1%]">
//         <div className="flex-[2] flex justify-start items-center">
//           <button onClick={toggleMenu} className='outline-none'>
//             <img src={instagram} alt="Logo" className="w-8 h-8"/>
//           </button>
//           <p className="text-[#2B6EA0] font-medium text-xl pl-2 font-sans">ConnectMe</p>
//         </div>

//         <div className="flex-[3] hidden md:block">
//           <div className="relative w-full">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full border-none rounded-md px-3 pl-8 py-2 bg-[#56a1c41d] outline-none"
//             />
//             <img src={search} alt="search" className="w-4 absolute top-3 left-2" />
//           </div>
//         </div>

//         <div className="flex-[2] flex justify-end items-center">
//           <button
//             onClick={() => setShowSearch(!showSearch)}
//             className="md:hidden p-[5.5px] rounded-full shadow-md shadow-[#56a1c45d] flex items-center justify-center mr-4"
//           >
//             <img src={search} alt="search" className="w-5" />
//           </button>

//           <button className="p-[5.5px] rounded-full shadow-md shadow-[#56a1c45d] flex items-center justify-center mr-4">
//             <img src={chat} alt="chat" className="w-5" />
//           </button>

//           <button className="p-[5.5px] rounded-full shadow-md shadow-[#56a1c45d] flex items-center justify-center mr-4">
//             <img src={notification} alt="notification" className="w-5" />
//           </button>

//           <img src={avatar} alt="userPro" className="w-10 h-10 p-1 bg-white rounded-full border-2 border-[#2B6EA0]" />
//         </div>
//       </nav>

//       {showSearch && (
//         <div className="absolute top-full left-0 w-full bg-white shadow-md shadow-[#56a1c41d] p-2 md:hidden">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full border-none rounded-md px-3 py-2 bg-[#56a1c41d] outline-none"
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default NavBarOfWeb;

import React, { useState } from 'react';
import instagram from '../assets/img/stories/instagram.png';
import notification from '../assets/img/stories/notification.png';
import search from '../assets/img/stories/search.png';
import chat from '../assets/img/stories/chat.png';
import avatar from '../assets/img/stories/avatar.jpg';
import Iconswithname from './Iconswithname'; // Import the Iconswithname component

function NavBarOfWeb({ toggleMenu }) {
  const [showSearch, setShowSearch] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false); // New state for the hamburger menu

  return (
    <div className="top-0 z-10 w-full h-[7vh] sticky bg-white shadow-md shadow-[#56a1c41d] flex justify-center px-3">
      <nav className="w-full bg-white p-2 flex justify-between items-center px-[1%]">
        <div className="flex-[2] flex justify-start items-center">
          <button onClick={() => setShowHamburger(!showHamburger)} className="outline-none">
            <img src={instagram} alt="Logo" className="w-8 h-8" />
          </button>
          <p className="text-[#2B6EA0] font-medium text-xl pl-2 font-sans">ConnectMe</p>
        </div>

        <div className="flex-[3] hidden md:block">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border-none rounded-md px-3 pl-8 py-2 bg-[#56a1c41d] outline-none"
            />
            <img src={search} alt="search" className="w-4 absolute top-3 left-2" />
          </div>
        </div>

        <div className="flex-[2] flex justify-end items-center">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-[5.5px] rounded-full shadow-md shadow-[#56a1c45d] flex items-center justify-center mr-4"
          >
            <img src={search} alt="search" className="w-5" />
          </button>

          <button className="p-[5.5px] rounded-full shadow-md shadow-[#56a1c45d] flex items-center justify-center mr-4">
            <img src={chat} alt="chat" className="w-5" />
          </button>

          <button className="p-[5.5px] rounded-full shadow-md shadow-[#56a1c45d] flex items-center justify-center mr-4">
            <img src={notification} alt="notification" className="w-5" />
          </button>

          <img src={avatar} alt="userPro" className="w-10 h-10 p-1 bg-white rounded-full border-2 border-[#2B6EA0]" />
        </div>
      </nav>

      {showSearch && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md shadow-[#56a1c41d] p-2 md:hidden">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border-none rounded-md px-3 py-2 bg-[#56a1c41d] outline-none"
          />
        </div>
      )}

      {/* Conditionally render the Hamburger Menu */}
      {showHamburger && (
        <div className="fixed top-11 left-0 sm:hidden"> 
          <Iconswithname />
        </div>
      )}
    </div>
  );
}

export default NavBarOfWeb;
