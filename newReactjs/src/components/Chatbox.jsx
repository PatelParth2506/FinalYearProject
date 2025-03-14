import React, { useEffect, useState } from 'react';
import ChatLeft from './ChatLeft';
import Chatrightempty from './Chatrightempty';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Chatbox = () => {
  const [userData, setUserData] = useState({});
  const [followers, setFollowers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get('/api/user/getUserProfile', {
          withCredentials: true
        });
        setUserData(response.data.data);
        console.log(response.data.data);
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
    navigate("/chatrightpart", { state: { followerData, userData, followers } });
  };

  return (
    <div className='flex'>
      <ChatLeft userData={userData} followers={followers} openProfile={openProfile} />
      <Chatrightempty />
    </div>
  );
};

export default Chatbox;