import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import RecommendationSummary from "./RecommendationSummary";
import NoRecommendations from "./NoRecommendations";
interface RecommendationsProductProps {
  products: {
    objectID: string;
    product_names: string;
    image: string;
    price: number;
    standard_label: string;
    ingredients: string[];
  }[];
  concern?: string;
}

const Recommendations = ({
  products,
  concern,
}: RecommendationsProductProps) => {
  const [productToAnalyze, setProductToAnalyze] = React.useState(
    products && products.length > 0 ? products[0] : null
  );
  const [relevantIngredients, setRelevantIngredients] = React.useState<
    string[]
  >([]);
  const [summary, setSummary] = React.useState<string>("");
  const [benefitTags, setBenefitTags] = React.useState<string[]>([]);

  const [displayingAnalysis, setDisplayingAnalysis] =
    React.useState<boolean>(false);

  useEffect(() => {}, [relevantIngredients, summary, benefitTags]);

  const handleAnalysis = async (product: {
    objectID: string;
    product_names: string;
    image: string;
    price: number;
    standard_label: string;
    ingredients: string[];
  }) => {
    //Extract relevant properties for analysis
    setRelevantIngredients([]);
    setSummary("");
    setBenefitTags([]);

    setProductToAnalyze(product);

    setDisplayingAnalysis(true);
    const res = await fetch("/api/recommendations", {
      method: "POST",
      body: JSON.stringify({ product: product, concern }),
    });
    const result = await res.json();
    const { relevantIngredients, summary, benefitTags } = result;
    console.log("Ingredients:", relevantIngredients);
    console.log("Summary:", summary);
    setRelevantIngredients(relevantIngredients);
    setSummary(summary);
    setBenefitTags(benefitTags);
  };

  return (
    <div className="w-full flex flex-col items-center my-1 border border-green-200 rounded-2xl p-4 bg-gradient-to-br from-green-200/10 to-green-100/10 shadow-lg">
      <div className="flex flex-row gap-10">
        <div className="w-96">
          {displayingAnalysis ? (
            <RecommendationSummary
              productName={productToAnalyze?.product_names || ""}
              relevantIngredients={relevantIngredients || []}
              summary={summary || ""}
              benefitTags={benefitTags || []}
            />
          ) : (
            <NoRecommendations />
          )}
        </div>
        <div className="flex flex-row gap-5 overflow-x-auto mx-auto bg-green-50 p-4 rounded-lg shadow-inner border border-green-200">
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
