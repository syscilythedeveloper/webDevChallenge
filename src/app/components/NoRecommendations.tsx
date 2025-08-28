import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import GradientView from "./seraui/gradient";

const NoRecommendations = () => {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white/60  shadow-sm backdrop-blur-sm dark:border-emerald-900/30 dark:bg-emerald-950/10">
      <div className=" flex flex-col items-center justify-center gap-4 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50/40 via-lime-50/40 to-emerald-100/40 p-5 text-emerald-900 shadow">
        <GradientView productName="Please select a product to analyze." />
        <div className="flex items-center gap-3 ">
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900 ring-1 ring-emerald-200 shadow">
            <FaInfoCircle className="h-5 w-5 mr-2 text-emerald-600" />
            What you’ll see after analysis
          </span>
        </div>
        <ul className="ml-2 mt-1 list-disc space-y-2 text-sm text-emerald-900/90">
          <li>
            <b>Key ingredients</b> linked to your concern (e.g., Vitamin C,
            Niacinamide, Alpha Arbutin).
          </li>
          <li>
            <b>A short summary</b> of how the formula supports your skin’s
            needs.
          </li>
          <li>
            <b>Benefit highlights</b> translated from the ingredient list (e.g.,
            Brightening, Antioxidant, Gentle Exfoliation).
          </li>
        </ul>
        <p className="mt-3 text-emerald-800/90 text-xs text-center">
          Choose a product to begin.
          <br />
          <span className="italic">
            If full ingredient details aren’t available, your analysis will be
            based on general product information.
          </span>
        </p>
      </div>
    </section>
  );
};

export default NoRecommendations;
