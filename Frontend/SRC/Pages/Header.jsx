import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";

const Header = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg py-4 px-6 flex justify-between items-center z-50 transition-all duration-300 ease-in-out">
      <h1 className="text-3xl font-bold text-red-500">Tomato</h1>
      <div className="flex items-center gap-6">
        {["/", "/restaurants", "/orders"].map((path, index) => (
          <Link
            key={index}
            to={path}
            className={`text-gray-700 hover:text-red-500 transition-all duration-300 ${
              location.pathname === path ? "font-bold text-red-500" : ""
            }`}
          >
            {path === "/" ? "Home" : path.substring(1).charAt(0).toUpperCase() + path.slice(2)}
          </Link>
        ))}
        <Link to="/cart">
          <FaShoppingCart className="text-2xl cursor-pointer text-gray-700 hover:text-red-500 transition transform hover:scale-110" />
        </Link>
        <Link to="/login" className="text-gray-700 hover:text-red-500 flex items-center gap-2">
          <FaUser className="text-xl" /> Login
        </Link>
      </div>
    </nav>
  );
};

export default Header;
