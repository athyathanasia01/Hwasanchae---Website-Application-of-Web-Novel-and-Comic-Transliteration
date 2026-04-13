"use client";

// technical
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// template
import { ConditionNavigation, StoryOrder, StoryStatus } from "@hwasanchae/app/template/variants"; // ✅ 
import { NewStoryDetail, Tag } from "@hwasanchae/app/template/story/story"; // ✅ 

// helper
import { parseDate } from "@hwasanchae/app/template/serverHelper"; // ✅ 

// components
import HeaderNav from "./components/headerNav";
import CardContainer from "./components/cardContainer";

// style 
import style from "../../styles/fourthContent/rightContent/Content.module.scss";

type Props = {
    statusClose: ConditionNavigation;
    story: Omit<NewStoryDetail, 'isBookmark'>[];
}

export default function RightContent({ statusClose, story }: Props) {
    const { push } = useRouter();

    const [allStories, setAllStories] = useState<NewStoryDetail[]>(story.map(data => { return { ...data, isBookmark: false }}));
    const [stories, setStories] = useState<NewStoryDetail[]>(story.map(data => { return { ...data, isBookmark: false }}));
    const [genres, setGenres] = useState<string[]>([]);
    const [languages, setLanguages] = useState<string[]>([]);
    const [searchKey, setSearchKey] = useState<string>("");

    const [selectedGenre, setSelectedGenre] = useState<string>("All Genre");
    const [selectLanguage, setSelectedLanguage] = useState<string>("All Language");
    const [selectedStatus, setSelectedStatus] = useState<StoryStatus | "All Status">("All Status");
    const [selectedSort, setSelectedSort] = useState<StoryOrder>("Last update");

    const [randomTags, setRandomTags] = useState<Record<string, Tag[]>>({});

    useEffect(() => {
        const map: Record<string, any[]> = {};

        stories.forEach(story => {
            map[story.id] = [...story.tags]
                .sort(() => Math.random() - 0.5)
                .slice(0, statusClose === 'open' ? 3 : 4);
        });

        setRandomTags(map);
    }, [stories, statusClose]);

    useEffect(() => {
        const bookmarkStorage = localStorage.getItem("bookmarks");
        const bookmarkList: string[] = bookmarkStorage ? JSON.parse(bookmarkStorage) : [];

        setAllStories(prev => 
            prev.map(data => 
                bookmarkList.includes(data.id) ? { ...data, isBookmark: true } : data
            )
        )

        setStories(prev => 
            prev.map(data => 
                bookmarkList.includes(data.id) ? { ...data, isBookmark: true } : data
            )
        )

        setGenres([...new Set(story.flatMap(data => data.tags.map(tag => tag.tag)))]);
        setLanguages([...new Set(story.map(data => data.translatedLanguage))]);
    }, [story]);

    useEffect(() => {
        let filtered = [...allStories];

        if (searchKey) {
            filtered = filtered.filter(data => data.title.toLowerCase().includes(searchKey));
        }

        if (selectedGenre !== "All Genre") {
            filtered = filtered.filter(data => data.tags.some(tag => tag.tag.includes(selectedGenre)));
        }

        if (selectLanguage !== "All Language") {
            filtered = filtered.filter(data => data.translatedLanguage === selectLanguage);
        }

        if (selectedStatus !== "All Status") {
            filtered = filtered.filter(data => data.status === selectedStatus);
        }

        if (selectedSort === "Last update") {
            filtered.sort((a, b) => parseDate(b.lastUpdate).getTime() - parseDate(a.lastUpdate).getTime());
        } else if (selectedSort === "Ascending") {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else if (selectedSort === "Descending") {
            filtered.sort((a, b) => b.title.localeCompare(a.title));
        }

        setStories(filtered);
    }, [searchKey, selectedGenre, selectedStatus, selectedSort, selectLanguage, allStories])

    function handleOnChangeGenre(e: React.ChangeEvent<HTMLSelectElement>) {
        const genreSelected = e.target.value;
        setSelectedGenre(genreSelected);
    }

    function handleOnChangeLanguage(e: React.ChangeEvent<HTMLSelectElement>) {
        const languageSelected = e.target.value;
        setSelectedLanguage(languageSelected);
    }

    function handleOnChangeOrder(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedOrder = e.target.value as StoryOrder;
        setSelectedSort(selectedOrder);
    }

    function handleOnChangeStatus(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedStatus = e.target.value as StoryStatus;
        setSelectedStatus(selectedStatus);
    }

    function handleOnChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const keyword = e.target.value.toLowerCase();
        setSearchKey(keyword);
    }

    function handleOnClickBookmark(idStory: string) {
        const bookmarkStorage = localStorage.getItem("bookmarks");
        const bookmarkList: string[] = bookmarkStorage ? JSON.parse(bookmarkStorage) : [];

        const isExist = bookmarkList.includes(idStory);

        const updatedListBookmark = isExist
            ? bookmarkList.filter((bookmark) => bookmark !== idStory)
            : [...bookmarkList, idStory];

        localStorage.setItem("bookmarks", JSON.stringify(updatedListBookmark));
        const storyList = allStories.map(data => data.id === idStory ? { ...data, isBookmark: !data.isBookmark } : data);
        setStories(storyList);
    }

    function handleToDetail(storyTitle: string, storyId: string) {
        // ke halaman detail story
        push(`/${storyTitle.replace(/\s+/g, "-")}/${storyId}`);
    }

    return (
        <div className={`${style.rightContent} ${style[`rightContent--${statusClose}`]}`}>
            <HeaderNav 
                allGenres={genres}
                allLanguage={languages} 
                handleOnChangeGenre={handleOnChangeGenre} 
                handleOnChangeLanguage={handleOnChangeLanguage}
                handleOnChangeStatus={handleOnChangeStatus} 
                handleOnChangeOrder={handleOnChangeOrder} 
                searchValue={searchKey} 
                handleOnChangeSearch={handleOnChangeSearch} 
            />
            {stories.length !== 0 ?
                <ul className={style.rightContent__listStory}>
                    {stories.map((story) => {
                        return (
                            <li key={story.id}>
                                <CardContainer 
                                    image={story.coverImage ? story.coverImage.url : "/image/image_cover.jpg"}
                                    title={story.title}
                                    writer={story.writer}
                                    translator={story.translator.name}
                                    status={story.status}
                                    like={story.vote}
                                    isBookmarked={story.isBookmark}
                                    tags={randomTags[story.id] || []}
                                    summary={story.summary}
                                    handleOnClickBookmark={() => handleOnClickBookmark(story.id)}
                                    handleToDetail={() => handleToDetail(story.title, story.id)} 
                                    translatedLanguage={story.translatedLanguage} 
                                    read={story.read} 
                                    comment={story.comments} 
                                />
                            </li>
                        )
                    })}
                </ul>
            : 
                <div className={style.rightContent__empty}>
                    <span className={style.rightContent__empty__text}>No story to display. Please contact developer to add new story!</span>
                </div>
            }
            
        </div>
    )
}