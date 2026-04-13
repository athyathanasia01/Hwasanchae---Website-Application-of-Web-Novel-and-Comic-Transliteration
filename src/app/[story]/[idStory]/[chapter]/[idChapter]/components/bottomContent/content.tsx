// technical
import { Editor } from "@tiptap/core";

// template
import { Donation } from "@hwasanchae/app/template/hwasanchae/donation"; // ✅ 
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 
import { DetailStory } from "@hwasanchae/app/template/story/story"; // ✅ 
import { ChapterNextPrev } from "@hwasanchae/app/template/story/chapter"; // ✅ 

// components
import LeftContent from "./leftContent/content";
import RightContent from "./rightContent/content";

// style
import style from "../styles/bottomContent/Content.module.scss";

type Props = {
    editor: Editor | null;
    story: DetailStory;
    donations: Donation[];
    communities: SocialMedia[];
    isLike: Boolean;
    isBookmark: Boolean;
    handleOnClickLike: () => void;
    handleOnClickBookmark: () => void;
    nextChapter?: ChapterNextPrev | null;
    prevChapter?: ChapterNextPrev | null;
}

export default function BottomContent(
    {
        editor,
        story,
        donations,
        communities,
        isLike,
        isBookmark,
        handleOnClickLike,
        handleOnClickBookmark,
        nextChapter,
        prevChapter
    }: Props
) {
    return (
        <div className={style.bottomContent}>
            <LeftContent editor={editor} />
            <RightContent 
                story={story} 
                donations={donations} 
                communities={communities} 
                isLike={isLike} 
                isBookmark={isBookmark}
                handleOnClickLike={handleOnClickLike} 
                handleOnClickBookmark={handleOnClickBookmark} 
                nextChapter={nextChapter}
                prevChapter={prevChapter}
            />
        </div>
    )
}