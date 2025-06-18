import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 shadow-md bg-white flex justify-between items-center fixed top-0 z-50">
      <span className="text-xl font-bold tracking-wide">Ultai</span>
      <ul className="hidden md:flex gap-6 text-sm font-medium">
        <li className="cursor-pointer hover:text-blue-500">Home</li>
        <li className="cursor-pointer hover:text-blue-500">Products</li>
        <li className="cursor-pointer hover:text-blue-500">Contact</li>
      </ul>
    </nav>
  );
};

export default Navbar;
