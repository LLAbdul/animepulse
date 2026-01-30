import type { Anime, JikanResponse } from "@/types";

const JIKAN_BASE_URL = "https://api.jikan.moe/v4";


export async function getAnime(malId: number): Promise<Anime> {
    const response = await fetch(`${JIKAN_BASE_URL}/anime/${malId}`);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch anime: ${response.status} ${response.statusText}`);
    }
    
    const data: JikanResponse<Anime> = await response.json();
    
    return data.data;
}