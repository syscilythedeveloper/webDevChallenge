import React from "react";
import GradientView from "./seraui/gradient";

const NoRecommendations = () => {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white/60 p-4 shadow-sm backdrop-blur-sm dark:border-emerald-900/30 dark:bg-emerald-950/10">
      <GradientView productName="Please select a product to analyze." />

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
              <b>Key ingredients</b> linked to your concern (e.g., Vitamin C,
              Niacinamide, Alpha Arbutin).
            </li>
            <li>
              <b>A short summary</b> of how the formula supports your skin’s
              needs.
            </li>
            <li>
              <b>Benefit highlights</b> translated from the ingredient list
              (e.g., Brightening, Antioxidant, Gentle Exfoliation).
            </li>
          </ul>
          <p className="mt-2 text-emerald-800/90">
            Choose a product to begin. If full ingredient details aren’t
            available, your analysis will be based on general product
            information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NoRecommendations;
