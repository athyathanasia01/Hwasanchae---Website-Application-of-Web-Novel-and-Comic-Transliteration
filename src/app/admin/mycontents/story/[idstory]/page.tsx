// components
import ContentStories from "../components/content";

// template
import { MyStory } from "@hwasanchae/app/template/story/story"; // ✅ 

// metadata
import { Metadata } from "next";

type Props = {
    params: Promise<{ idstory: string }>
}

async function getDetailDataStory(idStory: string) {
    try {
        const response = await fetch(`http://localhost:3000/api/story?idStory=${idStory}`, {
            method: `GET`,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();
        const data = responseData.data as MyStory;

        return data;
    } catch (error) {
        console.log(`Error get detail data story id: ${idStory} with error: ${error}`);
        return null;
    }
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { idstory } = await params;
    const storyData = await getDetailDataStory(idstory);

    if (storyData) {
        return {
            title: `${storyData.title}`,
            description: `${storyData.summary}`,
            keywords: `${storyData.tags}`
        }
    }

    return {
        title: null
    }
}

export default async function Page({ params }: Props) {
    const { idstory } = await params;

    return <ContentStories idStory={idstory} />
}