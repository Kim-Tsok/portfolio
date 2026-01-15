"use client"

import { useEffect, useState } from "react"

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="bg-[#eadfd8]/80 px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          className={`text-3xl md:text-4xl font-bold text-black mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Let's Work Together
        </h2>
        <p
          className={`text-[#634836] text-lg mb-12 leading-relaxed transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          Have a project in mind? I'd love to hear about it and discuss how we can collaborate to bring your ideas to
          life.
        </p>

        <button
          className={`px-10 py-4 bg-[#634836] text-white rounded-full font-semibold text-lg hover:bg-[#4a3628] hover:shadow-xl hover:scale-105 active:scale-95 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{
            fontFamily: "var(--font-poppins)",
            transitionDelay: "300ms",
          }}
        >
          Get In Touch
        </button>

        <div className="mt-16 flex justify-center gap-8">
          <a
            href="#"
            className="text-[#634836] hover:text-black font-medium transition-all duration-300 hover:translate-y-1"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="text-[#634836] hover:text-black font-medium transition-all duration-300 hover:translate-y-1"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Twitter
          </a>
          <a
            href="#"
            className="text-[#634836] hover:text-black font-medium transition-all duration-300 hover:translate-y-1"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
