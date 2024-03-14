import axios from 'axios';
// import ytdl from 'ytdl-core';
import * as ytdl from 'ytdl-core'
import fs from 'fs/promises';
// import dotenv from 'dotenv';
// dotenv.config();

// Function to search YouTube music using Axios
export async function searchYT(query:string , sessionId:string) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY || 'yourApiKey';
    const apiUrl = 'https://www.googleapis.com/youtube/v3/search';

    const response = await axios.get(apiUrl, {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 1, // Limit search results to 1
        key: apiKey,
      },
    });

    const searchResults = response.data.items.map((item:any) => {
      return {
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl: item.snippet.thumbnails.default.url,
      };
    });

    return searchResults;
  } catch (error:unknown){
    console.error('Error searching YouTube music:', error);
    throw error;
  }
}

export async function streamYT(videoId: string, sessionId: string): Promise<string> {
    const streamUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const filePath = `./audio/${sessionId}.mp3`;
  
    try {
      const stream = ytdl(streamUrl, { filter: 'audioonly' });
      const fileStream = await fs.open(filePath, 'w');
  
      return new Promise<string>((resolve, reject) => {
        stream.pipe(fileStream);
  
        fileStream.on('close', async () => {
          await fileStream.close(); // Close the file stream explicitly
          resolve(filePath);
        });
  
        fileStream.on('error', (error) => {
          reject(error);
        });
      });
    } catch (error) {
      console.error('Error streaming YouTube music:', error);
      throw error;
    }
  }
  
  
// Example usage
const videoId = 'vuT_bXzhqhY';
const sessionId = 'yourSessionId';

streamYT(videoId, sessionId)
  .then(filePath => {
    console.log('Audio file saved at:', filePath);
  })
  .catch(error => {
    console.error('Error:', error);
  });



// const searchTerm = "niigas in paris";
// searchYT(searchTerm,"123")
//   .then(results => {
//     console.log('Search results:', results);
//   })
//   .catch(err => {
//     console.error('Error:', err);
//   });



