// components
import Content from "./components/content";

// template
import { MyStory } from "@hwasanchae/app/template/story/story"; // ✅ 
import { getAllDataInfo } from "@hwasanchae/app/template/uiHelper"; // ✅ 
import { NewChapterItem } from "@hwasanchae/app/template/story/chapter"; // ✅ 
import { HwasanchaeData } from "@hwasanchae/app/template/hwasanchae/hwasanchae"; // ✅ 
import { UserData } from "@hwasanchae/app/template/other/username"; // ✅ 
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅

// metadata
import { Metadata } from "next";

type PageProps = {
    params: Promise<{
        idStory: string;
    }>
}

async function getDetailStory(idStory: string) {
    try {
        const baseUrl = process.env.BASE_URL!;
        const responseStory = await fetch(`${baseUrl}/api/story?idStory=${idStory}`, {
            next: { tags: [`story`, `story:${idStory}`] }
        });
        const responseDataStory = await responseStory.json();
        const dataStory = responseDataStory.data as MyStory;

        const detailStory = await getAllDataInfo(idStory, baseUrl);

        const responseChapter = await fetch(`${baseUrl}/api/chapter?idStory=${idStory}`, {
            next: { tags: [`story`, `story:${idStory}`, `chapter`] }
        });
        const responseDataChapter = await responseChapter.json();
        const dataChapter = responseDataChapter.data as NewChapterItem[];

        if (detailStory) {
            return {
                ...dataStory,
                ...detailStory,
                chapters: dataChapter
            }
        } 
        return {
            ...dataStory,
            lastUpdate: "", 
            lastTitle: "",
            read: 0,
            vote: 0,
            comments: 0,
            chapters: dataChapter
        }
    } catch (error) {
        console.log(`Error get detail story: ${error}`);

        return null;
    }
}

async function getHwasanchaeData() {
    try {
        const baseUrl = process.env.BASE_URL!;
        const response = await fetch(`${baseUrl}/api/hwasanchae`, {
            next: { tags: [`hwasanchae`] }
        });
        const responseData = await response.json();
        const data = responseData.data as HwasanchaeData;

        return data;
    } catch (error) {
        alert(`Error: ${error}`);
        console.log(`Error get detail data hwasanchae: ${error}`);

        return null;
    }
}

async function getDetailTranslatorMedia(idTranslator: string) {
    if (!idTranslator) return [];

    try {
        const baseUrl = process.env.BASE_URL!;
        const response = await fetch(`${baseUrl}/api/auth/user?userId=${idTranslator}`, {
            next: { tags: [`profile`, `profile:${idTranslator}`] }
        });
        const responseData = await response.json();
        const data = responseData.data as UserData;

        return data.media;
    } catch (error) {
        console.log(`Error get translator media: ${error}`);
        return [];
    }
}

export async function generateMetadata(
    { params }: PageProps
): Promise<Metadata> {
    const { idStory } = await params;
    const storyData = await getDetailStory(idStory);

    if (storyData) {
        let allKeywords = [`${storyData.title}`];
        let allTags = storyData.tags.map(tag => tag.tag);

        return {
            title: `${storyData.title}`,
            description: `${storyData.summary}`,
            keywords: [...allKeywords, ...allTags],
            openGraph: {
                title: `${storyData.title}`,
                description: `${storyData.summary}`,
                images: [`${storyData.coverImage?.url}`]
            }
        }
    }

    return {
        title: null
    }
}

export default async function Page({ params }: PageProps) {
    const { idStory } = await params;
    const data = await getDetailStory(idStory);

    let hwasanchaeData: HwasanchaeData | null = null;
    let translatorMedia: SocialMedia[] = [];
    
    if (data) {
        hwasanchaeData = await getHwasanchaeData();
        translatorMedia = await getDetailTranslatorMedia(data.translator.userId);
    }
    
    return (
        data && hwasanchaeData ?
            <Content story={data} hwasanchae={hwasanchaeData} mediaTranslator={translatorMedia} />
        : 
            <div>No Story Found</div>
    )
}