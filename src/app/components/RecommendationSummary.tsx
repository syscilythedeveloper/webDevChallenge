import React from "react";
import GradientView from "./seraui/gradient";
import Loadbox from "./seraui/loadbox";
import Typewriter from "./TypeWriter";

interface RecommendationSummaryProps {
  relevantIngredients?: string[];
  productName: string;
  summary: string;
  benefitTags?: string[];
}

const pillColors = [
  "bg-emerald-50 text-emerald-900 ring-emerald-200",
  "bg-lime-50 text-lime-900 ring-lime-200",
  "bg-yellow-50 text-yellow-900 ring-yellow-200",
  "bg-amber-50 text-amber-900 ring-amber-200",
  "bg-blue-50 text-blue-900 ring-blue-200",
  "bg-neutral-50 text-neutral-800 ring-neutral-200",
];

export default function RecommendationSummary({
  productName,
  summary,
  relevantIngredients,
  benefitTags = [],
}: RecommendationSummaryProps) {
  return (
    <section className="rounded-2xl  bg-green-50 border border-emerald-100 p-4 shadow-sm backdrop-blur-sm dark:border-emerald-900/30 dark:bg-emerald-950/10">
      {/* Header */}
      <h3 className="text-xs font-semibold tracking-wide text-emerald-700">
        Ingredient Intelligence by Skincare AI:
      </h3>

      <GradientView productName={productName.trim()} />

      {/* Summary */}
      <p className="mt-2 text-xs font-semibold text-emerald-900">
        The Science Behind Our Recommendation:
      </p>
      {summary ? (
        <>
          <div
            className="mt-2 text-sm leading-relaxed text-neutral-700"
            style={{
              minHeight: "100px",
              maxHeight: "100px",
              overflow: "ellipsis",
            }}
          >
            <Typewriter
              text={summary}
              speed={15}
              className="text-[11px] leading-relaxed text-neutral-700"
            />
          </div>
        </>
      ) : (
        <>
          <Loadbox />
        </>
      )}
      {(benefitTags.length > 0 ||
        (relevantIngredients && relevantIngredients.length > 0)) && (
        <div className="mt-5 grid grid-cols-2 gap-8 w-full items-start">
          {benefitTags.length > 0 && (
            <div className="flex flex-col items-center">
              <h4 className="text-sm font-semibold text-gray-700 mb-2 italic">
                Skin Benefits
              </h4>
              <div className="flex flex-col gap-2">
                {benefitTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 shadow-sm ${
                      pillColors[idx % pillColors.length]
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          {relevantIngredients && relevantIngredients.length > 0 && (
            <div className="flex flex-col items-center">
              <h4 className="text-sm font-semibold text-emerald-900 mb-2 italic ">
                Star Ingredients
              </h4>
              <ul className="flex flex-col gap-2 items-center pl-0">
                {relevantIngredients.map((ingredient, idx) => (
                  <li
                    key={idx}
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium shadow ring-1 ${
                      pillColors[idx % pillColors.length]
                    }`}
                    style={{ listStyle: "none" }}
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
