// pages/api/image-search.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: "Missing query" });
    }

    const apiKey = process.env.SERPAPI_KEY;
    const searchQuery = encodeURIComponent(query as string);

    try {
        const response = await fetch(
            `https://serpapi.com/search.json?engine=google_images&q=${searchQuery}&api_key=${apiKey}`
        );

        const data = await response.json();
        const imageUrl = data?.images_results?.[0]?.thumbnail || null;

        res.status(200).json({ imageUrl });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch image" });
    }
}
