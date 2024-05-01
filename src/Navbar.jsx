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
          <ul className="hidden md:flex space-x-4">
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

          {/* Mobile Menu Button (optional) */}
          <button className="md:hidden focus:outline-none">
            <svg
              className="h-6 w-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20M4 12H20M4 18H11V16H4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div>
          <button>Get In Touch</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
