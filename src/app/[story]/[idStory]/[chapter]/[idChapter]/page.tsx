// components
import Content from "./components/content";

// template
import { MyStory } from "@hwasanchae/app/template/story/story"; // ✅ 
import { MyChapter } from "@hwasanchae/app/template/story/chapter"; // ✅ 
import { CommentData } from "@hwasanchae/app/template/story/comment"; // ✅ 

// metadata
import { Metadata } from "next";

type PageProps = {
    params: Promise<{
        idStory: string;
        idChapter: string;
    }>
}

async function getDetailStory(idStory: string) {
    try {
        const baseUrl = process.env.BASE_URL!;
        const response = await fetch(`${baseUrl}/api/story?idStory=${idStory}`, {
            next: { tags: [`story`, `story:${idStory}`] }
        });
        const responseData = await response.json();
        const data = responseData.data as MyStory;

        return data;
    } catch (error) {
        console.log(`Error get detail story: ${error}`);

        return null;
    }
}

async function getDetailChapter(idChapter: string) {
    try {
        const baseUrl = process.env.BASE_URL!;
        const response = await fetch(`${baseUrl}/api/chapter?idChapter=${idChapter}`, {
            next: { tags: [`chapter`, `chapter:${idChapter}`] }
        });
        const responseData = await response.json();
        const data = responseData.data as MyChapter;

        return data;
    } catch (error) {
        console.log(`Error get detail data chapter: ${error}`);

        return null;
    }
}

async function getHwasanchaeData(col: string) {
    try {
        const baseUrl = process.env.BASE_URL!;
        const response = await fetch(`${baseUrl}/api/hwasanchae/${col}`, {
            next: { tags: [`hwasanchae`] }
        });
        const responseData = await response.json();
        const data = responseData.data;

        return data;
    } catch (error) {
        console.log(`Error get hwasanchae data: ${error}`);
        
        return null;
    }
}

async function getPrevAndNext(idStory: string, idChapter: string) {
    try {
        const baseUrl = process.env.BASE_URL!;
        const response = await fetch(`${baseUrl}/api/story?idStory=${idStory}`, {
            next: { tags: [`story`, `story:${idStory}`] }
        });
        const responseData = await response.json();
        const data = responseData.data as MyStory;
        const allChapterList = data.chapters.sort((a, b) => a.sort - b.sort);
        console.log({ allChapterList });

        const findIndex = allChapterList.findIndex((chapter) => chapter.idChapter === idChapter);
        const prevId = findIndex > 0 ? allChapterList[findIndex - 1].idChapter : null;
        const nextId = findIndex < allChapterList.length - 1 ? allChapterList[findIndex + 1].idChapter : null;

        console.log({ prevId, nextId });

        let dataPrev = null;
        let dataNext = null;
        if (prevId) {
            const responsePrev = await fetch(`${baseUrl}/api/chapter?idChapter=${prevId}`, {
                next: { tags: [`chapter`, `chapter:${prevId}`] }
            });
            const prevData = await responsePrev.json();
            dataPrev = {
                idChapter: prevId,
                titleChapter: prevData.data.title
            }
        }

        if (nextId) {
            const responseNext = await fetch(`${baseUrl}/api/chapter?idChapter=${nextId}`, {
                next: { tags: [`chapter`, `chapter:${nextId}`] }
            });
            const nextData = await responseNext.json();
            dataNext = {
                idChapter: nextId,
                titleChapter: nextData.data.title
            }
        }

        return { dataPrev, dataNext };
    } catch (error) {
        console.log(`Error get previous and next chapter: ${error}`);

        return null;
    }
}

async function getCommentList(idComment: string) {
    try {
        const baseUrl = process.env.BASE_URL!;
        const response = await fetch(`${baseUrl}/api/comment?idComment=${idComment}`, {
            next: { tags: [`chapter`] }
        });
        const responseData = await response.json();
        if (responseData.data) {
            const commentData = responseData.data as CommentData[];
            return commentData;
        }

        return [];
    } catch (error) {
        console.log(`Error get comment list: ${error}`);

        return [];
    }
}

export async function generateMetadata(
    { params }: PageProps
): Promise<Metadata> {
    const { idStory, idChapter } = await params;
    const storyData = await getDetailStory(idStory);
    const chapterData = await getDetailChapter(idChapter);
    

    if (storyData && chapterData) {
        let allKeywords = [`${storyData.title}`, `${chapterData.title}`];
        let allTags = storyData.tags.map(tag => tag.tag);

        return {
            title: `${storyData.title} - ${chapterData.title}`,
            description: `${storyData.summary}`,
            keywords: [...allKeywords, ...allTags],
            openGraph: {
                title: `${storyData.title} - ${chapterData.title}`,
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
    const { idStory, idChapter } = await params;
    const storyData = await getDetailStory(idStory);
    const chapterData = await getDetailChapter(idChapter);
    let commentList: CommentData[] = [];
    if (chapterData) {
        commentList = chapterData.commentId ? await getCommentList(chapterData.commentId) : [];
    }
    const donationList = await getHwasanchaeData(`donationList`);
    const communityList = await getHwasanchaeData(`communityList`);
    const prevNextChapter = await getPrevAndNext(idStory, idChapter);

    return (
        storyData && chapterData ? 
            <Content 
                storyData={storyData} 
                chapterData={chapterData} 
                commentList={commentList}
                donationList={donationList} 
                communityList={communityList} 
                nextChapterData={prevNextChapter?.dataNext ? prevNextChapter.dataNext : null} 
                prevChapterData={prevNextChapter?.dataPrev ? prevNextChapter.dataPrev : null} 
            />
        : 
            <div>Data Not Found</div>
    )
}