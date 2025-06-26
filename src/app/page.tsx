"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import Chatbox from "./components/Chatbox";
// import Recommendations from "./components/Recommendations";

const Products = dynamic(() => import("./components/Products"), {
  ssr: false,
});

function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 400);

  return (
    <div className="relative min-h-screen text-gray-900 bg-gradient-to-br from-[#edf5ec] via-[#e0f2ef] to-[#fefcf5]">
      <Navbar />

      <main className="w-full max-w-7xl mx-auto px-4 pt-24 pb-16">
        {/* Title + Search */}
        <div className="text-left mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#334b35] drop-shadow">
            Skincare.ai
          </h1>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search  for skincare ingredients, products, or concerns..."
            className="w-full px-4 py-2 border border-[#bfd8c2] rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#f97316] bg-white/60 backdrop-blur-md placeholder-gray-500"
          />
        </div>

        {/* Products and Chat Layout */}
        <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">
          {/* Product Search */}
          <section className="flex-1 bg-white/50 rounded-2xl p-6 shadow-lg backdrop-blur-md overflow-y-auto">
            <Products searchTerm={debouncedSearchTerm} />
          </section>

          {/* Chatbox */}
          <section className="w-full lg:w-96 lg:sticky lg:top-24 lg:self-start">
            <Chatbox />
          </section>
        </div>
      </main>

      {/* <section className="max-w-4xl mx-auto">
        <Recommendations query={debouncedSearchTerm} />
      </section> */}
    </div>
  );
}
