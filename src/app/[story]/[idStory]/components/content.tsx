"use client";

// technical
import Link from "next/link";
import { useEffect, useState } from "react";

// template and data
import { NewStoryDetail } from "@hwasanchae/app/template/story/story"; // ✅ 
import { HwasanchaeData } from "@hwasanchae/app/template/hwasanchae/hwasanchae"; // ✅ 
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 

// components
import FirstContent from "./firstContent/content";
import SecondContent from "./secondContent/content";
import ThirdContent from "./thirdContent/content";

// style
import style from "./styles/Content.module.scss";

type Props = {
    story: Omit<NewStoryDetail, 'isBookmark'>;
    hwasanchae: HwasanchaeData;
    mediaTranslator: SocialMedia[];
}

export default function Content({ story, hwasanchae, mediaTranslator }: Props) {
    const [data, setData] = useState<NewStoryDetail | null>({ ...story, isBookmark: false });

    useEffect(() => {
        const bookmarks = localStorage.getItem("bookmarks");
        const bookmarkList = bookmarks ? JSON.parse(bookmarks) : [];
        const isBookmark = bookmarkList.includes(story.id);

        setData({ ...story, isBookmark: isBookmark });
    }, [story]);

    return (
        <div className={style.content}>
            {data && 
                <>
                    <div className={style.content__navigationTop}>
                        <Link href={`/`} className={style.content__navigationTop__navHome}>Home</Link>
                        <span className={style.content__navigationTop__navCurrent}> / {data.title}</span>
                    </div>
                    <FirstContent data={data} />
                    <SecondContent data={data} hwasanchae={hwasanchae} />
                    <div className={style.content__dividerHorizontal}></div>
                    <ThirdContent data={data} mediaTranslator={mediaTranslator} />
                </>
            }
        </div>
    )
}