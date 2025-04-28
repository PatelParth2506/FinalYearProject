import React, { useEffect, useState } from 'react';
import ChatLeft from './ChatLeft';
import Chatrightempty from './Chatrightempty';
import ChatRight from './ChatRight';
import axios from 'axios';
import { io } from 'socket.io-client';

const Chatbox = () => {
  const [userData, setUserData] = useState({});
  const [followers, setFollowers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8000', { withCredentials: true });
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/user/getUserProfile', { withCredentials: true });
        setUserData(res.data.data);

        const followerDetails = await Promise.all(
          res.data.data.followers.map(async (id) => {
            const followerRes = await axios.get(`/api/user/getuser/${id}`, { withCredentials: true });
            return followerRes.data.data;
          })
        );
        setFollowers(followerDetails);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="w-full h-full flex">
      <div className={`flex-[1.2] ${selectedUser ? "sm:block hidden" : "block"}`}>
        <ChatLeft userData={userData} followers={followers} onSelectUser={handleSelectUser} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      </div>

      {selectedUser ? (
        <div className={`flex-[3] bg-gradient-to-tr from-[#e3e8fb] via-[#fcf3f3] to-[#dbeafe]`}>
          <ChatRight userData={userData} selectedUser={selectedUser}
            socket={socket}
            setSelectedUser={setSelectedUser}
          />
        </div>) : 
        (<div className={`flex-[3] bg-gradient-to-tr from-[#e3e8fb] via-[#fcf3f3] to-[#dbeafe] sm:block hidden`}>
          <Chatrightempty />
        </div>
      )}
    </div>
  );
};

export default Chatbox;
