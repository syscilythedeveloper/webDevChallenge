import { GoogleGenerativeAI } from "@google/generative-ai";
//import skincare-ingredients from ""

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Request data:", data);
    /* PROMPT 
    in prompt, list steps to get comprehensive skin care regimine based on user skin concerns.
     Use skincare-ingredients as the knowledge base. For example, if the user is concerned about dark spots, they should be recommended products with Ascorbic Acid or Arbutin. If they are concerned with hyperpigmentation, they should be recommended products with Tranexamic Acid, Kojic Acid, Alpha Arbutin, Licorice Root Extract, etc

    Agent will return JSON in the following format

   
    JSON 
    facewash: ingredient(s),
    toner: ingredients(s), 
    serum: ingredients(s), 
    moisturizer: ingredients(s)
    sunscreen: ingredients(s)

  
    */

    /*
    functions 
    - getIngredients 
    -update chatBox
    - make Post Request 

    
    */

    const prompt = `
    You are a skincare expert AI assistant. Your task is to provide personalized skincare advice based on user input.

    
    `;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const result = await model.generateContent([prompt]);
    const aiResponse = result.response.text();
    console.log("AI response:", aiResponse);

    return new Response(aiResponse, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      "Our AI agent is overloaded at the moment. Please try again later",
      {
        headers: { "Content-Type": "text/plain" },
      }
    );
  }
}
