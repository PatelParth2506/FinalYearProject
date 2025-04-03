import React, { useState } from 'react';
import Post from './Post';
import Uploaded from './Uploaded';
import { useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchdata = async () => {
            const res = await axios.get('/api/user/getUserProfile', {
                withCredentials: true,
            });
            console.log(res.data.data);
            setUser(res.data.data);
        };
        fetchdata();
    }, []);

    return (
        <>
            <div className="flex justify-center pt-5 px-5 sm:pt-8">
                <div className="w-[700px] flex flex-col gap-y-5 pb-5">
                    <Post user={user}/>
                    <div className="w-full h-[1.5px] bg-[#3c7daf]"></div>
                    <div className="loginForm h-fit rounded-xl bg-white pb-5 pt-1">
                        <Uploaded user={user}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;