import React from "react";
import GradientView from "./seraui/gradient";

interface RecommendationSummaryProps {
  relevantIngredients?: string[];
  productName: string;
  summary: string;
}

const RecommendationSummary = ({
  productName,
  summary,

  relevantIngredients,
}: RecommendationSummaryProps) => {
  return (
    <div className="border border-gray-200 rounded-md p-2">
      {productName !== "None" && (
        <>
          <h3 className="font-semibold">Generating Analysis for:</h3>
          <GradientView productName={productName.trim()} />
        </>
      )}
      {productName === "None" && (
        <h4 className="text-sm text-green-600">
          {" "}
          Please select a product to see the analysis.
        </h4>
      )}
      {relevantIngredients && relevantIngredients.length > 0 && (
        <p className="mt-4 text-sm text-gray-600">
          This product was recommended due to the presence of:
        </p>
      )}

      {relevantIngredients && relevantIngredients.length > 0 ? (
        <div className="mt-2">
          <ul className="list-disc pl-5">
            {relevantIngredients.map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-3 flex items-start gap-2 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-emerald-900">
          {/* info icon */}
          <svg
            className="mt-0.5 h-4 w-4 shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16Zm-.75-9.5a.75.75 0 011.5 0v5a.75.75 0 01-1.5 0v-5ZM10 6.25a.875.875 0 100 1.75.875.875 0 000-1.75Z" />
          </svg>
          <div className="text-xs leading-5">
            <p className="font-semibold">What you’ll see after analysis</p>
            <ul className="ml-4 mt-1 list-disc space-y-1">
              <li>
                <b>Highlighted ingredients</b> that may address your concern
                (e.g., Vitamin C, Niacinamide, Alpha Arbutin).
              </li>
              <li>
                A concise <b>summary</b> explaining <i>why</i> this product
                could help (dark spots, uneven tone, etc.).
              </li>
              <li>
                A simple <b>breakdown</b> of ingredient roles (brightening,
                antioxidant, gentle exfoliation).
              </li>
            </ul>
            <p className="mt-2 text-emerald-800/90">
              Select a product to begin. If a product doesn’t list ingredients,
              the explanation will be more general.
            </p>
          </div>
        </div>
      )}
      <p className="mt-4 text-sm text-gray-600">{summary}</p>
    </div>
  );
};

export default RecommendationSummary;
