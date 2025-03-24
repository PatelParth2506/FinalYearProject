import React, { useState } from 'react';
import Post from './Post';
import Uploaded from './Uploaded';
import { useEffect } from 'react';
import axios from 'axios';
import Iconswithname from './Iconswithname';

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
        <div className="flex pt-10">
            <div className="w-[20%] sticky top-10 h-fit left-0">
                <Iconswithname />
            </div>
            <div className="w-[55%] mx-auto flex flex-col gap-y-5">
                <Post user={user} />
                <div className="w-full h-[1.5px] bg-[#3c7daf]"></div>
                <div className="loginForm h-fit rounded-xl bg-white pb-5">
                    <Uploaded user={user} />
                </div>
            </div>
        </div>
    );
}

export default Home;