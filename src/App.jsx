import About from "./About";
import Home from "./Home";
import Navbar from "./Navbar";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function App() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <div className="bg-[#eadfd8] h-screen w-full" id="main">
        <div className="flex items-center w-screen justify-center">
          <Navbar />
        </div>
        <Home />
        <About />
        <div className="w-screen flex items-center justify-center h-full py-10 bg-[#eadfd8]">
          <div className="w-[90%]">
            <Carousel
              responsive={responsive}
              swipeable={true}
              draggable={true}
              showDots={true}
              infinite={true}
              centerMode={true}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              <div className="w-[43vw] bg-[#ab8164] rounded-2xl h-[25rem] mx-[3rem]"></div>
              <div className="w-[43vw] bg-red-700 rounded-2xl h-[25rem] mx-[3rem]"></div>
              <div className="w-[43vw] bg-blue-700 rounded-2xl h-[25rem] mx-[3rem]"></div>
              <div className="w-[43vw] bg-green-700 rounded-2xl h-[25rem] mx-[3rem]"></div>
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
