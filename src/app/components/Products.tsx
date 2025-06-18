/*
This products component is a placeholder for displaying a list of products.
It will be used to search for products. This will function as a search bar for products using algolia. 
User will have the ability to search for products by name, category, or ingredient.
The input here is a search query from the user.
The return is a list of products that match the search query.
*Note** that no data is being passed to/from the Chatbox or Recommendations components.

*Stetch goal: 
--The user will be able to add products to their cart from this component.
--The user will be able to filter products by category or ingredient.

*/

import React from "react";

const dummyProducts = [
  { name: "HydraGlow Serum", price: "$38" },
  { name: "MatteFix Moisturizer", price: "$42" },
  { name: "ClearTone Cleanser", price: "$26" },
];

const Products = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {dummyProducts.map((product, idx) => (
        <div
          key={idx}
          className="p-4 border border-gray-200 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-sm text-gray-600">{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
