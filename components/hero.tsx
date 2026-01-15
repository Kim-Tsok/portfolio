"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center px-6 relative"
      style={{ backgroundImage: "url(/bg.png)" }}
    >
      <div className="absolute inset-0 bg-[#eadfd8]/20"></div>
      <div className="text-center relative z-10">

        <h1
          className={`text-4xl md:text-7xl font-bold text-black mb-4 text-balance transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Hi, I'm{" "}
          <span
            className="italic font-normal text-black"
            style={{ fontFamily: "var(--font-newsreader)" }}
          >
            Kim Tsok
          </span>
        </h1>
        <p
          className={`text-4xl md:text-7xl font-semibold text-black text-pretty transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            fontFamily: "var(--font-poppins)",
            transitionDelay: "200ms",
          }}
        >
          a front-end developer
        </p>
      </div>
    </section>
  );
}
