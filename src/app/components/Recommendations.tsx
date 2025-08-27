import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import RecommendationSummary from "./RecommendationSummary";
interface RecommendationsProductProps {
  products: {
    objectID: string;
    product_name: string;
    image: string;
    price: number;
    product_type: string;
    ingredients: string[];
  }[];
}

const Recommendations = ({ products }: RecommendationsProductProps) => {
  const [productToAnalyze, setProductToAnalyze] = React.useState(products[0]);

  useEffect(() => {
    // Analyze the selected product
    console.log("Analyzing product:", productToAnalyze);
  }, [productToAnalyze]);

  const handleAnalysis = async (product: {
    objectID: string;
    product_name: string;
    image: string;
    price: number;
    product_type: string;
    ingredients: string[];
  }) => {
    // Logic to explain the recommendation
    console.log("Explaining recommendation for:", product.product_name);
    setProductToAnalyze(product);
    //logic for api call to analyze the product based on the ingredients
    //set is loading true
    //while loading, display spinner
    //try to return the analysis result
    //once parsing relevant ingredients is done, set loading to false
    //display the relevant ingredients and why it is recommended
    const res = await fetch("/api/recommendations", {
      method: "POST",
      body: JSON.stringify({ product: productToAnalyze }),
    });
    console.log("API response:", res);
  };

  return (
    <div className="w-full flex flex-col items-center my-1 border border-green-200/50 rounded-xl p-6 bg-gradient-to-br from-white/95 to-green-50/90 shadow-lg">
      <div className="flex flex-row gap-10">
        <div className="w-96">
          <RecommendationSummary
            // productName={productToAnalyze.name}
            productName={productToAnalyze?.product_name || "Select a product"}
            relevantIngredients={["Sugar", "Salt", "Coconut Oil"]}
            summary={`We recommend this product because it contains ingredients that exfoliate and nourish the skin.`}
            rating={4.5}
          />
        </div>
        <div className="flex flex-row gap-5 overflow-x-auto mx-auto bg-green-50/20 p-4 rounded-lg shadow-inner">
          {products.map((product) => (
            <ProductCard
              key={product.objectID}
              product={product}
              onSelect={handleAnalysis}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
