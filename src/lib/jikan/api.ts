import type { Anime, JikanResponse } from "@/types";
import { toAnimeDTO } from "./mappers";

const JIKAN_BASE_URL = "https://api.jikan.moe/v4";

export async function getAnimeById(malId: number): Promise<Anime> {
    try {
        const res = await fetch(`${JIKAN_BASE_URL}/anime/${malId}/full`);
        if (!res.ok) throw new Error(`Failed to fetch anime: ${res.status} ${res.statusText}`);

        const json = (await res.json()) as JikanResponse<unknown>;
        return toAnimeDTO((json.data as Anime));
    } catch (error) {
        console.error("Error fetching anime:", error);
        throw new Error(`Failed to fetch anime: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
}
