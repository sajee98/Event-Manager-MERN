import { Link, NavLink } from "react-router-dom";
import reactLogo from "../../assets/react.svg";
import { CiSearch } from "react-icons/ci";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
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
    <div className="w-full bg-white shadow-md relative z-50 sticky top-0 left-0 right-0">
      <div className="lg:container mx-auto px-4">
        <div className="flex items-center justify-between min-h-[64px] py-2">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img src={reactLogo} alt="React Logo" className="w-8 h-8" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((page, index) => (
              <NavLink
                key={index}
                to={page.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-sm text-purple-600 font-raleway font-semibold capitalize"
                    : "text-sm text-gray-800 font-raleway font-medium capitalize"
                }
              >
                {page.name}
              </NavLink>
            ))}

            {/* Search Button */}
            <button
              className="bg-transparent border-none cursor-pointer p-1"
              aria-label="Search"
            >
              <CiSearch size="1.5rem" className="text-purple-500" />
            </button>
          </nav>

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
                    ? "text-base text-purple-400 font-raleway font-semibold capitalize"
                    : "text-base text-white font-raleway font-medium capitalize"
                }
              >
                {page.name}
              </NavLink>
            ))}

            {/* Search & Contact Buttons */}
            <div className="flex flex-col gap-3 mt-4 w-full">
              <button
                className="bg-transparent border-none cursor-pointer p-1 text-white"
                aria-label="Search"
              >
                <CiSearch size="1.5rem" className="text-purple-300" />
              </button>

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="text-sm text-white font-raleway font-medium capitalize px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 inline-flex items-center justify-center transition duration-200 w-full"
              >
                Contact
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
