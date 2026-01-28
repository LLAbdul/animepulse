import { NextResponse } from "next/server";
import { getCurrentSeasonAnime } from "@/lib/jikan";

export async function GET(request: Request) {
  try {
    // Get query params (optional pagination)
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "24");

    // Call Jikan API via our wrapper
    const data = await getCurrentSeasonAnime(page, limit);

    // Return the data
    return NextResponse.json({
      success: true,
      data: data.data,
      pagination: data.pagination,
    });
  } catch (error) {
    console.error("Error fetching trending anime:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch trending anime" },
      { status: 500 }
    );
  }
}
