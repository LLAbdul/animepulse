import { NextRequest, NextResponse } from "next/server";
import { getAnimeById } from "@/lib/jikan/api";

export async function GET(request: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const malId = parseInt(id, 10);

    if (isNaN(malId)) {
      return NextResponse.json(
        { error: "Invalid anime ID. Must be a number." },
        { status: 400 }
      );
    }

    const anime = await getAnimeById(malId);
    return NextResponse.json(anime);
  } catch (error) {
    console.error("Error fetching anime:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch anime",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
