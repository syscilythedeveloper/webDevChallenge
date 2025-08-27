/* eslint-disable @typescript-eslint/no-explicit-any */

export async function POST(req: Request) {
  try {
    //get ingredients from ai agent
    const data = await req.json();
    console.log("Data received in recommendations route:", data);
    return new Response("Success", { status: 200 });
  } catch (error: any) {
    return new Response("Query failed", error);
  }
}
