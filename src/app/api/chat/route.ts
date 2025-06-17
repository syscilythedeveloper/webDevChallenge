import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Request data:", data);

    const prompt = `
    You are a skincare expert AI assistant. Your task is to provide personalized skincare advice based on user input.
    `;
    //use conversations to understand what the user needs. Search skin-care ingredients for said products/then query convex db by ingredients to get those

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
