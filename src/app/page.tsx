"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Chatbox from "./components/Chatbox";
import Products from "./components/Products";
import Recommendations from "./components/Recommendations";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative min-h-screen bg-white text-gray-900">
      <Navbar />

      <main className="flex flex-col items-center text-center px-4 py-10 mt-16">
        <h1 className="text-6xl font-extrabold tracking-tight mb-6">Ultai</h1>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search skincare concerns or products..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="mt-10 w-full max-w-6xl">
          <Products searchTerm={searchTerm} />
        </div>

        <div className="mt-16 w-full max-w-4xl">
          <Recommendations query={searchTerm} />
        </div>
      </main>

      <Chatbox />
    </div>
  );
}
