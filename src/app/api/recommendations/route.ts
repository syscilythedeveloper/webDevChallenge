/* eslint-disable @typescript-eslint/no-explicit-any */
/*
This component is used to handle the POST request for recommendations.
It will take the user input from the chatbox and query the Convex database for products that match the ingredients.

*/

//import { useQuery } from "convex/react";

export function POST(req: Request) {
  try {
    //get ingredients from ai agent
    const data = req.json();
    //parse ingredients
    // const ingredients = data.
    console.log("Ingredients", data);

    //query db for facewash with specified ingredient
    //const facewash =

    //query db for toner with specified ingredient
    //const toner =

    //query db for serum with specified ingredient
    //const serum =

    //query db for moisturizer with specified ingredient
    //const moisturizer =

    //query db for sunscreen with specified ingredient
    //const sunscreen =

    //const recommendations = [facewash, toner, serum, moisturizer, sunscreen]

    return new Response();

    //pass data to recommendations component

    //pass
  } catch (error: any) {
    return new Response("Query failed", error);
  }
}
