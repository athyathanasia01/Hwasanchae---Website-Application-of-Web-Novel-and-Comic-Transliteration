"use client";

// technical
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// helper
import { slugify } from "@hwasanchae/app/template/serverHelper"; // ✅ 

// template
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 
import { NewStoryDetail } from "@hwasanchae/app/template/story/story"; // ✅ 
import { ChapterNameLink, NewChapterItem } from "@hwasanchae/app/template/story/chapter"; // ✅ 

// components
import LeftContent from "./leftContent/content";
import RightContent from "./rightContent/content";

// style
import style from "../styles/thirdContent/Content.module.scss";

type Props = {
    data: NewStoryDetail;
    mediaTranslator: SocialMedia[];
}

export default function ThirdContent({ data, mediaTranslator }: Props) {
    const { push } = useRouter();

    const [chapters, setChapters] = useState<NewChapterItem[]>([]);
    const [firstCh, setFirstCh] = useState<ChapterNameLink>({ title: "", id: "" });
    const [latestCh, setLatestCh] = useState<ChapterNameLink>({ title: "", id: "" });
    const [translator, setTranslator] = useState<string>("");
    
    useEffect(() => {
        setTranslator(data.translator.name);

        const listChapter = data.chapters;
        if (listChapter.length === 0) return;
        const listSorted = listChapter.sort((a, b) => a.sort - b.sort);

        setChapters(listSorted);
        setFirstCh({ title: listSorted[0].title, id: listSorted[0].id });
        setLatestCh({ title: listSorted[listSorted.length - 1].title, id: listSorted[listSorted.length - 1].id });
    }, [data]);  

    function handleOnClickChapter(idChapter: string, chapterTitle: string) {
        push(`/${slugify(data.title)}/${data.id}/${slugify(chapterTitle)}/${idChapter}`);
    }

    function handleOnClickFirstUpdate() {
        push(`/${slugify(data.title)}/${data.id}/${slugify(firstCh.title)}/${firstCh.id}`);
    }

    function handleOnClickLatestUpdate() {
        push(`/${slugify(data.title)}/${data.id}/${slugify(latestCh.title)}/${latestCh.id}`);
    }

    function handleOnClickGlosarium() {
        push(`/glosarium/${data.id}`);
    }

    return (
        <div className={style.thirdContent}>
            <LeftContent 
                chapterList={chapters} 
                handleOnClickChapter={(idChapter: string, chapterTitle: string) => handleOnClickChapter(idChapter, chapterTitle)} 
            />
            <RightContent 
                handleOnClickFirstUpdate={handleOnClickFirstUpdate} 
                chapterFirstUpdate={firstCh.title} 
                handleOnClickLatestUpdate={handleOnClickLatestUpdate}
                handleOnClickGlosarium={handleOnClickGlosarium}
                chapterLatestUpdate={latestCh.title} 
                translator={translator} 
                listMediaTranslator={mediaTranslator} 
            />
        </div>
    )
}