const Navbar = () => {
  return (
    <>
      <nav className="border-b-2 border-b-[#ab8164] px-2 py-2 flex justify-between items-center w-[95%]">
        {/* Logo */}
        <div className="font-bold text-3xl" id="Variable-font">
          Kim.
        </div>

        <div>
          {/* Navigation Links */}
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-gray-400">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <button>Get In Touch</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
