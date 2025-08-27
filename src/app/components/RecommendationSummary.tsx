import React from "react";
import GradientView from "./seraui/gradient";

interface RecommendationSummaryProps {
  relevantIngredients?: string[];
  productName: string;
  summary: string;
  rating: number;
}

const RecommendationSummary = ({
  productName,
  summary,
  rating,
  relevantIngredients,
}: RecommendationSummaryProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h3 className="font-semibold">Generating Analysis for:</h3>
      <GradientView productName={productName} />
      <p className="mt-4 text-sm text-gray-600">
        This product was recommended due to the presence of:
      </p>

      {relevantIngredients && relevantIngredients.length > 0 && (
        <div className="mt-2">
          <ul className="list-disc list-inside">
            {relevantIngredients.map((ingredient, index) => (
              <li
                key={index}
                className="text-sm text-gray-600"
              >
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="mt-4 text-sm text-gray-600">{summary}</p>
      <p className="mt-2 text-sm text-gray-600">Rating: {rating}</p>
    </div>
  );
};

export default RecommendationSummary;
