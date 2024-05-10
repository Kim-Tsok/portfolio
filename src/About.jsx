import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const About = () => {
  const words = ["React", "Tailwind css", "Html", "Javascript"];
  let wordIndex = 0;
  const [currentWord, setCurrentWord] = useState(words[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      wordIndex = (wordIndex + 1) % words.length;
      setCurrentWord(words[wordIndex]);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="h-[30vh] bg-[#eadfd8] flex items-center flex-col">
        <motion.h2
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="md:text-3xl text-[17px] mt-[4rem] mx-2 md:mx-0"
        >
          Crafting experiences with{" "}
          <motion.span className="bg-[#634836] py-2 px-8 rounded-3xl text-white">
            <motion.span id="Variable-font">{currentWord}</motion.span>
          </motion.span>
        </motion.h2>
        <motion.p
          initial={{ y: 150, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="w-[76%] lg:w-[50%] md:w-[65%] mt-8 text-[#bfa18e] text-sm md:text-base"
        >
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
          voluptate iure! Repudiandae doloremque possimus libero illo, odio
          similique porro repellendus numquam, quisquam, illum voluptates earum
          pariatur suscipit eius non impedit!" - Himself
        </motion.p>
      </div>
    </>
  );
};

export default About;
