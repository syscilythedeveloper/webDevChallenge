/*
The input here is ingredients passed from the chatbox component
The return is a list of products that match the ingredients
The recommendations component will display the products that match the ingredients
The user will then be able to search those specific products within the products component. 
The recommendations component will be a simple component that displays the products that match the ingredients.
-----no additional functionality, just a display of products that match the ingredients
-----i.e. "Based on your skincare needs, we recommend the following products: _______ ________ _________ _________ _________"   

*/
import React, { useMemo } from "react";
import ingredientsData from "../data/skincareIngredients.json";

const Recommendations = ({ query = "" }) => {
  const cleanQuery = query.toLowerCase().trim();

  const matchedIngredients = useMemo(() => {
    if (!cleanQuery) return [];

    const ingredients = ingredientsData.skincare_ingredients;

    const matching = ingredients.filter((ing) =>
      ing.concerns.some((concern) =>
        cleanQuery.includes(concern.replace(/_/g, " "))
      )
    );

    const uniqueMatches = [
      ...new Map(matching.map((item) => [item.name, item])).values(),
    ];

    return uniqueMatches;
  }, [cleanQuery]);

  return (
    <div className="text-left mt-10">
      <h3 className="text-xl font-semibold mb-3">
        AI-Powered Ingredient Suggestions
      </h3>
      {matchedIngredients.length > 0 ? (
        <div className="bg-blue-50 p-4 rounded shadow-sm">
          <p>
            Based on your search for <strong>{query}</strong>, consider looking
            for products with:
          </p>
          <ul className="list-disc list-inside mt-2">
            {matchedIngredients.map((ing) => (
              <li key={ing.name}>
                <strong>{ing.name}</strong>
                {ing.notes ? ` — ${ing.notes}` : ""}
              </li>
            ))}
          </ul>
        </div>
      ) : query ? (
        <p className="text-sm text-gray-500 italic">
          No specific ingredient matches found for “{query}”.
        </p>
      ) : (
        <p className="text-sm text-gray-400 italic">
          Enter a skin concern to see recommended ingredients.
        </p>
      )}
    </div>
  );
};

export default Recommendations;
