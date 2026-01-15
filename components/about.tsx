"use client";


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


interface AboutProps {
  skills: { name: string }[];
}

export default function About({ skills = [] }: AboutProps) {
  const [currentSkill, setCurrentSkill] = useState("");
  const skillNames = skills.map((s) => s.name);

  useEffect(() => {
    if (skillNames.length > 0) {
      setCurrentSkill(skillNames[0]);
    }
  }, [skills]);

  useEffect(() => {
    if (skillNames.length === 0) return;

    let skillIndex = 0;
    const interval = setInterval(() => {
      skillIndex = (skillIndex + 1) % skillNames.length;
      setCurrentSkill(skillNames[skillIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, [skills]);

  return (
    <section className="bg-[#eadfd8]/80 py-20 px-6">
      <div className="mx-auto max-w-7xl flex flex-col items-center">
        <h2 className="text-2xl md:text-4xl text-black mb-4 text-center">
          Crafting experiences with{" "}


          <motion.span
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="inline-flex items-center justify-center bg-[#634836] text-white px-8 py-2 rounded-full italic min-w-[200px] mt-2 md:mt-0"
            style={{ fontFamily: "var(--font-newsreader)" }}
          >

            <AnimatePresence mode="popLayout">
              <motion.span
                key={currentSkill}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {currentSkill || "..."}
              </motion.span>
            </AnimatePresence>
          </motion.span>
        </h2>
        <p className="text-[#bfa18e] max-w-2xl text-center text-sm md:text-base leading-relaxed mt-8">
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
          voluptate iure! Repudiandae doloremque possimus libero illo, odio
          similique porro repellendus numquam, quisquam, illum voluptates earum
          pariatur suscipit eius non impedit!"{" "}
          <span className="font-semibold">- Himself</span>
        </p>
      </div>
    </section>
  );
}

