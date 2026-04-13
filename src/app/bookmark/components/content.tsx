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
    const [bookmarks, setBookmarks] = useState<StoryUser[]>([]);
    const { push } = useRouter();

    useEffect(() => {
        const bookmarks = localStorage.getItem("bookmarks");
        const bookmarkListId: string[] = bookmarks ? JSON.parse(bookmarks) : [];

        const bookmarkList = storyList.filter(story => bookmarkListId.includes(story.id)).map(story => { return { ...story, isBookmark: true }});
        setBookmarks(bookmarkList);
    }, [storyList]);

    async function handleOnClickBookmark(id: string) {
        const bookmark = localStorage.getItem("bookmarks");
        const bookmarkListId: string[] = bookmark ? JSON.parse(bookmark) : [];

        const updatedListBookmark = bookmarkListId.filter((bookmark) => bookmark !== id);
        
        localStorage.setItem("bookmarks", JSON.stringify(updatedListBookmark));

        setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
    }

    function handleToDetail(title: string, id: string) {
        push(`/${title.replace(/\s+/g, "-")}/${id}`);
    }

    return (
        <div className={style.content}>
            <span className={style.content__title}>Bookmark</span>
            {bookmarks.length !== 0 ? 
                <ul className={style.content__bookmarkList}>
                    {bookmarks.map((bookmark) => {
                        const selectedTags = bookmark.tags.sort(() => Math.random() - 0.5).slice(0, 3);

                        return (
                            <li key={bookmark.id}>
                                <CardContainer 
                                    image={bookmark.coverImage ? bookmark.coverImage.url : '/image/image_cover.jpg'} 
                                    title={bookmark.title} 
                                    writer={bookmark.writer} 
                                    translator={bookmark.translator.name} 
                                    like={bookmark.vote} 
                                    isBookmarked={bookmark.isBookmark} 
                                    tags={selectedTags} 
                                    summary={bookmark.summary} 
                                    handleOnClickBookmark={() => handleOnClickBookmark(bookmark.id)} 
                                    handleToDetail={() => handleToDetail(bookmark.title, bookmark.id)} 
                                />
                            </li>
                        )
                    })}
                </ul>
            :
                <span className={style.content__noBookmark}>You have nothing in Bookmark. Add new list <Link href={'/'} className={style.content__noBookmark__link}>here!</Link></span>
            }
        </div>
    )
}