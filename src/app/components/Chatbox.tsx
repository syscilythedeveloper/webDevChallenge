/*
The user will have conversation with chatbox (/api/chat)
Chatbox will be a simple component that displays messages and allows the user to send new messages.
The input is user data
The return  is a list of ingredients that the user will need to solve the skincare problem (NOT VISUAL) 
----this will send a POST request to /api/recommendations, which will search the convex db for products with the specified ingredients
The recommendations component will display the products that match the ingredients
The user will then be able to add the products to their cart

*/

import React from "react";

const Chatbox = () => {
  return (
    <div className="fixed bottom-6 right-6 w-72 h-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4 flex flex-col">
      <div className="text-sm font-semibold mb-2">Ask Ultai</div>
      <div className="flex-1 overflow-y-auto text-sm text-gray-700">
        <p>👋 How can I help you find the right skincare?</p>
      </div>
      <input
        type="text"
        placeholder="Type your question..."
        className="mt-2 p-2 border rounded focus:outline-none focus:ring"
      />
    </div>
  );
};

export default Chatbox;
