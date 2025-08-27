// components/ProductCard.tsx
"use client";

import Image from "next/image";
import MagicContainer from "./seraui/magicContainer";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  label?: string; // e.g. "New", "Bestseller"
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
        <div className="relative w-full h-[165px] overflow-hidden rounded-t-[22px]">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width:1024px) 320px, 60vw"
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
          <h3 className="line-clamp-1 text-base font-semibold tracking-tight">
            {product.name}
          </h3>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-xl font-semibold">{price}</span>
          </div>

          <button
            className="
              mt-3 inline-flex w-full items-center justify-center rounded-xl
              bg-black text-white dark:bg-white dark:text-black
              px-4 py-2.5 text-sm font-semibold
              transition-all hover:-translate-y-0.5
              active:translate-y-0
            "
            onClick={() => onSelect && onSelect(product)}
          >
            Explain Recommendation
          </button>
        </div>
      </div>
    </MagicContainer>
  );
}
