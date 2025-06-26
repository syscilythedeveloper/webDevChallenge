/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import algoliasearch from "algoliasearch/lite";
import SearchBridge from "./SearchBridge";
import { HiMagnifyingGlass } from "react-icons/hi2";
// import { useCart } from "@/context/CartContext";

import {
  InstantSearch,
  Pagination,
  Configure,
  useHits,
} from "react-instantsearch";

// ✅ Algolia client setup
const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!;
const searchClient = algoliasearch(appId, apiKey);

// ✅ ProductType → Image filename mapping
const productTypeMap: Record<string, string> = {
  toner: "toner.png",
  serum: "serum.png",
  oil: "oil.png",
  bodywash: "bodywash.png",
  eyecare: "eyecare.png",
  cleanser: "cleanser.png",
  moisturiser: "moisturiser.png", // fixed spelling
  balm: "balm.png",
  exfoliator: "exfoliator.png",
  mask: "mask.png",
  bathoil: "bathoil.png",
  mist: "mist.png",
  peel: "peel.png",
  bathsalts: "bathsalts.png", // fixed typo
};

// ✅ Single Product Card
function Hit({ hit }: any) {
  // const { addToCart } = useCart();

  const sizeRegex = /\b(\d+(\.\d+)?\s?(ml|oz|g|fl\.?\s?oz))\b/i;
  const emptyParensRegex = /\s*\(\s*\)\s*$/;

  let cleanName = hit.product_name || "";
  const match = cleanName.match(sizeRegex);
  const size = match ? match[0] : null;
  cleanName = cleanName
    .replace(sizeRegex, "")
    .replace(emptyParensRegex, "")
    .trim();

  const rawType = (hit.product_type || "").toLowerCase().replace(/\s+/g, "");
  const imageFile = productTypeMap[rawType];
  const imagePath = imageFile
    ? `/placeholders/${imageFile}`
    : "/placeholders/default.png";

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition bg-white flex flex-col justify-between h-[320px] relative">
      {/* Circular Button - Upper Right Corner */}
      <button
        className="absolute top-2 right-2 w-8 h-8 bg-sage-600 hover:bg-sage-700 text-green-900 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 z-10"
        onClick={(e) => {
          e.stopPropagation();
          // Add your button click logic here
          console.log("Button clicked for:", cleanName);
        }}
        title="Compare product"
      >
        <HiMagnifyingGlass className="w-5 h-5" />
      </button>

      {/* Image Section */}
      <div className="w-full h-[180px] mb-2 bg-gray-100 rounded flex items-center justify-center relative overflow-hidden">
        <img
          src={imagePath}
          alt={cleanName}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Details */}
      <div className="text-sm space-y-2 flex-1">
        <h2 className="text-lg font-bold line-clamp-2">{cleanName}</h2>
        {hit.product_type && (
          <p className="text-xs text-gray-600">
            <strong>Type:</strong> {hit.product_type}
          </p>
        )}
        {hit.price && (
          <p className="text-md font-semibold text-green-700">${hit.price}</p>
        )}
        {size && <p className="text-xs text-gray-500 italic">Size: {size}</p>}
      </div>

      {/* Save Product Button */}
      <button className="mt-3 px-4 py-3 text-sm bg-green-200/30 font-medium text-green-900 rounded-xl bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group outline-green-900/30 outline-2 ">
        <svg
          className="w-4 h-4 transition-transform group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span>Save Product</span>
      </button>
    </div>
  );
}

// ✅ Hit Grid
function HitGrid() {
  const { hits } = useHits();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {hits.map((hit: any) => (
        <Hit
          key={hit.objectID}
          hit={hit}
        />
      ))}
    </div>
  );
}

// ✅ Products Wrapper
export default function Products({ searchTerm }: { searchTerm: string }) {
  return (
    <InstantSearch
      indexName="skincare_products_csv"
      searchClient={searchClient}
    >
      <SearchBridge searchTerm={searchTerm} />
      <Configure hitsPerPage={9} />

      <div className="w-full">
        <HitGrid />
        <div className="mt-10 flex justify-center">
          <Pagination
            classNames={{
              root: "flex justify-center mt-6",
              list: "flex gap-2",
              item: "px-3 py-1 border border-gray-300 rounded text-sm hover:bg-blue-100 transition",
              selectedItem: "bg-blue-600 text-white font-semibold",
              disabledItem: "opacity-40 cursor-not-allowed",
            }}
          />
        </div>
      </div>
    </InstantSearch>
  );
}
