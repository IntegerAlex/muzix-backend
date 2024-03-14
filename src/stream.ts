import axios from "axios";
import ytdl = require("ytdl-core");
import { promises as fsPromises } from "fs";
import * as dotenv from "dotenv";
dotenv.config();

interface VideoSearchResult {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}

export async function searchYT(
  query: string,
  sessionId: string,
): Promise<VideoSearchResult[]> {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY || "yourApiKey";
    const apiUrl = "https://www.googleapis.com/youtube/v3/search";

    const response = await axios.get(apiUrl, {
      params: {
        part: "snippet",
        q: query,
        type: "video",
        maxResults: 1,
        key: apiKey,
      },
    });

    return response.data.items.map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.default.url,
    }));
  } catch (error) {
    console.error("Error searching YouTube music:", error);
    throw error;
  }
}

export async function streamYT(
  videoId: string,
  sessionId: string,
): Promise<string> {
  const streamUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const filePath = `./audio/${sessionId}.mp3`;

  try {
    const stream = ytdl(streamUrl, { filter: "audioonly" });
    const fileHandle = await fsPromises.open(filePath, "w");

    const writableStream = fileHandle.createWriteStream();

    await new Promise<void>((resolve, reject) => {
      stream.pipe(writableStream);

      writableStream.on("finish", async () => {
        await fileHandle.close();
        resolve();
      });

      stream.on("error", reject);
      writableStream.on("error", reject);
    });

    return filePath;
  } catch (error) {
    console.error("Error streaming YouTube music:", error);
    throw error;
  }
}

// Example usage
const sessionId = "yourSessionId";
searchYT("starboy", "yourSessionId").then((results) => {
  console.log("Search results:", results[0].videoId);
  streamYT(results[0].videoId, sessionId)
    .then((filePath) => {
      console.log("Audio file saved at:", filePath);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
