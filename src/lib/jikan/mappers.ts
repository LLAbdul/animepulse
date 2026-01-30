import type { Anime, Genre, Studio, StreamingLink } from "@/types";

export function toAnimeDTO(raw: Anime): Anime {
  return {
    mal_id: raw.mal_id,
    title: raw.title,
    title_japanese: raw.title_japanese ?? undefined,
    title_english: raw.title_english ?? undefined,

    images: {
      jpg: {
        image_url: raw.images?.jpg?.image_url ?? "",
        large_image_url: raw.images?.jpg?.large_image_url ?? raw.images?.jpg?.image_url ?? "",
      },
      webp: {
        image_url: raw.images?.webp?.image_url ?? "",
        large_image_url: raw.images?.webp?.large_image_url ?? raw.images?.webp?.image_url ?? "",
      },
    },

    synopsis: raw.synopsis ?? undefined,
    episodes: raw.episodes ?? undefined,
    status: raw.status ?? "Unknown",
    score: raw.score ?? undefined,
    scored_by: raw.scored_by ?? undefined,
    year: raw.year ?? undefined,
    season: raw.season ?? undefined,

    genres: (raw.genres ?? []).map((g: Genre) => ({
      mal_id: g.mal_id,
      name: g.name,
    })),

    studios: (raw.studios ?? []).map((s: Studio) => ({
      mal_id: s.mal_id,
      name: s.name,
    })),

    trailer: raw.trailer
? {
          youtube_id: raw.trailer.youtube_id ?? undefined,
          url: raw.trailer.url ?? undefined,
          embed_url: raw.trailer.embed_url ?? undefined,
        }
      : undefined,

    streaming: (raw.streaming ?? []).map((x: StreamingLink) => ({
      name: x.name,
      url: x.url,
    })),
  };
}
