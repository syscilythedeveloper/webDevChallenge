"use client";
import React from "react";
import { HitProps } from "./Products";

export const Hit = ({ hit }: HitProps) => {
    // Show first 5 ingredients and then "and X more" if applicable
    const ingredientsList = Array.isArray(hit.ingredients) && hit.ingredients.length > 5
        ? hit.ingredients.slice(0, 5).join(", ") + `, +${hit.ingredients.length - 5} more`
        : Array.isArray(hit.ingredients)
            ? hit.ingredients.join(", ")
            : hit.ingredients;

    return (
        <div className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition bg-white flex flex-col justify-between">
            <div>
                <h2 className="text-lg font-semibold mb-1">{hit.product_name}</h2>
                {hit.price && (
                    <p className="text-sm font-medium text-green-700 mb-2">${hit.price}</p>
                )}

                <div className="flex flex-wrap gap-2 mb-2">
                    {hit.brand && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            Brand: {hit.brand}
                        </span>
                    )}
                    {hit.category && (
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                            Category: {hit.category}
                        </span>
                    )}
                    {hit.type && (
                        <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                            Type: {hit.type}
                        </span>
                    )}
                    {hit.form && (
                        <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">
                            Form: {hit.form}
                        </span>
                    )}
                    {hit.rating !== undefined && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                            Rating: {hit.rating.toFixed(1)}
                        </span>
                    )}
                </div>

                {hit.website && (
                    <p className="text-xs mb-2 text-gray-600">
                        Website:{" "}
                        <a
                            href={hit.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            {hit.website}
                        </a>
                    </p>
                )}

                {ingredientsList && (
                    <p className="text-xs text-gray-700">
                        <strong>Ingredients:</strong> {ingredientsList}
                    </p>
                )}
            </div>

            {hit.url && (
                <a
                    href={hit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded px-4 py-2 transition"
                >
                    View Product
                </a>
            )}
        </div>
    );
};
