import React, { useEffect, useMemo, useState } from 'react';
import ChatLeft from './ChatLeft';
import Chatrightempty from './Chatrightempty';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {io} from 'socket.io-client';

const Chatbox = () => {
  const [userData, setUserData] = useState({});
  const [followers, setFollowers] = useState([]);
  const [message,setMessage]=useState([])
  const [newMessage,setNewMessage]=useState('')
  const [socket,setSocket]=useState(null)
  const [selectedFollower,setSelectedFollower]=useState(null)
  const navigate = useNavigate();


  useEffect(() => {
    const newSocket = io('http://localhost:8000', {
      withCredentials: true,
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit('addUser', userData._id);
      socket.on('getMessage', (data) => {
        setMessage((prev) => [...prev, data]);
      });
    }
  }, [socket, userData]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get('/api/user/getUserProfile', {
          withCredentials: true
        });
        setUserData(response.data.data);
        const followerID = response.data.data.followers;
        const followerDetails = await Promise.all(
          followerID.map(async (id) => {
            const followerres = await axios.get(`/api/user/getuser/${id}`, {
              withCredentials: true
            });
            return followerres.data.data;
          })
        );
        setFollowers(followerDetails);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  const openProfile = (followerData) => {
    setSelectedFollower(followerData)
    navigate("/chatrightpart", { state: { followerData, userData, followers } });
  };

  const handleSendMessage = async() => {
    if (!selectedFollower) {
      alert('Please select a follower to chat with.');
      return;
    }
    const receiverId = selectedFollower._id; 
    const message={
      senderId:userData.id,
      receiverId,
      text:newMessage,
    }

    try {
      const res=await axios.post(`/api/message/getmessage/${receiverId}`)
      setNewMessage((prev)=>[...prev,res.data])
      socket.emit('sendMessage',message)
      setNewMessage('')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className='flex'>
      <ChatLeft userData={userData} followers={followers} openProfile={openProfile} />
      <Chatrightempty />
      <div className='chatbox'>
        <div className='messages'>
          {message.map((msg, index) => (
            <div key={index} className={msg.senderId === userData._id ? 'my-message' : 'other-message'}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className='input'>
          <input
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder='Type a message...'
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;