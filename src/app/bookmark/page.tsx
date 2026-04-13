// components
import Content from "./components/content";

// template
import { MyStory, StoryUser } from "../template/story/story"; // ✅ 
import { getAllDataInfo } from "../template/uiHelper"; // ✅ 

async function getListStory() {
    try {
        const baseUrl = process.env.BASE_URL!;
        const responseAllStory = await fetch(`${baseUrl}/api/story`, {
            next: { tags: [`story`] }
        });
        const responseAllStoryData = await responseAllStory.json();
        const allStoryData = responseAllStoryData.data as MyStory[];

        const dataListStory = (await Promise.all(
            allStoryData.map(async (story) => {
                const detailData = await getAllDataInfo(story.id, process.env.BASE_URL!);

                if (detailData) {
                    return {
                        ...story,
                        ...detailData
                    }
                } else {
                    return null;
                }
            })
        )).filter((item): item is Omit<StoryUser, 'isBookmark'> => item !== null);

        return dataListStory;
    } catch (error) {
        console.log(`Error get list story: ${error}`);
        
        return null;
    }
}

export default async function Page() {
    const storyList = await getListStory();

    return (
        storyList ?
            <Content storyList={storyList} />
        :
            <div>No Data Story</div>
    )
}