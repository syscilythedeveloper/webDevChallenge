/* eslint-disable @typescript-eslint/no-explicit-any */
//import { useQuery } from "convex/react";

export function POST(req: Request) {
  try {
    //get ingredients from ai agent
    const data = req.json();
    //parse ingredients
    // const ingredients = data.
    console.log("Ingredients", data);

    //query db for facewash with specified ingredient

    //query db for toner with specified ingredient

    //query db for serum with specified ingredient

    //query db for moisturizer with specified ingredient

    //query db for sunscreen with specified ingredient

    return new Response();
  } catch (error: any) {
    return new Response("Query failed", error);
  }
}
