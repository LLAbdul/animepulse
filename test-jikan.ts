// Test script for Jikan API
import { getAnimeById } from "./src/lib/jikan/api.js";

async function testJikan() {
    console.log("Testing Jikan API...\n");
    
    // Test with a popular anime (e.g., Attack on Titan - MAL ID: 16498)
    const testMalId = 16498;
    
    try {
        console.log(`Fetching anime with MAL ID: ${testMalId}`);
        const anime = await getAnimeById(testMalId);
        
        console.log("\n✅ Success! Anime data:");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log(`Title: ${anime.title}`);
        console.log(`Japanese Title: ${anime.title_japanese || "N/A"}`);
        console.log(`Status: ${anime.status}`);
        console.log(`Episodes: ${anime.episodes || "N/A"}`);
        console.log(`Score: ${anime.score || "N/A"}`);
        console.log(`Year: ${anime.year || "N/A"}`);
        console.log(`Genres: ${anime.genres.map(g => g.name).join(", ") || "N/A"}`);
        console.log(`Image URL: ${anime.images.jpg.large_image_url}`);
        if (anime.synopsis) {
            console.log(`\nSynopsis: ${anime.synopsis.substring(0, 200)}...`);
        }
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        
    } catch (error) {
        console.error("\n❌ Error testing Jikan API:");
        console.error(error);
        process.exit(1);
    }
}

testJikan();
