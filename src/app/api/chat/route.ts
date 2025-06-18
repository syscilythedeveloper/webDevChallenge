/* eslint-disable @typescript-eslint/no-explicit-any */
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
    // console.log("Request data:", data);
    const messages = data.messages || data; // Handle different data structures


    let flatMessages: any[] = [];
    if (Array.isArray(messages)) {
      // If any element is an object with numeric keys, flatten those
      messages.forEach((msg) => {
        if (
          typeof msg === "object" &&
          Object.keys(msg).every((k) => !isNaN(Number(k)))
        ) {
          // Flatten object with numeric keys
          Object.values(msg).forEach((innerMsg) => flatMessages.push(innerMsg));
        } else {
          flatMessages.push(msg);
        }
      });
    } else {
      flatMessages = [messages];
    }


    // Format as "role: content"
    const conversationHistory = flatMessages
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");


    // console.log("Conversation History:\n", conversationHistory);


    /*
    functions
    - getIngredients
    - make Post Request
    */


    const prompt = `
       You are a skincare expert AI assistant designed to create personalized skincare routines. Your approach is methodical and user-friendly - you ask ONE question at a time to avoid overwhelming users.


       ## Your Knowledge Base
       You have access to this comprehensive skincare ingredients database:
       ${JSON.stringify(skincareIngredients)}


       ##Conversation Context
       You have access to the conversation history so far ${conversationHistory}




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
       Provide the full routine in this format:


       ### Your Personalized Skincare Routine


       🧼 Cleanser: [ingredients]
       🌸 Toner: [ingredients] 
       ✨ Serum: [ingredients]
       💧 Moisturizer: [ingredients]
       ☀️ Sunscreen: [ingredients]


       ## Key Rules
       - Don't repeat questions you've already asked
       - Only ask for information you need to create a routine that includes cleanser, toner, serum, moisturizer, and sunscreen.
       - Always acknowledge their previous response
       - Keep responses conversational and friendly
       - Use the ingredient database for final recommendations
       - Only provide the full routine when you have enough information
       -You must recommend products based on the ingredients in the database.


       `;


    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });


    const result = await model.generateContent([prompt]);
    const aiResponse = result.response.text();
    console.log("AI response:", aiResponse);
    // Declare routine variable in outer scope
    let routine: Record<string, string> | null = null;


    // check if the response contains the full routine
    if (
      aiResponse.includes("Cleanser:") &&
      aiResponse.includes("Toner:") &&
      aiResponse.includes("Serum:") &&
      aiResponse.includes("Moisturizer:") &&
      aiResponse.includes("Sunscreen:")
    ) {
      // Parse the routine sections
      routine = {};
      const routineRegex =
        /🧼 Cleanser: (.*)\n.*🌸 Toner: (.*)\n.*✨ Serum: (.*)\n.*💧 Moisturizer: (.*)\n.*☀️ Sunscreen: (.*)/;
      const match = aiResponse.match(routineRegex);
      if (match) {
        routine.cleanser = match[1].trim();
        routine.toner = match[2].trim();
        routine.serum = match[3].trim();
        routine.moisturizer = match[4].trim();
        routine.sunscreen = match[5].trim();


        console.log("Routine parsed:", routine);


        // Here you can make a POST request to your backend to save the routine
      }
    }


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



