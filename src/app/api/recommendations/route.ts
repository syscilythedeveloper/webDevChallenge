/* eslint-disable @typescript-eslint/no-explicit-any */

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const rawIngredients = data.product.ingredient;
    const ingredients = Array.isArray(rawIngredients)
      ? rawIngredients.slice(0, 4)
      : typeof rawIngredients === "string"
      ? rawIngredients
          .split(",")
          .map((i: string) => i.trim())
          .slice(0, 4)
      : [];
    const summary = `We recommend this product because it contains ${ingredients.length} ingredients that are beneficial for the skin.`;
    return new Response(JSON.stringify({ ingredients, summary }), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
