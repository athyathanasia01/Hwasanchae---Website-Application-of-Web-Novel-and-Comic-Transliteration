"use client";

// technical
import { useEffect, useState } from "react";

// template
import { NewStoryDetail } from "@hwasanchae/app/template/story/story"; // ✅ 

// components
import LastUpdateContainer from "./lastUpdateContainer";

// style 
import style from "../../styles/secondContent/componentStyle/LastUpdateContent.module.scss";

type Props = {
    story: Omit<NewStoryDetail, 'isBookmark'>[];
}

export default function LastUpdate({ story }: Props) {
    const [lastUpdate, setLastUpdate] = useState<Omit<NewStoryDetail, 'isBookmark'>[]>([]);

    useEffect(() => {
        const listLast = [...story]
            .sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime())
            .slice(0, 10);

        setLastUpdate(listLast);
    }, [story]);

    return (
        <div className={style.lastUpdate}>
            <span className={style.lastUpdate__title}>Last Update</span>
            {lastUpdate.length !== 0 ?
                <ul className={style.lastUpdate__unorderList}>
                    {lastUpdate.map((story, index) => (
                        <li key={index}>
                            <LastUpdateContainer idStory={story.id} image={story.coverImage ? story.coverImage.url : '/image/image_cover.jpg'} title={story.title} vote={story.vote}/>
                        </li>
                    ))}
                </ul>
            :
                <div className={style.lastUpdate__empty}>
                    <span className={style.lastUpdate__empty__text}>No story to display</span>
                </div>
            }
        </div>
    )
}