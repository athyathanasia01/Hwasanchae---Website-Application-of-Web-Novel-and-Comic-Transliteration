// components
import Content from "./components/content";

// template
import { MyStory } from "@hwasanchae/app/template/story/story"; // ✅ 
import { MyChapter } from "@hwasanchae/app/template/story/chapter"; // ✅ 

// metadata
import { Metadata } from "next";

type Props = {
    params: Promise<{ idstory: string, idchapter: string }>
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

async function getDetailDataChapter(idChapter: string) {
    try {
        const response = await fetch(`http://localhost:3000/api/chapter?idChapter=${idChapter}`, {
            method: `GET`,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();
        const data = responseData.data as MyChapter;

        return data;
    } catch (error) {
        console.log(`Error get detail data chapter id: ${idChapter} with error: ${error}`);
        return null;
    }
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { idstory, idchapter } = await params;
    const storyData = await getDetailDataStory(idstory);
    const chapterData = idchapter !== 'chapter' ? await getDetailDataChapter(idchapter) : null;

    if (storyData && chapterData) {
        return {
            title: `${storyData.title} - ${chapterData.title}`,
            description: `Story chapter of ${storyData.title} - ${chapterData.title}`,
            keywords: `${storyData.tags}`
        }
    } else if (storyData && !chapterData) {
        return {
            title: `${storyData.title} - Add New Chapter`,
            description: `Add new chapter for story ${storyData.title}`,
            keywords: `${storyData.tags}`
        }
    }

    return {
        title: null
    }
}

export default async function Page({ params }: Props) {
    const slug = await params;
    const idStory = slug.idstory;
    const idChapter = slug.idchapter;

    if (idChapter === "chapter") {
        return <Content idStory={idStory} idChapter={idChapter} />
    }

    return <Content idStory={idStory} idChapter={idChapter} />
}