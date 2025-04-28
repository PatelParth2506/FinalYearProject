import React, { useEffect, useState } from 'react'
import LeftMenuIcon from './LeftMenuIcon';
import Chatbox from './Chatbox';

function Chat() {
    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => {
        const handleMouseMove = (event) => {
            if (event.clientX <= 1) { 
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
            <div className="w-full h-[93vh]">
                <div className="w-full h-[93vh] flex">
                    <div className={`${showMenu ? 'block' : 'hidden'} md:block`} onMouseLeave={handleMouseLeave}>
                        <LeftMenuIcon />
                    </div>
                    <div className="overFlow w-full overflow-auto">
                        <Chatbox />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat