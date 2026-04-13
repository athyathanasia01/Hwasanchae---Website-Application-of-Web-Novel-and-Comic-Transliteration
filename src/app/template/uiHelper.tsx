import { countComments } from "./serverHelper"; // ✅
import { DataChapterAPI } from "./story/chapter"; // ✅ 

// ✅ page.tsx
// ✅ [story]/[idStory]/page.tsx
// ✅ bookmark/page.tsx
// ✅ admin/mycontents/components/components/cardStoryContainer.tsx
export async function getAllDataInfo(idStory: string, baseUrl?: string) {
    try {
        const url = baseUrl 
            ? `${baseUrl}/api/chapter?idStory=${idStory}`
            : `/api/chapter?idStory=${idStory}`;

        const response = baseUrl ? await fetch(url, { next: { revalidate: 3600 } }): await fetch(url);
        const responseData = await response.json();
        const data = responseData.data as DataChapterAPI[];

        // resource
        let lastUpdate = "";
        let lastTitle = "";
        let read = 0;
        let vote = 0;
        let comments = 0;

        if (data.length !== 0) {
            lastUpdate = data[data.length - 1].updatedAt;
            lastTitle = data[data.length - 1].title;
            read = data.reduce((total, dt) => total + dt.read, 0);
            vote = data.reduce((total, dt) => total + dt.vote, 0);
            comments = data.reduce((total, dt) => {
                return total + countComments(dt.comments)
            }, 0);
        } 

        return {
            lastUpdate,
            lastTitle,
            read,
            vote,
            comments
        }
    } catch (error) {
        if (baseUrl) alert(`Error: ${error}`);
        console.log(`Error card story ${idStory} get detail data: ${error}`);
        
        return null;
    }
}