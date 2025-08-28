/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from "@google/generative-ai";
import skincareIngredients from "../../data/skincareIngredients.json";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-001",
  generationConfig: {
    responseMimeType: "application/json",
  },
});
type CleanedResponse = {
  summary: string;
  benefit_tags: string[];
  relevant_ingredients: string[];
};

export function cleanProductResponse(raw: any): CleanedResponse {
  let parsed: any;

  // Step 1: Parse JSON if needed
  if (typeof raw === "string") {
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      console.warn("Invalid JSON response:", e);
      return { summary: "", benefit_tags: [], relevant_ingredients: [] };
    }
  } else {
    parsed = raw || {};
  }

  // Step 2: Extract and normalize summary
  const summary =
    typeof parsed.summary === "string" ? parsed.summary.trim() : "";

  // Step 3: Title case helper
  function toTitleCase(str: string): string {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  // Step 4: Normalize arrays
  function normalizeArray(arr: any): string[] {
    if (!Array.isArray(arr)) return [];
    return Array.from(
      new Set(
        arr
          .filter((item) => typeof item === "string")
          .map((item) => item.trim())
          .filter((item) => item.length > 0)
          .map((item) => toTitleCase(item)) // return Title Cased
      )
    );
  }

  const benefit_tags = normalizeArray(parsed.benefit_tags);
  const relevant_ingredients = normalizeArray(parsed.relevant_ingredients);

  // Step 5: Return cleaned response
  return {
    summary,
    benefit_tags,
    relevant_ingredients,
  };
}

export async function POST(req: Request) {
  const data = await req.json();
  const rawIngredients = data.product.ingredient;
  const userConcern = data.concern || "general skin health";
  console.log("User concern:", userConcern);
  const prompt = `
You are a skincare product recommendation engine. Explain why a product is recommended for the user's concern: ${userConcern}. Personalize the summary, lead with the concern, and ground all claims in the knowledge base.

Product details:
- Type: ${data.product.type}
- Rating: ${data.product.rating} (from ${
    data.product.number_of_reviews
  } reviews)
- Active ingredients count: ${data.product.n_active_ingredient}
- Inactive ingredients count: ${data.product.n_inactive_ingredient}
- Full ingredient list: ${rawIngredients}

Knowledge base (JSON): ${JSON.stringify(skincareIngredients)}
(Contains evidence-based ingredient benefits. Only use this as the source of truth for ingredient effects and concern mappings.)

### Tasks
1) Summary (2–3 sentences):
   - Always begin by directly referencing the user’s concern (e.g., “For acne-prone skin…”).
   - If targeted ingredients exist, clearly explain how they help with that concern in plain language.
   - If only supportive ingredients exist, explain that the product provides supportive care to complement targeted treatments.
   - If no relevant ingredients exist, be transparent that it functions as general care rather than a targeted solution.
   - Include trust markers when available, written in natural, user-friendly ways:
     - Reviews as social proof (e.g., “well-rated by thousands of users”).
     - Actives vs inactives as a potency/gentleness cue (e.g., “balanced for daily use”).
   - Use approachable, everyday beauty language. Avoid technical jargon, raw counts, or percentages.


2) benefit_tags:
   - 2–5 short **verb + noun phrases** (e.g., "Brightens skin", "Clears blemishes", "Hydrates deeply").
   - Always written in plain user-friendly language.
   - If no direct matches exist, include ["Provides general care"] and any justified general tags (e.g., "Supports barrier", "Soothes skin").

3) relevant_ingredients:
   - 3–8 ingredients if directly linked to the concern by the knowledge base.
   - For partial/supportive cases, list only supportive ingredients.
   - For no-match cases, return an empty array.

### Return ONLY raw JSON. Do not use markdown or code fences. Do not add any explanations or notes outside the JSON.:
{
  "summary": "2–3 sentences; begins with the user's concern; targeted/supportive/no-match logic applied; optional subtle trust markers.",
  "benefit_tags": ["Verb + noun phrase", "Verb + noun phrase", "..."],
  "relevant_ingredients": ["Ingredient1", "Ingredient2", "..."]
}

### Examples
- No match:
{
  "summary": "For dark spots, this product doesn’t include targeted brightening actives from our knowledge base. It functions as general care—supporting daily hydration and comfort—rather than directly fading discoloration.",
  "benefit_tags": ["Provides general care", "Hydrates skin"],
  "relevant_ingredients": []
}

- Partial match:
{
  "summary": "For acne-prone skin, this moisturizer offers supportive care with glycerin and allantoin to maintain hydration and reduce irritation while you use targeted treatments. Its gentle balance makes it suitable for daily use alongside actives.",
  "benefit_tags": ["Soothes skin", "Hydrates deeply", "Supports barrier"],
  "relevant_ingredients": ["Glycerin", "Allantoin"]
}

- Full match:
{
  "summary": "For dark spots, this serum combines niacinamide and vitamin C to brighten skin tone and fade discoloration. It’s well-rated by thousands of users, and its higher proportion of active ingredients makes it a strong choice for targeted dark-spot care.",
  "benefit_tags": ["Brightens skin", "Evens tone", "Fades dark spots"],
  "relevant_ingredients": ["Niacinamide", "Vitamin C", "Licorice Root Extract"]
}`;

  try {
    const result = await model.generateContent(prompt);

    let aiOutput = result.response.text().trim();
    if (aiOutput.startsWith("```")) {
      aiOutput = aiOutput.replace(/```/g, "");
    }
    const cleaned = cleanProductResponse(aiOutput);
    console.log("Cleaned response:", cleaned);
    const summary = cleaned.summary;
    const benefitTags = cleaned.benefit_tags;
    const relevantIngredients = cleaned.relevant_ingredients;

    return new Response(
      JSON.stringify({ relevantIngredients, summary, benefitTags }),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
