import { Link, NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaRegBell } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Planners", path: "/planner" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <div className="w-full bg-white shadow-md z-50 sticky top-0 left-0 right-0">
      <div className="lg:container mx-auto px-4">
        <div className="flex items-center justify-between min-h-[64px] py-2">

          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img
              src="https://static.vecteezy.com/system/resources/previews/035/566/363/non_2x/event-tent-logo-design-concept-illustration-symbol-icon-vector.jpg"
              alt="React Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((page, index) => (
              <NavLink
                key={index}
                to={page.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-sm text-purple-600 font-semibold capitalize"
                    : "text-sm text-gray-800 font-medium capitalize hover:text-purple-600 transition"
                }
              >
                {page.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Section: Search, Notification, Login */}
          <div className="hidden md:flex items-center gap-4">
            <button
              className="bg-transparent border-none cursor-pointer p-1"
              aria-label="Search"
            >
              <CiSearch size="1.5rem" className="text-purple-500" />
            </button>

            <button
              className="bg-transparent border-none cursor-pointer p-1 relative"
              aria-label="Notifications"
            >
              <FaRegBell size="1.4rem" className="text-purple-500" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <Link
              to="/login"
              className="flex items-center gap-1 bg-purple-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              <FiUser size="1rem" />
              Login
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden block">
            <button
              className="bg-none border-none cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <IoMdClose size="1.5rem" className="text-purple-600" />
              ) : (
                <FaBars size="1.5rem" className="text-purple-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-[64px] right-0 w-full max-w-[350px] min-h-screen bg-gray-900 z-50 px-6 py-8 transition-all duration-300">
          <nav className="flex flex-col items-start gap-5">
            {navLinks.map((page, index) => (
              <NavLink
                key={index}
                to={page.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-base text-purple-400 font-semibold capitalize"
                    : "text-base text-white font-medium capitalize"
                }
              >
                {page.name}
              </NavLink>
            ))}

            {/* Search, Notification & Login Buttons */}
            <div className="flex flex-col gap-3 mt-4 w-full">
              <button
                className="text-white flex items-center gap-2"
                aria-label="Search"
              >
                <CiSearch size="1.5rem" className="text-purple-300" /> Search
              </button>

              <button
                className="text-white flex items-center gap-2"
                aria-label="Notifications"
              >
                <FaRegBell size="1.3rem" className="text-purple-300" /> Notifications
              </button>

              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-sm text-white font-medium capitalize px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 inline-flex items-center justify-center transition duration-200 w-full"
              >
                <FiUser size="1rem" className="mr-1" /> Login
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
