/**
 * Tests pour GET /api/anime/[id] — getAnimeById
 *
 * On mocke getAnimeById pour ne pas appeler la vraie API Jikan.
 * Guide détaillé : TESTING.md à la racine du projet.
 *
 * Structure : src/__tests__/api/anime/id/ = tests de la route /api/anime/[id].
 * Les sous-dossiers (api, anime, id) reflètent la structure de l’API.
 */

import { NextRequest } from "next/server";
import { GET } from "@/app/api/anime/[id]/route";

// On remplace l’appel externe (Jikan) par une fausse fonction contrôlée par Jest.
jest.mock("@/lib/jikan/api", () => ({
  getAnimeById: jest.fn(),
}));

import { getAnimeById } from "@/lib/jikan/api";
import type { Anime } from "@/types";

const mockGetAnimeById = getAnimeById as jest.MockedFunction<typeof getAnimeById>;

describe("GET /api/anime/[id] — getAnimeById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("retourne 200 et l’anime en JSON quand l’id est valide", async () => {
    // 1. Données que le mock va retourner à la place de la vraie API.
    const anime: Anime = {
      mal_id: 1,
      title: "Cowboy Bebop",
      status: "Finished Airing",
      images: {
        jpg: { image_url: "https://cdn.myanimelist.net/1.jpg", large_image_url: "https://cdn.myanimelist.net/1l.jpg" },
        webp: { image_url: "https://cdn.myanimelist.net/1.webp", large_image_url: "https://cdn.myanimelist.net/1l.webp" },
      },
      genres: [{ mal_id: 1, name: "Action" }],
      studios: [{ mal_id: 1, name: "Sunrise" }],
    };
    mockGetAnimeById.mockResolvedValue(anime);

    // 2. Fausse requête HTTP (comme si on appelait /api/anime/1).
    const req = new Request("http://localhost:3000/api/anime/1") as NextRequest;

    // 3. Params de la route dynamique [id]. En App Router c’est une Promise.
    const params = Promise.resolve({ id: "1" });

    // 4. On appelle le handler GET comme le ferait Next.js.
    const res = await GET(req, { params });

    // 5. On vérifie le status et le JSON renvoyé.
    expect(res.status).toBe(200);
    const json = (await res.json()) as Anime;
    expect(json.mal_id).toBe(1);
    expect(json.title).toBe("Cowboy Bebop");
    expect(json.status).toBe("Finished Airing");
    expect(json.images.jpg.image_url).toBeDefined();
    expect(json.genres).toHaveLength(1);
    expect(json.genres[0].name).toBe("Action");

    // 6. On vérifie que getAnimeById a bien été appelé avec le bon id (nombre).
    expect(mockGetAnimeById).toHaveBeenCalledWith(1);
  });

  it("retourne 400 quand l’id n’est pas un nombre", async () => {
    // 1. Requête avec un id invalide (lettres au lieu d’un nombre).
    const req = new Request("http://localhost:3000/api/anime/abc") as NextRequest;
    const params = Promise.resolve({ id: "abc" });

    // 2. On appelle le handler.
    const res = await GET(req, { params });

    // 3. Le handler doit retourner 400 et le message d’erreur attendu.
    expect(res.status).toBe(400);
    const json = (await res.json()) as { error: string };
    expect(json.error).toBe("Invalid anime ID. Must be a number.");

    // 4. getAnimeById ne doit pas être appelé (validation échoue avant).
    expect(mockGetAnimeById).not.toHaveBeenCalled();
  });

  it("retourne 500 quand getAnimeById lève une erreur", async () => {
    // 1. On évite que console.error pollue la sortie des tests.
    jest.spyOn(console, "error").mockImplementation(() => {});

    // 2. Le mock simule une erreur (ex. réseau).
    mockGetAnimeById.mockRejectedValue(new Error("Network error"));

    // 3. Requête et appel du handler.
    const req = new Request("http://localhost:3000/api/anime/1") as NextRequest;
    const res = await GET(req, { params: Promise.resolve({ id: "1" }) });

    // 4. Le handler doit retourner 500 et le body d’erreur attendu.
    expect(res.status).toBe(500);
    const json = (await res.json()) as { error: string; message: string };
    expect(json.error).toBe("Failed to fetch anime");
    expect(json.message).toBe("Network error");

    // 5. getAnimeById a bien été appelé avant de lever l’erreur.
    expect(mockGetAnimeById).toHaveBeenCalledWith(1);
  });
});
