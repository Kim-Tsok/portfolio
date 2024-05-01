import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const About = () => {
  const words = ["React", "Tailwind css", "Html", "Javasript", "Luck"];
  let wordIndex = 0;
  const [currentWord, setCurrentWord] = useState(words[0]);

  const variants = {
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    visible: { y: 0, opacity: 1, scale: 1 },
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      wordIndex = (wordIndex + 1) % words.length;
      setCurrentWord(words[wordIndex]);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="h-screen bg-[#eadfd8] flex items-center flex-col">
        <h2 className="text-3xl mt-[4rem]">
          Crafting experiences with{" "}
          <motion.span className="bg-[#634836] py-2 px-8 rounded-3xl text-white">
            <motion.span
              animate="visible"
              variants={variants}
              initial="hidden"
              exit="hidden"
              transition={{ duration: 0.7, ease: "easeInOut" }}
              onAnimationComplete={() => setIsAnimating(true)}
              id="Variable-font"
            >
              {currentWord}
            </motion.span>
          </motion.span>
        </h2>
        <p className="w-[50%] mt-8 text-[#bfa18e]">
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
          voluptate iure! Repudiandae doloremque possimus libero illo, odio
          similique porro repellendus numquam, quisquam, illum voluptates earum
          pariatur suscipit eius non impedit!" - Himself
        </p>
      </div>
    </>
  );
};

export default About;
