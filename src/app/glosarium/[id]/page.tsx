// components
import Content from "../components/content";

// template
import { MyStory } from "@hwasanchae/app/template/story/story"; // ✅ 
import { NewChapterItem } from "@hwasanchae/app/template/story/chapter"; // ✅ 
import { FootnoteInput, GlosariumList } from "@hwasanchae/app/template/story/footnote"; // ✅ 

type PageProps = {
    params: Promise<{
        id: string;
    }>
}

async function getListGlosarium(idStory: string) {
    try {
        const baseUrl = process.env.BASE_URL!;
        const response = await fetch(`${baseUrl}/api/story?idStory=${idStory}`, {
            next: { tags: [`story`, `story:${idStory}`] }
        });
        const responseData = await response.json();
        const data = responseData.data as MyStory;

        const storyResponse = await fetch(`${baseUrl}/api/chapter?idStory=${idStory}`, {
            next: { tags: [`story`, `story:${idStory}`, `chapter`] }
        });
        const storyResponseData = await storyResponse.json();
        const storyData = (storyResponseData.data || []) as NewChapterItem[];

        const allFootnotes = storyData
            .flatMap(story => story.footnotes || [])
            .filter(item => item?.phrase.trim());
        const uniqueMap = new Map<string, FootnoteInput>();
        allFootnotes.forEach(item => {
            const key = item.phrase.trim().toLowerCase();
            if (!uniqueMap.has(key)) {
                uniqueMap.set(key, item);
            }
        });
        const footnoteList = Array.from(uniqueMap.values());

        const glosariumGrouped = footnoteList.reduce((acc, item) => {
            const firstChar = item.phrase.charAt(0).toUpperCase();
            const key = /[A-Z0-9]/.test(firstChar) ? firstChar : "#";

            if (!acc[key]) {
                acc[key] = [];
            }

            acc[key].push(item)

            return acc;
        }, {} as Record<string, FootnoteInput[]>);

        Object.keys(glosariumGrouped).forEach(key => {
            glosariumGrouped[key].sort((a, b) => a.phrase.localeCompare(b.phrase));
        });

        const result = Object.entries(glosariumGrouped).map(([alphaNum, footnote]) => ({
            alphaNum,
            footnote
        }));

        return {
            title: data.title,
            glosarium: result.sort((a, b) => a.alphaNum.localeCompare(b.alphaNum))
        };
    } catch (error) {
        console.log(`Error get list glosarium: ${error}`);

        return null;
    }
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;

    const data = await getListGlosarium(id);
    let glosariumList: GlosariumList[] = [];
    let title: string = "";

    if (data) {
        glosariumList = data.glosarium;
        title = data.title;
    }

    return <Content
        title={title}
        glosarium={glosariumList}
    />
}