import React, { useEffect, useState } from 'react';
import Iconswithname from '../components/Iconswithname';
import NavBarOfWeb from './NavBarOfWeb';
import Editprofile from './Editprofile';

function EditprofileLayout() {
    const [showMenu, setShowMenu] = useState(false);

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
            <div className="w-full h-[93vh]">
                <div className="w-full h-[93vh] flex">
                    <div className={`${showMenu ? 'block' : 'hidden'} md:block z-10`} onMouseLeave={handleMouseLeave}>
                        <Iconswithname/>
                    </div>
                    <div className="overFlow w-full overflow-auto">
                        <Editprofile />
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditprofileLayout

