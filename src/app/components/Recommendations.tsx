import React from "react";
import ProductCard from "./ProductCard";
import RecommendationSummary from "./RecommendationSummary";
interface RecommendationsProductProps {
  products: {
    id: string;
    name: string;
    image: string;
    price: number;
  }[];
}

const Recommendations = ({ products }: RecommendationsProductProps) => {
  return (
    <div className="w-full flex flex-col items-center my-1 border border-green-200/50 rounded-xl p-6 bg-gradient-to-br from-white/95 to-green-50/90 shadow-lg">
      <div className="flex flex-row gap-10">
        <div className="w-96">
          <RecommendationSummary
            productname={"Exfoliating Scrub"}
            relevantIngredients={["Sugar", "Salt", "Coconut Oil"]}
            summary={`We recommend this product because it contains ingredients that exfoliate and nourish the skin.`}
            rating={4.5}
          />
        </div>
        <div className="flex flex-row gap-5 overflow-x-auto mx-auto bg-green-50/20 p-4 rounded-lg shadow-inner">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
