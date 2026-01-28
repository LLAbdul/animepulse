// Anime types based on Jikan API v4 responses

export interface Anime {
  mal_id: number;
  title: string;
  title_japanese?: string;
  title_english?: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      large_image_url: string;
    };
  };
  synopsis?: string;
  episodes?: number;
  status: string;
  score?: number;
  scored_by?: number;
  year?: number;
  season?: string;
  genres: Genre[];
  studios: Studio[];
  trailer?: {
    youtube_id?: string;
    url?: string;
    embed_url?: string;
  };
  streaming?: StreamingLink[];
}

export interface Genre {
  mal_id: number;
  name: string;
}

export interface Studio {
  mal_id: number;
  name: string;
}

export interface StreamingLink {
  name: string;
  url: string;
}

// List status enum (matches Prisma schema)
export type ListStatus =
  | "WATCHING"
  | "COMPLETED"
  | "PLAN_TO_WATCH"
  | "ON_HOLD"
  | "DROPPED";

// User's anime list entry
export interface AnimeListEntry {
  id: string;
  animeId: number;
  status: ListStatus;
  rating?: number;
  episodesWatched: number;
  createdAt: Date;
  updatedAt: Date;
  anime?: Anime;
}

// Jikan API response wrapper
export interface JikanResponse<T> {
  data: T;
  pagination?: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
  };
}
