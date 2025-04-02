import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Loader = () => {
  const lettersRef = useRef([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      lettersRef.current,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1, 
        ease: "power3.out",
      }
    );

    tl.to(
      lettersRef.current.reverse(), 
      {
        opacity: 0,
        y: -10,
        duration: 0.5,
        stagger: 0.1, 
        ease: "power3.in",
        onComplete: () => setIsVisible(false),
      },
      "+=1" 
    );
  }, []);

  if (!isVisible) return null;

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <h1 className="text-6xl font-bold flex tracking-tight">
        {"ConnectMe".split("").map((char, index) => (
          <span
            key={index}
            ref={(el) => (lettersRef.current[index] = el)}
            className={`inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text ${
              index === 0 ? "text-6xl transform scale-110" : "text-6xl" 
            }`}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default Loader;
