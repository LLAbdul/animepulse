// Jikan API v4 wrapper
// Documentation: https://docs.api.jikan.moe/

import type { Anime, JikanResponse, Genre } from "@/types";

const JIKAN_BASE_URL = "https://api.jikan.moe/v4";

// Rate limiting: Jikan allows 3 requests per second
// We add a small delay between requests to be safe
async function fetchWithDelay<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Jikan API error: ${response.status}`);
  }

  return response.json();
}

// Get anime by ID
export async function getAnimeById(id: number): Promise<Anime> {
  const response = await fetchWithDelay<JikanResponse<Anime>>(
    `${JIKAN_BASE_URL}/anime/${id}/full`
  );
  return response.data;
}

// Get top/popular anime
export async function getTopAnime(
  page: number = 1,
  limit: number = 24
): Promise<JikanResponse<Anime[]>> {
  return fetchWithDelay<JikanResponse<Anime[]>>(
    `${JIKAN_BASE_URL}/top/anime?page=${page}&limit=${limit}`
  );
}

// Get currently airing anime (trending)
export async function getCurrentSeasonAnime(
  page: number = 1,
  limit: number = 24
): Promise<JikanResponse<Anime[]>> {
  return fetchWithDelay<JikanResponse<Anime[]>>(
    `${JIKAN_BASE_URL}/seasons/now?page=${page}&limit=${limit}`
  );
}

// Search anime by query
export async function searchAnime(
  query: string,
  page: number = 1,
  limit: number = 24
): Promise<JikanResponse<Anime[]>> {
  const encodedQuery = encodeURIComponent(query);
  return fetchWithDelay<JikanResponse<Anime[]>>(
    `${JIKAN_BASE_URL}/anime?q=${encodedQuery}&page=${page}&limit=${limit}`
  );
}

// Get anime by genre
export async function getAnimeByGenre(
  genreId: number,
  page: number = 1,
  limit: number = 24
): Promise<JikanResponse<Anime[]>> {
  return fetchWithDelay<JikanResponse<Anime[]>>(
    `${JIKAN_BASE_URL}/anime?genres=${genreId}&page=${page}&limit=${limit}`
  );
}

// Get all genres
export async function getGenres(): Promise<Genre[]> {
  const response = await fetchWithDelay<JikanResponse<Genre[]>>(
    `${JIKAN_BASE_URL}/genres/anime`
  );
  return response.data;
}

// Get anime recommendations
export async function getAnimeRecommendations(
  animeId: number
): Promise<JikanResponse<{ entry: Anime }[]>> {
  return fetchWithDelay<JikanResponse<{ entry: Anime }[]>>(
    `${JIKAN_BASE_URL}/anime/${animeId}/recommendations`
  );
}
