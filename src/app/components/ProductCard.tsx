// components/ProductCard.tsx
"use client";

import Image from "next/image";
import MagicContainer from "./seraui/magicContainer";
import { IoMdTrendingUp } from "react-icons/io";

type Product = {
  image: string;
  price: number;
  objectID: string;
  product_name: string;
  product_type: string;
  ingredients: string[];
};

export default function ProductCard({
  product,
  onSelect,
}: {
  product: Product;
  onSelect?: (product: Product) => void;
}) {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  const labelColorMap: Record<string, string> = {
    serum: "bg-teal-100 text-teal-800 ring-1 ring-teal-200",
    moisturizer: "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200",
    exfoliator: "bg-rose-100 text-rose-700 ring-1 ring-rose-200",
    facewash: "bg-sky-100 text-sky-700 ring-1 ring-sky-200",
    sunscreen: "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200",
    toner: "bg-violet-100 text-violet-700 ring-1 ring-violet-200",
  };

  return (
    <MagicContainer className="group">
      <div
        className=" 
          relative rounded-[22px] bg-white/60 dark:bg-slate-900/60
          shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur
          transition-all duration-300
          group-hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)]
        "
      >
        {/* image */}
        <div className="relative w-full h-[205px] flex items-center justify-center overflow-hidden rounded-t-[22px] bg-transparent">
          <span
            className={`
                    absolute right-2 top-2 z-10 rounded-full
                    border border-zinc-200 ${
                      labelColorMap[product.product_type.toLowerCase()] ||
                      "bg-gray-200"
                    } px-2 py-1
                    text-[10px] font-medium tracking-wide text-zinc-800
                  `}
          >
            {product.product_type}
          </span>
          <div className="flex items-center justify-center w-full h-full">
            <Image
              src={
                "/placeholders/" + product.product_type.toLowerCase() + ".png"
              }
              alt={product.product_name}
              fill
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
          {/* subtle shine on hover */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute -inset-x-10 -top-10 h-24 rotate-6 bg-white/20 blur-2xl" />
          </div>
        </div>

        {/* content */}
        <div className="p-4">
          <h4
            className="text-xs font-bold line-clamp-2 truncate"
            title={product.product_name}
          >
            {product.product_name}
          </h4>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-md font-semibold text-green-800/80">
              {price}
            </span>
          </div>

          <button
            className="
                  relative mt-3 inline-flex w-full items-center justify-center overflow-hidden
                    rounded-[14px] px-6 py-2.5 text-[10px] font-semibold
                    text-emerald-900
                    bg-gradient-to-br from-white to-emerald-50
                    ring-1 ring-emerald-200
                    shadow-[0_10px_30px_-10px_rgba(16,185,129,0.35)]
                    transition-transform duration-300 ease-in-out
                    hover:scale-[1.03] active:scale-95

 
            "
            onClick={() => onSelect && onSelect(product)}
          >
            <IoMdTrendingUp className="mr-2 h-4 w-4" />
            Analyze Recommendation
          </button>
        </div>
      </div>
    </MagicContainer>
  );
}
