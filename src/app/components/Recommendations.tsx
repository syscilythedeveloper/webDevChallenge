/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import RecommendationSummary from "./RecommendationSummary";
interface RecommendationsProductProps {
  products: {
    objectID: string;
    product_names: string;
    image: string;
    price: number;
    standard_label: string;
    ingredients: string[];
  }[];
}

const Recommendations = ({ products }: RecommendationsProductProps) => {
  const [productToAnalyze, setProductToAnalyze] = React.useState<any | null>(
    null
  );
  //const [loading, setLoading] = React.useState(false);
  const [relevantIngredients, setRelevantIngredients] = React.useState<
    string[]
  >([]);
  const [summary, setSummary] = React.useState<string>("");

  useEffect(() => {
    // Analyze the selected product
    console.log("Analyzing product:", productToAnalyze);
  }, [productToAnalyze]);

  const handleAnalysis = async (product: {
    objectID: string;
    product_names: string;
    image: string;
    price: number;
    standard_label: string;
    ingredients: string[];
  }) => {
    //Extract relevant properties for analysis

    setProductToAnalyze(product);

    //logic for api call to analyze the product based on the ingredients
    //set is loading true
    //while loading, display spinner
    //try to return the analysis result
    //once parsing relevant ingredients is done, set loading to false
    //display the relevant ingredients and why it is recommended
    const res = await fetch("/api/recommendations", {
      method: "POST",
      body: JSON.stringify({ product: product }),
    });
    const result = await res.json();
    const { ingredients, summary } = result;
    console.log("Ingredients:", ingredients);
    console.log("Summary:", summary);
    setRelevantIngredients(ingredients);
    setSummary(summary);
  };

  return (
    <div className="w-full flex flex-col items-center my-1 border border-green-200/50 rounded-xl p-6 bg-gradient-to-br from-white/95 to-green-50/90 shadow-lg">
      <div className="flex flex-row gap-10">
        <div className="w-96">
          <RecommendationSummary
            productName={productToAnalyze?.product_names || "Select a product"}
            //set relevant ingredients to loading or the actually relevant ingredients
            relevantIngredients={relevantIngredients || []}
            //set summary to loading or the actual summary
            summary={summary || ""}
            //set rating to loading or the actual rating
            rating={productToAnalyze?.rating || 0}
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
