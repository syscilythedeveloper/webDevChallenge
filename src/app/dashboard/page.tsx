/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import Recommendations from "../components/Recommendations";
import SlideInView from "../components/seraui/slideIn";

const Products = dynamic(() => import("../components/Products"), {
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
  const [topHits, setTopHits] = useState<any[]>([]);

  return (
    <div className="relative min-h-screen text-gray-900 bg-gradient-to-br from-[#edf5ec] via-[#e0f2ef] to-[#fefcf5]">
      <main className="w-full max-w-7xl mx-auto px-4 pt-5 pb-10 ">
        {/* Title + Search */}
        <div className="text-left mb-10">
          <SlideInView text="SkinCare.ai" />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for products by skin care concern, title, or ingredient"
            className="w-full px-4 py-2 border border-[#bfd8c2] rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#f97316] bg-white/60 backdrop-blur-md placeholder-gray-500"
          />
        </div>

        {/* Products and Recommendations Layout */}
        <div className="flex flex-col h-[600px] overflow-y-auto ">
          {/* Recommendations */}
          <section className="flex-[2]">
            <Recommendations
              products={topHits}
              concern={debouncedSearchTerm}
            />
          </section>
          {/* Product Search */}
          <section className="flex-[1] bg-white/50 rounded-2xl p-6 shadow-lg backdrop-blur-md ">
            <Products
              searchTerm={debouncedSearchTerm}
              onTopHitsChange={setTopHits}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
