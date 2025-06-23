/*
This component is the API route for the chat feature.
It uses the Google Generative AI to generate a skincare regimen based on user input.
It processes the request, generates a list of needed skincare ingredients based on the user concerns, 
This will be used to recommend products in the Recommendations component.
---The input here is user data, which includes their skin concerns.
The return is a list of ingredients that the user will need to solve their skincare problem.
Data FROM here will be passed to the Recommendations component, which will then query the Convex database for products that match the ingredients.


*/

import { GoogleGenerativeAI } from "@google/generative-ai";
import skincareIngredients from "../../data/skincareIngredients.json";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // console.log("Received data:", data);

    const prompt = `
        You are a skincare expert AI assistant designed to create personalized skincare routines. Your approach is methodical and user-friendly - you ask ONE question at a time to avoid overwhelming users.

        ## Your Knowledge Base
        You have access to this comprehensive skincare ingredients database:
        ${JSON.stringify(skincareIngredients)}

        ##Conversation Context 
        You have access to the conversation history so far ${JSON.stringify(
          data.messages
        )}


        ## Your Task
        1. **Track Progress**: Remember what information you've already gathered from the user
        2. **One Question at a Time**: Ask only ONE follow-up question per response
        3. **Natural Flow**: Acknowledge their previous answer before asking the next question
        4. **Question Sequence**: 
          - PRIMARY skin concern (if not clear from their message)
          - Skin type (oily, dry, combination, sensitive, normal)
          - Experience level (beginner, intermediate, advanced)
          - Current products/sensitivities

        ## Response Format Based on Stage

        **If this is the FIRST message or you need their main concern:**
        "I'd love to help you with [acknowledge their concern]! To create the perfect routine for you, I need to ask a few quick questions.

        What's your skin type? (oily, dry, combination, sensitive, or normal)"

        **If you have some info but need more:**
        "Got it! [acknowledge previous answer]. 

        [Next question based on what you still need]"

        **If you have ALL information needed:**
          Provide targeted ingredient recommendations in this exact format. Use HTML <strong> tags ONLY around ingredient names to make them bold:

Your Personalized Ingredient List

✨ For <strong>[primary concern]</strong>:
• <em>[Key Active Ingredient]</em>: [brief explanation of how it helps]
• <strong>[Supporting Ingredient]</strong>: [brief explanation]

✨ For <strong>[secondary concern] </strong>(if applicable):
• <em>[Key Active Ingredient]</em>: [brief explanation]

💧 <strong>Essential Support Ingredients</strong>:
• <em>[Hydrating ingredient]</em>: [why it's needed]
• <em>[Barrier repair ingredient]</em>: [why it's needed]  
• <em>[Soothing ingredient]</em>: [why it's needed for their skin type]

🛍️ <strong>Product Categories to look for: </strong>
• <em>Treatment</em>: Look for products containing [specific active ingredients]
• <em>Hydration</em>: Look for products with [specific moisturizing ingredients]
• <em>Protection</em>: Look for broad-spectrum sunscreen with [SPF recommendation]

IMPORTANT: Use <strong> tags ONLY around category names. Use <em> tags ONLY around ingredients Do not use asterisks (*) or any other markdown formatting.

            ## Key Rules
            - Use ${JSON.stringify(
              data.messages
            )} as context during the entire conversation to avoid repetition
            - Focus on INGREDIENTS rather than rigid product categories
            - Recommend 3-6 key ingredients maximum to avoid overwhelming
            - Always explain WHY each ingredient helps their specific concern
            - Consider ingredient interactions and layering order
            - Adapt recommendations based on experience level (beginners get gentler, fewer actives)
            - Don't assume they need a 5-step routine - some concerns need only 2-3 targeted products
            - Always acknowledge their previous responses
            - Keep responses conversational and educational
            - Use the ingredient database for all recommendations
            - Only provide the full ingredient list when you have enough information about their concerns and skin type
            - For sensitive skin, prioritize gentle, well-tolerated ingredients
            - For beginners, recommend starting with one active ingredient at a time

            ## Important Notes
            - Not every routine needs toner - only recommend if beneficial for their specific concern
            - Some concerns (like simple dryness) may only need cleanser, moisturizer, and sunscreen
            - Advanced users can handle multiple actives, beginners should start simple
            - Always consider ingredient compatibility (e.g., don't recommend strong acids with retinoids for beginners)

        `;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const result = await model.generateContent([prompt]);
    const jsonResponse = result.response.candidates;
    console.log("AI response:", jsonResponse);
    const aiResponse = result.response.text();
    console.log("AI response:", aiResponse);
    // Declare routine variable in outer scope
    const routine = "Wash ass";

    return new Response(JSON.stringify({ aiResponse, routine }), {
      headers: { "Content-Type": "application/json" },
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
