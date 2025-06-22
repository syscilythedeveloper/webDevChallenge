/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import algoliasearch from "algoliasearch/lite";
import SearchBridge from "./SearchBridge";
// import { useCart } from "@/context/CartContext";

import {
  InstantSearch,
  Pagination,
  Configure,
  useHits,
} from "react-instantsearch-hooks-web";

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
    <div className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition bg-white flex flex-col justify-between h-[320px]">
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

      {/* Add to Cart */}
      <button className="mt-3 px-3 py-2 text-sm rounded bg-green-600 text-white hover:bg-green-700 transition">
        Add to Cart
      </button>
    </div>
  );
}

// ✅ Hit Grid
function HitGrid() {
  const { hits } = useHits();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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

      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <section className="lg:col-span-3 flex flex-col items-center">
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
          </section>
        </div>
      </div>
    </InstantSearch>
  );
}
