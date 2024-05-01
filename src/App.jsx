import About from "./About";
import Home from "./Home";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <div className="bg-[#eadfd8] h-screen w-full" id="main">
        <div className="flex items-center w-screen justify-center">
          <Navbar />
        </div>
        <Home />
        <About />
      </div>
    </>
  );
}

export default App;
