// metadata
import { MetadataRoute } from "next";

// template
import { MyStory } from "./template/story/story";
import { safeDate, slugify } from "./template/serverHelper";
import { MyChapter } from "./template/story/chapter";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    // STORY RULES
    const allStoryResponse = await fetch(`${baseUrl}/api/story`, {
        next: { tags: [`story`] }
    });
    const allStoryResponseData = await allStoryResponse.json();
    const stories: MyStory[] = allStoryResponseData.data;
    console.log({ stories });
    
    const storyRule: MetadataRoute.Sitemap = stories.map((story) => ({
        url: `${baseUrl}/${slugify(story.title)}/${story.id}`,
        lastModified: safeDate(story.createdAt),
        changeFrequency: 'daily' as const,
        priority: 0.6
    }));

    // CHAPTER RULES
    const allChapterResponseData = await Promise.all(
        stories.map(async (story) => {
            const chapterResponse = await fetch(`${baseUrl}/api/chapter?idStory=${story.id}`, {
                next: { tags: [`story`, `chapter`, `story:${story.id}`] }
            });
            const chapterResponseData = await chapterResponse.json();
            const chapters: MyChapter[] = chapterResponseData.data;

            console.log({ chapters });

            return chapters.map((chapter) => ({
                url: `${baseUrl}/${slugify(story.title)}/${story.id}/${slugify(chapter.title)}/${chapter.id}`,
                lastModified: safeDate(chapter.updatedAt),
                changeFrequency: "daily" as const,
                priority: 0.6
            }));
        })
    );
    const chapterRule: MetadataRoute.Sitemap = allChapterResponseData.flat();

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 1
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 0.6
        },
        ...storyRule,
        ...chapterRule
    ]
}