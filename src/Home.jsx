import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <section className="h-[calc(60vh-53.02px)] md:h-[calc(100vh-53.02px)] w-full bg-[url(/Bg.png)] flex items-center justify-center font-bold">
        <motion.h1
          initial={{ x: -500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:text-[4.5rem] md:text-[4rem] sm:text-[3.2rem] text-center text-[2.4rem]"
        >
          Hi, I'm{" "}
          <motion.span className="font-normal" id="Variable-font">
            Kim Tsok
          </motion.span>
          <br /> a front-end developer
        </motion.h1>
      </section>
    </>
  );
};

export default Home;
