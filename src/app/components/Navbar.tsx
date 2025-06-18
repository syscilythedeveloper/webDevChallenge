"use client";

import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 shadow-md bg-white flex justify-between items-center fixed top-0 z-50">
      <Link href="/" className="text-xl font-bold tracking-wide">
        Ultai
      </Link>

      <ul className="hidden md:flex gap-6 text-sm font-medium">
        <li>
          <Link href="/" className="hover:text-blue-500">
            Home
          </Link>
        </li>
        <li>
          <Link href="/products" className="hover:text-blue-500">
            Products
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-blue-500">
            Contact
          </Link>
        </li>
        <li>
          <Link href="/context/CartContext" className="hover:text-blue-500">
            Cart
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
