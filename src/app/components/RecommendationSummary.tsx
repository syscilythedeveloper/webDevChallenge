import React from "react";
import GradientView from "./seraui/gradient";
import Loadbox from "./seraui/loadbox";

interface RecommendationSummaryProps {
  relevantIngredients?: string[];
  productName: string;
  summary: string;
  benefitTags?: string[];
}

const tagColorMap: Record<string, string> = {
  Hydrating: "bg-emerald-50 text-emerald-900 ring-emerald-200",
  Soothing: "bg-green-50 text-green-900 ring-green-200",
  "Barrier-support": "bg-lime-50 text-lime-900 ring-lime-200",
  Brightening: "bg-amber-50 text-amber-900 ring-amber-200",
  "Oil-control": "bg-teal-50 text-teal-900 ring-teal-200",
  "General care": "bg-neutral-50 text-neutral-800 ring-neutral-200",
};

export default function RecommendationSummary({
  productName,
  summary,
  relevantIngredients,
  benefitTags = [],
}: RecommendationSummaryProps) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white/60 p-4 shadow-sm backdrop-blur-sm dark:border-emerald-900/30 dark:bg-emerald-950/10">
      {/* Header */}
      <h3 className="text-xs font-semibold tracking-wide text-emerald-700">
        Generating Analysis for
      </h3>

      <GradientView productName={productName.trim()} />

      {/* Summary */}
      <p className="mt-2 text-sm font-semibold text-emerald-900">Summary</p>
      {summary ? (
        <>
          <p className="mt-5 text-sm leading-relaxed text-neutral-700">
            {summary}
          </p>
        </>
      ) : (
        <>
          <Loadbox />
        </>
      )}
      <p className="mt-5 text-sm font-semibold text-emerald-900">Benefits</p>

      {/* Benefit pills (render in given order) */}
      {benefitTags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {benefitTags.map((tag, idx) => (
            <span
              key={idx}
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 shadow-sm ${
                tagColorMap[tag] ||
                "bg-emerald-50 text-emerald-900 ring-emerald-200"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      ) : (
        <Loadbox />
      )}

      {/* Key ingredients */}
      <p className="mt-5 text-sm font-semibold text-emerald-900">
        Key ingredients
      </p>
      {relevantIngredients && relevantIngredients.length > 0 ? (
        <>
          <ul className="mt-2 flex flex-wrap gap-2 pl-0">
            {relevantIngredients.map((ingredient, idx) => (
              <li
                key={idx}
                className="inline-block rounded-full bg-emerald-50 text-emerald-900 px-3 py-1 text-xs font-medium shadow ring-emerald-200"
                style={{ listStyle: "none" }}
              >
                {ingredient}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Loadbox />
      )}
    </section>
  );
}
