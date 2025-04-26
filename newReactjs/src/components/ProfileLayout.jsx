import React, { useEffect, useState } from 'react';
import NavBarOfWeb from './NavBarOfWeb';
import Iconswithname from './Iconswithname';
import Profile from './Profile';
import { useParams } from 'react-router-dom';

function ProfileLayout() {
    const [showMenu, setShowMenu] = useState(false);
    const { userID } = useParams();

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (event.clientX <= 10) {
                setShowMenu(true);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const handleMouseLeave = () => {
        setShowMenu(false);
    };
    
    return (
        <>
            <div className="w-full h-[93vh] font-sans">
                <div className="w-full h-[93vh] flex">
                    <div className={`${showMenu ? 'block' : 'hidden'} md:block z-10`} onMouseLeave={handleMouseLeave} >
                        <Iconswithname userID={userID}/>
                    </div>
                    <div className="overFlow w-full overflow-auto">
                        <Profile userID={userID}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileLayout
