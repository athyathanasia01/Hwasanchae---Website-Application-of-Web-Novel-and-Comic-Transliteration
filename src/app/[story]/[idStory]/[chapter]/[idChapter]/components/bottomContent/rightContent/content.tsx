"use client"

// technical
import { useRouter } from "next/navigation";

// helper
import { slugify } from "@hwasanchae/app/template/serverHelper"; // ✅ 

// template
import { Donation } from "@hwasanchae/app/template/hwasanchae/donation"; // ✅ 
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 
import { DetailStory } from "@hwasanchae/app/template/story/story"; // ✅ 
import { ChapterNextPrev } from "@hwasanchae/app/template/story/chapter"; // ✅ 

// components
import BottomButtonContainer from "./components/bottomButtonContainer";
import MiddleContainer from "./components/middleContainer";
import TopButtonContainer from "./components/topButtonContainer";

// style
import style from "../../styles/bottomContent/rightContent/Content.module.scss";

type Props = {
    story: DetailStory;
    nextChapter?: ChapterNextPrev | null;
    prevChapter?: ChapterNextPrev | null;
    donations: Donation[];
    communities: SocialMedia[];
    isLike: Boolean;
    isBookmark: Boolean;
    handleOnClickLike: () => void;
    handleOnClickBookmark: () => void;
}

export default function RightContent({ story, nextChapter, prevChapter, donations, communities, isLike, isBookmark, handleOnClickLike, handleOnClickBookmark }: Props) {
    const { push } = useRouter();

    function handleNextChapter() {
        if (nextChapter) {
            push(`/${slugify(story.title)}/${story.id}/${slugify(nextChapter.titleChapter)}/${nextChapter.idChapter}`);
            return;
        }

        return;
    }

    function handlePrevChapter() {
        if (prevChapter) {
            push(`/${slugify(story.title)}/${story.id}/${slugify(prevChapter.titleChapter)}/${prevChapter.idChapter}`);
            return;
        }

        return;
    }
    
    return (
        <div className={style.rightContent}>
            <TopButtonContainer 
                isLike={isLike} 
                handleOnClickLike={handleOnClickLike} 
                isBookmark={isBookmark} 
                handleOnClickBookmark={handleOnClickBookmark} 
            />
            <MiddleContainer 
                donations={donations} 
                communities={communities} 
            />
            <BottomButtonContainer 
                nextChapter={nextChapter?.titleChapter} 
                prevChapter={prevChapter?.titleChapter} 
                handleOnClickPrev={handlePrevChapter} 
                handleOnClickNext={handleNextChapter} 
            />
        </div>
    )
}