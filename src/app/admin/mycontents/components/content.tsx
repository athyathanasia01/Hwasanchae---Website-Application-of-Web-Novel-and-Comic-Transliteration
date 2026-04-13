"use client";

// technical
import { useEffect, useState } from "react";

// template
import { MyStory } from "@hwasanchae/app/template/story/story"; // ✅ 

// components
import ButtonAddNewStory from "./components/buttonAddComponent";
import CardStoryContainer from "./components/cardStoryContainer";

// style
import style from "./styles/Content.module.scss";

async function getStoryListData() {
    try {
        const response = await fetch(`/api/story`, {
            method: `GET`,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();
        const data = responseData.data;

        return data;
    } catch (error) {
        alert(`Error: ${error}`);
    }
}

export default function Content() {
    const [storyList, setStoryList] = useState<MyStory[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            const storyListData = await getStoryListData();

            setTimeout(() => {
                if (storyListData) {
                    setStoryList(storyListData as MyStory[]);
                }

                setIsLoading(false);
            }, 1000);
        }
        
        loadData();
    }, []);

    return (
        <div className={style.contentPage}>
            {isLoading ?
                    <>
                        <div className={style.contentPage__buttonLoad}></div>
                        <ul className={style.contentPage__contentListLoad}>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div className={style.contentPage__contentListLoad__cardWrapper} key={index}></div>
                            ))}
                        </ul>
                    </>
                :
                    <>
                        <ButtonAddNewStory />
                        <ul className={style.contentPage__contentList}>
                            {storyList.map((story) => (
                                <CardStoryContainer key={story.id} story={story}/>
                            ))}
                        </ul>
                    </>
            }
        </div>
    )
}