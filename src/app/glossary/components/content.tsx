"use client";

// technical
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// components
import CardContainer from "@hwasanchae/app/components/components/fourthContent/rightContent/components/cardContainer";

// template
import { StoryUser } from "@hwasanchae/app/template/story/story"; // ✅ 

// style 
import style from "./style/Content.module.scss";

type Props = {
    storyList: Omit<StoryUser, 'isBookmark'>[];
}

export default function Content({ storyList }: Props) {
    const [stories, setStories] = useState<StoryUser[]>(() => {
        const bookmarks = typeof window !== "undefined"
            ? localStorage.getItem("bookmarks")
            : null;

        const bookmarkListId: string[] = bookmarks ? JSON.parse(bookmarks) : [];

        return storyList.map(story => ({
            ...story,
            isBookmark: bookmarkListId.includes(story.id)
        }));
    });
    const { push } = useRouter();

    async function handleOnClickBookmark(id: string) {
        const bookmark = localStorage.getItem("bookmarks");
        const bookmarkListId: string[] = bookmark ? JSON.parse(bookmark) : [];

        const isStoryBookmarked = stories.find(story => story.id === id)?.isBookmark;
        const updatedListBookmark = isStoryBookmarked ? bookmarkListId.filter(bookmark => bookmark !== id) : [...bookmarkListId, id];
        
        localStorage.setItem("bookmarks", JSON.stringify(updatedListBookmark));

        const changedList = stories.map(story => story.id === id ? { ...story, isBookmark: !story.isBookmark }  : story);
        setStories(changedList);
    }

    function handleToDetail(id: string) {
        push(`/glossary/${id}`);
    }

    return (
        <div className={style.content}>
            <span className={style.content__title}>Glossary</span>
            {stories.length !== 0 ? 
                <ul className={style.content__storyList}>
                    {stories.map((story) => {
                        const selectedTags = story.tags.sort(() => Math.random() - 0.5).slice(0, 3);

                        return (
                            <li key={story.id}>
                                <CardContainer 
                                    image={story.coverImage ? story.coverImage.url : '/image/image_cover.jpg'}
                                    title={story.title}
                                    writer={story.writer}
                                    translator={story.translator.name}
                                    like={story.vote}
                                    isBookmarked={story.isBookmark}
                                    tags={selectedTags}
                                    summary={story.summary}
                                    handleOnClickBookmark={() => handleOnClickBookmark(story.id)}
                                    handleToDetail={() => handleToDetail(story.id)} 
                                    translatedLanguage={story.translatedLanguage} 
                                    status={story.status} 
                                    read={story.read} 
                                    comment={story.comments}                                
                                />
                            </li>
                        )
                    })}
                </ul>
            :
                <span className={style.content__noStory}>There's no story added by admin yet. Please contact admin to find an update!</span>
            }
        </div>
    )
}