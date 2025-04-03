import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = () => {
  const lettersRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

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
      lettersRef.current,
      {
        opacity: 0,
        y: -10,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.in",
      },
      "+=1"
    );
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-white px-4">
      <h1 className="font-bold flex tracking-tight text-center">
        {"ConnectMe".split("").map((char, index) => (
          <span
            key={index}
            ref={(el) => (lettersRef.current[index] = el)}
            className={`inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text 
              text-4xl sm:text-5xl md:text-5xl lg:text-6xl ${
                index === 0 ? "transform scale-110" : ""
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
