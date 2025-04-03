import React, { useEffect, useState } from 'react';
import Home from './Home';
import NavBarOfWeb from './NavBarOfWeb';
import Iconswithname from './Iconswithname';

function HomeLayout() {
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
            <div className="w-full h-screen">
                <NavBarOfWeb toggleMenu={() => setShowMenu(!showMenu)} />
                <div className="w-full h-[93vh] flex">
                    <div className={`${showMenu ? 'block' : 'hidden'} md:block `} onMouseLeave={handleMouseLeave}>
                        <Iconswithname/>
                    </div>
                    <div className="overFlow w-full overflow-auto">
                        <Home/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeLayout